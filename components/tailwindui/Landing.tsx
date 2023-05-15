import Link from "next/link"
import Image from "next/image"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
<div className="bg-slate-900">
      <main className='flex h-fill'>
        {/* Hero section */}
        <div className="relative isolate">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
          </svg>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 max-w-lg text-4xl font-extrabold tracking-tight text-slate-50 sm:text-6xl">
                Build Your Project on Bittensor
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We are a Bittensor-first AI Firm aiming to utilize the inevitable union of economic efficiencies provided through cryptocurrency technologies. Our focus is to create infrastructure required to scale and support basic transformer driven data extraction to Artificial General Intelligence.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/resources"
                  className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                >
                  Get started
                </Link>
                {/* <Link href="#" className="text-sm font-semibold leading-6 text-slate-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link> */}
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
              <svg viewBox="0 0 950 950" role="img" className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
                <title>App screenshot</title>
                <defs>
                  <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                    <rect width={316} height={684} rx={36} />
                  </clipPath>
                </defs>
                <foreignObject
                  width={950}
                  height={950}
                >
                  <img src="/images/viking-ship.png" alt="" />
                </foreignObject>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
