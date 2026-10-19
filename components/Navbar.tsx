import { heroData } from '@/data/heroData';

const navLinks = [
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#career',   label: 'Career' },
  { href: '#contact',  label: 'Contact' },
];

export default function Navbar(): React.ReactNode {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a
          href="#hero"
          className="shrink-0 whitespace-nowrap text-sm font-bold tracking-tight text-fg sm:text-base"
        >
          {heroData.name}
        </a>
        <ul className="flex gap-3 sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-xs font-medium text-muted transition hover:text-fg sm:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
