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
    const { api, currentAccount, storedMNRVHotkey } = useSubstrateState()
    const MNRVHotkey = storedMNRVHotkey
  
    const [accountBalance, setAccountBalance] = useState(0)
    const [mnrvStake, setmnrvStake] = useState(0)

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

    // When account address changes, update subscriptions
    useEffect(() => {
        let unsubscribe
        api.query.subtensorModule.stake(MNRVHotkey, acctAddr(currentAccount))
        // If the user has selected an address, create a new subscription
        currentAccount &&
            api.query.subtensorModule
            .stake(MNRVHotkey, acctAddr(currentAccount), balance =>
                setmnrvStake(balance)
            )
            .then(unsub => (unsubscribe = unsub))
            .catch(console.error)

        return () => unsubscribe && unsubscribe()
        }, [api, currentAccount])

    const mnrvStakeTao = parseFloat(mnrvStake.toString().replace(/,/g, '')) / 10**9
    

  return (
      <Stack spacing={2} alignItems="center" direction="column" justifyContent="center">
          <h1>{"Available Balance: "} {accountBalanceTao}{" Tao"}</h1>
          <h1>{"MNRV.AI Stake: "}{mnrvStakeTao}{" Tao"}</h1>
        </Stack>
  )
}



export default function AccountBasicInfo(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
