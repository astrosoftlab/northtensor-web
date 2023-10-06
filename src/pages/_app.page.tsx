import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
