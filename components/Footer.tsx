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
  <nav className={styles.nav}>
    <Image src={logo} alt="mnrv.ai logo" className={styles.toplogo} />
    <ul>
      <NavLink href="/resources" text="Resources" />
      <NavLink href="/" text="Home" />
      <NavLink href="/roadmap" text="Roadmap" />
    </ul>
  </nav>
);

export default Footer;

