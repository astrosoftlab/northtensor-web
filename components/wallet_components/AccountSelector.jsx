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

  const [ss58_coldkeys, setSS58Coldkeys] = useState([]);
  const [accountColdkeyRetrieved, setAccountColdkeyRetrieved] = useState(false);
  const [ss58_coldkeys_processed, setSS58ColdkeysProcessed] = useState([]);
  const [newSS58keys, setNewSS58Keys] = useState(false);
  const [accountColdkeysUpdateMessage, setAccountColdkeysUpdateMessage] = useState('');
  const user = useUser()


  if (session) {
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
        setAccountColdkeyRetrieved(true);
      }
        
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    ss58_coldkeys,
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        ss58_coldkeys: ss58_coldkeys,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert(accountColdkeysUpdateMessage)
      setNewSS58Keys(false)
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accountColdkeyRetrieved && keyringOptions.length > 0 && session) { // <-- added check for setSS58Coldkeys
      let new_coldkeys = [];
      for (const keyringOption of keyringOptions) {
        //Check if the keyringOption is not in the ss58_coldkeys array
        if (ss58_coldkeys && !ss58_coldkeys.some(item => item.coldkey === keyringOption.value)) {
          // create a new coldkey object
          const newColdkey = {
            name1: keyringOption.text,
            coldkey: keyringOption.value,
            validated: false,
            watched: true,
          };
          // Call setSS58Coldkeys to update ss58_coldkeys
          new_coldkeys.push(newColdkey);
          // setSS58Coldkeys((prevState) => [...prevState, newColdkey]);
          
          
        }
      }
      // Send the updated ss58_coldkeys to the database
      let temp_ss58coldkeys = [...ss58_coldkeys, ...new_coldkeys];
      if (temp_ss58coldkeys.length > ss58_coldkeys.length) {
        // console.log('sending', temp_ss58coldkeys );
        setSS58Coldkeys(temp_ss58coldkeys);
        setNewSS58Keys(true);
        const newColdkeyNames = new_coldkeys.map(coldkey => coldkey.name1);
        console.log('newColdkeyNames', newColdkeyNames)
        setAccountColdkeysUpdateMessage(`Added the following coldkeys to your account: ${newColdkeyNames.join(', ')}`);

      }
    }
  }, [keyringOptions, session]); // <-- added setSS58Coldkeys to the dependency array
  
  

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

  const updatedKeyringOptions = keyringOptions.map((keyringOption) => {
    const matchingColdkey = ss58_coldkeys_processed.find((coldkey) => coldkey.value === keyringOption.value);
    if (matchingColdkey) {
      return { ...keyringOption, text: matchingColdkey.text };
    } else {
      return keyringOption;
    }
  });

  const completeColdkeyOptions = [
    ...updatedKeyringOptions,
    ...ss58_coldkeys_processed.filter((item) => !keyringOptions.some((other) => other.key === item.key)),
  ]
  if (completeColdkeyOptions.length !== 0) {
    completeColdkeyOptions.push({
      key: 'All Accounts',
      value: 'All Accounts',
      text: 'All Accounts',
      coldkey_array: completeColdkeyOptions.map(obj => obj.value),
      icon: 'user',
      source: 'account',
    })
  }


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
      <Stack padding={1} spacing={2} alignItems="center" direction="column" justifyContent="center">
          {/* <AccountIdenticon account={currentAccount}/> */}
          {(completeColdkeyOptions.length > 0 && currentAccount) ?
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
            <div className='justify-center items-center flex flex-row overflow-x-hidden overflow-hidden'>
              <h1 className="dark:text-slate-800">No Accounts Detected</h1>
              <h1 className="dark:text-slate-800">Connect a Polkadot Wallet or</h1>
              {session? <h1>add Coldkeys to your account</h1> : <h1 className="dark:text-slate-800">Log in to your Account</h1>}
            </div>
          }
          {newSS58keys ? <Button onClick={() => updateProfile({ ss58_coldkeys })}>Save Coldkeys to Account</Button> : null}

        </Stack>
  )
}


export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
