export default function Hero(): React.ReactNode {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(15,23,42,0.5)' }}
      />

      {/* Fade to site bg at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent" />

      {/* Scroll hint — bottom left */}
      <div className="absolute bottom-8 left-8 flex flex-col items-center gap-1.5 text-[#94A3B8]">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
