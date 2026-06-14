import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  Terminal,
  User,
  Briefcase,
  Mail,
  Github,
  Instagram,
  Home,
  FileCode,
} from 'lucide-react';

const items = [
  { id: 'home', label: 'Home', icon: Home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { id: 'about', label: 'About Albin', icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', label: 'View Projects', icon: Briefcase, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Get in Touch', icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'console', label: 'Open Security Console', icon: Terminal, action: () => document.getElementById('console')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'github', label: 'Visit GitHub', icon: Github, action: () => window.open('https://github.com/PRIMExALBIN', '_blank') },
  { id: 'instagram', label: 'Visit Instagram', icon: Instagram, action: () => window.open('https://www.instagram.com/pr1mexalb1n/', '_blank') },
  { id: 'source', label: 'View Portfolio Source', icon: FileCode, action: () => window.open('https://github.com/PRIMExALBIN/PRIMExALBIN', '_blank') },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
        setOpen(false);
      }
    },
    [filtered, selectedIndex]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Menu panel */}
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Search input */}
            <div className="flex items-center border-b border-white/5 px-4">
              <Command className="h-4 w-4 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-zinc-500">
                ESC
              </kbd>
            </div>

            {/* Items */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-zinc-500">
                  No results found.
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? 'bg-cyan-500/10 text-cyan-200'
                        : 'text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.action.toString().includes('scrollIntoView') && (
                      <span className="text-[10px] text-zinc-600">Navigate</span>
                    )}
                    {item.action.toString().includes('open') && (
                      <span className="text-[10px] text-zinc-600">External</span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
              <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span className="text-[10px] text-zinc-600">⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}