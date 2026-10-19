import { projectsData } from '@/data/projectsData';
import { FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/data/types';
import FadeInSection from './FadeInSection';
import SectionHeading from './SectionHeading';

const groups: { kind: Project['kind']; label: string }[] = [
  { kind: 'work', label: '業務' },
  { kind: 'personal', label: '個人開発' },
];

export default function Projects(): React.ReactNode {
  return (
    <section id="projects" className="bg-bg px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Projects</SectionHeading>
        {groups.map(({ kind, label }) => {
          const items = projectsData.filter((p) => p.kind === kind);
          if (items.length === 0) return null;
          return (
            <div key={kind} className="mb-12 last:mb-0">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-muted">
                {label}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((project) => (
                  <FadeInSection key={project.title} className="h-full">
                    <article
                                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-blue-500/10"
                    >
                      <div className="flex flex-1 flex-col p-5">
                        <span
                          className={`mb-3 inline-block w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            project.kind === 'personal'
                              ? 'border-accent/40 bg-accent/10 text-accent'
                              : 'border-border bg-bg text-muted'
                          }`}
                        >
                          {project.kind === 'personal' ? '個人開発' : '業務'}
                        </span>
                        <h3 className="mb-1 text-base font-bold text-fg">{project.title}</h3>
                        {project.period && (
                          <p className="mb-2 text-xs text-muted">{project.period}</p>
                        )}
                        <p className="mb-4 text-sm leading-relaxed text-muted">{project.overview}</p>
                        <div className="mb-4 flex-1 space-y-2.5 text-sm">
                          <LabeledSection label="課題" color="red">{project.problem}</LabeledSection>
                          <LabeledSection label="施策" color="blue">{project.solution}</LabeledSection>
                          <LabeledSection label="成果" color="green">{project.result}</LabeledSection>
                        </div>
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {(project.githubUrl !== '#' || project.storeUrl) && (
                          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1">
                            {project.githubUrl !== '#' && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-blue-400"
                              >
                                GitHub で見る
                                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                            {project.storeUrl && (
                              <a
                                href={project.storeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-blue-400"
                              >
                                Chrome Web Store で見る
                                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </FadeInSection>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LabeledSection({
  label,
  color,
  children,
}: {
  label: string;
  color: 'red' | 'blue' | 'green';
  children: React.ReactNode;
}) {
  const colorMap = {
    red:   'border-red-500/40 bg-red-500/10 text-red-400',
    blue:  'border-blue-500/40 bg-blue-500/10 text-blue-400',
    green: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  };
  return (
    <div className="leading-relaxed text-muted">
      <span className={`mr-1.5 inline-block rounded border px-1.5 py-0.5 text-xs font-bold ${colorMap[color]}`}>
        {label}
      </span>
      {children}
    </div>
  );
}
