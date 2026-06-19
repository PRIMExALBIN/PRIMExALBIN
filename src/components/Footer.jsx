export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} Albin Eby — All rights reserved
        </p>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <a
            href="#home"
            className="link-underline text-ink-soft hover:text-ink transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
