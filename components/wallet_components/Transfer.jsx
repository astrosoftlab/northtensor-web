import React, { useState } from 'react'
import { Form, Input, Grid, Label, Icon, Dropdown } from 'semantic-ui-react'

import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import styles from '@/styles/Home.module.css'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ addressTo: '', amount: 0 })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { addressTo, amount } = formState

  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  return (
    <Grid.Column width={8}>
      <h1 className="lg:px-12 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Transfer</h1>
      <br />
      <Form>

        <Form.Field className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">
          <Dropdown
            placeholder="Select from available addresses"
            fluid
            selection
            search
            options={availableAccounts}
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>

        <Form.Field className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">
          <Input
            fluid
            label="To"
            type="text"
            placeholder="address"
            value={addressTo}
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">
          <Input
            fluid
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">
          <TxButton
            label="Transfer"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [addressTo, parseFloat(amount)*10**9],
              paramFields: [true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <br />
      <Form className="lg:px-24  px-3 py-1 text-sm font-mono text-gray-900 dark:text-gray-200">
        btcli transfer --dest {addressTo === '' ? "DESTINATION_WALLET_KEY" : addressTo} --amount {amount}
      </Form>
    </Grid.Column>
  )
}
