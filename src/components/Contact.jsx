import { motion } from 'framer-motion';
import { Github, Instagram, Mail } from 'lucide-react';
import { fadeUp, inView } from '../lib/motion';

const socials = [
  { label: 'GitHub', href: 'https://github.com/PRIMExALBIN', icon: Github },
  { label: 'Instagram', href: 'https://www.instagram.com/pr1mexalb1n/', icon: Instagram },
  { label: 'Email', href: 'mailto:ebyalbin1@gmail.com', icon: Mail },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-accent text-paper"
    >
      {/* Decorative oversized glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 -bottom-16 select-none font-serif leading-none text-paper/10"
        style={{ fontSize: 'clamp(18rem, 38vw, 40rem)' }}
      >
        ✦
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-paper" />
          <span>03</span>
          <span aria-hidden className="h-px w-10 bg-paper/30" />
          <span>Contact</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 font-serif font-light leading-[1] tracking-tightest text-paper text-balance"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          Let's make something <span className="italic">good.</span>
        </motion.h2>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="md:col-span-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
              Write to me
            </p>
            <a
              href="mailto:ebyalbin1@gmail.com"
              className="group mt-3 inline-flex items-baseline gap-3 font-serif text-2xl sm:text-3xl tracking-tight text-paper"
            >
              <span className="link-underline-paper">ebyalbin1@gmail.com</span>
              <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="md:col-span-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
              Elsewhere
            </p>
            <ul className="mt-3 divide-y divide-paper/20 border-t border-paper/20">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between py-3.5 text-paper transition-opacity hover:opacity-70"
                    >
                      <span className="flex items-center gap-3 text-base">
                        <Icon className="h-5 w-5 stroke-[1.5]" />
                        {s.label}
                      </span>
                      <span className="font-mono text-xs text-paper/70 transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
