import dynamic from 'next/dynamic'

const WalletApp = dynamic(() => import('@pages/wallet/WalletApp'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <WalletApp />
    </main>
  )
}
