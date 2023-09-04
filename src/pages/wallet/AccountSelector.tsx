import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { Select } from '@components/ui/Select'
import { useSubstrate, useSubstrateState } from '@lib/substrate-lib'

type Account = {
  address: string
  coldkey_array: string[]
  icon: string
  key: string
  source: string
  text: string
  value: string
  meta: {
    genesisHash?: string
    isInjected: boolean
    name?: string
    source?: string
  }
  watched: boolean
}

type SS58ColdKey = {
  coldkey: string
  name1: string
  validated: boolean
  watched: boolean
}

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
const FIREFOX_ADDON_URL = 'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'

function Main() {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()
  const [nodeInfo, setNodeInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account: Account) => ({
    key: account.address,
    value: account.address,
    address: account.address,
    meta: account.meta,
    text: account.meta.name?.toUpperCase() || '',
    coldkey_array: [account.address],
    icon: 'user',
    source: 'polkadot',
  }))

  const session = useSession()

  const [ss58_coldkeys, setSS58Coldkeys] = useState<SS58ColdKey[]>([])
  const [accountColdkeyRetrieved, setAccountColdkeyRetrieved] = useState(false)
  const [ss58_coldkeys_processed, setSS58ColdkeysProcessed] = useState<Account[]>([])
  const [newSS58keys, setNewSS58Keys] = useState(false)
  const [accountColdkeysUpdateMessage, setAccountColdkeysUpdateMessage] = useState('')
  const user = useUser()

  useEffect(() => {
    if (session) {
      getProfile()
    }
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase.from('profiles').select(`ss58_coldkeys`).eq('id', user.id).single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        // console.log(data)
        setSS58Coldkeys(data.ss58_coldkeys)
        setAccountColdkeyRetrieved(true)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(ss58_coldkeys: SS58ColdKey[]) {
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
    if (accountColdkeyRetrieved && keyringOptions.length > 0 && session) {
      // <-- added check for setSS58Coldkeys
      let new_coldkeys = []
      for (const keyringOption of keyringOptions) {
        //Check if the keyringOption is not in the ss58_coldkeys array
        if (ss58_coldkeys && !ss58_coldkeys.some((item) => item.coldkey === keyringOption.value)) {
          // create a new coldkey object
          const newColdkey = {
            name1: keyringOption.text,
            coldkey: keyringOption.value,
            validated: false,
            watched: false,
          }
          // Call setSS58Coldkeys to update ss58_coldkeys
          new_coldkeys.push(newColdkey)
          // setSS58Coldkeys((prevState) => [...prevState, newColdkey]);
        }
      }
      // Send the updated ss58_coldkeys to the database
      let temp_ss58coldkeys = [...ss58_coldkeys, ...new_coldkeys]
      if (temp_ss58coldkeys.length > ss58_coldkeys.length) {
        // console.log('sending', temp_ss58coldkeys );
        setSS58Coldkeys(temp_ss58coldkeys)
        setNewSS58Keys(true)
        const newColdkeyNames = new_coldkeys.map((coldkey) => coldkey.name1)
        // console.log('newColdkeyNames', newColdkeyNames)
        setAccountColdkeysUpdateMessage(`Added the following coldkeys to your account: ${newColdkeyNames.join(', ')}`)
      }
    }
  }, [keyringOptions, session]) // <-- added setSS58Coldkeys to the dependency array

  useEffect(() => {
    if (ss58_coldkeys) {
      const processed: Account[] = ss58_coldkeys.map((coldkey) => ({
        key: coldkey.coldkey,
        value: coldkey.coldkey,
        text: coldkey.name1,
        address: coldkey.coldkey,
        meta: { source: 'account', isInjected: false },
        coldkey_array: [coldkey.coldkey],
        icon: 'user',
        source: 'account',
        watched: coldkey.watched,
      }))

      setSS58ColdkeysProcessed(processed)
    }
  }, [ss58_coldkeys])

  // console.log("ss58_coldkeys", ss58_coldkeys)
  // console.log("keyringOptions", keyringOptions)

  const updatedKeyringOptions = keyringOptions.map((keyringOption: Account) => {
    const matchingColdkey = ss58_coldkeys_processed.find((coldkey) => coldkey.value === keyringOption.value)
    if (matchingColdkey) {
      return {
        ...keyringOption,
        text: matchingColdkey.text,
        watched: matchingColdkey.watched,
      }
    } else {
      return { ...keyringOption, watched: false }
    }
  })

  const completeColdkeyOptions = [
    ...updatedKeyringOptions,
    ...ss58_coldkeys_processed.filter((item) => !keyringOptions.some((other: Account) => other.key === item.key)),
  ]
  if (completeColdkeyOptions.length > 1) {
    const watchedColdkeys = completeColdkeyOptions.filter((obj) => obj.watched)
    const allAccountsBeforeWatched = completeColdkeyOptions.map((obj) => obj.value)
    if (watchedColdkeys.length > 0) {
      completeColdkeyOptions.unshift({
        key: 'Watched Accounts',
        value: 'Watched Accounts',
        text: 'Watched Accounts',
        address: 'Watched Accounts',
        meta: { source: 'group', isInjected: false },
        coldkey_array: watchedColdkeys.map((obj) => obj.value),
        icon: 'user',
        source: 'group',
      })
    }
    completeColdkeyOptions.unshift({
      key: 'All Accounts',
      value: 'All Accounts',
      text: 'All Accounts',
      address: 'All Accounts',
      meta: { source: 'group', isInjected: false },
      coldkey_array: allAccountsBeforeWatched,
      icon: 'user',
      source: 'group',
    })
  }

  const initialAddress = completeColdkeyOptions.length > 0 ? completeColdkeyOptions[0].value : ''

  // Set the initial address
  useEffect(() => {
    if (!currentAccount && initialAddress.length > 0) {
      let acc_match = completeColdkeyOptions.find((obj) => obj.key === initialAddress)
      setCurrentAccount(acc_match)
    }
  }, [initialAddress, completeColdkeyOptions, currentAccount, setCurrentAccount])

  const onChange = (newValue: any) => {
    if (newValue.value === 'Coldkey') {
      console.log('Coldkey')
    } else {
      setCurrentAccount(completeColdkeyOptions.find((obj) => obj.key === newValue.value))
    }
  }

  return (
    <div className="p-6 card">
      {completeColdkeyOptions.length > 0 && currentAccount ? (
        <Select
          onChange={onChange}
          value={{ label: currentAccount.text, value: currentAccount.key }}
          options={completeColdkeyOptions.map((tempAccount) => ({ label: tempAccount.text, value: tempAccount.key }))}
        />
      ) : (
        <div className="text-center">
          <h1 className="mb-2 text-xl font-bold ">No Accounts Detected</h1>
          <h2 className="text-l ">Connect a Talisman Wallet </h2>
          <p className="mb-2 text-ml ">or</p>
          <h2 className="text-l ">
            {session ? (
              'add Coldkeys to your account'
            ) : (
              <Link
                href="profile"
                className="px-3 py-2 ml-2 text-sm font-semibold text-white rounded-md shadow-sm bg-slate-600 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 hover:text-white"
              >
                Log in to your Account
              </Link>
            )}
          </h2>
        </div>
      )}
      {newSS58keys ? (
        <button
          className="px-3 py-2 mt-2 ml-2 text-sm font-semibold text-white rounded-md shadow-sm bg-slate-600 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          onClick={() => updateProfile(ss58_coldkeys)}
        >
          Save Coldkeys to Account
        </button>
      ) : null}
    </div>
  )
}

export default function AccountSelector() {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main /> : null
}
