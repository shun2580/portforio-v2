import { aboutData } from '@/data/aboutData';
import { heroData } from '@/data/heroData';
import FadeInSection from './FadeInSection';

export default function About(): React.ReactNode {
  return (
    <section id="about" className="bg-[#0F172A] px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#F1F5F9]">About</h2>

          <div className="mb-8">
            <p className="text-3xl font-bold text-[#F1F5F9]">{heroData.name}</p>
            <p className="mt-1 text-sm font-medium text-[#3B82F6]">{heroData.intro}</p>
          </div>

          <div className="space-y-5 border-l-4 border-[#3B82F6] pl-6">
            <p className="leading-relaxed text-[#94A3B8]">{aboutData.summary}</p>
            <p className="leading-relaxed text-[#94A3B8]">{aboutData.jobOverview}</p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
