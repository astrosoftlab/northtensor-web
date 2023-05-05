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


function Main(props) {

  // Get the list of accounts we possess the private key for
 
  return (
    <div className="bg-white shadow sm:rounded-md w-90 flex flex-wrap dark:text-slate-600">
      <div className="w-full">
        <div className="flex flex-row justify-between">
          {/* <AccountBasicInfo /> */}
          <AccountSelector />
        </div>
      </div>
    </div>



  )
}


export default function WalletHeader(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
