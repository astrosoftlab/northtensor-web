import Head from 'next/head'
import Link from 'next/link'

import { PostData, getSortedPostsData } from '@lib/docs'

export default function Home({ postData }: { postData: PostData[] }) {
  return (
    <main className="flex flex-col justify-center md:flex-row">
      <Head>
        <title>Get Started</title>
      </Head>
      <div className="w-3/4 p-4">
        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
          <br />
        </h1>
        <br />

        <div className="justify-center block grid-cols-3 gap-8 md:grid md:gap-8">
          {' '}
          {/* Added block class for mobile stacking */}
          {/* Wallet Panel */}
          <div className="px-4 py-5 card sm:p-8">
            <h2 className="mb-6 text-3xl font-semibold sm:text-4xl">Wallet</h2>
            <div className="flex flex-col gap-2">
              <Link href="/docs/talisman-general-guide" className="text-md">
                - Talisman Wallet (desktop)
              </Link>
              <Link href="/docs/nova-general-guide" className="text-md">
                - Nova Wallet (mobile)
              </Link>
            </div>
          </div>
          {/* Buy Panel */}
          <div className="px-4 py-5 card sm:p-8">
            {' '}
            {/* Added margin for mobile spacing */}
            <h2 className="mb-6 text-3xl font-semibold sm:text-4xl">Buy</h2>
            <h5 className="mt-4 mb-2 text-xs font-semibold text-gray-400 sm:text-sm">Centralized Exchange (CEX):</h5>
            <div className="flex flex-col gap-2">
              <Link href="/docs/purchase-tao" className="text-md">
                - Outside the US or with a VPN (desktop)
              </Link>
              <Link href="/docs/purchase-tao-mobile" className="text-md">
                - Outside the US or with a VPN (mobile)
              </Link>
            </div>
            <h3 className="mt-6 mb-2 text-xs font-semibold text-gray-400 sm:text-sm">Decentralized Exchange (DEX):</h3>
            <p className="">- Using Ethereum, Uniswap, and Taobridge (coming soon)</p>
          </div>
          {/* Stake Panel */}
          <div className="px-4 py-5 card sm:p-8">
            {' '}
            {/* Added margin for mobile spacing */}
            <h2 className="mb-6 text-3xl font-semibold sm:text-4xl">Stake</h2>
            <div className="flex flex-col gap-2">
              <Link href="/docs/staking" className="text-md">
                - Staking on NorthTensor
              </Link>
            </div>
          </div>
        </div>
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
