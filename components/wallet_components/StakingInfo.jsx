import React, { useState, useEffect  } from 'react'
import {  Grid } from 'semantic-ui-react'
// import { TxButton } from './substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
// import { u8aUnwrapBytes} from '@polkadot/util'

export default function Main(props) {
  // const [status, setStatus] = useState(null)

  // return (<h1>Coming Soon</h1>)
  
  const { api, keyring, currentAccount} = useSubstrateState()

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

  // console.log("api", api.query.subtensorModule.delegates(currentAccount))
  console.log("current Account", currentAccount)
  console.log("account balance", accountBalance)
  console.log(accounts)

  const apiCtx = useApi();

  const getDelegateInfo = async ()=> {
    const result_bytes = await (apiCtx.api.rpc).delegateInfo.getDelegates();
    const result = apiCtx.api.createType("Vec<DelegateInfo>", result_bytes);
    const delegate_info_raw = result.toJSON();
    
    const delegate_info = delegate_info_raw.map((delegate) => {
      let nominators = [];
      let total_stake = 0;
      for (let i = 0; i < delegate.nominators.length; i++) {
        const nominator = delegate.nominators[i];
        const staked = nominator[1];
        total_stake += staked;
        nominators.push([nominator[0].toString(), staked]);
      }
      return {
        take: delegate.take / (2**16 - 1), // Normalize take, which is a u16
        delegate_ss58: delegate.delegate_ss58.toString(),
        owner_ss58: delegate.owner_ss58.toString(),
        nominators,
        total_stake,
      };
    });

    return delegate_info;
  };

  // const refreshMeta = async () => {
  //   const getMeta = async () => {
  //     setLoader(true);

  //     const subnets_info_bytes = await (
  //       apiCtx.api.rpc
  //     ).subnetInfo.getSubnetsInfo();
  //     const subnets_info = apiCtx.api.createType("Vec<SubnetInfo>", subnets_info_bytes);
  //     const netuids = (subnets_info)
  //       .toJSON()
  //       .map((subnetInfo) => {
  //         return subnetInfo.netuid;
  //       });

  //     let _meta = {};

  //     const result = await getNeurons(netuids);
  //     Object.entries(result).forEach(
  //       ([netuid, neurons]) => {
  //         let neurons_ = neurons.map((neuron) => {
  //           return {
  //             hotkey: neuron.hotkey.toString(),
  //             coldkey: neuron.coldkey.toString(),
  //             stake: (neuron.stake).tonumber(),
  //             uid: neuron.uid,
  //           };
  //         });
  //         _meta[netuid] = neurons_;
  //       }
  //     );
  //     return _meta;
  //   };

  //   account &&
  //     getMeta().then((_meta) => {
  //       setMeta(_meta);
  //       setLoader(false);
  //     });
  // };

  // useEffect(() => {
  //   const getRows = async (meta_) => {
  //     let stakeData = {};
  //     stakeData = Object.fromEntries(
  //       Object.entries(meta_).map(([netuid, neurons]) => {
  //         return [
  //           netuid,
  //           neurons
  //             .filter((neuron) => {
  //               return neuron.coldkey === account.accountAddress;
  //             })
  //             .map((neuron) => {
  //               return {
  //                 address: neuron.hotkey,
  //                 stake: neuron.stake,
  //               };
  //             }),
  //         ];
  //       })
  //     );

  //     setStakeData(stakeData);
  //   };

  //   mountedRef.current && !!meta && getRows(meta);
  // }, [account, mountedRef, meta]);

  // useEffect(() => {
  //   const _getDelegateInfo = async () => {
  //     let delegateInfo = await getDelegateInfo();
  //     let delegateInfo_sorted = delegateInfo.sort((a, b) => {
  //       return b.total_stake - a.total_stake;
  //     });
  //     delegateInfo_sorted.find((delegate, i) => {
  //       if (delegate.delegate_ss58.toString() === "5ECvRLMj9jkbdM4sLuH5WvjUe87TcAdjRfUj5onN4iKqYYGm") {
  //         // Put at the top
  //         const deleted = delegateInfo_sorted.splice(i, 1);
  //         delegateInfo_sorted.unshift(deleted[0]);

  //         return true;
  //       }
  //     });
  //     setDelegateInfo(delegateInfo_sorted);
  //   };

  //   mountedRef.current && _getDelegateInfo();
  // }, [account, mountedRef]);

  console.log(getDelegateInfo())

  
  
  
  // const acctAddr = acct => (acct ? acct.address : '')
  // // const [ActiveAccountAvailableBalance, setActiveAccountBalance] = useState(0.0)
  // // When account address changes, update subscriptions
  // useEffect(() => {
  //   let unsubscribe

  //   // If the user has selected an address, create a new subscription
  //   currentAccount &&
  //     api.query.system
  //       .account(acctAddr(currentAccount), balance =>
  //         setAccountBalance(balance.data.free.toHuman())
  //       )
  //       .then(unsub => (unsubscribe = unsub))
  //       .catch(console.error)

  //   return () => unsubscribe && unsubscribe()
  // }, [api, currentAccount])

  // //Convert AccountBalance to Tao
  // const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9
  // const fullStakeAmount = parseFloat(accountBalance.toString().replace(/,/g, '')) - 1000
  // const fullStakeAmountTao = fullStakeAmount / 10**9
  // const [stakeAmount, setStakeAmount] = useState(0)
  // const [stakeType, setStakeType] = useState('addStake')


  // const [amountCurrentlyStaked, setAmountCurrentlyStaked] = useState(0)
  // const amountCurrentlyStakedTao = amountCurrentlyStaked / 10**9
  // async function getStake() {
  //   const res = await api.query.subtensorModule.stake(MNRVHotkey, acctAddr(currentAccount));
  //   setAmountCurrentlyStaked(parseFloat(res.toString()))
  // }
  
  // getStake();

  // const btcliStakeAmount = " --amount " + stakeAmount


  // const [submitState, setSubmitState] = useState({validSubmit: false, submitMessage: "Enter Amount of Tao to stake"})
  // const { validSubmit, submitMessage} = submitState

  // const availableAccounts = []


  // accounts.map(account => {
  //   return availableAccounts.push({
  //     key: account.meta.name,
  //     text: account.meta.name,
  //     value: account.address,
  //   })
  // })



  // const onStakeTypeChange = (ev, data) => {
  //   setStakeType(data.value)
  //   // clear the formState
  //   // setFormState(prev => ({ ...prev, [data.state]: data.value }))
  //   if (data.value === 'addStake' ) {
  //     processStakeAmountChangeForAdd()
  //   }
  //   else {
  //     processStakeAmountChangeForRemove()
  //   }
    
  // }

  // const processStakeAmountChangeForAdd = () => {
  //   var tempHasEnough = parseFloat(stakeAmount) <= accountBalanceTao
  //   var tempDoesNotRetainsExistential = tempHasEnough && fullStakeAmountTao <= parseFloat(stakeAmount)
  //   var tempIsNegativeAmount = parseFloat(stakeAmount) < 0
  //   var tempValidSubmit = tempHasEnough && !tempDoesNotRetainsExistential && !tempIsNegativeAmount 
  //   var tempMessage = parseFloat(stakeAmount) === 0 ? "Enter Amount of Tao to Stake" : tempIsNegativeAmount ? "Amount must be positive" :
  //     tempHasEnough ?
  //       tempDoesNotRetainsExistential ? "Must retain 0.000,001 in order to keep your wallet alive" :
  //       "Something is wrong, this should process" : "Insufficient Funds"
  //   setSubmitState({ validSubmit: tempValidSubmit, submitMessage: tempMessage })
  // } 

  // const processStakeAmountChangeForRemove = () => {
  //   setSubmitState({validSubmit: true, submitMessage: "removeStake Valid Default"})
  // } 

  // const onStakeAmountChange = (ev, data) => {
  //   setStakeAmount(data.value)
  //   // setFormState(prev => ({ ...prev, [data.state]: data.value }))
  //   if (stakeType === 'addStake' ) {
  //     processStakeAmountChangeForAdd()
  //   }
  //   else {
  //     processStakeAmountChangeForRemove()
  //   }

  // }

  // const delegateStakeCLI = "btcli delegate --delegate_ss58key "
  return (
    <Grid.Column width={8}>
      &quot;2&quot;
    </Grid.Column>

  )
    
}

