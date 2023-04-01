import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import AccountCard from './AccountCard'



import {
  Menu,
  Button,
  Dropdown,
  Container,
  Card,
  // Icon,
  // Image,
  Label,
} from 'semantic-ui-react'

// import HeaderPathing from './HeaderPathing'
import { useSubstrate, useSubstrateState } from '../../lib/substrate-lib'

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'

const acctAddr = acct => (acct ? acct.address : '')

function Main(props) {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()
  const [nodeInfo, setNodeInfo] = useState({})

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }))

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : ''
  console.log("keyringOptions", keyringOptions)
  console.log("Current Account-1", currentAccount)
  console.log("initialAddress", initialAddress)
  console.log("leninitialAddress", initialAddress.length)
  console.log("logic", initialAddress.length > 0)
  console.log("logic2", !currentAccount)
  console.log(keyring.getPair(initialAddress))

  // Set the initial address
  useEffect(() => {
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress])
  

  const onChange = addr => {
    setCurrentAccount(keyring.getPair(addr))
  }
  const { api } = useSubstrateState()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ])
        setNodeInfo({ chain, nodeName, nodeVersion })
        
      } catch (e) {
        console.error(e)
      }
    }
    getInfo()
  }, [api.rpc.system])

  return (
    <Box
      sx={{
        display: 'flex-width',
        flexWrap: 'wrap',
        '& > :not(style)': {
          height: 64,
        },
      }}
    >
      <Paper >
      <Stack spacing={2} direction="row" justifyContent="center">
          <AccountCard account={account}/>

        </Stack>
    </Paper>
    </Box>

    // <Menu
    //   attached="top"
    //   tabular
    //   // Page header formatting
    //   style={{
    //     backgroundColor: '#fff',
    //     borderColor: '#AAAAAA',
    //     paddingTop: '1em',
    //     paddingBottom: '1em',
    //   }}
    // >
    //   <Container position="left" style={{ alignItems: 'center', padding: '10px'}}>
    //     <a href="https://www.mnrv.ai/" target="_blank" rel="noopener noreferrer">
    //     <Button
    //           basic
    //           circular
    //           size="large"
    //           icon="home"
    //           color='green'
    //         />
    //     </a>
    //     </Container>
    //   <Container>
        
    //     <Container>
    //     <Card position="left" style={{ alignItems: 'center' }}>
    //     <Card.Content>
    //       <Card.Header>
    //         <span>{nodeInfo.chain}</span>
    //         </Card.Header>
    //         </Card.Content>
    //     </Card>
    //     </Container>
    //     <Menu.Menu position="right" style={{ alignItems: 'center' , padding: '10px'}}>
    //       {!currentAccount ? (
    //         <span>
    //           Create an account with Polkadot-JS Extension (
    //           <a target="_blank" rel="noreferrer" href={CHROME_EXT_URL}>
    //             Chrome
    //           </a>
    //           ,&nbsp;
    //           <a target="_blank" rel="noreferrer" href={FIREFOX_ADDON_URL}>
    //             Firefox
    //           </a>
    //           )&nbsp;
    //         </span>
    //       ) : null}
    //       <CopyToClipboard text={acctAddr(currentAccount)}>
    //         <Button
    //           basic
    //           circular
    //           size="large"
    //           icon="user"
    //           color={currentAccount ? 'green' : 'red'}
    //         />
    //       </CopyToClipboard>
    //       <Dropdown
    //         search
    //         selection
    //         clearable
    //         placeholder="Select an account"
    //         options={keyringOptions}
    //         onChange={(_, dropdown) => {
    //           onChange(dropdown.value)
    //         }}
    //         value={acctAddr(currentAccount)}
    //       />
    //       <BalanceAnnotation />
    //     </Menu.Menu>
    //   </Container>
    // </Menu>
  )
}

function BalanceAnnotation(props) {
  const { api, currentAccount } = useSubstrateState()
  
  const [accountBalance, setAccountBalance] = useState(0)

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

  const accountBalanceTao = parseFloat(accountBalance.toString().replace(/,/g, '')) / 10**9

  return currentAccount ? (
    <Label pointing="left" color="blue">
      {"Available Tao: "} 
      {accountBalanceTao}
    </Label>
  ) : null
}

export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
