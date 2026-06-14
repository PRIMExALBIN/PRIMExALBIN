import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Shield, Sparkles, Zap, Layers } from 'lucide-react';

const projectDetails = {
  TechSphere: {
    subtitle: 'Modern Tech Landing Page',
    description:
      'A cutting-edge landing page designed for a tech startup ecosystem. Features interactive product showcases, animated statistics, and a sleek dark-mode aesthetic that puts the user experience front and center.',
    features: [
      'Interactive 3D product carousel',
      'Animated metrics & counters',
      'Responsive dark-mode design',
      'Optimized Core Web Vitals',
    ],
    tech: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    icon: <Zap className="h-5 w-5" />,
  },
  SecureNote: {
    subtitle: 'Encrypted Note-Taking App',
    description:
      'A privacy-first web application that enables users to create, edit, and manage notes with client-side encryption. Built with a focus on security, usability, and clean architecture.',
    features: [
      'AES-256 client-side encryption',
      'Markdown editor with live preview',
      'Tag-based organization system',
      'Offline-first architecture',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'CryptoJS', 'Tailwind CSS'],
    icon: <Shield className="h-5 w-5" />,
  },
  ByteBlog: {
    subtitle: 'Personal Blog Platform',
    description:
      'A modern, performant blog platform with dynamic content management, smooth navigation, and an immersive reading experience. Features a custom markdown parser and SEO optimization.',
    features: [
      'Dynamic markdown rendering',
      'SEO-optimized architecture',
      'Smooth page transitions',
      'RSS feed integration',
    ],
    tech: ['React', 'Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    icon: <Layers className="h-5 w-5" />,
  },
};

export default function ProjectModal({ project, open, onClose, onPrev, onNext, hasPrev, hasNext }) {
  if (!project) return null;

  const details = projectDetails[project.title];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel */}
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header gradient */}
            <div className="relative h-40 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 text-cyan-300 mb-1">
                  {details?.icon}
                  <span className="text-xs tracking-widest uppercase">{details?.subtitle}</span>
                </div>
                <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-sm leading-relaxed text-zinc-300">{details?.description}</p>

              {/* Features */}
              <div>
                <h4 className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">Key Features</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {details?.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="text-xs text-zinc-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {details?.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors">
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </button>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}