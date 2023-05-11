import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import Layout from "@/components/Layout";
import { Inter } from 'next/font/google'
// import landing from "@/tailwindui/Landing.tsx"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
    <main className={`${inter.variable} font-sans`}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </main>
    </SessionContextProvider>
  );
}
