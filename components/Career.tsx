import { careerData } from '@/data/careerData';

export default function Career(): React.ReactNode {
  return (
    <section id="career" className="bg-slate-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-slate-900">Career</h2>
        <div className="space-y-8">
          {careerData.map((entry, idx) => (
            <div key={idx} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  {entry.company}
                </h3>
                <span className="text-sm font-semibold text-slate-500">
                  {entry.period}
                </span>
              </div>
              <p className="mb-3 font-semibold text-blue-600">{entry.role}</p>
              <p className="text-slate-700">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
