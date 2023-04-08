import React, { useState } from 'react'
// import { Form, Input, Grid, Label, Icon, Dropdown } from 'semantic-ui-react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CopyToClipboardButton from './CopyButton'


import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import styles from '@/styles/Home.module.css'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [sendToAddress, setSendToAddress] = useState('')
  const [sendAmount, setSendAmount] = useState(0)

  const onAddressChange = (event) => {
    setSendToAddress(event.target.value)
  }

  const onAmountChange = (event) => {
    setSendAmount(event.target.value)
  }

  const onKnownAddressChange = (event) => {
    if (event.target.value != "Custom") {
      setSendToAddress(event.target.value)
    }
    
  }
  

  // const { addressTo, amount } = formState

  const { keyring, currentAccount } = useSubstrateState()
  const accounts = keyring.getPairs()
  console.log(accounts)

  const availableAccounts = []
  accounts.map(account => {
    if (account.meta.name != currentAccount.meta.name) {
      return availableAccounts.push({
        key: account.meta.name,
        text: account.meta.name,
        value: account.address,
      })
    }
  })
  console.log("Available accounts", availableAccounts)

  return (
    <>
 {/* <Grid.Column width={8}> */}
      <h1 className="dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Transfer</h1>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="send-to-account"
          select
          label="Connected Accounts"
          defaultValue="Custom"
          onChange={onKnownAddressChange}
          value={sendToAddress}
        >
          {availableAccounts.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
          <MenuItem key={"Custom"} value={"Custom"}> {"Custom"}</MenuItem>
        </TextField>
        <FormControl variant="standard">
        <InputLabel htmlFor="destination-wallet-address">
          Destination Wallet Address
        </InputLabel>
        <Input fullWidth 
          id="destination-wallet-address"
          value={sendToAddress}
          onChange={onAddressChange}
          // startAdornment={
          //   <InputAdornment position="start">
          //     {/* <AccountCircle /> */}
          //     {"ICON"}
          //   </InputAdornment>
          // }
        />
      </FormControl>
      </div>
      <div>
      <TextField
          id="standard-number"
          label="Amount of Tao to send"
          type="number"
          value={sendAmount}
          onChange={onAmountChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </div>
    </Box>
      
  <CopyToClipboardButton copyText={`btcli transfer --dest ${sendToAddress === '' ? "DESTINATION_WALLET_KEY" : sendToAddress} --amount ${sendAmount}`} />

  </>)
  
}