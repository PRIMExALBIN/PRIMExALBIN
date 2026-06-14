import React from 'react';
import { Command, Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl px-2 py-1.5 shadow-2xl shadow-cyan-500/5">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-purple-500">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <span className="hidden sm:inline text-sm font-medium text-white/90">PRIMExALBIN</span>
        </div>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Nav links */}
        <a
          href="#about"
          className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          About
        </a>
        <a
          href="#projects"
          className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          Contact
        </a>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Cmd+K badge */}
        <button
          onClick={() => {
            // Dispatch a keyboard event to trigger CommandMenu
            window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 'k' }));
          }}
          className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.08] transition-all"
        >
          <Command className="h-3 w-3" />
          <span>K</span>
        </button>
      </nav>
    </header>
  );
}