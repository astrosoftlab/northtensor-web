import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'

const WalletApp = dynamic(() => import('@/components/WalletApp'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className="main flex flex-col justify-between items-center p-24 min-h-screen">
        <WalletApp />
      </main>
    </>
  )
}
