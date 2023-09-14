import Link from 'next/link'

import Discord from '@assets/icons/discord.svg'
import Meta from '@assets/icons/meta.svg'
import { Logo } from '@components/ui/Logo'

export default function Example() {
  return (
    <>
      <footer className="relative flex flex-col items-center gap-16 py-16 overflow-hidden 2xl:py-[55px] md:py-[59px]">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-8 relative z-[1] text-white">
            <Logo />
            <div className="flex items-center grow">
              <div className="w-full h-[2px] bg-[linear-gradient(90deg,rgba(217,175,255,0.97)0%,rgba(180,116,237,0.79)22%,rgba(138,55,214,0.60)45%,rgba(104,44,177,0.30)73%,rgba(0,34,144,0.00)100%)]"></div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-row gap-4 sm:flex-row">
                <Link
                  href="https://twitter.com/NorthTensorAI"
                  className="flex items-center space-x-3 transition hover:text-purple-400"
                >
                  <Meta />
                </Link>
                <Link
                  href="https://discordapp.com/channels/1086368192521318472/1087797623924195408"
                  className="flex items-center space-x-3 transition hover:text-purple-400"
                >
                  <Discord />
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-white lg:text-[11px] text-[10px] lg:mt-[54px] mt-[40px]">
            <div className="leading-tight">© 2023 NorthTensor. All rights reserved.</div>
            <div className="flex justify-center">
              <Link href={'/privacy'} className="hover:text-primary">
                Privacy Policy
              </Link>
              &nbsp;|&nbsp;
              <Link href={'/terms'} className="hover:text-primary">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
