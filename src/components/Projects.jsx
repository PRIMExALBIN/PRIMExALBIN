import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion';
import SectionLabel from './SectionLabel';

const projects = [
  {
    n: '01',
    title: 'Illumen',
    desc: 'Full-stack AI GCSE revision app — upload notes, screenshots, or past papers and get OCR-generated flashcards, adaptive quizzes, and study plans via Groq AI. Spaced repetition, teacher portal, focus timers, gamification, chat tutoring, and Capacitor mobile wrappers.',
    year: '2026',
    tags: ['React', 'TypeScript', 'Supabase', 'Groq AI', 'Express'],
    href: 'https://github.com/PRIMExALBIN/Study',
    accent: '#d23b1a',
  },
  {
    n: '02',
    title: 'offScreen',
    desc: 'Windows-native focus enforcement desktop app. Background agent tracks foreground windows, media, and browser tabs via a Chrome extension, enforcing app/site limits, downtime schedules, focus sessions, and bedtime routines with PIN-protected parental controls.',
    year: '2026',
    tags: ['Electron', 'React', 'Node.js', 'PowerShell', 'Next.js'],
    href: 'https://github.com/PRIMExALBIN/offScreen',
    accent: '#2b5a7a',
  },
  {
    n: '03',
    title: 'FileForge',
    desc: 'Client-side universal file converter — 200+ formats across images, documents, audio, video, and archives, all processed in-browser via FFmpeg WASM with zero uploads. Batch queue, magic byte detection, and IndexedDB history.',
    year: '2025',
    tags: ['React', 'TypeScript', 'Vite', 'FFmpeg WASM', 'PWA'],
    href: 'https://github.com/PRIMExALBIN/FileForge',
    accent: '#3a5a40',
  },
  {
    n: '04',
    title: 'chatmod-mobile',
    desc: 'Android app that turns your phone into a self-hosted YouTube Live moderation bot. Foreground service connects to YouTube Live Chat, applies configurable rules, custom commands, timers, FAQ auto-responses, and streams an OBS overlay.',
    year: '2026',
    tags: ['Kotlin', 'Jetpack Compose', 'Fastify', 'Prisma', 'YouTube API'],
    href: 'https://github.com/PRIMExALBIN/chatmod-mobile',
    accent: '#7b3a8a',
  },
  {
    n: '05',
    title: 'Comicify',
    desc: 'AI manga generator — enter a book title, validate via Open Library, generate a multi-panel storyboard with Groq Llama 3.3-70b, then render each panel via Pollinations.ai Flux. Single-page React studio with PDF/PNG export.',
    year: '2026',
    tags: ['React', 'TypeScript', 'Groq LLM', 'Pollinations AI', 'Supabase'],
    href: 'https://github.com/PRIMExALBIN/Comicify',
    accent: '#c17d3a',
  },
  {
    n: '06',
    title: 'Architex',
    desc: 'Post-AI code security platform with deterministic graph-based static analysis using Joern CPGQL. FastAPI orchestrator spawns Hugging Face Space workers, 60+ query rules, CLI scanner, and agentic exploit verification.',
    year: '2026',
    tags: ['Next.js', 'FastAPI', 'Python', 'Joern', 'Redis'],
    href: 'https://github.com/PRIMExALBIN/Architex',
    accent: '#4a6fa5',
  },
  {
    n: '07',
    title: 'Bridgr',
    desc: 'Cross-platform Flutter app pairing phone and PC via QR code for WebRTC P2P clipboard, link, note, and file sync. Includes an AI assistant proxied through a Node.js signaling server to NVIDIA API.',
    year: '2026',
    tags: ['Flutter', 'Dart', 'WebRTC', 'Socket.io', 'Supabase'],
    href: 'https://github.com/PRIMExALBIN/Bridgr',
    accent: '#8b5e3c',
  },
  {
    n: '08',
    title: 'AeroShare',
    desc: 'Browser-based P2P file sharing over WebRTC with a custom chunked streaming protocol, memory mesh networking, local peer discovery, and temporal gated access. Packaged as a PWA targeting the Microsoft Store.',
    year: '2025',
    tags: ['Next.js', 'WebRTC', 'P2P', 'TypeScript', 'PeerJS'],
    href: 'https://github.com/PRIMExALBIN/AeroShare',
    accent: '#5a7a6a',
  },
  {
    n: '09',
    title: 'mydaybook',
    desc: 'Birthday dashboard — enter your birth date and get a scrollable timeline showing ticking life stats, historical events via Wikimedia, and cultural data (#1 movie, #1 song) from your birth year. Shareable as PNG.',
    year: '2025',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    href: 'https://github.com/PRIMExALBIN/mydaybook',
    accent: '#9a3a3a',
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });
  const fine = useRef(false);

  if (typeof window !== 'undefined') {
    fine.current = window.matchMedia('(pointer: fine)').matches;
  }

  const onMove = (e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY - 80);
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView}>
          <SectionLabel index="02">Selected Work</SectionLabel>
        </motion.div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="font-serif font-light leading-[1.05] tracking-tight text-ink text-balance"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            A few things I've built.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted whitespace-nowrap"
          >
            09 — projects
          </motion.p>
        </div>

        <ul
          className="mt-12 border-t border-rule"
          onMouseMove={fine.current ? onMove : undefined}
        >
          {projects.map((p) => (
            <motion.li
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              onMouseEnter={() => fine.current && setActive(p)}
              onMouseLeave={() => fine.current && setActive(null)}
            >
              <a
                href={p.href}
                className="group relative grid grid-cols-12 items-center gap-4 py-7 sm:py-8 border-b border-rule transition-colors duration-500 ease-editorial hover:bg-paper-2/60"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] transition-all duration-500 ease-editorial h-0 group-hover:h-10"
                  style={{ backgroundColor: p.accent }}
                />

                <span className="col-span-2 sm:col-span-1 pl-3 sm:pl-5 font-mono text-xs text-muted">
                  {p.n}
                </span>

                <div className="col-span-10 sm:col-span-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted max-w-md">{p.desc}</p>
                </div>

                <div className="hidden sm:flex col-span-3 flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft border border-rule px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="hidden sm:flex col-span-2 items-center justify-end gap-3 pr-5">
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                  <span className="text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          More work available on request.
        </motion.p>
      </div>

      {/* Floating hover preview (desktop only) */}
      <AnimatePresence>
        {active && fine.current && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-44 w-64 overflow-hidden rounded-xl border border-rule shadow-2xl md:block"
            style={{ x: sx, y: sy }}
          >
            <div
              className="flex h-full w-full flex-col justify-between p-5"
              style={{ backgroundColor: active.accent }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Project {active.n}
              </span>
              <div>
                <p
                  className="font-serif font-light leading-none text-white"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {active.title}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {active.year} · {active.tags.join(' / ')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
