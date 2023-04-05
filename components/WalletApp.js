import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from '../lib/substrate-lib'
// import { DeveloperConsole } from './substrate-lib/components'

import WalletHeader from './wallet_components/WalletHeader'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// import Balances from './Balances'
// import Bittensor from './Bittensor'
// import BlockNumber from './BlockNumber'
// import Interactor from './Interactor'
// import NodeInfo from './NodeInfo'
// import MNRVTip from './MNRVTip'
// import Transfer from './Transfer'
// import Events from './Events'
import Navigations from './wallet_components/Navigations'

import styles from '@/styles/Home.module.css'

// import TemplateModule from './TemplateModule'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  console.log('err', apiError)
  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization) and/or refresh the page"
    )
  }

  const contextRef = createRef()


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0,
        },
      }}
    >
      
      <Paper variant="outlined">
            <div ref={contextRef}>
            <Sticky context={contextRef}>
                <WalletHeader />
            </Sticky>
            <Navigations />
            </div>
      </Paper>
    </Box>

  )
}

export default function WalletApp() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
