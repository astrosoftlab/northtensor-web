import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Button } from '@components/ui/Button'
import { Logo } from '@components/ui/Logo'
import { cn } from '@lib/utils'

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
      <nav className={`${pathName === '/' ? '' : 'bg-white'} z-10 w-full`}>
        <div className="container">
          <div className="relative flex items-center py-3 md:py-4">
            <div className="relative z-20 flex justify-between w-full lg:hidden md:px-0 lg:w-max ">
              <Logo />
              <div className="relative flex items-center max-h-10 lg:hidden">
                <button
                  aria-label="humburger"
                  id="hamburger"
                  className="relative p-6 pr-0"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-white transition duration-300  "
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-white transition duration-300  "
                  ></div>
                </button>
              </div>
            </div>
            <div
              id="navlinks"
              className={cn(
                'absolute lg:relative left-0 z-20 flex-col flex-wrap justify-between sm:visible',
                'w-full gap-6 p-8 transition-all duration-300 origin-top-right translate-y-1 bg-[#ffffff20] border border-gray-200 shadow-2xl top-full rounded-3xl shadow-gray-600/10  lg:flex lg:grow lg:translate-y-0 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none',
                mobileMenuOpen ? '' : 'invisible opacity-0',
              )}
            >
              <Logo />
              <div className="w-full lg:w-auto lg:pr-4 lg:pt-0 pt-8 flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-[50px] lg:text-[15px] text-sm">
                <Link href="/" className="flex gap-2 font-semibold text-white transition hover:text-primary">
                  <span className="">Home</span>
                </Link>
                <Link href="#" className="flex gap-2 font-semibold text-white transition hover:text-primary">
                  <span className="">User</span>
                </Link>
                <Link href="/wallet" className="flex gap-2 font-semibold text-white transition hover:text-primary">
                  <span className="">Staking</span>
                </Link>
                <Link href="/resources" className="flex font-semibold text-white transition hover:text-primary">
                  <span className="">Document</span>
                </Link>
              </div>
              <div className="flex gap-2 mt-12 lg:mt-0 ">
                <Link href="/wallet">
                  <Button color="opacity">Wallet</Button>
                </Link>
                <Link href="/profile">
                  <Button color="white">{session ? 'Profile' : 'Log In'}</Button>
                </Link>
              </div>
            </div>
            <div />
          </div>
        </div>
      </nav>
    </header>
  )
}
