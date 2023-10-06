import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Grid, Message } from 'semantic-ui-react'

import walletLoading from '@assets/images/wallet-loading.gif'
import { BottomGradientTensor } from '@components/ui/BottomGradientTensor'
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

  const loader = (text: string) => (
    <div className="flex flex-col items-center gap-d-26 lg:mt-[185px] mt-[138px]">
      <img src={walletLoading.src} className="lg:w-[150px] w-[120px] lg:h-[150px] h-[120px]" />
      <div>{text}</div>
    </div>
  )

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
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-lg lg:py-[44px] py-[33px] item-start sm:w-auto">
        <div className="container">
          <h1 className="text-center lg:mb-[54px] mb-[40px]">Staking</h1>
          {apiState !== 'READY' && loader('Connecting to Substrate...')}
          {apiState === 'READY' && keyringState !== 'READY' && loader('Loading accounts...')}
          {apiState === 'READY' && keyringState === 'READY' && (
            <div className="card lg:w-[596px] w-full lg:px-[20px] px-[15px] lg:py-[40px] py-[30px]">
              <div x-ref="contextRef">
                <WalletHeader />
              </div>
              <div className="flex justify-center lg:mt-[25px] mt-[19px]">
                <div className="flex flex-col w-full gap-d-25">
                  <WalletBase />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomGradientTensor />
    </>
  )
}

export default function WalletApp() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
