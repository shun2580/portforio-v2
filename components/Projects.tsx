import { projectsData } from '@/data/projectsData';
import FadeInSection from './FadeInSection';

export default function Projects(): React.ReactNode {
  return (
    <section id="projects" className="bg-[#0F172A] px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#F1F5F9]">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projectsData.map((project, idx) => (
              <article
                key={idx}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#334155] border-l-4 border-l-[#3B82F6] bg-[#1E293B] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1.5 text-base font-bold text-[#F1F5F9]">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#94A3B8]">{project.overview}</p>
                  <div className="mb-4 flex-1 space-y-2.5 text-sm">
                    <LabeledSection label="課題" color="red">{project.problem}</LabeledSection>
                    <LabeledSection label="施策" color="blue">{project.solution}</LabeledSection>
                    <LabeledSection label="成果" color="green">{project.result}</LabeledSection>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="rounded-full border border-[#334155] bg-[#0F172A] px-2.5 py-0.5 text-xs font-medium text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-sm font-semibold text-[#3B82F6] transition hover:text-blue-400"
                    >
                      GitHub で見る →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeInSection>
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
    <div className="leading-relaxed text-[#94A3B8]">
      <span className={`mr-1.5 inline-block rounded border px-1.5 py-0.5 text-xs font-bold ${colorMap[color]}`}>
        {label}
      </span>
      {children}
    </div>
  );
}
