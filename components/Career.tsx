import { careerData } from '@/data/careerData';
import FadeInSection from './FadeInSection';

export default function Career(): React.ReactNode {
  return (
    <section id="career" className="bg-[#1E293B] px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#F1F5F9]">Career</h2>
          <div className="relative">
            <div className="absolute bottom-2 left-4 top-2 w-px bg-[#334155]" />
            <div className="space-y-6">
              {careerData.map((entry, idx) => (
                <div key={idx} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6] shadow ring-4 ring-[#1E293B]">
                      {idx === 0 && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                      )}
                      <span className="relative text-xs font-bold text-white">
                        {careerData.length - idx}
                      </span>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="flex-1 rounded-xl border border-[#334155] bg-[#1E293B] p-5">
                    <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-bold text-[#F1F5F9]">{entry.company}</h3>
                      <span className="flex-shrink-0 rounded-full border border-[#334155] bg-[#0F172A] px-2.5 py-0.5 text-xs font-medium text-[#94A3B8]">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mb-2 text-sm font-semibold text-[#3B82F6]">{entry.role}</p>
                    <p className="text-sm leading-relaxed text-[#94A3B8]">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
