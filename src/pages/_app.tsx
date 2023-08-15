import { useState } from "react"

import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import Head from "next/head"

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react"

import Layout from "@components/layout"
import "@styles/globals.css"

// import landing from "@/tailwindui/Landing.tsx"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>NorthTensor</title>
      </Head>
      <div className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionContextProvider>
  )
}
