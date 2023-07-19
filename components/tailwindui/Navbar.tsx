import Image from "next/image";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Get Started', href: '/resources' },
  { name: 'Stake on North Tensor', href: '/wallet' }
  // { name: 'Built on Bittensor', href: '/built-on-bittensor' }, 
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter();

  const closeMenu = () => {
      setMobileMenuOpen(false);
  };

  useEffect(() => {
      router.events.on('routeChangeStart', closeMenu);

      return () => router.events.off('routeChangeStart', closeMenu);
  }, [router.events]);

  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <header className="bg-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex lg:flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">North Tensor</span>
            <img className="h-16 w-auto" src="/images/invert.svg" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden"></div>
        <div className="hidden lg:flex lg:gap-x-12 justify-center">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block ">
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Link href="/wallet/" className="ml-auto rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
              Wallet 
            </Link>
            {!session ? (
              <Link href="/profile/" className="ml-2 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                Log In
              </Link>
            ) : (
              <Link href="/profile/" className="ml-2 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                Account 
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link href="/" className="block md:hidden -m-1.5 p-1.5">
              <span className="sr-only">North Tensor</span>
              <img
                className="h-16 w-auto"
                src="/images/invert.svg"
              />
            </Link>
            <div></div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-slate-800"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link href='/wallet'
                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-slate-800">
                   Wallet
                </Link>
                {!session ? (
                  <Link href="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-slate-800">
                    Log in
                  </Link>
                ) : (
                  <Link href='/profile'
                     className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-slate-800"
                     >
                     Profile
                     </Link>
                     )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
