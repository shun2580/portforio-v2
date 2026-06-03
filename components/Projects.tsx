import { projectsData } from '@/data/projectsData';

export default function Projects(): React.ReactNode {
  return (
    <section id="projects" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projectsData.map((project, idx) => (
            <article
              key={idx}
              className="flex flex-col overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/60 transition hover:shadow-md"
            >
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1.5 text-base font-bold text-slate-900">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-500">{project.overview}</p>
                <div className="mb-4 flex-1 space-y-2.5 text-sm">
                  <LabeledSection label="課題" color="red">{project.problem}</LabeledSection>
                  <LabeledSection label="施策" color="blue">{project.solution}</LabeledSection>
                  <LabeledSection label="成果" color="green">{project.result}</LabeledSection>
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
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
                    className="mt-auto text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                  >
                    GitHub で見る →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
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
    red: 'border-red-200 bg-red-50 text-red-700',
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  };
  return (
    <div className="leading-relaxed text-slate-700">
      <span className={`mr-1.5 inline-block rounded border px-1.5 py-0.5 text-xs font-bold ${colorMap[color]}`}>
        {label}
      </span>
      {children}
    </div>
  );
}
