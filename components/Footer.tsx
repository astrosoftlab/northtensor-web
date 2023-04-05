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
              <li className="text-sm text-center"><a href="mailto:sample@northtensor.ai">sample@northtensor.com</a></li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-center">Resources</h3>
          <ul className="text-sm">
          <li className="mb-2 text-center"><a href="docs/introduction-to-bittensor">Introduction to Bittensor</a></li>
          <li className="mb-2 text-center"><a href="docs/purchase-tao">Purchasing Tao</a></li>
          <li className="mb-2 text-center"><a href="docs/introduction-to-staking">Introduction to Staking</a></li>
          <li className="mb-2 text-center"><a href="docs/staking">Staking Tao</a></li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-center">Follow Us</h3>
          <ul className="text-sm">
            <li className="mb-2 text-center"><a href="https://twitter.com/mnrv_ai">Twitter</a></li>
            <li className="mb-2 text-center"><a href="https://discordapp.com/channels/1086368192521318472/1087797623924195408">Discord</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);


export default Footer;

