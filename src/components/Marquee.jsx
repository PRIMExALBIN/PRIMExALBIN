export default function Marquee({ items = [], speed = 32 }) {
  const Block = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="whitespace-nowrap font-serif text-4xl font-light tracking-tight text-ink sm:text-6xl">
            {t}
          </span>
          <span className="text-2xl text-accent sm:text-3xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden border-y border-rule bg-paper-2/50 py-6 sm:py-8"
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        {Block}
        {Block}
      </div>
    </div>
  );
}
