import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'

import { Background } from './Background'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Header />
      {children}
      <Footer />
    </>
  )
}
