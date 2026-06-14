import React from 'react';

export default function About() {
  return (
    <section id="about" className="relative bg-zinc-950 text-zinc-200">
      {/* Top fade to blend from hero */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-zinc-950/70" />

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white">About</h2>
        <p className="mt-4 text-zinc-300/90 text-base md:text-lg">
          I’m Albin Eby. I’m passionate about technology, IT systems, and cybersecurity, but I also love editing and creating high-quality visuals. I enjoy solving problems, building digital projects, and making ideas come to life with clean, engaging design. I like combining technical skills with creativity to create work that’s both smart and visually interesting.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-white">Responsive & Accessible</p>
            <p className="mt-1 text-sm text-zinc-400">Optimized for mobile, tablet, and desktop with clean semantics.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-white">Motion with Purpose</p>
            <p className="mt-1 text-sm text-zinc-400">Subtle parallax and glow accents enhance clarity, not distract.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-white">Scalable Architecture</p>
            <p className="mt-1 text-sm text-zinc-400">Well-structured components ready for growth and iteration.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-white">Fast & SEO-friendly</p>
            <p className="mt-1 text-sm text-zinc-400">Delivers speed and discoverability out of the box.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
