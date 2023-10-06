import { useEffect, useState } from 'react'

import { web3FromSource } from '@polkadot/extension-dapp'

import { Button, Color } from '@components/ui/Button'

import { useSubstrateState } from '..'
import utils from '../utils'

interface Attrs {
  palletRpc: string
  callable: string
  inputParams: any[]
  paramFields: any[]
}

interface Props {
  attrs: Attrs
  color?: Color
  disabled?: boolean
  label: string
  style?: React.CSSProperties
  type?: 'QUERY' | 'RPC' | 'SIGNED-TX' | 'UNSIGNED-TX' | 'SUDO-TX' | 'UNCHECKED-SUDO-TX' | 'CONSTANT'
  setStatus: any
  txOnClickHandler?: (unsub: any) => void
}

export const TxButton = ({
  attrs,
  color,
  disabled = false,
  label,
  setStatus,
  style,
  type = 'QUERY',
  txOnClickHandler
}: Props) => {
  // Hooks
  const { api, currentAccount } = useSubstrateState()
  const [unsub, setUnsub] = useState<(() => void) | null>(null)
  const [sudoKey, setSudoKey] = useState(null)

  const { palletRpc, callable, inputParams, paramFields } = attrs
  // console.log(attrs)
  const isQuery = () => type === 'QUERY'
  const isSudo = () => type === 'SUDO-TX'
  const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX'
  const isUnsigned = () => type === 'UNSIGNED-TX'
  const isSigned = () => type === 'SIGNED-TX'
  const isRpc = () => type === 'RPC'
  const isConstant = () => type === 'CONSTANT'

  const loadSudoKey = () => {
    ;(async function () {
      if (!api || !api.query.sudo) {
        return
      }
      const sudoKey = await api.query.sudo.key()
      sudoKey.isEmpty ? setSudoKey(null) : setSudoKey(sudoKey.toString())
    })()
  }

  useEffect(loadSudoKey, [api])

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  const txResHandler = ({ status }: { status: any }) =>
    // Original code
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`)

  const txErrHandler = (err: Error) => setStatus(`😞 Transaction Failed: ${err.toString()}`)

  const sudoTx = async () => {
    const fromAcct = await getFromAcct()
    const transformed = transformParams(paramFields, inputParams)
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx.sudo.sudo(api.tx[palletRpc][callable](...transformed))
      : api.tx.sudo.sudo(api.tx[palletRpc][callable]())

    const unsub = txExecute.signAndSend(...fromAcct, txResHandler).catch(txErrHandler)

    setUnsub(() => unsub)
  }

  const uncheckedSudoTx = async () => {
    const fromAcct = await getFromAcct()
    const txExecute = api.tx.sudo.sudoUncheckedWeight(api.tx[palletRpc][callable](...inputParams), 0)

    const unsub = txExecute.signAndSend(...fromAcct, txResHandler).catch(txErrHandler)

    setUnsub(() => unsub)
  }

  const signedTx = async () => {
    const fromAcct = await getFromAcct()
    const transformed = transformParams(paramFields, inputParams)
    // transformed can be empty parameters

    const txExecute = transformed ? api.tx[palletRpc][callable](...transformed) : api.tx[palletRpc][callable]()

    const unsub = await txExecute.signAndSend(...fromAcct, txResHandler).catch(txErrHandler)

    setUnsub(() => unsub)
  }

  const unsignedTx = async () => {
    const transformed = transformParams(paramFields, inputParams)
    // transformed can be empty parameters
    const txExecute = transformed ? api.tx[palletRpc][callable](...transformed) : api.tx[palletRpc][callable]()

    const unsub = await txExecute.send(txResHandler).catch(txErrHandler)
    setUnsub(() => unsub)
  }

  const queryResHandler = (result: any) => (result.isNone ? setStatus('None') : setStatus(result.toString()))

  const query = async () => {
    const transformed = transformParams(paramFields, inputParams)
    const unsub = await api.query[palletRpc][callable](...transformed, queryResHandler)

    setUnsub(() => unsub)
  }

  const rpc = async () => {
    const transformed = transformParams(paramFields, inputParams, {
      emptyAsNull: false
    })
    const unsub = await api.rpc[palletRpc][callable](...transformed, queryResHandler)
    setUnsub(() => unsub)
  }

  const constant = () => {
    const result = api.consts[palletRpc][callable]
    result.isNone ? setStatus('None') : setStatus(result.toString())
  }

  const transaction = async () => {
    if (typeof unsub === 'function') {
      unsub()
      setUnsub(null)
    }

    setStatus('Sending... Please approve transaction in browser extension.')

    const asyncFunc =
      (isSudo() && sudoTx) ||
      (isUncheckedSudo() && uncheckedSudoTx) ||
      (isSigned() && signedTx) ||
      (isUnsigned() && unsignedTx) ||
      (isQuery() && query) ||
      (isRpc() && rpc) ||
      (isConstant() && constant)

    if (asyncFunc !== false) {
      await asyncFunc()
    }

    return txOnClickHandler && typeof txOnClickHandler === 'function' ? txOnClickHandler(unsub) : null
  }

  const transformParams = (paramFields: any[], inputParams: any[], opts = { emptyAsNull: true }) => {
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map((inputParam) => {
      // To cater the js quirk that `null` is a type of `object`.
      if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
        return inputParam.value.trim()
      } else if (typeof inputParam === 'string') {
        return inputParam.trim()
      }
      return inputParam
    })
    const params = paramFields.map((field, ind) => ({
      ...field,
      value: paramVal[ind] || null
    }))

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') return opts.emptyAsNull ? [...memo, null] : memo

      let converted = value

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map((e: any) => e.trim())
        converted = converted.map((single: any) =>
          isNumType(type) ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single)) : single
        )
        return [...memo, converted]
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted)
      }
      return [...memo, converted]
    }, [])
  }

  const isNumType = (type: any) => utils.paramConversion.num.some((el) => type.indexOf(el) >= 0)

  const allParamsFilled = () => {
    if (paramFields.length === 0) {
      return true
    }

    return paramFields.every((paramField, ind) => {
      const param: any = inputParams[ind]
      if (paramField.optional) {
        return true
      }
      if (param == null) {
        return false
      }

      const value = typeof param === 'object' ? param.value : param
      return value !== null && value !== ''
    })
  }

  const isSudoer = (acctPair: any) => {
    if (!sudoKey || !acctPair) {
      return false
    }
    return acctPair.address === sudoKey
  }

  return (
    <Button
      className="flex-1"
      type="submit"
      color={color}
      style={style || {}}
      onClick={transaction}
      disabled={
        disabled ||
        !palletRpc ||
        !callable ||
        !allParamsFilled() ||
        // These txs required currentAccount to be set
        ((isSudo() || isUncheckedSudo() || isSigned()) && !currentAccount) ||
        ((isSudo() || isUncheckedSudo()) && !isSudoer(currentAccount))
      }
    >
      {label}
    </Button>
  )
}
