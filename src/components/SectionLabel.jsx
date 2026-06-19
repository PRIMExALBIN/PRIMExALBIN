export default function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-ink-soft">{index}</span>
      <span aria-hidden className="h-px w-10 bg-rule" />
      <span>{children}</span>
    </div>
  );
}
