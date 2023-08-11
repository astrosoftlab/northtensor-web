import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import AccountCard from './AccountCard'
import AccountIdenticon from './AccountIdenticon'
import { Stack, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


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
    const {
      setBalanceSigFigures,
      state: { balanceSigFigures },
    } = useSubstrate()
  
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
    const roundedAccountBalanceTao  = parseFloat(accountBalanceTao.toFixed(balanceSigFigures))

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
    const roundedMnrvStakeTao = parseFloat(mnrvStakeTao.toFixed(balanceSigFigures))

    const SigFigOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const changeBalanceSigFigures = (event) => {
      setBalanceSigFigures(event.target.value);
    };
    


  return (
    <Stack padding={.1} spacing={1} alignItems="center" direction="row" justifyContent="center">
    {/* <Stack spacing={1} alignItems="center" direction="column" justifyContent="right">
      <h1>{"Available Balance: "} {roundedAccountBalanceTao}{" Tao"}</h1>
      <h1 className="px-4">{"North Tensor Stake: "}{roundedMnrvStakeTao}{" Tao"}</h1>
    </Stack> */}
    
    <FormControl sx={{ m: 1, minWidth: 65 }}>
    <InputLabel id="sigfigs-selector-label">SigFigs</InputLabel>
      <Select 
        labelId="sigfigs-selector-label"
        id="sigfigs-selector"
        value={balanceSigFigures} 
        onChange={changeBalanceSigFigures} 
        label="SigFigs"
      >
        {SigFigOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Stack>

  )
}



export default function AccountBasicInfo(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
