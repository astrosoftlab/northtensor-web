import React, { useState, useEffect } from 'react'
import { Form, Input, Grid,  Label, Icon } from 'semantic-ui-react'
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  
  const { api, keyring, currentAccount, storedMNRVHotkey } = useSubstrateState()
  const MNRVHotkey = storedMNRVHotkey
  const accounts = keyring.getPairs()
  const [accountBalance, setAccountBalance] = useState(0)

  const acctAddr = acct => (acct ? acct.address : '')
  // const [ActiveAccountAvailableBalance, setActiveAccountBalance] = useState(0.0)
  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api.query.system
        .account(acctAddr(currentAccount), balance =>
          setAccountBalance(balance.data.free.toHuman())
        )
        .then(unsub => (unsubscribe = unsub))
        .catch(console.error)

    return () => unsubscribe && unsubscribe()
  }, [api, currentAccount])

  //Convert AccountBalance to Tao
  // const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9
  const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000
  // const fullStakeAmountTao = fullStakeAmount / 10**9
  const [stakeAmount, setStakeAmount] = useState(0)
  const [stakeType, setStakeType] = useState('addStake')


  const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)
  const amountCurrentlyStakedTao = amountCurrentlyStaked / 10**9
  async function getStake() {
    const res = await api.query.subtensorModule.stake(MNRVHotkey, acctAddr(currentAccount));
    setAmountCurrentlyStaked(parseFloat(res.toString()))
  }
  
  getStake();

  const btcliStakeAmount = " --amount " + stakeAmount



  const availableAccounts = []


  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })



  const onStakeTypeChange = (ev, data) => {
    setStakeType(data.value)

    }
    
  const onStakeAmountChange = (ev, data) => {
    setStakeAmount(data.value)

    }
    


  // const delegateStakeCLI = "btcli delegate --delegate_ss58key "
  return (
    <Grid.Column width={8}>
      <Grid.Row>
        
        <h1>Delegated Staking</h1>
      <Label basic color="green" position="right" style={{ marginLeft: 0, marginBottom: '.5em' }}>
          <Icon name="money" />Balance Staked: {amountCurrentlyStakedTao} Tao&nbsp;
        </Label></Grid.Row>
      
      
      <Form>
      
      <Form.Group style={{ overflowX: 'auto' }} inline>
          <Form.Radio
            label="Stake"
            name="stakeType"
            value='addStake'
            checked={stakeType === 'addStake'}
            onChange={onStakeTypeChange}
          />
          <Form.Radio
            label="Un-Stake"
            name="stakeType"
            value='removeStake'
            checked={stakeType === 'removeStake'}
            onChange={onStakeTypeChange}
          />
        </Form.Group>
        <Label basic color="teal" style={{ marginLeft: 0, marginBottom: '.5em' }}>
          <Icon name="info" />Wallets Must Retain 0.000,001 Tao To Remain Active (Existential Amount)&nbsp;
        </Label>
        <Form.Field>
          <Input
            defaultValue={0}
            label="Amount"
            type="number"
            state="stakeAmount"
            onChange={onStakeAmountChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            label= {stakeType === 'addStake' ? 'Stake' : 'Un-Stake'}
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: stakeType,
              inputParams: [MNRVHotkey, stakeAmount * 10**9],
              paramFields: [true, true],
            }}
          /> 
          {stakeType === "addStake" ? <TxButton
            label="Stake All"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: stakeType,
              inputParams: [MNRVHotkey, fullStakeAmount],
              paramFields: [true, true],
            }}
          /> : <TxButton
          label="Un-Stake All"
          type="SIGNED-TX"
          setStatus={setStatus}
          attrs={{
            palletRpc: 'subtensorModule',
            callable: stakeType,
            inputParams: [MNRVHotkey, amountCurrentlyStaked],
            paramFields: [true, true],
          }}
        />}
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <Form>
        btcli {stakeType === 'addStake' ? "delegate" : "undelegate"} --delegate_ss58key {MNRVHotkey} {parseFloat(stakeAmount) === 0 ? "--all" : btcliStakeAmount}
      </Form>
    </Grid.Column>
  )
}

