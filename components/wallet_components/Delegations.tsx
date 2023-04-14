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
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination"
import List from "@mui/material/List"
import DelegateRow from "./DelegateRow"


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
  DelegateColumn,
  DelegateExtra,
  ApiCtx,
} from "../../lib/utils/types";

export default function Main(_props: any) {
  // const [status, setStatus] = useState(null)

  // return (<h1 className="dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin">Coming Soon</h1>)
  
  const { api, keyring, currentAccount} = useSubstrateState()


  // const classes = useStyles();
  const [value, setValue] = useState(0);
  // const { account } = useContext<CreateAccountCtx>(AccountContext);
  const mountedRef = useIsMountedRef();
  // for first load of page
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  // const balanceArr = useBalance(account?.accountAddress || "")
  // const unit = balanceArr[3]



  // const apiCtx = useApi();

  const handlePanelChange = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    if (!loaded && delegateInfo.length == 0) {
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
      total_stake = total_stake / 10**9;
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

        getMeta().then((_meta: Metagraph) => {
        setMeta(_meta);
        setLoader(false);
      })
      _getDelegateInfo().then(([delegateInfo, delegates_json]) => {
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
                return neuron.coldkey === acctAddr(currentAccount);
              })
              .map((neuron) => {
                return {
                  address: neuron.hotkey,
                  stake: neuron.stake[acctAddr(currentAccount)] || 0
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
    
    mountedRef.current && prepareDelegateRows(delegateInfo, delegatesExtras, acctAddr(currentAccount));

  }, [currentAccount, mountedRef, delegateInfo, delegatesExtras]);

  const firstLoad = () => {
    if (!loaded && delegateInfo.length == 0) {
      // refresh the page when the tab is clicked
      // but only do this once
      refreshMeta();
      getDelegateInfo().then((delegateInfo: DelegateInfo[]) => {
        setDelegateInfo(delegateInfo);
      });
      setLoaded(true);
    }
  };

  firstLoad()

  console.log("Current account", currentAccount);
  console.log("delegateInfo", delegateInfo);
  console.log("delegateExtras", delegatesExtras);
  console.log("delegateRows", delegateRows);
  console.log("personalDelegateRows", personalDelegateRows);

  const delegateInfoColumns: DelegateColumn[] = [
    { id: "delegate_ss58", label: "Delegate Hotkey", width: 160 },
    { id: "owner_ss58", label: "Owner Coldkey", width: 160 },
    { id: "nominators", label: "Nominators" },
    { id: "total_stake", label: "Total Stake" },
    { id: "take", label: "Take" },
    { id: "stake", label: "Stake" }
  ]

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [expandedDelegate, setExpandedDelegate] = React.useState<boolean>(false);


  return (
    <>
    {!!delegateInfo.length &&
          <div className="flex flex-col mt-8 "> 
            <Stack direction="column" spacing={1} alignItems="center" marginTop="2em">
              
              <Typography className="dark:text-gray-200 text-center" variant="body2" sx={{
                    fontWeight: 'bold',
                  }} >
                    Delegates<br />
                    <button className="bg-gray-500 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded" onClick={refreshMeta}>Refresh</button>
              </Typography>
              <List sx={{
                minHeight: "400px",
                padding: "0.5em",
              }} >
                  {delegateInfo.slice((page-1)*10, page*10).map((delegate) => {
                    return (
                      <DelegateRow 
                        coldkey_ss58={acctAddr(currentAccount)}
                        refreshMeta={refreshMeta}
                        expanded={expanded}
                        onChange={() => handlePanelChange(delegate.delegate_ss58)}
                        // unit={unit}
                        key={`row-${delegate.delegate_ss58}`}
                        delegate={delegate}
                        columns={delegateInfoColumns}
                        delegateExtra={delegatesExtras[delegate.delegate_ss58]}
                      />
                    )
                  })}
              </List>
              <Pagination count={Math.ceil(delegateInfo.length/5)} shape="rounded" onChange={handlePageChange} page={page} />
            </Stack>
          </div>
          }
      </>

  )
    
}

