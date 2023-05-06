import React, { useState, useEffect } from 'react'
import { Form, Input, Grid,  Label, Icon } from 'semantic-ui-react'
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
import CopyToClipboardButton from './CopyButton'
import Stack from '@mui/material/Stack';

export default function Main(props) {
  const [status, setStatus] = useState(null)
  
  const { api, keyring, currentAccount, storedMNRVHotkey, balanceSigFigures } = useSubstrateState()
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
  const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000

  const [stakeType, setStakeType] = useState('addStake')
  const [sendAmount, setSendAmount] = useState(0)


  const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)
  const amountCurrentlyStakedTao = amountCurrentlyStaked / 10**9
  const roundedCurrentlyStakedTao = parseFloat(amountCurrentlyStakedTao.toFixed(balanceSigFigures))
  async function getStake() {
    const res = await api.query.subtensorModule.stake(MNRVHotkey, acctAddr(currentAccount));
    setAmountCurrentlyStaked(parseFloat(res.toString()))
  }
  
  getStake();

  const btcliStakeAmount = " --amount " + sendAmount



  const availableAccounts = []


  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })


  const onAmountChange = (event) => {
    setSendAmount(event.target.value)
  }
    


  // const delegateStakeCLI = "btcli delegate --delegate_ss58key "
  return (
    <>
    {/* Page Title */}
    <h1 className="dark:text-slate-200 text-slate-800 text-3xl sm:text-3xl font-thin">
      Delegated Staking
    </h1>
    <br />
    {/* Staked Balance Notice */}
    <form className="space-y-4">
      <h1 className="dark:text-slate-200 text-slate-800 text-3xl sm:text-2xl font-semibold">
        Balance Staked: {amountCurrentlyStakedTao} Tao&nbsp;
      </h1>
      {/* Radio Buttons with the blue thing, but the styling is all messed up */}
      {/* <Stack direction="row" spacing={2} className="flex items-center justify-center dark:text-slate-200 text-slate-800 text-3xl sm:text-2xl font-thin lg:px-24 rounded-lg space-x-4">
        <div class="flex items-center pl-4 border border-slate-200 rounded dark:border-slate-700">
            <input 
              checked={stakeType === 'addStake'} 
              id="stake-type-radio-staking" 
              type="radio" 
              value="addStake"
              name="bordered-radio" 
              class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              onChange={() => {setStakeType('addStake')}}
            />

            <label for="stake-type-radio-staking"  class="w-full py-4 ml-2 text-sm font-medium text-slate-900 dark:text-slate-300">
              Staking
            </label>
        </div>
        <div class="flex items-center pl-4 border border-slate-200 rounded dark:border-slate-700">
            <input 
              checked={stakeType === 'removeStake'} 
              id="stake-type-radio-staking-unstaking" 
              type="radio" 
              value="removeStake" 
              name="bordered-radio" 
              // class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              onChange={() => {setStakeType('removeStake')}}
            />

            <label for="stake-type-radio-staking-unstaking"  className={`bg-slate-200 dark:bg-slate-300 dark:text-slate-800 hover:bg-slate-400 dark:hover:bg-slate-400 px-4 py-2 rounded-lg ${stakeType != 'addStake' ? 'bg-slate-300 dark:bg-slate-500' : ''}`}>
              Un-Staking
            </label>
        </div>
      </Stack> */}
      {/* Staking - Unstaking Radio Buttons */}
      <div className="flex items-center justify-center dark:text-slate-200 text-slate-800 text-3xl sm:text-2xl font-thin lg:px-24 rounded-lg space-x-4">
        {/* Staking Button */}
        <label className={`bg-slate-200 dark:bg-slate-300 dark:text-slate-800 hover:bg-slate-400 dark:hover:bg-slate-400 px-4 py-2 lg:px-12 rounded-lg ${stakeType === 'addStake' ? 'bg-slate-300 dark:bg-slate-500' : ''}`}>
          <input 
            type="radio" 
            className="sr-only" 
            name="stakeType" 
            value="addStake" 
            checked={stakeType === 'addStake'} 
            onChange={() => {setStakeType('addStake')}}
          />
          <span className="font-semibold">{`Staking`}</span>
        </label>
        {/* Unstaking Button */}
        <label className={`bg-slate-200 dark:bg-slate-300 dark:text-slate-800 hover:bg-slate-400 dark:hover:bg-slate-400 px-4 py-2 rounded-lg ${stakeType != 'addStake' ? 'bg-slate-300 dark:bg-slate-500' : ''}`}>
          <input 
            type="radio" 
            className="sr-only" 
            name="stakeType" 
            value="removeStake" 
            checked={stakeType != 'addStake'} 
            onChange={() => {setStakeType('removeStake')}}
          />
          <span className="font-semibold">{`Un-Staking`}</span>
        </label>
      </div>
      {/* Staking Amount Input*/}
      <div className="space-y-1">
        {/* Staking Amount Input - Title*/}
        <label htmlFor="standard-number" className="block text-slate-700 dark:text-slate-200">
          Amount of Tao to {stakeType === 'addStake' ? 'Stake' : 'Un-Stake'}
        </label>
        {/* Staking Amount Input - Field*/}
        <input
          id="standard-number"
          type="number"
          value={sendAmount}
          onChange={onAmountChange}
          className="block w-full px-4 py-2 leading-tight bg-white border border-slate-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-slate-500"
        />
      </div>
      {/* Minimum Balance Notice */}
      <label htmlFor="send-to-account" className="block text-slate-700 dark:text-slate-200">
        Note: You must retain 0.000001 Tao in your wallet while staking
      </label>

    </form>
    {/* Transaction Buttons and BTCLI Command*/}
    <Stack sx={{m: 2}} spacing={2} direction="column">
      {/* Transaction Send Buttons */}
      <Stack sx={{m: 2}} spacing={2} direction="row">
        {/* Main Transaction Button */}
        {/* If there isn't enough Tao, notify the user to avoid confusion and remove buttons otherwise show the button*/}
        {
          (fullStakeAmount < 1) && (stakeType === 'addStake') ? 
            <label htmlFor="send-to-account" className=" lg:px-12 block text-slate-700 dark:text-slate-200">
              No Available Tao to Stake
            </label>
            : 
            <TxButton
              label={stakeType === 'addStake' ? 'Stake' : 'Un-Stake'}
              type="SIGNED-TX"
              setStatus={setStatus}
              attrs={{
                palletRpc: 'subtensorModule',
                callable: stakeType,
                inputParams: [MNRVHotkey, sendAmount * 10 ** 9],
                paramFields: [true, true],
              }} 
            />
        }
        {/* Same thing again but for "all" version*/}
        {
          stakeType === "addStake" ? 
            (fullStakeAmount > 0) ? 
              <TxButton
                label="Stake All"
                type="SIGNED-TX"
                setStatus={setStatus}
                attrs={{
                  palletRpc: 'subtensorModule',
                  callable: stakeType,
                  inputParams: [MNRVHotkey, fullStakeAmount],
                  paramFields: [true, true],
                }} 
              /> 
              : 
              null 
            : 
              <TxButton
                label="Un-Stake All"
                type="SIGNED-TX"
                setStatus={setStatus}
                attrs={{
                  palletRpc: 'subtensorModule',
                  callable: stakeType,
                  inputParams: [MNRVHotkey, amountCurrentlyStaked],
                  paramFields: [true, true],
                }} 
              />
          }
      </Stack>
      {/* BTCLI Command */}
      <CopyToClipboardButton copyText={`btcli ${stakeType === 'addStake' ? 'delegate' : 'undelegate'} --delegate_ss58key ${MNRVHotkey} ${parseFloat(sendAmount) === 0 ? '--all' : sendAmount}`} />
    </Stack>
    
    
    </>
  )
}

