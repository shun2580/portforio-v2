import { careerData } from '@/data/careerData';

export default function Career(): React.ReactNode {
  return (
    <section id="career" className="bg-slate-50 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900">Career</h2>
        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-slate-200" />
          <div className="space-y-6">
            {careerData.map((entry, idx) => (
              <div key={idx} className="relative flex gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 shadow ring-4 ring-slate-50">
                    <span className="text-xs font-bold text-white">{careerData.length - idx}</span>
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-white p-5 ring-1 ring-slate-200/60">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{entry.company}</h3>
                    <span className="flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mb-2 text-sm font-semibold text-blue-600">{entry.role}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
