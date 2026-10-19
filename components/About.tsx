import { aboutData } from '@/data/aboutData';
import { heroData } from '@/data/heroData';
import FadeInSection from './FadeInSection';
import SectionHeading from './SectionHeading';

export default function About(): React.ReactNode {
  return (
    <section id="about" className="bg-bg px-4 py-14 sm:py-20">
      <FadeInSection>
        <div className="mx-auto max-w-3xl">
          <SectionHeading>About</SectionHeading>

          <div className="mb-8">
            <p className="text-3xl font-bold text-fg">{heroData.name}</p>
            <p className="mt-1 text-sm font-medium text-accent">{heroData.intro}</p>
          </div>

          <div className="space-y-5 border-l-4 border-accent pl-6">
            <p className="leading-relaxed text-muted">{aboutData.summary}</p>
            <p className="leading-relaxed text-muted">{aboutData.jobOverview}</p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
