import { ToastContainer } from 'react-toastify'

import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'

import { Background } from './Background'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex flex-col min-h-screen`}>
      <Background />
      <ToastContainer
        closeButton={false}
        className="adjusted-top-right"
        toastClassName="!bg-[#111] md:!rounded-lg !rounded-md"
        toastStyle={{
          boxShadow:
            '0px 8px 10px 0px rgba(0, 0, 0, 0.20), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 16px 24px 0px rgba(0, 0, 0, 0.14)'
        }}
        bodyClassName="md:!text-[17px] !text-[12px] !text-white !font-inter !font-bold md:!leading-[22px] !leading-[17px] !tracking-wide"
        progressClassName="!bg-primary"
      />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
