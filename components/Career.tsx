import { careerData } from '@/data/careerData';
import FadeInSection from './FadeInSection';
import SectionHeading from './SectionHeading';

export default function Career(): React.ReactNode {
  return (
    <section id="career" className="bg-surface px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Career</SectionHeading>
        <div className="relative">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-border" />
          <div className="space-y-6">
            {careerData.map((entry, idx) => (
              <FadeInSection key={idx}>
                <div className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent shadow ring-4 ring-surface">
                      {idx === 0 && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                      )}
                      <span className="relative text-xs font-bold text-white">
                        {careerData.length - idx}
                      </span>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="flex-1 rounded-xl border border-border bg-surface p-5">
                    <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-bold text-fg">{entry.company}</h3>
                      <span className="flex-shrink-0 rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium text-muted">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mb-2 text-sm font-semibold text-accent">{entry.role}</p>
                    <p className="text-sm leading-relaxed text-muted">{entry.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
