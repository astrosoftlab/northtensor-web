import React, { useState, useEffect } from 'react'
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'

import { useIsMountedRef } from "../../lib/hooks/api/useIsMountedRef";
import axios from 'axios';


const acctAddr = (acct: { value: any; }) => (acct ? acct.value : '')
function Main(props: any) {

    const [status, setStatus] = useState(null)

    const { api, keyring, currentAccount, storedMNRVHotkey, balanceSigFigures } = useSubstrateState()

    // Account Balance
    const [accountBalance, setAccountBalance] = useState(0)
    // Account Staked
    const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)

    // TAO Conversion Rate
    const [taoConversionRate, setTaoConversionRate] = useState(0)
    const [taoConversionRateUpdated, setTaoConversionRateUpdated] = useState(false)

    const MNRVHotkey = storedMNRVHotkey



  
    // When account address changes, update subscriptions
    useEffect(() => {
      if (!currentAccount) {
        return () => {}
      }
      let unsubscribe: () => any
    
      async function getStake(specificColdkey: string) {
        const res = await api.query.subtensorModule.stake(MNRVHotkey, specificColdkey);
        return parseFloat(res.toString())
      }
    
      async function loopAccounts() {
        let tempAccountBalance = 0
        let tempAmountCurrentlyStaked = 0
        // const specificAccountBalances = []
    
        for (const coldkey of currentAccount.coldkey_array) {
          const balance = await api.query.system.account(coldkey)
          const specificBalance = balance.data.free.toNumber()
          // specificAccountBalances.push(specificBalance)
          tempAccountBalance += specificBalance
          tempAmountCurrentlyStaked += await getStake(coldkey)
        }
    
        setAccountBalance(tempAccountBalance)
        setAmountCurrentlyStaked(tempAmountCurrentlyStaked)
        // setSpecificAccountBalances(specificAccountBalances)
      }
    
      loopAccounts()
    
      return () => unsubscribe && unsubscribe()
    }, [api, currentAccount])
    

    const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9
    const roundedAccountBalanceTao  = parseFloat(accountBalanceTao.toFixed(balanceSigFigures))
    const accountBalanceUSD = (accountBalanceTao * taoConversionRate).toFixed(2)

    const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000


    
    const amountCurrentlyStakedTao = amountCurrentlyStaked / 10**9
    const roundedCurrentlyStakedTao = parseFloat(amountCurrentlyStakedTao.toFixed(balanceSigFigures))
    
    const amountCurrentlyStakedUSD = (amountCurrentlyStakedTao * taoConversionRate).toFixed(2)
    
    const totalWalletBalance = accountBalanceTao + amountCurrentlyStakedTao
    const roundedTotalWalletBalance = parseFloat(totalWalletBalance.toFixed(balanceSigFigures))
    const totalWalletBalanceUSD = (totalWalletBalance * taoConversionRate).toFixed(2)
    

    
    

  // replace "your_token_id" with the ID of the token you want to get the value for
  const token_id = "bittensor";
  
  if (!taoConversionRateUpdated) {
    axios.get<{ [key: string]: { usd: number } }>(`https://api.coingecko.com/api/v3/simple/price?ids=${token_id}&vs_currencies=usd`)
      .then((response: { data: { [x: string]: { usd: any; }; }; }) => {
        const price = response.data[token_id].usd;
        setTaoConversionRate(price)
        setTaoConversionRateUpdated(true)
      })
      .catch((error: any) => {
        console.log(error);
      });
  }


    
    
  
    return (
      <><div className="bg-slate-50 shadow sm:rounded-md lg:w-96 sm:w-full">

        <ul role="list" className="divide-y divide-slate-200">
          <li key={'balance1'} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between w-full  py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Total</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <h1>{roundedTotalWalletBalance} Tao</h1>
                  <p className="text-slate-400 text-xs">${totalWalletBalanceUSD} USD</p>
                </div>
              </div>
            </div>
          </li>

          <li key={'balance2'} className="px-4 py-4 sm:px-6">
            <button className="flex items-center justify-between w-full hover:bg-slate-200 py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Un-Staked</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <h1>{roundedAccountBalanceTao} Tao</h1>
                  <p className="text-slate-400 text-xs">${accountBalanceUSD} USD</p>
                </div>
              </div>
            </button>
          </li>
          <li key={'balance3'} className="px-4 py-4 sm:px-6">
            <button className="flex items-center justify-between w-full hover:bg-slate-200 py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Staked</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <div className="flex flex-col items-end">
                    <h1>{roundedCurrentlyStakedTao} Tao</h1>
                    <p className="text-slate-400 text-xs">${amountCurrentlyStakedUSD} USD</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li key={'balance4'} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between w-full rounded-md text-center">
              <div className="flex flex-col w-1/4">
                <p className="text-slate-400 ">APY</p>
                <p className="text-slate-400 ">0.00%</p>
              </div>
              <div className="flex items-center justify-between w-1/3">
                <div className="flex flex-col items-center text-center">
                  <p className="text-slate-400 ">Estimated Daily Return</p>
                  <p className="text-slate-400 ">.2 Tao</p>
                </div>
              </div>
            </div>
          </li>

        </ul>

      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-sm text-slate-500">&nbsp;</span>
        </div>
      </div>

        
      {(currentAccount != null && currentAccount.source == 'polkadot' && fullStakeAmount > 0) ? <TxButton
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
        }</>
    );
    }



export default function Navigation(props : any) {
  return <Main {...props} />
}
