import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import AccountCard from './AccountCard'
import AccountIdenticon from './AccountIdenticon'
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
      <Stack padding={1} spacing={2} alignItems="center" direction="row" justifyContent="center">
          {/* <AccountIdenticon account={currentAccount}/> */}
          {(keyringOptions && currentAccount) ?
            <Select 
              labelId="account-selection-label"
              id="account-selection"
              value={currentAccount.address}
              // label="Active Account"
              onChange={onChange}
            >
              {keyringOptions.map(temp_account => {
                return (
                <MenuItem key={temp_account.key} value={temp_account.key}>
                   <AccountCard account={keyring.getPair(temp_account.key)}/>
                </MenuItem>
                );
              })}
              {/* <MenuItem key={"Coldkey"} value={"Coldkey"}>Coldkey</MenuItem> */}
            </Select>
            :
            <h1>No Accounts Detected</h1>
          }

        </Stack>
  )
}


export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
