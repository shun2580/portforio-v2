import { contactData } from '@/data/contactData';
import { heroData } from '@/data/heroData';

export default function Footer(): React.ReactNode {
  const links = [
    { label: 'GitHub', href: contactData.github },
    { label: 'Zenn', href: contactData.zenn },
  ].filter((link) => link.href !== '');

  return (
    <footer className="border-t border-border bg-bg px-4 py-8">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {heroData.name}
        </p>
        <ul className="flex gap-5">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
