import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathName = usePathname()

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)

    return () => router.events.off('routeChangeStart', closeMenu)
  }, [router.events])

  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <header>
      <nav className={`${pathName === '/' ? '' : 'bg-white'} z-10 w-full border-b border-b-gray-100 border-solid`}>
        <div className="container">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4 ">
            <div className="relative z-20 flex justify-between w-full md:px-0 lg:w-max ">
              <Link href="/" aria-label="logo" className="flex items-center gap-1 space-x-2 hover:text-inherit">
                <Image width={40} height={40} src="/images/logo.svg" alt="" />
                <div className="flex text-2xl font-bold">
                  <span className="text-primary">NORTH</span>
                  <span>TENSOR</span>
                </div>
              </Link>
              <div className="relative flex items-center max-h-10 lg:hidden ">
                <button
                  aria-label="humburger"
                  id="hamburger"
                  className="relative p-6 -mr-6"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300  "
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300  "
                  ></div>
                </button>
              </div>
            </div>
            <div
              id="navLayer"
              aria-hidden="true"
              className="fixed inset-0 z-10 w-screen h-screen transition duration-500 origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl lg:hidden"
            ></div>
            <div
              id="navlinks"
              className={`absolute left-0 z-20 flex-col flex-wrap justify-end sm:visible ${
                mobileMenuOpen ? '' : 'invisible opacity-0'
              } w-full gap-6 p-8 transition-all duration-300 origin-top-right translate-y-1 bg-white border border-gray-100 shadow-2xl top-full rounded-3xl shadow-gray-600/10  lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none`}
            >
              <div className="w-full text-gray-600 lg:w-auto lg:pr-4 lg:pt-0 ">
                <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm ">
                  <li className="">
                    <Link
                      href="/resources"
                      className="block font-semibold text-gray-700 transition hover:text-primary md:px-4 "
                    >
                      <span className="">Get Started</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/wallet"
                      className="flex gap-2 font-semibold text-gray-700 transition hover:text-primary md:px-4 "
                    >
                      <span className="">Stake on NorthTensor</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex gap-2 mt-12 lg:mt-0 ">
                <Link
                  href="/wallet"
                  className="relative flex items-center justify-center w-full px-4 h-9 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-primary ">Wallet</span>
                </Link>
                <Link
                  href="/profile"
                  className="relative flex items-center justify-center w-full px-4 h-9 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white "> {session ? 'Profile' : 'Log In'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
