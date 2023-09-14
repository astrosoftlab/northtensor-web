import dynamic from 'next/dynamic'

const WalletApp = dynamic(() => import('@pages/wallet/WalletApp'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center sm:px-8 lg:px-16 xl:px-20">
      <WalletApp />
    </main>
  )
}
