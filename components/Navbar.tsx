const navLinks = [
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#career',   label: 'Career' },
  { href: '#contact',  label: 'Contact' },
];

export default function Navbar(): React.ReactNode {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#334155] bg-[#0F172A]">
      <nav className="mx-auto flex max-w-5xl items-center justify-end px-6 py-4">
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#94A3B8] transition hover:text-[#F1F5F9]"
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
