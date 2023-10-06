'use client'

import Link from 'next/link'

import { BRD } from '@components/ui/BRD'
import { PageLabel } from '@components/ui/PageLabel'

import { OrbitalMotion } from './OrbitalMotion'

export const BannerSection = () => (
  <section className="" id="home">
    <div className="container">
      <div className="relative ml-auto py-[16px] z-[2]">
        <Link href="/docs/staking" className="flex gap-[10px]">
          <PageLabel label="Stake" text="Earn 23% APY on your Tao" transparent />
        </Link>
        <div className="mx-auto sm:w-4/5">
          <div className="flex flex-col-reverse justify-between text-center sm:flex-row">
            <div className="flex flex-col items-center w-full gap-8">
              <br />
              <h1 className="break-normal text-white sm:max-w-[966px]">
                NorthTensor <BRD />
              </h1>
              <h3 className="break-normal text-gray">Leading the Forefront of Decentralized AI</h3>
              <div className="break-normal text-gray text-body-lg sm:max-w-[568px]">
                Our mission is to catalyze the decentralized AI movement by strategically investing in and developing on
                the most promising projects in the space.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrbitalMotion />
  </section>
)
