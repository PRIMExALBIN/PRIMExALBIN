import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Subtle watermark tint — just a shade darker than the paper background (#f7f4ed).
const watermark = '#ebe5d6';
const nameStyle = {
  fontSize: 'clamp(4rem, 56vw, 52rem)',
  color: watermark,
  fontWeight: 100,
  opacity: 0.25,
};

// Smaller, wider, flatter X — a mono "strike" mark.
const xBase = watermark;
const xStrike = 'rgba(210,59,26,0.16)';

// One continuously scrolling track. Two identical copies side by side
// make the -50% translate loop seamlessly.
function Track({ children, reverse = false }) {
  const className = `shrink-0 font-serif leading-[0.78] tracking-tightest`;
  return (
    <div
      className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
    >
      <span className={className} style={{ ...nameStyle, paddingRight: '0.28em' }}>
        {children}
      </span>
      <span className={className} style={{ ...nameStyle, paddingRight: '0.28em' }}>
        {children}
      </span>
    </div>
  );
}

export default function NameStack() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const primeY = useTransform(smy, [-0.5, 0.5], [12, -12]);
  const albinY = useTransform(smy, [-0.5, 0.5], [-12, 12]);
  const xShift = useTransform(smx, [-0.5, 0.5], [9, -9]);
  const yShift = useTransform(smy, [-0.5, 0.5], [6, -6]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* PRIME — flush top, scrolling left */}
      <motion.div
        style={{ y: primeY }}
        className="absolute top-0 inset-x-0 overflow-hidden"
      >
        <Track>PRIME</Track>
      </motion.div>

      {/* ALBIN — flush bottom, scrolling right */}
      <motion.div
        style={{ y: albinY }}
        className="absolute bottom-0 inset-x-0 overflow-hidden"
      >
        <Track reverse>ALBIN</Track>
      </motion.div>

      {/* X — centered, smaller/wider "strike" mark */}
      <motion.div
        style={{ x: xShift, y: yShift }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 500,
            transform: 'scaleX(2.6) scaleY(0.62)',
            transformOrigin: 'center',
            lineHeight: 1,
          }}
        >
          {/* Base X — solid faint ink */}
          <span style={{ color: xBase }}>X</span>

          {/* Accent sweep overlay — clipped to the glyph shape */}
          <span
            aria-hidden
            className="animate-x-strike absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(105deg, transparent 0%, ${xStrike} 40%, ${xStrike} 60%, transparent 100%)`,
              backgroundSize: '320% 100%',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            X
          </span>
        </div>
      </motion.div>
    </div>
  );
}
