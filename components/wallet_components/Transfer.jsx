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
import classNames from "classnames";
import Stack from '@mui/material/Stack';


import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import styles from '@/styles/Home.module.css'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [sendToAccount, setSendToAccount] = useState('')
  const [sendToAddress, setSendToAddress] = useState('')
  const [sendAmount, setSendAmount] = useState(0)

  const onAddressChange = (event) => {
    setSendToAddress(event.target.value)
  }

  const onAmountChange = (event) => {
    setSendAmount(event.target.value)
  }

  const onDestinationAccountChange = (event) => {
    setSendToAccount(event.target.value)   
    setSendToAddress(event.target.value) 
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
  console.log("Send to account", sendToAccount)
  console.log("Available accounts", availableAccounts)

  return (
    <>
 {/* <Grid.Column width={8}> */}
      <h1 className="dark:text-slate-200 text-slate-800 text-3xl sm:text-3xl font-thin">Transfer</h1>
      <br />
      <form className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="send-to-account" className="block text-slate-700 dark:text-slate-200">
            Destination Account Selection
          </label>
          <select
            id="send-to-account"
            name="send-to-account"
            defaultValue="Custom"
            onChange={onDestinationAccountChange}
            value={sendToAccount}
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-slate-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-slate-500"
          >
            {availableAccounts.map((option) => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
            <option key={"Custom"} text={"Custom"} value={""}>
              {"Custom"}
            </option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="destination-wallet-address" className="block text-slate-700 dark:text-slate-200">
            Destination Wallet Address
          </label>
          <input
            id="destination-wallet-address"
            type="text"
            value={sendToAddress}
            onChange={onAddressChange}
            className={classNames(
              "block",
              "w-full",
              "px-4",
              "py-2",
              "leading-tight",
              "bg-white",
              "border",
              "border-slate-300",
              "rounded",
              "focus:outline-none",
              "focus:bg-white",
              "focus:border-slate-500",
              sendToAccount !== "" && "bg-slate-200 cursor-not-allowed"
            )}
            readOnly={sendToAccount !== ""}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="standard-number" className="block text-slate-700 dark:text-slate-200">
            Amount of Tao to send
          </label>
          <input
            id="standard-number"
            type="number"
            value={sendAmount}
            onChange={onAmountChange}
            className="block w-full px-4 py-2 leading-tight bg-white border border-slate-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-slate-500"
          />
        </div>
      </form>
      <Stack sx={{m: 2}} spacing={2} direction="column">
      <TxButton
            label="Transfer"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [sendToAddress, sendAmount * 10**9],
              paramFields: [true, true],
            }}
          />

  <CopyToClipboardButton copyText={`btcli transfer --dest ${sendToAddress === '' ? "DESTINATION_WALLET_KEY" : sendToAddress} --amount ${sendAmount}`} />
  </Stack>
  </>)
  
}
