import { heroData } from '@/data/heroData';

// 読点で区切って、sm 以上では読点ごとに改行する(2行表示)
const headlineLines = heroData.headline.split(/(?<=、)/);

export default function Hero(): React.ReactNode {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85svh] w-full items-center overflow-hidden pt-24 pb-24"
    >
      {/* Dot pattern */}
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      {/* Blurred blue glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 35%, rgba(59,130,246,0.22), transparent 70%), radial-gradient(ellipse 45% 40% at 85% 75%, rgba(99,102,241,0.14), transparent 70%)',
        }}
      />

      {/* Fade to site bg at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      {/* max-w-5xl + px はナビと同じ値(左端をそろえる) */}
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <p className="anim-fade anim-delay-1 text-sm font-medium tracking-wide text-muted">
          {heroData.name} — {heroData.role}
        </p>
        <h1 className="anim-fade anim-delay-2 mt-5 text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
          {headlineLines.map((line) => (
            <span key={line} className="sm:block">
              {line}
            </span>
          ))}
        </h1>
        <p className="anim-fade anim-delay-3 mt-6 text-sm text-muted sm:text-base">
          {heroData.intro}
        </p>
        <div className="anim-fade anim-delay-4 mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Projects を見る
          </a>
          <a
            href={heroData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll hint — 左端をコンテンツにそろえる */}
      <div className="absolute inset-x-0 bottom-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex w-fit flex-col items-center gap-1.5 text-muted">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
