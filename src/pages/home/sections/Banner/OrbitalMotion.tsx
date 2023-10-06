'use client'

import { useEffect } from 'react'

import AtomIcon1 from '@assets/icons/atom-icon1.svg'
import AtomIcon2 from '@assets/icons/atom-icon2.svg'
import AtomIcon3 from '@assets/icons/atom-icon3.svg'
import AtomIcon4 from '@assets/icons/atom-icon4.svg'
import TensorIcon from '@assets/icons/northtensor-gray.svg'
import Orbital440 from '@assets/icons/orbital.x440.svg'
import Orbital640 from '@assets/icons/orbital.x640.svg'
import Orbital860 from '@assets/icons/orbital.x860.svg'
import Orbital1060 from '@assets/icons/orbital.x1060.svg'

import { Atom } from './Atom'
import { startTransitions } from './transitions'

export const OrbitalMotion = () => {
  useEffect(() => {
    startTransitions()
  }, [])

  return (
    <div className="relative sm:aspect-square text-gray sm:h-auto h-[600px] z-[1] lg:mt-[-760px] md:mt-[-500px] mt-[-200px] lg:mb-[-300px] md:mb-[-100px]">
      <div className="orbital-bg-gradient-transition absolute-center w-[1200px] h-[1200px] -ml-[600px] -mt-[600px] sm:scale-100 scale-50">
        <div className="absolute-center w-[1060px] h-[1060px] -ml-[530px] -mt-[530px] animate-spin-slow-90">
          <Orbital1060 />
          <Atom
            widths={['w-[120px]', 'w-[95px]', 'w-[70px]']}
            heights={['h-[120px]', 'h-[95px]', 'h-[70px]']}
            className="top-0 left-1/2 -ml-[60px] -mt-[60px] animate-reverse-spin-slow-90"
            icon={<AtomIcon1 className="w-[26px] h-[38px]" />}
          />
        </div>
        <div className="absolute-center w-[860px] h-[860px] -ml-[430px] -mt-[430px] animate-spin-slow-90">
          <Orbital860 />
          <Atom
            widths={['w-[110px]', 'w-[90px]', 'w-[70px]']}
            heights={['h-[110px]', 'h-[90px]', 'h-[70px]']}
            className="right-0 top-1/2 -mr-[55px] -mt-[55px] animate-reverse-spin-slow-90"
            icon={<AtomIcon2 className="ml-[-6px] mt-[-6px]" />}
          />
        </div>
        <div className="absolute-center w-[640px] h-[640px] -ml-[320px] -mt-[320px] animate-spin-slow-60">
          <Orbital640 />
          <Atom
            widths={['w-[150px]', 'w-[125px]', 'w-[100px]']}
            heights={['h-[150px]', 'h-[125px]', 'h-[100px]']}
            className="right-0 top-1/2 -mr-[75px] -mt-[75px] animate-reverse-spin-slow-60"
            icon={<AtomIcon3 />}
          />
        </div>
        <div className="absolute-center w-[440px] h-[440px] -ml-[220px] -mt-[220px] animate-spin-slow-50">
          <Orbital440 />
          <Atom
            widths={['w-[80px]', 'w-[61px]', 'w-[42px]']}
            heights={['h-[80px]', 'h-[61px]', 'h-[42px]']}
            className="left-1/2 -ml-[40px] -mt-[40px] animate-reverse-spin-slow-50"
            icon={<AtomIcon4 className="w-[50px] h-[50px] ml-[-4px]" />}
          />
        </div>
        <div className="orbital-nucleus-gradient-transition z-[1] absolute-center flex justify-center items-center w-[240px] h-[240px] -ml-[120px] -mt-[120px] rounded-full">
          <TensorIcon className="lg:w-[180px] w-[140px] lg:h-[180px] h-[140px]" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full">
        <div className="bg-black lg:h-[700px] md:h-[500px] h-[180px]" />
        <div
          className="w-full h-[200px] z-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7063200280112045) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
    </div>
  )
}
