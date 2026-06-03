import { aboutData } from '@/data/aboutData';
import { heroData } from '@/data/heroData';

export default function About(): React.ReactNode {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">About</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-blue-500" />
        </div>

        {/* Name & role */}
        <div className="mb-8">
          <p className="text-3xl font-bold text-slate-900">{heroData.name}</p>
          <p className="mt-1 text-base font-medium text-blue-600">{heroData.intro}</p>
        </div>

        <div className="space-y-6 border-l-4 border-blue-500 pl-6">
          <p className="text-lg leading-relaxed text-slate-700">{aboutData.summary}</p>
          <p className="text-lg leading-relaxed text-slate-700">{aboutData.jobOverview}</p>
        </div>
      </div>
    </section>
  );
}
