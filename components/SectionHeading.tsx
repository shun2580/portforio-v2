export default function SectionHeading({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className="mb-10">
      <span className="mb-3 block h-1 w-8 rounded-full bg-accent" aria-hidden="true" />
      <h2 className="text-2xl font-bold tracking-tight text-fg">{children}</h2>
    </div>
  );
}
