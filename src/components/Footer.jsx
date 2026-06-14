import React from 'react';
import { Github, Instagram, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative">
      {/* Top gradient separator */}
      <div className="pointer-events-none absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Social links row */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/PRIMExALBIN"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.instagram.com/pr1mexalb1n/"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-fuchsia-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:ebyalbin1@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-amber-300 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <a href="#about" className="hover:text-zinc-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-zinc-300 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1 text-[11px] text-zinc-600">
            © {new Date().getFullYear()} PRIMExALBIN. Crafted with
            <Heart className="inline-block h-3 w-3 text-red-400/70" fill="currentColor" />
            and lots of code.
          </p>
        </div>
      </div>
    </footer>
  );
}