import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => (
  <Link href="/" aria-label="logo" className="flex items-center space-x-2 hover:text-inherit">
    <Image width={28} height={28} src="/images/logo.svg" alt="" />
    <span className="text-xl font-bold text-white">NORTHTENSOR</span>
  </Link>
)
