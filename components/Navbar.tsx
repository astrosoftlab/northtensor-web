import Link from 'next/link';
import Image from "next/image";
import logo from '../public/noun-owl-759873.svg';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <li className="mr-4">
    <Link className="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-gray-400 mr-4" href={href}>
      {text}
    </Link>
  </li>
);




// const Navbar: React.FC = () => (
//   <nav className="h-16 flex justify-between items-center bg-gray-800 text-white px-4">
//     <Image src={logo} alt="mnrv.ai logo" className="text-xl font-bold h-10 object-contain w-auto" />
//     <NavLink href="/" text="Home" />
//     <div class="block lg:hidden">
//     <ul className="flex list-none">
//       <NavLink href="/resources" text="Resources" />
      
//       <NavLink href="/roadmap" text="Roadmap" />
//     </ul>
//   </nav>
// );

const Navbar: React.FC = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
<nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <Link href="/">
      <Image src={logo} alt="mnrv.ai logo" className="text-xl font-bold h-10 object-contain w-auto"/>
    </Link>
  </div>
  <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto flex flex-row">
    <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto flex flex-row list-none">
      <NavLink href="/resources" text="Resources" />
      <NavLink href="/resources" text="Tools" />
      <NavLink href="/roadmap" text="Roadmap" />
    </div>
    <div className="flex gap-4">
       <Link href="/wallet" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-100 hover:border-transparent hover:text-gray-100 hover:bg-gray-500 mt-4 lg:mt-0">Wallet</Link>
      {!session ? (
        <Link href="/profile" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-100 hover:border-transparent hover:text-gray-100 hover:bg-gray-500 mt-4 lg:mt-0">Log In</Link>
      ) : (
        <Link href="/profile" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-100 hover:border-transparent hover:text-gray-100 hover:bg-gray-500 mt-4 lg:mt-0">Account</Link>

      )}
    </div>
  </div>
</nav>
)
};

export default Navbar;

