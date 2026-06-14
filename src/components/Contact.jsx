import React from 'react';
import { Github, Instagram, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-zinc-950 py-20">
      {/* Top fade to blend from previous section */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-zinc-950/70" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Get in touch</h2>
        <p className="mt-3 text-zinc-400">Let’s connect — I’m always open to collaborate or chat.</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/PRIMExALBIN"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-cyan-50/95 transition border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-10px_rgba(56,189,248,0.45)]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://www.instagram.com/pr1mexalb1n/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-zinc-100 transition border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.32),0_10px_30px_-10px_rgba(147,51,234,0.40)]"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <a
            href="mailto:ebyalbin1@gmail.com"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-zinc-100 transition border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.30),0_10px_30px_-10px_rgba(99,102,241,0.35)]"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
