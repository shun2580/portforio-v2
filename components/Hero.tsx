import type { HeroContent } from '@/data/types';
import { heroData } from '@/data/heroData';

export default function Hero(): React.ReactNode {
  return (
    <section
      id="hero"
      className="flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-32 text-center text-white"
    >
      <div className="max-w-2xl">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">{heroData.name}</h1>
        <p className="mb-8 text-xl text-slate-300">{heroData.intro}</p>
        <a
          href={heroData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          View GitHub Profile
        </a>
      </div>
    </section>
  );
}
