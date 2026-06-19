import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 38, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 600, damping: 38, mass: 0.25 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.('a, button, [data-cursor]');
      setHovering(!!t);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          width: hovering ? 44 : down ? 6 : 8,
          height: hovering ? 44 : down ? 6 : 8,
          x: hovering ? -22 : down ? -3 : -4,
          y: hovering ? -22 : down ? -3 : -4,
          backgroundColor: hovering ? 'rgba(210,59,26,0)' : 'rgba(210,59,26,1)',
          borderColor: 'rgba(210,59,26,0.9)',
          borderWidth: hovering ? 1.5 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderStyle: 'solid' }}
      />
    </motion.div>
  );
}
