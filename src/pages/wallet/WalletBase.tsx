import { useEffect, useState } from 'react'

import axios from 'axios'

import CopyToClipboardButton from '@components/ui/CopyButton'
import { Input } from '@components/ui/Input'
import { useSubstrateState } from '@lib/substrate-lib'
import { TxButton } from '@lib/substrate-lib/components'

function Main() {
  const [status, setStatus] = useState<string | null>(null)

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

  const stakable =
    isValidFloat(stakeAmount) &&
    parseFloat(stakeAmount.toString()) > 0 &&
    parseFloat(stakeAmount.toString()) / 10 ** 9 < fullStakeAmount / 10 ** 9

  const unstakable =
    isValidFloat(unstakeAmount) &&
    parseFloat(unstakeAmount.toString()) > 0 &&
    parseFloat(unstakeAmount.toString()) / 10 ** 9 < amountCurrentlyStaked / 10 ** 9

  return (
    <>
      {currentAccount != null && currentAccount.source != 'group' ? (
        <>
          <div className="flex justify-between">
            <div className="font-bold text-body">Wallet Address</div>
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
          </div>
          <div className="w-full h-[1px] bg-[#FFFFFF20]" />
        </>
      ) : null}
      <div>
        <div className="font-bold text-body lg:mb-[5px] mb-[4px]">Total</div>
        <div className="flex items-center justify-between w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] rounded-md border border-[#FFFFFF10] bg-[#FFFFFF05] lg:text-[18px] text-[14px]">
          <div className="">{roundedTotalWalletBalance} Tao</div>
          <div className="text-[#898989]">${totalWalletBalanceUSD} USD</div>
        </div>
      </div>
      <div>
        <div className="font-bold text-body lg:mb-[5px] mb-[4px]">Un-Staked</div>
        <button className="flex items-center justify-between w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] rounded-md border border-[#FFFFFF10] bg-[#FFFFFF05] lg:text-[18px] text-[14px] hover:bg-blur">
          <div className="">{roundedAccountBalanceTao} Tao</div>
          <div className="text-[#898989]">${accountBalanceUSD} USD</div>
        </button>
      </div>
      <div>
        <div className="font-bold text-body lg:mb-[5px] mb-[4px]">Staked</div>
        <button className="flex items-center justify-between w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] rounded-md border border-[#FFFFFF10] bg-[#FFFFFF05] lg:text-[18px] text-[14px] hover:bg-blur">
          <div className="">{roundedCurrentlyStakedTao} Tao</div>
          <div className="text-[#898989]">${amountCurrentlyStakedUSD} USD</div>
        </button>
      </div>
      {status && (
        <div className="flex items-center justify-center">
          <div className="w-full flex flex-col gap-d-12 text-center break-words whitespace-normal shadow bg-white-20 sm:rounded-md sm:w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px]">
            <div>{status.split('Block hash:')[0]} Block hash:</div>
            <div>{status.split('Block hash:')[1]}</div>
          </div>
        </div>
      )}

      {/* {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="font-bold text-body">Staking...</div>
      ) : null} */}

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="flex items-center">
          <Input
            label="To Stake"
            type="number"
            step="0.000001"
            placeholder="Enter Tao value to Stake"
            onChange={(v) => {
              // Assuming you have a state variable named 'setUnstakeAmount' to store the input value
              setStakeAmount(parseFloat(v))
            }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0 ? (
        <div className="relative grid lg:grid-cols-2 gap-d-12">
          <TxButton
            label={stakable ? 'Stake' : 'Enter a Valid Tao Amount'}
            type="SIGNED-TX"
            setStatus={setStatus}
            disabled={!stakable}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: 'addStake',
              inputParams: [MNRVHotkey, fullStakeAmount],
              paramFields: [true, true]
            }}
          />

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

      {/* {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div className="font-bold text-body">Un-Staking...</div>
      ) : null} */}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            label="To Un-Stake"
            type="number"
            step="0.000001"
            placeholder="Enter Tao value to Un-Stake"
            onChange={(v) => {
              // Assuming you have a state variable named 'setUnstakeAmount' to store the input value
              setUnstakeAmount(parseFloat(v))
            }}
          />
        </div>
      ) : null}

      {currentAccount != null && currentAccount.source == 'polkadot' && amountCurrentlyStaked > 0 ? (
        <div className="relative grid lg:grid-cols-2 gap-d-12">
          <TxButton
            label={unstakable ? 'Un-Stake' : 'Enter a Valid Tao Amount'}
            type="SIGNED-TX"
            setStatus={setStatus}
            disabled={!unstakable}
            attrs={{
              palletRpc: 'subtensorModule',
              callable: 'removeStake',
              inputParams: [MNRVHotkey, unstakeAmount * 10 ** 9],
              paramFields: [true, true]
            }}
          />

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
            <span className="px-2 text-sm text-gray" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              Make Account available through
            </span>
            <span className="px-2 text-sm text-gray" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
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
