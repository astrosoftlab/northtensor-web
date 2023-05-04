import React, { useState, useEffect } from 'react'
import Stack from "@mui/material/Stack"
import Identicon from "@polkadot/react-identicon";
import AccountCard from './AccountCard'
import AccountIdenticon from './AccountIdenticon'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useUser, useSession, useSupabaseClient, Session } from '@supabase/auth-helpers-react'




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
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient()



  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    coldkey_array: [account.address],
    icon: 'user',
    source: 'polkadot',
  }))

  const session = useSession()

  const [ss58_coldkeys, setSS58Coldkeys] = useState(null);
  const [ss58_coldkeys_processed, setSS58ColdkeysProcessed] = useState([]);
  const user = useUser()


  if (!session) {
    return null;
  }
  else {
    useEffect(() => {
      getProfile();
    }, [session]);
  }

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`ss58_coldkeys`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        // console.log(data)
        setSS58Coldkeys(data.ss58_coldkeys);
      }
        
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (ss58_coldkeys) {
      const processed = ss58_coldkeys.map((coldkey) => ({
        key: coldkey.coldkey,
        value: coldkey.coldkey,
        text: coldkey.name1,
        coldkey_array: [coldkey.coldkey],
        icon: 'user',
        source: 'account',
      }));
  
      setSS58ColdkeysProcessed(processed);
    }
  }, [ss58_coldkeys]);

  console.log("ss58_coldkeys", ss58_coldkeys)
  console.log("keyringOptions", keyringOptions)

  useEffect(() => {
    if (keyringOptions.length > 0 && session) {
      for (const keyringOption of keyringOptions) {
        console.log('keyringOption', keyringOption)
        console.log('bool', ss58_coldkeys && !ss58_coldkeys.some(item => item.coldkey === keyringOption.value))
        if (ss58_coldkeys && !ss58_coldkeys.some(item => item.coldkey === keyringOption.value)) {
          const newColdkey = {
            name1: keyringOption.text,
            coldkey: keyringOption.value,
            validated: false,
            watched: true,
          };
          console.log('newColdkey', newColdkey)
          setSS58Coldkeys((prevState) => [...prevState, newColdkey]);
        }
      }
      console.log('updated',  ss58_coldkeys)
    }
  }, [keyringOptions]);

  const completeColdkeyOptions = [
    ...keyringOptions,
    ...ss58_coldkeys_processed.filter((item) => !keyringOptions.some((other) => other.key === item.key)),
  ]

  completeColdkeyOptions.push({
    key: 'All Accounts',
    value: 'All Accounts',
    text: 'All Accounts',
    coldkey_array: completeColdkeyOptions.map(obj => obj.value),
    icon: 'user',
    source: 'account',
  })

  console.log("completeColdkeyOptions", completeColdkeyOptions)

  const initialAddress = completeColdkeyOptions.length > 0 ? completeColdkeyOptions[0].value : ''

  console.log('inistailasdadress', initialAddress)
  console.log('currentAccount', currentAccount)

  // Set the initial address
  useEffect(() => {
    if (!currentAccount && initialAddress.length > 0) {
      let acc_match = completeColdkeyOptions.find((obj) => obj.key === initialAddress)
      setCurrentAccount(acc_match)
      console.log('setcurrentaccount', currentAccount)
      console.log('should be', completeColdkeyOptions.find((obj) => obj.key === initialAddress))
    }

  }, [initialAddress])

  useEffect(() => {
    console.log('currentAccount updated:', currentAccount);
  }, [currentAccount]);
  

  
  
  const onChange = (addr) => {
    // console.log("onchange", addr)
    if (addr.target.value === "Coldkey") {console.log("Coldkey")}
    else {
    console.log("findign match result", completeColdkeyOptions.find((obj) => obj.key === addr.target.value))
    setCurrentAccount(completeColdkeyOptions.find((obj) => obj.key === addr.target.value))
    console.log("setnewcurrentaccount", currentAccount)
    }
  }
  // const { api } = useSubstrateState()

  // useEffect(() => {
  //   const getInfo = async () => {
  //     try {
  //       const [chain, nodeName, nodeVersion] = await Promise.all([
  //         api.rpc.system.chain(),
  //         api.rpc.system.name(),
  //         api.rpc.system.version(),
  //       ])
  //       setNodeInfo({ chain, nodeName, nodeVersion })
        
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   getInfo()
  // }, [api.rpc.system])

  return (
      <Stack padding={1} spacing={2} alignItems="center" direction="row" justifyContent="center">
          {/* <AccountIdenticon account={currentAccount}/> */}
          {(completeColdkeyOptions && currentAccount) ?
            <Select 
              labelId="account-selection-label"
              id="account-selection"
              value={currentAccount.value}
              // label="Active Account"
              onChange={(event) => onChange(event)}
            >
              {completeColdkeyOptions.map(temp_account => {
                return (
                <MenuItem key={temp_account.key} value={temp_account.key}>
                   <AccountCard accountName={temp_account.text}/>
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
