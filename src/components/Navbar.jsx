import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useActiveSection } from '../lib/useActiveSection';
import { EASE } from '../lib/motion';

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(['home', 'about', 'projects', 'contact']);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? 'bg-paper/80 backdrop-blur-md border-b border-rule'
              : 'border-b border-transparent'
          }`}
        >
          <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
            <a href="#home" className="group flex items-baseline gap-2">
              <span className="font-serif text-lg font-medium tracking-tight text-ink">
                PRIMExALBIN
              </span>
            </a>

            <div className="hidden md:flex items-center gap-9">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="relative font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
                >
                  <span className={active === l.id ? 'text-ink' : ''}>
                    {l.label}
                  </span>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex flex-col items-end gap-1.5"
              aria-label="Open menu"
            >
              <span className="block h-px w-6 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </button>
          </nav>
        </div>

        <motion.div
          style={{ scaleX: progress, transformOrigin: '0% 50%' }}
          className="h-px bg-accent/70 origin-left"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[60] bg-paper md:hidden"
          >
            <div className="flex h-full flex-col px-5">
              <div className="flex items-center justify-between h-16">
                <span className="font-serif text-lg">PRIMExALBIN</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2">
                {links.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                    className="font-serif text-5xl tracking-tight text-ink"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
              <div className="py-8 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <a href="https://github.com/PRIMExALBIN" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://www.instagram.com/pr1mexalb1n/" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href="mailto:ebyalbin1@gmail.com">Email</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
