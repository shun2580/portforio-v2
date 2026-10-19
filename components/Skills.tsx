import {
  SiPhp, SiLaravel, SiNextdotjs, SiVuedotjs,
  SiDocker, SiLinux, SiMysql, SiGitlab,
  SiGo, SiTypescript, SiGithubactions, SiGit, SiClaude,
  SiGithubcopilot, SiTmux, SiGnubash, SiDatadog, SiGrafana,
  SiRedis, SiCucumber,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { skillsData } from '@/data/skillsData';
import FadeInSection from './FadeInSection';
import SectionHeading from './SectionHeading';

const iconMap: Record<string, IconType> = {
  'PHP':        SiPhp,
  'Laravel':    SiLaravel,
  'Next.js':    SiNextdotjs,
  'Vue.js':     SiVuedotjs,
  'AWS (ECS)':  FaAws,
  'AWS (ECS / S3 / CloudFront)': FaAws,
  'Docker':     SiDocker,
  'Docker / DevContainer': SiDocker,
  'Redis':      SiRedis,
  'BDD (Gherkin)': SiCucumber,
  'Datadog / Zabbix / Grafana': SiDatadog,
  'Linux':      SiLinux,
  'MySQL':      SiMysql,
  'GitLab CI':  SiGitlab,
  'Go':                     SiGo,
  'TypeScript / JavaScript': SiTypescript,
  'GitHub Actions':         SiGithubactions,
  'Git / GitLab':           SiGit,
  'Claude Code':            SiClaude,
  'GitHub Copilot':         SiGithubcopilot,
  'tmux':                   SiTmux,
  'Bash':                   SiGnubash,
  'Datadog':                SiDatadog,
  'Grafana':                SiGrafana,
};

export default function Skills(): React.ReactNode {
  return (
    <section id="skills" className="bg-surface px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <SectionHeading>Skills</SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {skillsData.map((category, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => {
                    const Icon = iconMap[skill];
                    return (
                      <span
                        key={skillIdx}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs font-medium text-muted"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
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
