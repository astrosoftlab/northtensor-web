import React, { useState } from 'react'
import { Form, Input, Grid, Label, Icon} from 'semantic-ui-react'

import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import styles from '@/styles/Home.module.css'
import CopyToClipboardButton from './CopyButton'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ amount: 0 })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { amount } = formState
  const { keyring, storedMNRVColdkey } = useSubstrateState()
  const MNRVTipWallet = storedMNRVColdkey
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
      <h1 className="lg:px-12 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Tip North Tensor</h1>
      <br />
      <Form>
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
            label="Tip"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [MNRVTipWallet, amount * 10**9],
              paramFields: [true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <br />
      <Form className="lg:px-24  px-3 py-1 text-sm font-mono text-gray-900 dark:text-gray-200">
        <CopyToClipboardButton copyText={`btcli transfer --dest ${MNRVTipWallet} --amount ${amount}`} />

      </Form>
    </Grid.Column>
  )
}
