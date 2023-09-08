import { useState } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'

import Layout from '@components/layout'
import '@styles/globals.css'

export default function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session
}>) {
  const [supabase] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>NorthTensor</title>
      </Head>
      <div className={`flex flex-col min-h-screen`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionContextProvider>
  )
}
