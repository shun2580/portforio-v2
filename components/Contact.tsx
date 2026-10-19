import { FaGithub } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { SiZenn } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { contactData } from '@/data/contactData';
import FadeInSection from './FadeInSection';
import SectionHeading from './SectionHeading';

interface ContactLink {
  label: string;
  href: string;
  icon: IconType;
  external: boolean;
}

export default function Contact(): React.ReactNode {
  const links: ContactLink[] = [
    { label: 'Email', href: `mailto:${contactData.email}`, icon: MdOutlineMail, external: false },
    { label: 'GitHub', href: contactData.github, icon: FaGithub, external: true },
    { label: 'Zenn', href: contactData.zenn, icon: SiZenn, external: true },
  ].filter((link) => link.href !== 'mailto:' && link.href !== '');

  return (
    <section id="contact" className="bg-bg px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <SectionHeading>Contact</SectionHeading>
          <div className="flex flex-wrap gap-3">
            {links.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg transition hover:border-accent"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
