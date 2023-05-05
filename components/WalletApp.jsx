import React, { createRef, useEffect, useState } from 'react'
import {
  Dimmer,
  Loader,
  Grid,
  Message,
} from 'semantic-ui-react'

import { useRouter } from 'next/router';
import { SubstrateContextProvider, useSubstrate} from '../lib/substrate-lib'

import WalletHeader from './wallet_components/WalletHeader'
import WalletBase from './wallet_components/WalletBase'


function Main() {
  const { forceLoadKeyring,  state: {apiState, apiError, keyringState} } = useSubstrate()

  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setRefresh(true);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (refresh) {
      // Perform any actions you need to do when the page "refreshes"
      console.log('refreshed')
      window.location.reload();
      setRefresh(false);

    }
  }, [refresh]);

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
    <div class="flex flex-col item-start space-y-4 p-4 w-full sm:w-auto max-w-screen-lg">
      <div x-ref="contextRef" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, borderRadius: 10, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <WalletHeader />
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col w-full">
          <WalletBase />
        </div>
      </div>

    </div>

  )
}

export default function WalletApp() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
