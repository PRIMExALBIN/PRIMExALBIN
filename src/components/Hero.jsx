import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { EASE, fadeUp, stagger } from '../lib/motion';
import MagneticButton from './MagneticButton';
import NameStack from './NameStack';

const wordContainer = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.07 } },
};
const wordInner = {
  hidden: { y: '130%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
};

function Word({ children, italic = false, highlight = false }) {
  return (
    <span className="inline-block overflow-hidden pt-[0.15em] -mt-[0.15em] pb-[0.25em] -mb-[0.25em] px-[0.15em] -mx-[0.15em] align-bottom">
      <motion.span
        variants={wordInner}
        className={`inline-block ${italic ? 'italic ' : ''}${
          highlight ? 'accent-highlight' : ''
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

// A word that cycles through a list: the current word slides up and out while
// the next slides in from the bottom. Reuses the same mask + reveal as Word so
// it slots into the staggered headline. Cycling begins after the initial reveal.
function RotatingWord({ words, interval = 2600, italic = false, highlight = false }) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(null);
  const measureRef = useRef(null);

  // Measure the actual rendered width of every word and keep the mask sized to
  // the widest. Character count is unreliable in a proportional font (e.g.
  // "Craftsman" can render wider than "Strategist"), so we measure for real.
  // Re-run when webfonts finish loading to catch late font swaps.
  useEffect(() => {
    const measure = () => {
      const host = measureRef.current;
      if (!host) return;
      let max = 0;
      for (const el of host.children) {
        const w = el.getBoundingClientRect().width;
        if (w > max) max = w;
      }
      if (max > 0) setWidth(Math.ceil(max));
    };
    measure();
    let cancelled = false;
    const onFonts = () => { if (!cancelled) measure(); };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onFonts);
    }
    return () => { cancelled = true; };
  }, [words]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [active, words.length, interval]);

  const cls = `${italic ? 'italic ' : ''}${highlight ? 'accent-highlight' : ''}`;
  // 130% travel fully clears the mask's padding (a 110% travel leaves a sliver
  // of the exiting word visible at the top edge).
  const travel = '130%';

  return (
    <span className="inline-block overflow-hidden pt-[0.15em] -mt-[0.15em] pb-[0.25em] -mb-[0.25em] px-[0.15em] -mx-[0.15em] align-bottom">
      <motion.span
        variants={wordInner}
        onAnimationComplete={() => setActive(true)}
        className={`inline-block ${cls}`}
      >
        <span className="relative inline-block" style={width ? { width: `${width}px` } : undefined}>
          {/* always-present sizer: establishes the box's height (all words share
              the same line height) and seeds a sane width before measurement */}
          <span className={`invisible whitespace-nowrap ${cls}`} aria-hidden>
            {words[0]}
          </span>
          {/* measuring layer: every word laid out invisibly to find the true max width */}
          <span ref={measureRef} className="invisible absolute top-0 left-0 flex flex-col" aria-hidden>
            {words.map((w) => (
              <span key={w} className={`whitespace-nowrap ${cls}`}>{w}</span>
            ))}
          </span>
          <AnimatePresence initial={false}>
            <motion.span
              key={words[index]}
              initial={{ y: travel }}
              animate={{ y: '0%' }}
              exit={{ y: `-${travel}` }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`absolute top-0 left-0 whitespace-nowrap ${cls}`}
              style={{ willChange: 'transform' }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}

function LocationClock({ place, timeZone }) {
  const [parts, setParts] = useState(() => split(timeZone));
  useEffect(() => {
    const id = setInterval(() => setParts(split(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {place}
      </p>
      <p className="mt-1.5 flex items-baseline gap-2 font-mono text-sm text-ink">
        <span className="flex items-center">
          {parts.groups.map((group, gi) => (
            <span key={gi} className="flex items-center">
              {gi > 0 && <span className="px-px relative -top-[1px] select-none">:</span>}
              {[...group].map((d, di) => (
                <RollingDigit key={di} value={d} />
              ))}
            </span>
          ))}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
          {parts.ampm}
        </span>
      </p>
    </div>
  );
}

// A single digit that slides up when its value changes (Apple-style roll)
function RollingDigit({ value }) {
  return (
    <span className="relative inline-block overflow-hidden tabular-nums" style={{ height: '1em', width: '0.62em' }}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function split(timeZone) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).formatToParts(new Date());
    const hour = parts.find((p) => p.type === 'hour')?.value || '00';
    const minute = parts.find((p) => p.type === 'minute')?.value || '00';
    const second = parts.find((p) => p.type === 'second')?.value || '00';
    const ampm = parts.find((p) => p.type === 'dayPeriod')?.value || 'AM';
    return { groups: [hour, minute, second], ampm };
  } catch (err) {
    console.error(err);
    return { groups: ['00', '00', '00'], ampm: 'AM' };
  }
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Character parallax — tilts toward the cursor like a lightweight 3D object
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 });
  const charX = useTransform(smx, [-0.5, 0.5], [-18, 18]);
  const charY = useTransform(smy, [-0.5, 0.5], [-14, 14]);
  const charRot = useTransform(smx, [-0.5, 0.5], [-2.5, 2.5]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden"
    >
      <NameStack />

      {/* Character portrait — magazine-style: mouse parallax + ambient breathing + periodic light sweep */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        style={{ x: charX, y: charY, rotate: charRot, transformPerspective: 900 }}
        className="pointer-events-none absolute right-[5%] top-0 z-[1] hidden h-screen items-center lg:flex"
      >
        <motion.div
          animate={{ scale: [1, 1.025, 1], y: [0, -6, 0] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          className="relative"
        >
          <img
            src="/hero-character.png"
            alt=""
            aria-hidden
            draggable={false}
            className="h-[100vh] max-h-[1100px] w-auto select-none object-contain"
            style={{ filter: 'drop-shadow(0 28px 48px rgba(28,28,26,0.18))' }}
          />
          {/* Light sweep — bright sheen clipped to the character silhouette */}
          <div
            aria-hidden
            className="animate-hero-sheen pointer-events-none absolute inset-0"
            style={{
              WebkitMaskImage: 'url(/hero-character.png)',
              maskImage: 'url(/hero-character.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              backgroundImage:
                'linear-gradient(102deg, transparent 42%, rgba(255,255,255,0.5) 50%, transparent 58%)',
              backgroundSize: '200% 100%',
              backgroundRepeat: 'no-repeat',
              mixBlendMode: 'soft-light',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-6xl w-full px-5 sm:px-8"
      >
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="show"
            className="mt-8 font-serif font-light text-ink leading-[0.95] tracking-tightest text-balance"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 7.5rem)' }}
          >
            <span className="flex flex-wrap gap-x-[0.28em]">
              <RotatingWord words={['Developer', 'Designer', 'Creator', 'Thinker', 'Maker', 'Engineer', 'Craftsman', 'Innovator', 'Tinkerer', 'Strategist']} />
            </span>
            <span className="flex flex-wrap gap-x-[0.28em]">
              <Word italic>&amp;</Word>
              <Word>builder</Word>
              <Word>of</Word>
              <Word>things</Word>
            </span>
            <span className="flex flex-wrap gap-x-[0.28em]">
              <Word highlight>worth</Word>
              <Word highlight>using.</Word>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
          >
            I'm Albin Eby — student who builds. Full-stack apps, AI tools,
            Android, browser utilities. If I can learn it by building it,
            that's how I do it.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-accent hover:border-accent"
            >
              View selected work
              <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                ↗
              </span>
            </MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
            >
              <span className="link-underline">Get in touch</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: metaY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          className="mt-16 sm:mt-24 flex items-end justify-start gap-8 border-t border-rule pt-6"
        >
          <div className="grid grid-cols-2 gap-10">
            <LocationClock place="United Kingdom" timeZone="Europe/London" />
            <LocationClock place="Kerala, India" timeZone="Asia/Kolkata" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-rule">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
            className="absolute inset-x-0 top-0 block h-1/2 bg-accent"
          />
        </span>
      </motion.div>
    </section>
  );
}
