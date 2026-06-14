import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  // Pointer used only for the hotspot glow (scene is visually locked)
  const [hovering, setHovering] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.5 });
  const spy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.5 });

  const containerRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      px.set(x);
      py.set(y);
    };
    const el = containerRef.current;
    el?.addEventListener('pointermove', onMove);
    el?.addEventListener('pointerenter', () => setHovering(true));
    el?.addEventListener('pointerleave', () => setHovering(false));
    return () => {
      el?.removeEventListener('pointermove', onMove);
      el?.removeEventListener('pointerenter', () => setHovering(true));
      el?.removeEventListener('pointerleave', () => setHovering(false));
    };
  }, [px, py]);

  // Allow overriding the scene URL so we can easily restore the previous background.
  const sceneUrl = import.meta.env.VITE_SPLINE_SCENE_URL || 'https://prod.spline.design/r5IG9MYxXdaS5q9l/scene.splinecode';

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
      {/* Hide Spline watermark overlay */}
      <style>{`
        .spline-watermark, .spline-logo, a[aria-label="Made with Spline"], [class*="watermark"] { display: none !important; }
      `}</style>

      {/* 3D Scene (Cover). Pointer events disabled to keep the scene locked. */}
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Vignette + gradient overlays – non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-zinc-950/80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(56,189,248,0.18) 0%, rgba(147,51,234,0.15) 35%, rgba(12,10,23,0.0) 70%)',
        }}
      />

      {/* Cursor hotspot glow (visual only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          left: useTransform(spx, (v) => `calc(${v * 100}% )`),
          top: useTransform(spy, (v) => `calc(${v * 100}% )`),
          width: hovering ? 420 : 280,
          height: hovering ? 420 : 280,
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(147,51,234,0.18), rgba(0,0,0,0))',
          transition: 'width 300ms ease, height 300ms ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-cyan-300/80 uppercase">PRIMExALBIN</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-fuchsia-200 drop-shadow">
          Designer • Developer • Builder
        </h1>
        <p className="mt-5 max-w-3xl text-zinc-200/90 text-lg">
          Designing digital experiences that inspire, engage, and leave a lasting impression.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Liquid glass buttons */}
          <a
            href="#projects"
            className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-cyan-50/95 transition [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-10px_rgba(56,189,248,0.45)] border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/30"
          >
            Explore Projects
          </a>
          <a
            href="#about"
            className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-zinc-100 transition [box-shadow:inset_0_1px_0_rgba(255,255,255,0.30),0_10px_30px_-10px_rgba(147,51,234,0.40)] border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/25"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom fade to blend into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-zinc-950" />
    </section>
  );
}
