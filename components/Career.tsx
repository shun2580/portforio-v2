import { careerData } from '@/data/careerData';

export default function Career(): React.ReactNode {
  return (
    <section id="career" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Career</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-blue-500" />
        </div>
        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-slate-200" />
          <div className="space-y-8">
            {careerData.map((entry, idx) => (
              <div key={idx} className="relative flex gap-8">
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 shadow ring-4 ring-white">
                    <span className="text-xs font-bold text-white">
                      {careerData.length - idx}
                    </span>
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/60">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{entry.company}</h3>
                    <span className="flex-shrink-0 rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mb-3 text-sm font-semibold text-blue-600">{entry.role}</p>
                  <p className="text-sm leading-relaxed text-slate-700">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
