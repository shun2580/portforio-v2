import { skillsData } from '@/data/skillsData';

const categoryColors = [
  { bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 ring-blue-200' },
  { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  { bar: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 ring-orange-200' },
];

export default function Skills(): React.ReactNode {
  return (
    <section id="skills" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900">Skills</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {skillsData.map((category, idx) => {
            const color = categoryColors[idx % categoryColors.length];
            return (
              <div key={idx} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                <div className={`mb-3 h-0.5 w-8 rounded-full ${color.bar}`} />
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${color.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
