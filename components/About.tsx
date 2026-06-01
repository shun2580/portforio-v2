import { aboutData } from '@/data/aboutData';

export default function About(): React.ReactNode {
  return (
    <section id="about" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">About</h2>
        <div className="space-y-6 text-slate-700">
          <p className="text-lg">{aboutData.summary}</p>
          <p className="text-lg">{aboutData.jobOverview}</p>
        </div>
      </div>
    </section>
  );
}
