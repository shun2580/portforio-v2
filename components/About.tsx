import { aboutData } from '@/data/aboutData';
import { heroData } from '@/data/heroData';

export default function About(): React.ReactNode {
  return (
    <section id="about" className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900">About</h2>

        <div className="mb-8">
          <p className="text-3xl font-bold text-slate-900">{heroData.name}</p>
          <p className="mt-1 text-sm font-medium text-blue-600">{heroData.intro}</p>
        </div>

        <div className="space-y-5 border-l-4 border-blue-500 pl-6">
          <p className="leading-relaxed text-slate-700">{aboutData.summary}</p>
          <p className="leading-relaxed text-slate-700">{aboutData.jobOverview}</p>
        </div>
      </div>
    </section>
  );
}
