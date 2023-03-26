import NavLinks from './NavLinks';
import styles from '../styles/navbar.module.css';
import Image from "next/image";
import logo from '../public/noun-owl-759873.svg';


const Footer: React.FC = () => (
  <nav className={styles.nav}>
    <Image src={logo} alt="mnrv.ai logo" className={styles.toplogo} />
    <NavLinks />
  </nav>
);

export default Footer;