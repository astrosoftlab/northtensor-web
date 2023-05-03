import React, { useState, useEffect } from 'react'
import { TxButton } from '../../lib/substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'

import { useIsMountedRef } from "../../lib/hooks/api/useIsMountedRef";
import axios from 'axios';

const acctAddr = (acct: { address: any; }) => (acct ? acct.address : '')
function Main(props: any) {

    const [status, setStatus] = useState(null)

    const { api, keyring, currentAccount, storedMNRVHotkey, balanceSigFigures } = useSubstrateState()

    const [accountBalance, setAccountBalance] = useState(0)
    const [accountTotalStake, setAccountTotalStake] = useState(0)
    const [mnrvStake, setmnrvStake] = useState(0)
    const mountedRef = useIsMountedRef();
    const [loaded, setLoaded] = useState(false);
    const [totalStakeProcessed, setTotalStakeProcessed] = useState<boolean>(false);
    const [taoConversionRateUSD, setTaoConversionRateUSD] = useState(0)

    const MNRVHotkey = storedMNRVHotkey


    const addStaketoTotalStaked = (stake: number) => {
        setAccountTotalStake(accountTotalStake + stake)
    }


  
    // When account address changes, update subscriptions
    useEffect(() => {
        let unsubscribe: () => any

        // If the user has selected an address, create a new subscription
        currentAccount &&
            api.query.system
            .account(acctAddr(currentAccount), (balance: { data: { free: { toHuman: () => React.SetStateAction<number>; }; }; }) =>
                setAccountBalance(balance.data.free.toHuman())
            )
            .then((unsub: () => any) => (unsubscribe = unsub))
            .catch(console.error)

        return () => unsubscribe && unsubscribe()
        }, [api, currentAccount])

    const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9
    const roundedAccountBalanceTao  = parseFloat(accountBalanceTao.toFixed(balanceSigFigures))
    const accountBalanceUSD = (accountBalanceTao * taoConversionRateUSD).toFixed(2)

    const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000


    const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)
    const amountCurrentlyStakedTao = amountCurrentlyStaked / 10**9
    const roundedCurrentlyStakedTao = parseFloat(amountCurrentlyStakedTao.toFixed(balanceSigFigures))
    async function getStake() {
      const res = await api.query.subtensorModule.stake(MNRVHotkey, acctAddr(currentAccount));
      setAmountCurrentlyStaked(parseFloat(res.toString()))
    }
    const amountCurrentlyStakedUSD = (amountCurrentlyStakedTao * taoConversionRateUSD).toFixed(2)
    
    const totalWalletBalance = accountBalanceTao + amountCurrentlyStakedTao
    const roundedTotalWalletBalance = parseFloat(totalWalletBalance.toFixed(balanceSigFigures))
    const totalWalletBalanceUSD = (totalWalletBalance * taoConversionRateUSD).toFixed(2)
    getStake();

    
    

  // replace "your_token_id" with the ID of the token you want to get the value for
  const token_id = "bittensor";

  axios.get<{ [key: string]: { usd: number } }>(`https://api.coingecko.com/api/v3/simple/price?ids=${token_id}&vs_currencies=usd`)
    .then((response: { data: { [x: string]: { usd: any; }; }; }) => {
      const price = response.data[token_id].usd;
      setTaoConversionRateUSD(price)
    })
    .catch((error: any) => {
      console.log(error);
    });



    
    
  
    return (
      <><div className="bg-white shadow sm:rounded-md w-90">

        <ul role="list" className="divide-y divide-gray-200">
          <li key={'balance1'} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between w-full  py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Total</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <h1>{roundedTotalWalletBalance} Tao</h1>
                  <p className="text-gray-400 text-xs">${totalWalletBalanceUSD} USD</p>
                </div>
              </div>
            </div>
          </li>

          <li key={'balance2'} className="px-4 py-4 sm:px-6">
            <button className="flex items-center justify-between w-full hover:bg-gray-200 py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Un-Staked</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <h1>{roundedAccountBalanceTao} Tao</h1>
                  <p className="text-gray-400 text-xs">${accountBalanceUSD} USD</p>
                </div>
              </div>
            </button>
          </li>
          <li key={'balance3'} className="px-4 py-4 sm:px-6">
            <button className="flex items-center justify-between w-full hover:bg-gray-200 py-2 px-4 rounded-md">
              <div className="flex items-center w-1/2">
                <h1 className="mr-2">Staked</h1>
              </div>
              <div className="flex items-center justify-end w-1/2">
                <div className="flex flex-col items-end">
                  <div className="flex flex-col items-end">
                    <h1>{roundedCurrentlyStakedTao} Tao</h1>
                    <p className="text-gray-400 text-xs">${amountCurrentlyStakedUSD} USD</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li key={'balance4'} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between w-full rounded-md text-center">
              <div className="flex flex-col w-1/4">
                <p className="text-gray-400 ">APY</p>
                <p className="text-gray-400 ">0.00%</p>
              </div>
              <div className="flex items-center justify-between w-1/3">
                <div className="flex flex-col items-center text-center">
                  <p className="text-gray-400 ">Estimated Daily Return</p>
                  <p className="text-gray-400 ">.2 Tao</p>
                </div>
              </div>
            </div>
          </li>

        </ul>

      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-sm text-gray-500">&nbsp;</span>
        </div>
      </div>

        
        <TxButton
          label="Stake"
          type="SIGNED-TX"
          setStatus={setStatus}
          attrs={{
            palletRpc: 'subtensorModule',
            callable: 'addStake',
            inputParams: [MNRVHotkey, fullStakeAmount],
            paramFields: [true, true],
          }} /></> 
    );
    }



export default function Navigation(props : any) {
  return <Main {...props} />
}
