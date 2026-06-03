import { skillsData } from '@/data/skillsData';

const categoryColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-500',
];

export default function Skills(): React.ReactNode {
  return (
    <section id="skills" className="bg-slate-50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Skills</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-blue-500" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {skillsData.map((category, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60"
            >
              <div className={`mb-4 h-1 w-8 rounded-full ${categoryColors[idx % categoryColors.length]}`} />
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                {category.category}
              </h3>
              <ul className="space-y-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <li key={skillIdx} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${categoryColors[idx % categoryColors.length]}`} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
