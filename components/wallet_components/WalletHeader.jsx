import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import AccountSelector from './AccountSelector'
import AccountBasicInfo from './AccountBasicInfo'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


import {
  Menu,
  Button,
  Dropdown,
  Container,
  Card,
  // Icon,
  // Image,
  Label,
} from 'semantic-ui-react'

// import HeaderPathing from './HeaderPathing'
import { useSubstrate, useSubstrateState } from '../../lib/substrate-lib'

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'

const acctAddr = acct => (acct ? acct.address : '')

function Main(props) {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()
  const [nodeInfo, setNodeInfo] = useState({})

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }))

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : ''

  // Set the initial address
  useEffect(() => {
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress])
  
  const onChange = addr => {
    // console.log("onchange", addr)
    if (addr.target.value === "Coldkey") {console.log("Coldkey")}
    else {
    setCurrentAccount(keyring.getPair(addr.target.value))
    }
  }
  const { api } = useSubstrateState()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ])
        setNodeInfo({ chain, nodeName, nodeVersion })
        
      } catch (e) {
        console.error(e)
      }
    }
    getInfo()
  }, [api.rpc.system])

  return (
    <Box
      sx={{
        display: 'flex-width',
        flexWrap: 'wrap',
        '& > :not(style)': {
          // height: 64,
        },
      }}
    >
        <Paper >
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <AccountSelector/>
            <AccountBasicInfo/>
        </Stack>
    </Paper>
    </Box>
  )
}

function BalanceAnnotation(props) {
  const { api, currentAccount } = useSubstrateState()
  
  const [accountBalance, setAccountBalance] = useState(0)

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api.query.system
        .account(acctAddr(currentAccount), balance =>
          setAccountBalance(balance.data.free.toHuman())
        )
        .then(unsub => (unsubscribe = unsub))
        .catch(console.error)

    return () => unsubscribe && unsubscribe()
  }, [api, currentAccount])

  const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9

  return currentAccount ? (
    <Label pointing="left" color="blue">
      {"Available Tao: "} 
      {accountBalanceTao}
    </Label>
  ) : null
}

export default function WalletHeader(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
