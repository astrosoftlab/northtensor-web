import React, { useState, useEffect } from 'react'
import { Form, Input, Grid,  Label, Icon } from 'semantic-ui-react'
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import CopyToClipboardButton from './CopyButton'


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
  // console.log("Full Stake", fullStakeAmount)
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
        
      <h1 className="lg:px-12 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Delegated Staking</h1><br />
      <h3 className="lg:px-12 dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Note: You must retain 0.000001 Tao in your wallet while staking</h3><br />
      <Label className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-2xl font-semibold">
          <Icon name="money" />Balance Staked: {amountCurrentlyStakedTao} Tao&nbsp;
        </Label></Grid.Row>
      
      
      <Form>
      
        <Form.Group inline className="flex dark:text-gray-200 text-gray-800 text-3xl sm:text-2xl font-thin lg:px-24 rounded-lg">
          <Form.Radio className={`"bg-gray-200 dark:text-gray-200 hover:bg-gray-400 dark:hover-bg-gray-400 text-gray-800 font-semibold py-2 px-4 lg:px-12 rounded-lg " ${
            stakeType === 'addStake' ? 'bg-gray-200' : ''
          }`} 
            label ="Stake"
            name="stakeType"
            value='addStake'
            checked={stakeType === 'addStake'}
            onChange={onStakeTypeChange}
          />
          <Form.Radio className={`"bg-gray-200 hover:bg-gray-400 dark:hover-bg-gray-400 dark:text-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg " ${
            stakeType === 'addStake' ? 'bg-gray-200' : ''
          }`} 
            label="Un-Stake"
            name="stakeType"
            value='removeStake'
            checked={stakeType === 'removeStake'}
            onChange={onStakeTypeChange}
          />
        </Form.Group>
        <Form.Field className="lg:px-24 dark:text-gray-200 text-gray-800 text-3xl sm:text-2xl font-thin" >
          <Input
            defaultValue={0}
            label="Amount"
            type="number"
            state="stakeAmount"
            onChange={onStakeAmountChange}
          />
        </Form.Field>
        <Form.Field className="lg:px-24 flex gap-5 dark:text-gray-200 text-gray-800 text-3xl sm:text-2xl font-thin">
          {(fullStakeAmount < 1) && (stakeType === 'addStake') ? null : <TxButton
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
}
          {stakeType === "addStake" ? (fullStakeAmount > 0) ? <TxButton
            label="Stake All"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: stakeType,
              inputParams: [MNRVHotkey, fullStakeAmount],
              paramFields: [true, true],
            }} 
          /> : null : <TxButton
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
        <div className="dark:text-gray-200 text-gray-800" style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      <Form className="lg:px-24  px-3 py-1 text-sm font-mono text-gray-900 dark:text-gray-200">
        <CopyToClipboardButton copyText={`btcli ${stakeType === 'addStake' ? 'delegate' : 'undelegate'} --delegate_ss58key ${MNRVHotkey} ${parseFloat(stakeAmount) === 0 ? '--all' : btcliStakeAmount}`} />
      </Form>
    </Grid.Column>
  )
}

