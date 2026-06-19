import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE, inView } from '../lib/motion';

// Real brand SVGs from simpleicons.org, loaded as raw strings for inline rendering
import reactSvg from '../assets/tool-logos/react.svg?raw';
import figmaSvg from '../assets/tool-logos/figma.svg?raw';
import tailwindcssSvg from '../assets/tool-logos/tailwindcss.svg?raw';
import typescriptSvg from '../assets/tool-logos/typescript.svg?raw';
import nodejsSvg from '../assets/tool-logos/nodejs.svg?raw';
import nextjsSvg from '../assets/tool-logos/nextjs.svg?raw';
import vimSvg from '../assets/tool-logos/vim.svg?raw';
import gitSvg from '../assets/tool-logos/git.svg?raw';
import dockerSvg from '../assets/tool-logos/docker.svg?raw';
import linuxSvg from '../assets/tool-logos/linux.svg?raw';
import viteSvg from '../assets/tool-logos/vite.svg?raw';
import gsapSvg from '../assets/tool-logos/gsap.svg?raw';
import pythonSvg from '../assets/tool-logos/python.svg?raw';
import postgresSvg from '../assets/tool-logos/postgres.svg?raw';
import cursorSvg from '../assets/tool-logos/cursor.svg?raw';
import claudecodeSvg from '../assets/tool-logos/claude-code.svg?raw';
import opencodeSvg from '../assets/tool-logos/opencode.svg?raw';
import openaiSvg from '../assets/tool-logos/openai.svg?raw';
import githubcopilotSvg from '../assets/tool-logos/github-copilot.svg?raw';
import replitSvg from '../assets/tool-logos/replit.svg?raw';

const stripTitle = (svg) => svg.replace(/<title>[^<]*<\/title>/, '');

const raw = (src) => (
  <span className="flex items-center justify-center w-full h-full" dangerouslySetInnerHTML={{ __html: stripTitle(src) }} />
);

const placeholder = (d) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d={d} />
  </svg>
);

function rand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ----- Real brand SVGs from simpleicons.org -----
const logos = {
  React: raw(reactSvg),
  Figma: raw(figmaSvg),
  Tailwind: raw(tailwindcssSvg),
  TypeScript: raw(typescriptSvg),
  'Node.js': raw(nodejsSvg),
  'Next.js': raw(nextjsSvg),
  Vim: raw(vimSvg),
  Git: raw(gitSvg),
  Docker: raw(dockerSvg),
  Linux: raw(linuxSvg),
  Vite: raw(viteSvg),
  GSAP: raw(gsapSvg),
  Python: raw(pythonSvg),
  Postgres: raw(postgresSvg),
  Cursor: raw(cursorSvg),
  'Claude Code': raw(claudecodeSvg),
  Opencode: raw(opencodeSvg),
  Codex: raw(openaiSvg),
  Antifgravity: placeholder('M12 2l2.4 7.2H22l-6.4 4.8 2.4 7.2L12 16l-6.4 4.8 2.4-7.2L2 9.2h7.6z'),
  'GitHub Copilot': raw(githubcopilotSvg),
  ChatGPT: raw(openaiSvg),
  Replit: raw(replitSvg),
  Bolt: placeholder('M13 2L4 14h6l-1 8 10-12h-6l1-8z'),
  Lovable: placeholder('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'),
};

const brandColors = {
  React: '#61DAFB',
  Figma: '#F24E1E',
  Tailwind: '#38BDF8',
  TypeScript: '#3178C6',
  'Node.js': '#339933',
  'Next.js': '#000000',
  Vim: '#019733',
  Git: '#F05032',
  Docker: '#2496ED',
  Linux: '#000000',
  Vite: '#646CFF',
  GSAP: '#88CE02',
  Python: '#3776AB',
  Postgres: '#336791',
  Cursor: '#000000',
  'Claude Code': '#D97757',
  Opencode: '#5B5BD6',
  Codex: '#10A37F',
  'Antifgravity': '#7C3AED',
  'GitHub Copilot': '#8957E5',
  ChatGPT: '#74AA9C',
  Replit: '#6677FF',
  Bolt: '#FF6B35',
  Lovable: '#FF3B5C',
};

// Grid-based scatter: divide the area into cells, place one tool per cell
// with random offsets. This guarantees even coverage across the full area.
const COLS = 6;
const ROWS = 4;
const X_RANGE = 480;
const Y_RANGE = 280;
const Z_RANGE = 90;

const toolEntries = [
  'React', 'Figma', 'Tailwind', 'TypeScript', 'Node.js', 'Next.js',
  'Vim', 'Git', 'Docker', 'Linux', 'Vite', 'GSAP',
  'Python', 'Postgres', 'Cursor', 'Claude Code', 'Opencode', 'Codex',
  'Antifgravity', 'GitHub Copilot', 'ChatGPT', 'Replit', 'Bolt', 'Lovable',
].map((name, i) => {
  const cellW = (X_RANGE * 2) / COLS;
  const cellH = (Y_RANGE * 2) / ROWS;
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const baseX = -X_RANGE + cellW * (col + 0.5);
  const baseY = -Y_RANGE + cellH * (row + 0.5);
  const jitterX = (rand(i * 7) - 0.5) * cellW * 0.65;
  const jitterY = (rand(i * 11) - 0.5) * cellH * 0.65;
  const x = baseX + jitterX;
  const y = baseY + jitterY;
  const z = (rand(i * 13) - 0.5) * Z_RANGE * 2;
  const rx = (rand(i * 17) - 0.5) * 60;
  const ry = (rand(i * 19) - 0.5) * 60;
  const rz = (rand(i * 23) - 0.5) * 30;
  const depth = (z + Z_RANGE) / (Z_RANGE * 2);
  const size = 0.85 + depth * 0.6;
  const fontSize = `${0.8 + depth * 0.5}rem`;
  const tone = depth > 0.6 ? 'text-ink' : depth > 0.35 ? 'text-ink-soft' : 'text-muted';
  return { name, x, y, z, rx, ry, rz, size, fontSize, tone, delay: i * 0.04, logo: logos[name], color: brandColors[name] };
});

// Overlays a grid of paper-coloured pixels on the text that dissolve with
// staggered random delays, creating a pixel-reveal entrance.  The grid is
// generously sized so it covers the text at any viewport; pixels outside
// the text area sit on the same paper background and are invisible.
function PixelReveal({ children }) {
  const wrapperRef = useRef(null);
  const [reveal, setReveal] = useState(false);
  const delaysRef = useRef(null);

  // Fixed grid size ≈ max "Tools I Use" at 3.2rem, with buffer.
  const ps = 6;
  const cols = 84;
  const rows = 14;
  const total = cols * rows;

  // Trigger the dissolve when the element scrolls into view.
  useEffect(() => {
    if (!wrapperRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setReveal(true), 300);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  // Memoize random delays so re-renders don't restart mid-animation.
  if (!delaysRef.current) {
    delaysRef.current = Array.from({ length: total }, () => (Math.random() * 2.2).toFixed(3));
  }

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      <span className="relative z-0">{children}</span>
      <div
        className="absolute inset-0 z-10 grid pointer-events-none select-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${ps}px)`,
          gridTemplateRows: `repeat(${rows}, ${ps}px)`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="bg-paper"
            style={
              reveal
                ? {
                    animation: `pixel-reveal 0.35s ease-out forwards`,
                    animationDelay: `${delaysRef.current[i]}s`,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function ToolsCluster() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.8 });
  const rotY = useTransform(smx, [-0.5, 0.5], [-14, 14]);
  const rotX = useTransform(smy, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div
      className="relative w-full"
      style={{ perspective: '1800px', perspectiveOrigin: '50% 45%', minHeight: 'clamp(460px, 56vw, 680px)' }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0"
      >
        {[1, 0.72, 0.44].map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full border border-rule"
            style={{
              width: `${s * 88}%`,
              height: `${s * 88}%`,
              transform: 'translate(-50%, -50%) rotateX(90deg)',
              opacity: 0.5 - i * 0.12,
            }}
          />
        ))}

        {toolEntries.map((t) => (
          <span
            key={t.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: t.size }}
              viewport={inView}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + t.delay }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap"
              style={{
                fontSize: t.fontSize,
                x: t.x,
                y: t.y,
                z: t.z,
                rotateX: t.rx,
                rotateY: t.ry,
                rotateZ: t.rz,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              <span className="w-[1.1em] h-[1.1em] shrink-0" style={{ color: t.color }}>
                {t.logo}
              </span>
              <span className={`font-mono leading-none ${t.tone}`}>
                {t.name}
              </span>
            </motion.span>
          </span>
        ))}

          <span
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)', transformStyle: 'preserve-3d' }}
          >
            <motion.div
              style={{ z: 80, transformStyle: 'preserve-3d' }}
              className="flex items-center gap-3"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
              <PixelReveal>
                <span
                  className="block whitespace-nowrap font-mono font-bold leading-none text-ink"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', letterSpacing: '0.02em' }}
                >
                  Tools I Use
                </span>
              </PixelReveal>
            </motion.div>
          </span>
      </motion.div>
    </div>
  );
}
