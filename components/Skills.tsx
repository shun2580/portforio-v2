import {
  SiPhp, SiLaravel, SiNextdotjs, SiVuedotjs,
  SiDocker, SiLinux, SiMysql, SiGitlab,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { skillsData } from '@/data/skillsData';
import FadeInSection from './FadeInSection';

const iconMap: Record<string, IconType> = {
  'PHP':        SiPhp,
  'Laravel':    SiLaravel,
  'Next.js':    SiNextdotjs,
  'Vue.js':     SiVuedotjs,
  'AWS':        FaAws,
  'Docker':     SiDocker,
  'Linux':      SiLinux,
  'MySQL':      SiMysql,
  'GitLab CI':  SiGitlab,
  'GitLab':     SiGitlab,
};

export default function Skills(): React.ReactNode {
  return (
    <section id="skills" className="bg-[#1E293B] px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#F1F5F9]">Skills</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {skillsData.map((category, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#334155] bg-[#1E293B] p-5"
              >
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => {
                    const Icon = iconMap[skill];
                    return (
                      <span
                        key={skillIdx}
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#334155] bg-[#0F172A] px-2.5 py-1.5 text-xs font-medium text-[#94A3B8]"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 text-[#3B82F6]" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
