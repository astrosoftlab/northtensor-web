import Link from 'next/link';

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

const NavLinks: React.FC = () => (
  <ul>
    <NavLink href="/resources" text="Resources" />
    <NavLink href="/" text="Home" />
    <NavLink href="/roadmap" text="Roadmap" />
  </ul>
);

export default NavLinks;
