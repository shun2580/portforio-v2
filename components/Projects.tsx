import { projectsData } from '@/data/projectsData';

export default function Projects(): React.ReactNode {
  return (
    <section id="projects" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-3xl font-bold text-slate-900">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projectsData.map((project, idx) => (
            <article
              key={idx}
              className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:shadow-md"
            >
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {project.title}
              </h3>
              <p className="mb-3 text-sm text-slate-600">{project.overview}</p>
              <div className="mb-4 space-y-2 text-sm text-slate-700">
                <p>
                  <strong>Problem:</strong> {project.problem}
                </p>
                <p>
                  <strong>Solution:</strong> {project.solution}
                </p>
                <p>
                  <strong>Result:</strong> {project.result}
                </p>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
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
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  View on GitHub →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
