import Link from 'next/link'

import Atom1 from '@assets/icons/atom1.svg'
import Atom2 from '@assets/icons/atom2.svg'
import Atom3 from '@assets/icons/atom3.svg'
import Atom4 from '@assets/icons/atom4.svg'
import NorthTensorElectron from '@assets/icons/northtensor-electron.svg'
import Orbital440 from '@assets/icons/orbital.x440.svg'
import Orbital640 from '@assets/icons/orbital.x640.svg'
import Orbital860 from '@assets/icons/orbital.x860.svg'
import Orbital1060 from '@assets/icons/orbital.x1060.svg'
import { Button } from '@components/ui/Button'
import { PageLabel } from '@components/ui/PageLabel'

export const BannerSection = () => (
  <section className="" id="home">
    <div className="container">
      <div className="relative ml-auto py-[16px] z-[2]">
        <PageLabel label="NEW" text="Bittensor-First AI Firm" transparent />
        <div className="mx-auto lg:w-4/5">
          <div className="flex flex-col-reverse justify-between text-center sm:flex-row">
            <div className="flex flex-col items-center w-full gap-8">
              <br />
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl xl:text-7xl">NorthTensor</h1>
              <h3 className="text-3xl font-bold leading-tight text-gray-200 md:text-4xl xl:text-5xl">
                Leading the forefront of Decentralized AI
              </h3>
              <p className="text-gray-200">
                Our mission is to catalyze the decentralized AI movement by strategically investing in and developing on
                the most promising projects in the space.
              </p>
              <div className="flex justify-center gap-y-4 gap-x-6">
                <Link href="/wallet">
                  <Button size="lg" weight="semibold" color="blur">
                    Start Staking
                  </Button>
                </Link>
                <a href="/resources">
                  <Button size="lg" color="white" weight="semibold">
                    Learn more
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NorthTensorOrbitalMotion />
    </div>
  </section>
)

const NorthTensorOrbitalMotion = () => {
  return (
    <div className="relative lg:aspect-square text-gray lg:h-auto h-[600px] z-[1]">
      <div
        className="absolute-center w-[1200px] h-[1200px] -ml-[600px] -mt-[600px] lg:scale-100 scale-50"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(217, 175, 255, 0.97) 0%, rgba(180, 116, 237, 0.79) 22%, rgba(138, 55, 214, 0.60) 45%, rgba(104, 44, 177, 0.30) 73%, rgba(0, 34, 144, 0.00) 100%)'
        }}
      >
        <div className="absolute-center w-[1060px] h-[1060px] -ml-[530px] -mt-[530px] animate-spin-slow-90">
          <Orbital1060 />
          <Atom4 className="absolute left-1/2 -ml-[60px] -mt-[60px]" />
        </div>
        <div className="absolute-center w-[860px] h-[860px] -ml-[430px] -mt-[430px] animate-spin-slow-90">
          <Orbital860 />
          <Atom3 className="absolute top-0 left-1/2 -ml-[52px] -mt-[52px]" />
        </div>
        <div className="absolute-center w-[640px] h-[640px] -ml-[320px] -mt-[320px] animate-spin-slow-60">
          <Orbital640 />
          <Atom2 className="absolute left-0 top-1/2 -ml-[86px] -mt-[86px] animate-spin-slow-50" />
        </div>
        <div className="absolute-center w-[440px] h-[440px] -ml-[220px] -mt-[220px] animate-spin-slow-50">
          <Orbital440 />
          <Atom1 className="absolute left-1/2 -ml-[48px] -mt-[48px]" />
        </div>
        <div className="absolute-center w-[240px] h-[240px] -ml-[120px] -mt-[120px]">
          <NorthTensorElectron />
        </div>
      </div>
    </div>
  )
}
