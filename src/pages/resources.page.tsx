import Head from 'next/head'
import Link from 'next/link'

import IconLink from '@assets/icons/icon-link.svg'
import IconSoon from '@assets/icons/icon-soon.svg'
import BuyIcon from '@assets/icons/resource-buy.svg'
import StakeIcon from '@assets/icons/resource-stake.svg'
import WalletIcon from '@assets/icons/resource-wallet.svg'
import tensorGradian from '@assets/images/cropped-tensor-gradian.png'
import { Button } from '@components/ui/Button'
import { PageLabel } from '@components/ui/PageLabel'
import { PostData, getSortedPostsData } from '@lib/docs'

export default function Home({ postData }: { postData: PostData[] }) {
  return (
    <main className="relative container flex flex-col items-center lg:pt-[44px] pt-[33px]">
      <Head>
        <title>Get Started</title>
      </Head>
      <div className="flex flex-col items-center justify-start">
        <PageLabel label="EMPOWER" text="Decentralized AI movement" />
        <h1 className="lg:mb-[32px] mb-[24px]">Get Started</h1>
        <div className="text-center text-gray lg:max-w-[568px] lg:mb-[105px] mb-[78px]">
          Make sure to understand the staking terms and risks before proceeding. With your wallet linked and tokens
          staked, you&apos;re on your way to participating in NorthTensor&apos;s network.
        </div>
        <div className="flex flex-col justify-center lg:gap-[36px] gap-[80px] lg:grid-cols-3 lg:grid lg:mb-[75px] mb-[60px]">
          {' '}
          <div className="relative">
            <div className="absolute flex justify-center w-full">
              <WalletIcon className="-translate-y-1/2" />
            </div>
            <div className="h-full lg:py-[80px] py-[60px] card lg:px-[20px] px-[15px] flex flex-col lg:gap-[20px] gap-[15px]">
              <h4 className="mb-6 font-semibold text-center lg:mb-[52px] lg:mt-0 mt-[20px]">Wallet</h4>
              <Link href="/docs/talisman-general-guide" className="flex gap-[10px]">
                <IconLink />
                Talisman Wallet (desktop)
              </Link>
              <Link href="/docs/nova-general-guide" className="flex gap-[10px]">
                <IconLink />
                Nova Wallet (mobile)
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute flex justify-center w-full">
              <BuyIcon className="-translate-y-1/2" />
            </div>
            <div className="h-full lg:py-[80px] py-[60px] card lg:px-[20px] px-[15px] flex flex-col lg:gap-[20px] gap-[15px]">
              <h4 className="font-semibold text-center lg:mt-0 mt-[20px]">Buy</h4>
              <div className="text-gray flex flex-col lg:gap-[12px] gap-[8px]">
                Centralized Exchange (CEX):
                <div className="lg:w-[214px] w-full h-[2px] bg-[#FFFFFF20]" />
              </div>
              <Link href="/docs/purchase-tao" className="flex gap-[10px]">
                <IconLink />
                Outside the US or with a VPN (desktop)
              </Link>
              <Link href="/docs/purchase-tao-mobile" className="flex gap-[10px]">
                <IconLink />
                Outside the US or with a VPN (mobile)
              </Link>
              <div className="text-gray flex flex-col lg:gap-[12px] gap-[8px]">
                Decentralized Exchange (DEX):
                <div className="lg:w-[214px] w-full h-[2px] bg-[#FFFFFF20]" />
              </div>
              <div className="flex gap-[10px]">
                Using Ethereum, Uniswap, and Taobridge
                <IconSoon className="shrink-0" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute flex justify-center w-full">
              <StakeIcon className="-translate-y-1/2" />
            </div>
            <div className="h-full lg:py-[80px] py-[60px] card lg:px-[20px] px-[15px]">
              <h4 className="mb-6 font-semibold text-center lg:mb-[72px] lg:mt-0 mt-[20px]">Stake</h4>
              <div className="flex flex-col gap-2">
                <Link href="/docs/staking" className="flex gap-[10px]">
                  <IconLink />
                  Staking on NorthTensor
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h1 className="lg:mb-[32px] mb-[24px] lg:max-w-[966px] text-center">
          Leading the Forefront of Decentralized AI.
        </h1>
        <div className="flex justify-center">
          <Link href="/wallet">
            <Button size="lg" weight="semibold" color="blur">
              Get started
            </Button>
          </Link>
        </div>

        <div
          className="w-full h-[350px] mt-[-40px]"
          style={{ background: `url(${tensorGradian.src}) no-repeat center bottom` }}
        ></div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  // Add the "await" keyword like this:
  const postData = getSortedPostsData()

  return {
    props: {
      postData
    }
  }
}
