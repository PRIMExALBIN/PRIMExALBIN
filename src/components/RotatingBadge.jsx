export default function RotatingBadge({
  text = 'AVAILABLE FOR WORK • 2026 • SELECTED PROJECTS • ',
  size = 128,
}) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full animate-spin-slow"
      >
        <defs>
          <path
            id="badge-circle"
            d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
            fill="none"
          />
        </defs>
        <text
          fill="var(--ink)"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            letterSpacing: '2.5px',
            fontWeight: 500,
          }}
        >
          <textPath href="#badge-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-accent"
          style={{ fontSize: size * 0.22, lineHeight: 1 }}
        >
          ✦
        </span>
      </div>
    </div>
  );
}
