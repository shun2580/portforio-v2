export default function Hero(): React.ReactNode {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Dark overlay — top is lighter, bottom fades to site bg color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-slate-950" />

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
