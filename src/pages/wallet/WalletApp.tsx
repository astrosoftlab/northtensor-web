import { createRef, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Grid, Message } from 'semantic-ui-react'

import { Loader } from '@components/ui/Loaders'
import { SubstrateContextProvider, useSubstrate } from '@lib/substrate-lib'
import WalletBase from '@pages/wallet/WalletBase'

import WalletHeader from './WalletHeader'

function Main() {
  const {
    state: { apiState, apiError, keyringState }
  } = useSubstrate()

  const [refresh, setRefresh] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      setRefresh(true)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (refresh) {
      // Perform any actions you need to do when the page "refreshes"
      console.log('refreshed')
      window.location.reload()
      setRefresh(false)
    }
  }, [refresh])

  const loader = (text: string) => <Loader text={text} />

  const message = (errObj: any) => (
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

  if (apiState === 'ERROR') {
    return message(apiError)
  } else if (apiState !== 'READY') {
    return loader('Connecting to Substrate')
  }

  if (keyringState !== 'READY') {
    return loader("Loading accounts (please review any extension's authorization) and/or refresh the page")
  }

  const contextRef = createRef()

  return (
    <div className="flex flex-col w-full max-w-screen-lg space-y-4 item-start sm:w-auto">
      <div className="container">
        <div x-ref="contextRef">
          <WalletHeader />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-full">
            <WalletBase />
          </div>
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
