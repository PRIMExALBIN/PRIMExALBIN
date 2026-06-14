import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  ExternalLink,
  Github,
  Mail,
  ChevronRight,
  Sparkles,
  Code2,
  Palette,
  Lock,
  Cpu,
} from 'lucide-react';

import Navbar from './components/Navbar.jsx';
import ParticlesBackground from './components/ParticlesBackground.jsx';
import SpringCard from './components/SpringCard.jsx';
import SecurityConsole from './components/SecurityConsole.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import CommandMenu from './components/CommandMenu.jsx';
import Footer from './components/Footer.jsx';

const projects = [
  { title: 'TechSphere', desc: 'A clean, modern landing page showcasing tech products and services.', tag: 'Landing Page' },
  { title: 'SecureNote', desc: 'A web app demonstrating secure note-taking with encryption features.', tag: 'Web App' },
  { title: 'ByteBlog', desc: 'A personal blog platform with smooth navigation and sleek UI.', tag: 'Blog' },
];

const skills = [
  { name: 'React / Next.js', icon: Code2, color: 'text-cyan-300' },
  { name: 'Node.js / Python', icon: Cpu, color: 'text-emerald-300' },
  { name: 'UI/UX Design', icon: Palette, color: 'text-fuchsia-300' },
  { name: 'Cybersecurity', icon: Lock, color: 'text-rose-300' },
];

function getLocalTime() {
  // Kerala, India is UTC+5:30
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const kerala = new Date(utc + 5.5 * 3600000);
  return kerala.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function getTimeUntilMidnight() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const kerala = new Date(utc + 5.5 * 3600000);
  const endOfDay = new Date(kerala);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay - kerala;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [time, setTime] = useState(getLocalTime);
  const [dayProgress, setDayProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getLocalTime());
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const kerala = new Date(utc + 5.5 * 3600000);
      const totalMs = 24 * 60 * 60 * 1000;
      const elapsed = kerala - new Date(kerala.getFullYear(), kerala.getMonth(), kerala.getDate());
      setDayProgress((elapsed / totalMs) * 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openProject = (project) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  const closeProject = () => {
    setModalOpen(false);
    setTimeout(() => setActiveProject(null), 200);
  };

  const navigateProject = (direction) => {
    const idx = projects.findIndex((p) => p.title === activeProject?.title);
    const newIdx = (idx + direction + projects.length) % projects.length;
    setActiveProject(projects[newIdx]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ParticlesBackground />
      <Navbar />
      <CommandMenu />

      {/* Main Bento Grid */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* === HERO CARD - Span 2 cols === */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-2">
            <SpringCard className="h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-6 sm:p-8">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Available for work
                    </div>
                  </div>
                  <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10">
                    <span className="text-xl font-bold bg-gradient-to-br from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      AE
                    </span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
                      Albin Eby
                    </span>
                  </h1>
                  <p className="mt-2 text-sm text-zinc-400 max-w-md">
                    Full-stack developer & cybersecurity enthusiast.
                    Building secure, performant digital experiences.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-400">
                    <Code2 className="h-3 w-3 text-cyan-400" />
                    Full-Stack
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-400">
                    <Lock className="h-3 w-3 text-emerald-400" />
                    Security
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-400">
                    <Palette className="h-3 w-3 text-fuchsia-400" />
                    Design
                  </span>
                </div>

                {/* Quick action buttons */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <a
                    href="https://github.com/PRIMExALBIN"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href="mailto:ebyalbin1@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </SpringCard>
          </motion.div>

          {/* === LOCATION / TIME WIDGET === */}
          <motion.div variants={itemVariants}>
            <SpringCard className="h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-6">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Location</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Kerala, India</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-2xl font-mono font-bold text-emerald-300 tabular-nums">
                      {time}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-zinc-600 mb-1">
                      <span>Day progress</span>
                      <span>{getTimeUntilMidnight()} remaining</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000"
                        style={{ width: `${dayProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SpringCard>
          </motion.div>

          {/* === ABOUT / BIO CARD === */}
          <motion.div variants={itemVariants}>
            <SpringCard className="h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-6">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
                  <span>About</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  I'm passionate about technology, IT systems, and cybersecurity,
                  with a love for creating high-quality visuals. I combine technical
                  expertise with creativity to build smart, visually engaging digital
                  projects.
                </p>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View my work <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </SpringCard>
          </motion.div>

          {/* === SECURITY CONSOLE - Span 2 cols === */}
          <motion.div variants={itemVariants} id="console" className="sm:col-span-2">
            <SpringCard className="h-full bg-transparent border-none p-0">
              <SecurityConsole />
            </SpringCard>
          </motion.div>

          {/* === TECH STACK WIDGET === */}
          <motion.div variants={itemVariants} className="sm:col-span-1">
            <SpringCard className="h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-6">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Tech Stack</span>
                </div>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05] transition-colors"
                    >
                      <skill.icon className={`h-4 w-4 ${skill.color}`} />
                      <span className="text-[10px] text-zinc-400 text-center leading-tight">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpringCard>
          </motion.div>

          {/* === PROJECTS SECTION - Span all cols === */}
          <motion.div variants={itemVariants} id="projects" className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-zinc-400">Featured Projects</h2>
              <span className="text-[10px] text-zinc-600">Click to explore</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p, i) => (
                <SpringCard
                  key={p.title}
                  className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-5"
                  onClick={() => openProject(p)}
                >
                  <div className="relative">
                    <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] text-cyan-300">
                      {p.tag}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View details</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>

                    {/* Project number badge */}
                    <div className="absolute top-0 right-0 text-[40px] font-bold text-white/[0.03] select-none pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </SpringCard>
              ))}
            </div>
          </motion.div>

          {/* === CONTACT / SOCIAL CARD === */}
          <motion.div variants={itemVariants} className="sm:col-span-1 lg:col-span-2">
            <SpringCard className="h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/5 p-6">
              <div className="flex h-full flex-col justify-center gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                  <span>Let's connect</span>
                </div>
                <p className="text-sm text-zinc-400">
                  Open to collaborations, interesting projects, or just a friendly chat.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="mailto:ebyalbin1@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-300 hover:bg-amber-500/20 transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Send Email
                  </a>
                  <a
                    href="https://github.com/PRIMExALBIN"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </SpringCard>
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={activeProject}
        open={modalOpen}
        onClose={closeProject}
        onPrev={() => navigateProject(-1)}
        onNext={() => navigateProject(1)}
        hasPrev={true}
        hasNext={true}
      />
    </div>
  );
}