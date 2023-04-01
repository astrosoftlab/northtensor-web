import React, { useState } from 'react'
import { Form, Input, Grid, Label, Icon} from 'semantic-ui-react'
<<<<<<< HEAD:components/wallet_components/MNRVTip.js
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
=======
import { TxButton } from '../lib/substrate-lib/components'
import { useSubstrateState } from '../lib/substrate-lib'
import styles from '@/styles/Home.module.css'
>>>>>>> main:components/MNRVTip.js

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
      <h1 className={styles.center_text}>Tip MNRV</h1>
      <Form>
        <Form.Field>
          <Label basic color="teal">
            <Icon name="info" />Wallets Must Retain 0.000,001 Tao To Remain Active (Existential Amount)&nbsp;;
          </Label>
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
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
      <Form className={styles.code}>
        btcli transfer --dest {MNRVTipWallet} --amount {amount}
      </Form>
    </Grid.Column>
  )
}
