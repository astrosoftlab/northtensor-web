import React, { useState, ChangeEvent, useEffect  } from 'react'
import {  Grid } from 'semantic-ui-react'
// import { TxButton } from './substrate-lib/components'
import { useSubstrateState } from '../../lib/substrate-lib'
// import { u8aUnwrapBytes} from '@polkadot/util'

import { CreateAccountCtx, StakeData } from "../../lib/utils/types";
import { useIsMountedRef } from "../../lib/hooks/api/useIsMountedRef";
import { Option } from "@polkadot/types";
import { Codec } from "@polkadot/types/types";
import { AccountId } from "@polkadot/types/interfaces";
import { useApi } from "../../lib/hooks";


import {
  Neuron,
  Metagraph,
  StakeInfo,
  RawMetagraph,
  NeuronInfo,
  NeuronInfoLite,
  SubnetInfo,
  DelegateInfo,
  DelegateInfoRaw,
  DelegateExtras,
  DelegateExtra,
  ApiCtx,
} from "../../lib/utils/types";

export default function Main(_props: any) {
  // const [status, setStatus] = useState(null)

  // return (<h1>Coming Soon</h1>)
  
  const { api, keyring, currentAccount} = useSubstrateState()


  // const classes = useStyles();
  const [value, setValue] = useState(0);
  // const { account } = useContext<CreateAccountCtx>(AccountContext);
  const mountedRef = useIsMountedRef();
  // for first load of page
  const [loaded, setLoaded] = useState(false);

  // const apiCtx = useApi();

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    if (newValue === 3 && !loaded) {
      // refresh the page when the tab is clicked
      // but only do this once
      refreshMeta();
      getDelegateInfo().then((delegateInfo: DelegateInfo[]) => {
        setDelegateInfo(delegateInfo);
      });
      setLoaded(true);
    }
    setValue(newValue);
  };

  const [meta, setMeta] = useState<Metagraph>({});
  const [stakeData, setStakeData] = useState<StakeData>({});
  const [loader, setLoader] = useState<boolean>(true);
  const [delegateInfo, setDelegateInfo] = useState<DelegateInfo[]>([]);
  const [delegateRows, setDelegateRows] = useState<DelegateInfo[]>([]);
  const [personalDelegateRows, setPersonalDelegateRows] = useState<DelegateInfo[]>([]);

  const [delegatesExtras, setDelegatesExtras] = useState<DelegateExtras>({});
  

  const getNeurons = (netuids: Array<number>): Promise<RawMetagraph> => {
    return new Promise<RawMetagraph>(async (resolve, reject) => {
      let results_map: RawMetagraph = {};
      for (let netuid of netuids) {
        try {
          let result_bytes = await (api.rpc as any).neuronInfo
            .getNeuronsLite(netuid)
        
          const result = api.createType("Vec<NeuronInfoLite>", result_bytes);
          const neurons_info = result.toJSON() as any[] as NeuronInfoLite[];
          results_map[netuid] = neurons_info;
        } catch(err: any) {
            console.log(err);
            reject(err);
        }
      }
      console.log("results_map", results_map);
      resolve(results_map);
    });
  };

  const acctAddr = (acct: { address: any; }) => (acct ? acct.address : '')
  
  async function getPersonalStakeOnDelegate(delegate_ss58: any) {
    const res = await api.query.subtensorModule.stake(delegate_ss58, acctAddr(currentAccount));
    const valueStr = res.toString();
    const value = parseFloat(valueStr);
    return value / 10**9;
}

  const getDelegateInfo = async (): Promise<DelegateInfo[]> => {
    const result_bytes = await (api.rpc as any).delegateInfo.getDelegates();
    const result = api.createType("Vec<DelegateInfo>", result_bytes);
    const delegate_info_raw: DelegateInfoRaw[] = result.toJSON() as any[] as DelegateInfoRaw[];
    console.log("delegate_info_raw", delegate_info_raw)
    const delegate_info = delegate_info_raw.map((delegate: DelegateInfoRaw) => {
      let nominators: [string, number][] = [];
      let personal_stake = getPersonalStakeOnDelegate(delegate.delegate_ss58);
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
        personal_stake,
      };
    });

    return delegate_info;
  };

  const getDelegatesJson = async (): Promise<DelegateExtras> => {
    const url = "https://raw.githubusercontent.com/opentensor/bittensor/master/delegates.json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
    

  const refreshMeta = async () => {
    const getMeta = async (): Promise<Metagraph> => {
      setLoader(true);

      const subnets_info_bytes = await (
        api.rpc as any
      ).subnetInfo.getSubnetsInfo();
      const subnets_info = api.createType("Vec<Option<SubnetInfo>>", subnets_info_bytes);

      const netuids: Array<number> = (subnets_info as any)
        .toJSON()
        .map((subnetInfo: SubnetInfo) => {
          return subnetInfo.netuid;
        });

      let _meta: Metagraph = {};

      const result: RawMetagraph = await getNeurons(netuids);

      Object.entries(result).forEach(
        ([netuid, neurons]: [string, NeuronInfoLite[]]) => {
          let neurons_ = neurons.map((neuron: NeuronInfoLite) => {
            return {
              hotkey: neuron.hotkey.toString(),
              coldkey: neuron.coldkey.toString(),
              stake: Object.fromEntries(neuron.stake.map((stake: [AccountId, number]) => {
                return [stake[0].toString(), stake[1]];
              })),
              uid: neuron.uid,
            };
          });
          _meta[netuid] = neurons_;
        }
      );
      
      return _meta;
    };

    const _getDelegateInfo = async (): Promise<[DelegateInfo[], DelegateExtras]> => {
      const delegates_json = await getDelegatesJson();
      const delegateInfo = await getDelegateInfo();
      return [delegateInfo, delegates_json];
    };

    currentAccount &&
      getMeta().then((_meta: Metagraph) => {
        setMeta(_meta);
        setLoader(false);
      })
    currentAccount && _getDelegateInfo().then(([delegateInfo, delegates_json]) => {
      setDelegateInfo(delegateInfo);
      setDelegatesExtras(delegates_json);

      setLoader(false);
    });
  };

  useEffect(() => {
    const getRows = async (meta_: Metagraph) => {
      let stakeData: StakeData = {};
      stakeData = Object.fromEntries(
        Object.entries(meta_).map(([netuid, neurons]: [string, Neuron[]]) => {
          return [
            netuid,
            neurons
              .filter((neuron) => {
                return neuron.coldkey === currentAccount.address;
              })
              .map((neuron) => {
                return {
                  address: neuron.hotkey,
                  stake: neuron.stake[currentAccount.address] || 0
                } as StakeInfo;
              }),
          ];
        })
      );
  
      setStakeData(stakeData);
    };

    mountedRef.current && !!meta && getRows(meta);
  }, [currentAccount, mountedRef, meta]);

  useEffect(() => {
    const prepareDelegateRows = (delegateInfo: DelegateInfo[], delegatesExtras: DelegateExtras, account_addr: string) => {
      delegateInfo.sort((a, b) => {
        let nom_idx_a = a.nominators.findIndex((nom) => nom[0] === account_addr); 
        let nom_idx_b = b.nominators.findIndex((nom) => nom[0] === account_addr);
        let amt_a: number = a.nominators[nom_idx_a]?.[1] || 0;
        let amt_b: number = b.nominators[nom_idx_b]?.[1] || 0;

        return amt_b - amt_a || b.total_stake - a.total_stake;
      });
      delegateInfo.find((delegate, index) => {
        if (delegatesExtras[delegate.delegate_ss58]?.name === "mnrv.ai") {
          // Put at top
          delegateInfo.splice(index, 1);
          delegateInfo.unshift(delegate);
          return true;
        }
        return false;
      });
      
      setDelegateRows(delegateInfo);
    };
    
    mountedRef.current && prepareDelegateRows(delegateInfo, delegatesExtras, currentAccount.address);

  }, [currentAccount, mountedRef, delegateInfo, delegatesExtras]);

  console.log("Current account", currentAccount);
  console.log("delegateInfo", delegateInfo);
  console.log("delegateExtras", delegatesExtras);
  console.log("delegateRows", delegateRows);
  console.log("personalDelegateRows", personalDelegateRows);

  return (
    <>
    <Grid.Column width={8}>
      <button onClick={refreshMeta}>Refresh</button>
    </Grid.Column>
      {/* (delegateInfo.length > 0 && delegateInfo.map((delegate) => {
        return (<h3>{delegate.delegate_ss58}</h3>)
      }
      )) */}
      </>

  )
    
}

