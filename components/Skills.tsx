import { skillsData } from '@/data/skillsData';

export default function Skills(): React.ReactNode {
  return (
    <section id="skills" className="bg-slate-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-slate-900">Skills</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {skillsData.map((category, idx) => (
            <div key={idx} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIdx) => (
                  <li key={skillIdx} className="text-slate-700">
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
