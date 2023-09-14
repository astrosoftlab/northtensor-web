import { useEffect, useState } from 'react'

import CopyToClipboardButton from '@components/ui/CopyButton'
import { useSubstrateState } from '@lib/substrate-lib'
import { TxButton } from '@lib/substrate-lib/components'

import axios from 'axios'

function Main() {
  const [status, setStatus] = useState(null)

  const { api, keyring, currentAccount, storedMNRVHotkey, balanceSigFigures } = useSubstrateState()

  // Account Balance
  const [accountBalance, setAccountBalance] = useState(0)
  // Account Staked
  const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)

  // TAO Conversion Rate
  const [taoConversionRate, setTaoConversionRate] = useState(0)
  const [taoConversionRateUpdated, setTaoConversionRateUpdated] = useState(false)

  const [unstakeAmount, setUnstakeAmount] = useState(0.0)
  const [stakeAmount, setStakeAmount] = useState(0.0)

  const MNRVHotkey = storedMNRVHotkey

  useEffect(() => {
    if (!currentAccount) {
      return () => {}
    }
    let unsubscribe: any

    async function getStake(specificColdkey: string) {
      const res = await api.query.subtensorModule.stake(MNRVHotkey, specificColdkey)
      return parseFloat(res.toString())
    }

    async function loopAccounts() {
      let tempAccountBalance = 0
      let tempAmountCurrentlyStaked = 0

      for (const coldkey of currentAccount.coldkey_array) {
        const balance = await api.query.system.account(coldkey)
        const specificBalance = balance.data.free.toNumber()
        tempAccountBalance += specificBalance
        tempAmountCurrentlyStaked += await getStake(coldkey)
      }

      setAccountBalance(tempAccountBalance)
      setAmountCurrentlyStaked(tempAmountCurrentlyStaked)
    }

    // Call once immediately
    loopAccounts()

    // Then set interval to call it every 10 seconds
    const intervalId = setInterval(loopAccounts, 10000)

    // Make sure to clear interval when the component is unmounted
    return () => {
      unsubscribe && unsubscribe()
      clearInterval(intervalId)
    }
  }, [api, currentAccount])

  const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10 ** 9
  const roundedAccountBalanceTao = parseFloat(accountBalanceTao.toFixed(balanceSigFigures))
  const accountBalanceUSD = (accountBalanceTao * taoConversionRate).toFixed(2)

  const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000

  const amountCurrentlyStakedTao = amountCurrentlyStaked / 10 ** 9
  const roundedCurrentlyStakedTao = parseFloat(amountCurrentlyStakedTao.toFixed(balanceSigFigures))

  const amountCurrentlyStakedUSD = (amountCurrentlyStakedTao * taoConversionRate).toFixed(2)

  const totalWalletBalance = accountBalanceTao + amountCurrentlyStakedTao
  const roundedTotalWalletBalance = parseFloat(totalWalletBalance.toFixed(balanceSigFigures))
  const totalWalletBalanceUSD = (totalWalletBalance * taoConversionRate).toFixed(2)

  function isValidFloat(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }

  // replace "your_token_id" with the ID of the token you want to get the value for
  const token_id = 'bittensor'

  if (!taoConversionRateUpdated) {
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${token_id}&vs_currencies=usd`)
      .then((response) => {
        const price = response.data[token_id].usd
        setTaoConversionRate(price)
        setTaoConversionRateUpdated(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   if (currentAccount == null || currentAccount.source != 'polkadot') {
  //     setIsUnstakeModalOpen(false);
  //   }
  // }, [currentAccount])
  return (
    <>
      <div className="relative" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {currentAccount != null && currentAccount.source != 'group' ? (
          <CopyToClipboardButton
            copyText={currentAccount.address}
            displayText={
              currentAccount.address.length > 10
                ? `${currentAccount.address.substring(0, 5)}...${currentAccount.address.substring(
                    currentAccount.address.length - 5
                  )}`
                : currentAccount.address
            }
          />
        ) : null}
      </div>

      <div style={{ height: '10px' }}></div>

      <div className="flex items-center justify-center flex-grow">
        <div className="card lg:w-96 sm:w-full">
          <ul role="list" className="divide-y divide-blur-light">
            <li key={'balance1'} className="p-2 sm:p-3">
              <div className="flex items-center justify-between w-full px-4 py-2 rounded-md">
                <div className="flex items-center w-1/2">
                  <h6 className="mr-2 ">Total</h6>
                </div>
                <div className="flex items-center justify-end w-1/2">
                  <div className="flex flex-col items-end">
                    <h6 className="">{roundedTotalWalletBalance} Tao</h6>
                    <p className="text-xs text-slate-400 ">${totalWalletBalanceUSD} USD</p>
                  </div>
                </div>
              </div>
            </li>

            <li key={'balance2'} className="p-2 sm:p-3">
              <button className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-blur">
                <div className="flex items-center w-1/2">
                  <h6 className="mr-2 ">Un-Staked</h6>
                </div>
                <div className="flex items-center justify-end w-1/2">
                  <div className="flex flex-col items-end">
                    <h6 className="">{roundedAccountBalanceTao} Tao</h6>
                    <p className="text-xs text-slate-400 ">${accountBalanceUSD} USD</p>
                  </div>
                </div>
              </button>
            </li>
            <li key={'balance3'} className="p-2 sm:p-3">
              <button className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-blur">
                <div className="flex items-center w-1/2">
                  <h6 className="mr-2 ">Staked</h6>
                </div>
                <div className="flex items-center justify-end w-1/2">
                  <div className="flex flex-col items-end">
                    <div className="flex flex-col items-end">
                      <h6 className="">{roundedCurrentlyStakedTao} Tao</h6>
                      <p className="text-xs text-slate-400 ">${amountCurrentlyStakedUSD} USD</p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center pt-4">
        <div
          className="w-full text-center bg-gray-200 shadow sm:rounded-md lg:w-96 sm:w-full"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            color: 'black'
          }}
        >
          {status}
        </div>
      </div>

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            {/* <div className="w-full border-t border-slate-300" /> */}
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 text-sm text-slate-500">&nbsp;</span>
          </div>
          <div className="relative" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              onClick={(e) => e.preventDefault()}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'default',
                color: 'rgba(0, 0, 0, 0.7)', // Applying 70% opacity to the text
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
            >
              Staking
            </button>
          </div>
        </div>
      ) : null}

      {/* {(currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0) ? <TxButton
          label="Stake"
          type="SIGNED-TX"
          setStatus={setStatus}
          attrs={{
            palletRpc: 'subtensorModule',
            callable: 'addStake',
            inputParams: [MNRVHotkey, fullStakeAmount],
            paramFields: [true, true],
          }} 
          /> 
          :
          null
        } */}

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="number"
            step="0.000001"
            placeholder="Enter Tao value to Stake"
            onChange={(e) => {
              // Assuming you have a state variable named 'setUnstakeAmount' to store the input value
              setStakeAmount(parseFloat(e.target.value))
            }}
            style={{ width: '100%', color: 'black' }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            {/* <div className="w-full border-t border-slate-300" /> */}
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 text-sm text-slate-500">&nbsp;</span>
          </div>
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="relative" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {isValidFloat(stakeAmount) &&
          parseFloat(stakeAmount.toString()) > 0 &&
          parseFloat(stakeAmount.toString()) / 10 ** 9 < fullStakeAmount / 10 ** 9 ? (
            <TxButton
              label="Stake"
              type="SIGNED-TX"
              setStatus={setStatus}
              attrs={{
                palletRpc: 'subtensorModule',
                callable: 'addStake',
                inputParams: [MNRVHotkey, stakeAmount * 10 ** 9],
                paramFields: [true, true]
              }}
            />
          ) : (
            <button
              onClick={(e) => e.preventDefault()}
              style={{
                background: '#f0f0f0',
                border: 'none',
                outline: 'none',
                cursor: 'default',
                color: 'rgba(0, 0, 0, 0.7)', // Applying 70% opacity to the text
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
            >
              Enter a Valid Tao Amount
            </button>
          )}

          <TxButton
            label="Stake All"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: 'addStake',
              inputParams: [MNRVHotkey, fullStakeAmount],
              paramFields: [true, true]
            }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              {/* <div className="w-full border-t border-slate-300" /> */}
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-slate-500">&nbsp;</span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            {fullStakeAmount > 0 ? <div className="w-full border-t border-slate-300" /> : null}
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 text-sm text-slate-500">&nbsp;</span>
          </div>
          <div className="relative" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              onClick={(e) => e.preventDefault()}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'default',
                color: 'rgba(0, 0, 0, 0.7)', // Applying 70% opacity to the text
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
            >
              Un-Staking
            </button>
          </div>
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="number"
            step="0.000001"
            placeholder="Enter Tao value to Un-Stake"
            onChange={(e) => {
              // Assuming you have a state variable named 'setUnstakeAmount' to store the input value
              setUnstakeAmount(parseFloat(e.target.value))
            }}
            style={{ width: '100%', color: 'black' }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            {/* <div className="w-full border-t border-slate-300" /> */}
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 text-sm text-slate-500">&nbsp;</span>
          </div>
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div className="relative" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {isValidFloat(unstakeAmount) &&
          parseFloat(unstakeAmount.toString()) > 0 &&
          parseFloat(unstakeAmount.toString()) / 10 ** 9 < amountCurrentlyStaked / 10 ** 9 ? (
            <TxButton
              label="Un-Stake"
              type="SIGNED-TX"
              setStatus={setStatus}
              attrs={{
                palletRpc: 'subtensorModule',
                callable: 'removeStake',
                inputParams: [MNRVHotkey, unstakeAmount * 10 ** 9],
                paramFields: [true, true]
              }}
            />
          ) : (
            <button
              onClick={(e) => e.preventDefault()}
              style={{
                background: '#f0f0f0',
                border: 'none',
                outline: 'none',
                cursor: 'default',
                color: 'rgba(0, 0, 0, 0.7)', // Applying 70% opacity to the text
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
            >
              Enter a Valid Tao Amount
            </button>
          )}

          <TxButton
            label="Un-Stake All"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: 'removeStake',
              inputParams: [MNRVHotkey, amountCurrentlyStaked],
              paramFields: [true, true]
            }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'account' ? (
        <div className="relative flex items-center justify-center">
          {' '}
          {/* Add 'items-center' here */}
          <div className="flex flex-col items-center text-center">
            {' '}
            {/* Add 'items-center' and 'text-center' here */}
            <span className="px-2 text-sm text-slate-500" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              Make Account available through
            </span>
            <span className="px-2 text-sm text-slate-500" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              a Polkadot Wallet to Stake or Un-Stake
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function Navigation() {
  return <Main />
}
