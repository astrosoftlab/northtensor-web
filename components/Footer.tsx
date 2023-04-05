import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import Image from "next/image";
import logo from '../public/noun-owl-759873.svg';

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <li>
    <Link href={href}>
      {text}
    </Link>
  </li>
);


const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-400 py-8">
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-center">Contact Us</h3>
            <ul className="text-sm">
              <li className="text-sm text-center"><a href="mailto:sample@northtensor.ai">sample@northtensor.ai</a></li>
          </ul>
        </div>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold mb-2">Resources</h3>
          <ul className="text-sm">
            <NavLink href="/docs/introduction-to-bittensor" text="Introduction to Bittensor" />
            <NavLink href="/docs/purchase-tao" text="Purchasing Tao" />
            <NavLink href="/docs/introduction-to-staking" text="Guide to Staking" />
            <NavLink href="/docs/staking" text="Staking Tao" />
          </ul>
        </div>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <ul className="text-sm">
            <NavLink href="https://twitter.com/mnrv_ai" text="Twitter" />
            <NavLink href="https://discordapp.com/channels/1086368192521318472/1087797623924195408" text="Discord" />
          </ul>
        </div>
      </div>
    </div>
  </footer>
);


export default Footer;

