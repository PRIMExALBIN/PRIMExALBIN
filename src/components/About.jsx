import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion';
import SectionLabel from './SectionLabel';
import ToolsCluster from './ToolsCluster';

const focus = [
  'Interface & Web Design',
  'Frontend Development',
  'IT Systems & Infrastructure',
  'Cybersecurity',
  'Visual Editing & Motion',
  'Brand & Identity',
];

export default function About() {
  const [proofVisible, setProofVisible] = useState(false);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView}>
          <SectionLabel index="01">About</SectionLabel>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:gap-12 md:grid-cols-12 md:gap-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="md:col-span-5 font-serif font-light leading-[1.05] tracking-tight text-ink text-balance"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            I build stuff. If it's not right, I build it again.
          </motion.h2>

          <div className="md:col-span-7 md:pl-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="space-y-5 text-ink-soft text-lg leading-relaxed max-w-prose"
            >
              <p>
                I'm Albin. Year 10, full-stack builder, AI tinkerer, Android
                dabbler — if there's a way to learn something by building it,
                that's how I do it.
              </p>
              <p>
                I rewrite things until they click. I polish stuff most people
                won't see. I don't call it done until it actually works the way
                it should.
              </p>
              <p>
                Eventually I want to end up in cybersecurity or IT — same
                precision, different battlefield. For now I'm just building,
                breaking things, and making them better.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Areas of focus
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5">
                {focus.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-ink">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">
                I don't limit myself to one lane — I try to learn as many skills as
                possible, from development to video editing.
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="relative mt-6 font-mono text-[10px] sm:text-xs uppercase sm:tracking-[0.22em]"
              onMouseEnter={() => setProofVisible(true)}
              onMouseLeave={() => setProofVisible(false)}
            >
              <a
                href="https://digitalfuturessussex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-ink transition-colors"
              >
                Winner of Digital Futures Accelerator 2026 ↗
              </a>
              <AnimatePresence>
                {proofVisible && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-2 w-max max-w-[320px] rounded-lg border border-rule bg-paper px-4 py-2.5 text-[11px] normal-case tracking-normal shadow-lg"
                  >
                    <span className="font-mono text-muted">Proof →</span>{' '}
                    <a
                      href="https://www.linkedin.com/posts/emily-may-19b173299_we-had-a-fantastic-time-at-the-digital-futures-activity-7470561525590757376-19ft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-accent transition-colors"
                    >
                      LinkedIn post
                    </a>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.p>
          </div>
        </div>

        {/* Pull-quote band */}
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-20 sm:mt-28 border-y border-rule py-12 sm:py-16"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              aria-hidden
              className="font-serif text-accent leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              “
            </span>
            <blockquote className="font-serif font-light italic leading-[1.15] tracking-tight text-ink text-balance"
              style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.6rem)' }}
            >
              Quality over quantity. Perfection over volume. I'd rather build one thing right than a dozen things almost.
            </blockquote>
          </div>
          <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            — The way I work
          </figcaption>
        </motion.figure>

        {/* Stats — centred */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-16"
        >
          {[
            ['1+', 'Years tinkering'],
            ['9', 'Projects shipped'],
            ['∞', 'Cups of coffee'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p
                className="font-serif font-light leading-none text-ink"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}
              >
                {n}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted max-w-[6rem]">
                {l}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tools cluster — scattered names converging on the centre label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="-mx-5 sm:-mx-8 mt-20 sm:mt-28"
        >
          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            The stack
          </p>
          <ToolsCluster />
        </motion.div>
      </div>
    </section>
  );
}
