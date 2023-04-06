import React, { useReducer, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { isTestChain } from '@polkadot/util'
import { TypeRegistry } from '@polkadot/types/create'

import config from '../config'

const parsedQuery = new URLSearchParams(window.location.search)
const connectedSocket = parsedQuery.get('rpc') || config.PROVIDER_SOCKET
const MNRVHotkey = parsedQuery.get('rpc') || config.MNRVHOTKEY
const MNRVColdkey = parsedQuery.get('rpc') || config.MNRVCOLDKEY

///
// Initial state for `useReducer`

const initialState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  storedMNRVHotkey: MNRVHotkey,
  storedMNRVColdkey: MNRVColdkey,
}
const registry = new TypeRegistry()

///
// Reducer function for `useReducer`

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' }
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' }
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' }
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload }
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' }
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' }
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' }
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload }
    default:
      throw new Error(`Unknown type: ${action.type}`)
  }
}

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  const { apiState, socket, jsonrpc } = state
  // We only want this function to be performed once
  if (apiState) return

  dispatch({ type: 'CONNECT_INIT' })

  const provider = new WsProvider(socket)
  const _api = new ApiPromise({
    types: {
      Balance: 'u64',
      PrometheusInfo: {
        block: 'u64', // --- Prometheus serving block.
        version: 'u32', // --- Prometheus version.
        ip: 'u128', // --- Prometheus u128 encoded ip address of type v6 or v4. serialized to string.
        port: 'u16', // --- Prometheus u16 encoded port.
        ip_type: 'u8', // --- Prometheus ip type, 4 for ipv4 and 6 for ipv6.
      },
      AxonInfo: {
        block: 'u64', // --- Axon serving block.
        version: 'u32', // --- Axon version
        ip: 'u128', // --- Axon u128 encoded ip address of type v6 or v4. serialized to string.
        port: 'u16', // --- Axon u16 encoded port.
        ip_type: 'u8', // --- Axon ip type, 4 for ipv4 and 6 for ipv6.
        protocol: 'u8', // --- Axon protocol. TCP, UDP, other.
        placeholder1: 'u8', // --- Axon proto placeholder 1.
        placeholder2: 'u8', // --- Axon proto placeholder 1.
      },
      NeuronInfo: {
        hotkey: 'AccountId',
        coldkey: 'AccountId',
        uid: 'Compact<u16>',
        netuid: 'Compact<u16>',
        active: 'bool',
        axon_info: 'AxonInfo',
        prometheus_info: 'PrometheusInfo',
        stake: 'Vec<(AccountId, Compact<u64>)>', // map of coldkey to stake on this neuron/hotkey (includes delegations)
        rank: 'Compact<u16>',
        emission: 'Compact<u64>',
        incentive: 'Compact<u16>',
        consensus: 'Compact<u16>',
        trust: 'Compact<u16>',
        validator_trust: 'Compact<u16>',
        dividends: 'Compact<u16>',
        last_update: 'Compact<u64>',
        validator_permit: 'bool',
        weights: 'Vec<(Compact<u16>, Compact<u16>)>', // Vec of (uid, weight)
        bonds: 'Vec<(Compact<u16>, Compact<u16>)>', // Vec of (uid, bond)
        pruning_score: 'Compact<u16>'
      },
      NeuronInfoLite: {
        hotkey: 'AccountId',
        coldkey: 'AccountId',
        uid: 'Compact<u16>',
        netuid: 'Compact<u16>',
        active: 'bool',
        axon_info: 'AxonInfo',
        prometheus_info: 'PrometheusInfo',
        stake: 'Vec<(AccountId, Compact<u64>)>', // map of coldkey to stake on this neuron/hotkey (includes delegations)
        rank: 'Compact<u16>',
        emission: 'Compact<u64>',
        incentive: 'Compact<u16>',
        consensus: 'Compact<u16>',
        trust: 'Compact<u16>',
        validator_trust: 'Compact<u16>',
        dividends: 'Compact<u16>',
        last_update: 'Compact<u64>',
        validator_permit: 'bool',
        pruning_score: 'Compact<u16>'
      },
      DelegateInfo: {
        delegate_ss58: 'AccountId',
        take: 'Compact<u16>',
        nominators: 'Vec<(AccountId, Compact<u64>)>', // map of nominator_ss58 to stake amount
        owner_ss58: 'AccountId',
        registrations: 'Vec<Compact<u16>>', // Vec of netuid this delegate is registered on
        validator_permits: 'Vec<Compact<u16>>', // Vec of netuid this delegate has validator permit on
        return_per_1000: 'Compact<u64>', // Delegators current daily return per 1000 TAO staked minus take fee
        total_daily_return: 'Compact<u64>', // Delegators current daily return
      },
      SubnetInfo: {
        netuid: 'Compact<u16>',
        rho: 'Compact<u16>',
        kappa: 'Compact<u16>',
        difficulty: 'Compact<u64>',
        immunity_period: 'Compact<u16>',
        validator_batch_size: 'Compact<u16>',
        validator_sequence_length: 'Compact<u16>',
        validator_epochs_per_reset: 'Compact<u16>',
        validator_epoch_length: 'Compact<u16>',
        max_allowed_validators: 'Compact<u16>',
        min_allowed_weights: 'Compact<u16>',
        max_weights_limit: 'Compact<u16>',
        scaling_law_power: 'Compact<u16>',
        synergy_scaling_law_power: 'Compact<u16>',
        subnetwork_n: 'Compact<u16>',
        max_allowed_uids: 'Compact<u16>',
        blocks_since_last_step: 'Compact<u64>',
        tempo: 'Compact<u16>',
        network_modality: 'Compact<u16>',
        network_connect: 'Vec<[u16; 2]>',
        emission_values: 'Compact<u64>',
        burn: 'Compact<u64>',
      }
    },
    rpc: {
      neuronInfo: {
        getNeuronsLite: {
          description: 'Get neurons lite',
          params: [
            {
              name: 'netuid',
              type: 'u16',
            }
          ],
          type: 'Vec<u8>',
        },
        getNeuronLite: {
          description: 'Get neuron lite',
          params: [
            {
              name: 'netuid',
              type: 'u16',
            },
            {
              name: 'uid',
              type: 'u16',
            }
          ],
          type: 'Vec<u8>',
        },
        getNeurons: {
          description: 'Get neurons',
          params: [
            {
              name: 'netuid',
              type: 'u16',
            }
          ],
          type: 'Vec<u8>',
        },
        getNeuron: {
          description: 'Get neuron',
          params: [
            {
              name: 'netuid',
              type: 'u16',
            },
            {
              name: 'uid',
              type: 'u16',
            }
          ],
          type: 'Vec<u8>',
        },
      },
      delegateInfo: {
        getDelegates: {
          description: 'Get delegates info',
          params: [],
          type: 'Vec<u8>',
        },
      },
      subnetInfo: {
        getSubnetsInfo: {
          description: 'Get subnets info',
          params: [],
          type: 'Vec<u8>',
        },
        getSubnetInfo: {
          description: 'Get subnet info',
          params: [
            {
              name: 'netuid',
              type: 'u16',
            }
          ],
          type: 'Vec<u8>',
        },
      },
    },
    provider: provider,
  })

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api })
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api => dispatch({ type: 'CONNECT_SUCCESS' }))
  })
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }))
  _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }))
}

const retrieveChainInfo = async api => {
  const [systemChain, systemChainType] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.chainType
      ? api.rpc.system.chainType()
      : Promise.resolve(registry.createType('ChainType', 'Live')),
  ])

  return {
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
  }
}

///
// Loading accounts from dev and polkadot-js extension
const loadAccounts = (state, dispatch) => {
  const { api } = state
  dispatch({ type: 'LOAD_KEYRING' })

  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME)
      let allAccounts = await web3Accounts()

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }))

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      // ref: https://github.com/polkadot-js/apps/blob/15b8004b2791eced0dde425d5dc7231a5f86c682/packages/react-api/src/Api.tsx?_pjax=div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20%3E%20main#L101-L110
      const { systemChain, systemChainType } = await retrieveChainInfo(api)
      const showDevWallets = false
      const isDevelopment = showDevWallets && (
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain))

      Keyring.loadAll({ isDevelopment }, allAccounts)

      dispatch({ type: 'SET_KEYRING', payload: Keyring })
    } catch (e) {
      console.error(e)
      dispatch({ type: 'KEYRING_ERROR' })
    }
  }
  asyncLoadAccounts()
}

const SubstrateContext = React.createContext()

let keyringLoadAll = false

const SubstrateContextProvider = props => {
  const neededPropNames = ['socket']
  neededPropNames.forEach(key => {
    initialState[key] =
      typeof props[key] === 'undefined' ? initialState[key] : props[key]
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  connect(state, dispatch)

  useEffect(() => {
    const { apiState, keyringState } = state
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true
      loadAccounts(state, dispatch)
    }
  }, [state, dispatch])

  function setCurrentAccount(acct) {
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: acct })
  }

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount }}>
      {props.children}
    </SubstrateContext.Provider>
  )
}

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
}

const useSubstrate = () => useContext(SubstrateContext)
const useSubstrateState = () => useContext(SubstrateContext).state

export { SubstrateContextProvider, useSubstrate, useSubstrateState }
