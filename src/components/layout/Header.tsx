import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Button } from '@components/ui/Button'
import { Logo } from '@components/ui/Logo'
import { useOnClickOutside } from '@hooks/utils/useClickOutside'
import { cn } from '@lib/utils'

export default function Example() {
  const node = useRef<any>()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathName = usePathname()

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  useOnClickOutside(node, () => {
    setMobileMenuOpen(false)
  })

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)

    return () => router.events.off('routeChangeStart', closeMenu)
  }, [router.events])

  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <header>
      {pathName !== '/' && <div className="bg-gradient-layout-header absolute w-full h-[468px] top-[-106px]" />}
      <nav className={`relative z-10 w-full ${pathName === '/' ? '' : 'bg-card'}`}>
        <div className="container">
          <div className="relative flex items-center py-3 md:py-4">
            <div className="relative z-20 flex justify-between w-full sm:hidden md:px-0 sm:w-max ">
              <Logo />
              <div className="relative flex items-center max-h-10 sm:hidden">
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
              ref={node}
              id="navlinks"
              className={cn(
                'absolute sm:relative left-0 z-20 flex-col flex-wrap justify-between sm:visible',
                'w-full gap-6 p-8 transition-all duration-300 origin-top-right translate-y-1 bg-gray-950 border border-solid border-gray-200 shadow-2xl top-full rounded-3xl shadow-gray-600/10  sm:flex sm:grow sm:translate-y-0 sm:flex-row sm:items-center sm:gap-0 sm:border-none sm:bg-transparent sm:p-0 sm:opacity-100 sm:shadow-none',
                mobileMenuOpen ? '' : 'invisible opacity-0'
              )}
            >
              <Logo />
              <div className="w-full sm:w-auto sm:pr-4 sm:pt-0 pt-8 flex flex-col gap-6 tracking-wide sm:flex-row sm:gap-[50px] sm:text-[15px] text-sm">
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
              <div className="flex mt-12 gap-d-16 sm:mt-0">
                <Link href="/wallet">
                  <Button color="blur">Wallet</Button>
                </Link>
                <div className="lg:block hidden w-[1px] flex-1 bg-white-20" />
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
