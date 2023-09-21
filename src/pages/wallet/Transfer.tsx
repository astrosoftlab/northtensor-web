import React, { useState } from 'react'

import classNames from 'classnames'

// import { Form, Input, Grid, Label, Icon, Dropdown } from 'semantic-ui-react'
import Stack from '@mui/material/Stack'

import CopyToClipboardButton from '@components/ui/CopyButton'
import { useSubstrateState } from '@lib/substrate-lib'
import { TxButton } from '@lib/substrate-lib/components'

export default function Main() {
  const [status, setStatus] = useState(null)
  const [sendToAccount, setSendToAccount] = useState('')
  const [sendToAddress, setSendToAddress] = useState('')
  const [sendAmount, setSendAmount] = useState(0)

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendToAddress(e.target.value)
  }

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendAmount(Number(e.target.value))
  }

  const onDestinationAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSendToAccount(e.target.value)
    setSendToAddress(e.target.value)
  }

  // const { addressTo, amount } = formState

  const { keyring, currentAccount } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts: any[] = []
  accounts.map((account: any) => {
    if (account.meta.name != currentAccount.meta.name) {
      return availableAccounts.push({
        key: account.meta.name,
        text: account.meta.name,
        value: account.address
      })
    }
  })
  console.log('Send to account', sendToAccount)
  console.log('Available accounts', availableAccounts)

  return (
    <>
      {/* <Grid.Column width={8}> */}
      <h1 className="text-3xl font-thin text-slate-800 sm:text-3xl">Transfer</h1>
      <br />
      <form className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="send-to-account" className="block text-slate-700 ">
            Destination Account Selection
          </label>
          <select
            id="send-to-account"
            name="send-to-account"
            defaultValue="Custom"
            onChange={onDestinationAccountChange}
            value={sendToAccount}
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border rounded appearance-none border-slate-300 focus:outline-none focus:bg-white focus:border-slate-500"
          >
            {availableAccounts.map((option) => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
            <option key={'Custom'} value={''}>
              {'Custom'}
            </option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="destination-wallet-address" className="block text-slate-700 ">
            Destination Wallet Address
          </label>
          <input
            id="destination-wallet-address"
            type="text"
            value={sendToAddress}
            onChange={onAddressChange}
            className={classNames(
              'block',
              'w-full',
              'px-4',
              'py-2',
              'leading-tight',
              'bg-white',
              'border',
              'border-slate-300',
              'rounded',
              'focus:outline-none',
              'focus:bg-white',
              'focus:border-slate-500',
              sendToAccount !== '' && 'bg-slate-200 cursor-not-allowed'
            )}
            readOnly={sendToAccount !== ''}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="standard-number" className="block text-slate-700 ">
            Amount of Tao to send
          </label>
          <input
            id="standard-number"
            type="number"
            value={sendAmount}
            onChange={onAmountChange}
            className="block w-full px-4 py-2 leading-tight bg-white border rounded appearance-none border-slate-300 focus:outline-none focus:bg-white focus:border-slate-500"
          />
        </div>
      </form>
      <Stack sx={{ m: 2 }} spacing={2} direction="column">
        <TxButton
          label="Transfer"
          type="SIGNED-TX"
          setStatus={setStatus}
          attrs={{
            palletRpc: 'balances',
            callable: 'transfer',
            inputParams: [sendToAddress, sendAmount * 10 ** 9],
            paramFields: [true, true]
          }}
        />

        <CopyToClipboardButton
          copyText={`btcli transfer --dest ${
            sendToAddress === '' ? 'DESTINATION_WALLET_KEY' : sendToAddress
          } --amount ${sendAmount}`}
        />
      </Stack>
    </>
  )
}
