import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Lock, Activity } from 'lucide-react';

const bootSequence = [
  { text: '> INITIALIZING CYBERSECURITY PROTOCOLS...', delay: 300 },
  { text: '> LOADING ENCRYPTION MODULES...', delay: 400 },
  { text: '> ESTABLISHING SECURE CONNECTION...', delay: 500 },
  { text: '> RUNNING VULNERABILITY SCAN...', delay: 600 },
  { text: '> 0 THREATS DETECTED — SYSTEM CLEAN', delay: 700 },
  { text: '', delay: 100 },
  { text: '╔══════════════════════════════════════╗', delay: 100 },
  { text: '║     PRIMEXALBIN SECURITY CONSOLE     ║', delay: 200 },
  { text: '╚══════════════════════════════════════╝', delay: 100 },
  { text: '', delay: 100 },
  { text: 'Type "help" for available commands.', delay: 300 },
];

const responses = {
  help: [
    'Available commands:',
    '  help     — Show this message',
    '  skills   — List technical skills',
    '  about    — About Albin Eby',
    '  projects — View featured projects',
    '  scan     — Run system diagnostics',
    '  decrypt  — Decrypt the secret message',
    '  clear    — Clear the terminal',
  ],
  skills: [
    'TECHNICAL SKILLS:',
    '  • Frontend: React, Next.js, Tailwind CSS, Framer Motion',
    '  • Backend: Node.js, Python, FastAPI',
    '  • Database: MongoDB, PostgreSQL',
    '  • Cybersecurity: Network Security, Encryption, Vulnerability Assessment',
    '  • Tools: Docker, Git, Linux, Vercel',
  ],
  about: [
    'Albin Eby (PRIMExALBIN)',
    '━━━━━━━━━━━━━━━━━━━━━━━',
    'Full-stack developer & cybersecurity enthusiast',
    'Passionate about building secure, performant digital experiences',
    'Based in Kerala, India',
  ],
  projects: [
    'FEATURED PROJECTS:',
    '  • TechSphere    — Modern tech landing page',
    '  • SecureNote    — Encrypted note-taking app',
    '  • ByteBlog      — Personal blog platform',
    '  • Type "open <project>" to learn more',
  ],
  scan: [
    'RUNNING SYSTEM DIAGNOSTICS...',
    '  [████████████████████] 100%',
    '  ✓ Firewall: ACTIVE',
    '  ✓ Encryption: AES-256',
    '  ✓ Network: SECURE',
    '  ✓ No vulnerabilities detected',
    'STATUS: ✅ ALL SYSTEMS OPERATIONAL',
  ],
  decrypt: [
    'DECRYPTING MESSAGE...',
    '  [███████████████░░░░░] 75%',
    '  Decrypted: "Stay curious, keep building."',
    '  — PRIMExALBIN',
  ],
};

export default function SecurityConsole() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [typing, setTyping] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const runBoot = async () => {
      for (const step of bootSequence) {
        if (!mounted) break;
        await new Promise((r) => setTimeout(r, step.delay + Math.random() * 200));
        if (mounted) {
          setLines((prev) => [...prev, { text: step.text, type: 'system' }]);
        }
      }
      if (mounted) {
        setBooted(true);
        setTyping(false);
      }
    };
    runBoot();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setLines((prev) => [...prev, { text: `$ ${cmd}`, type: 'input' }]);

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    const resp = responses[trimmed];
    if (resp) {
      resp.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, { text: line, type: 'output' }]);
        }, i * 50);
      });
    } else {
      setLines((prev) => [
        ...prev,
        { text: `Unknown command: "${trimmed}". Type "help" for available commands.`, type: 'error' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/90 backdrop-blur-xl"
      onClick={handleContainerClick}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-emerald-500/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-[10px] font-medium tracking-wider text-emerald-400/80 uppercase">
            <Terminal className="inline-block h-3 w-3 mr-1" />
            Security Console
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400/60">
          <Lock className="h-3 w-3" />
          <span>ENCRYPTED</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="h-[280px] overflow-y-auto p-4 font-mono text-xs leading-relaxed scrollbar-thin">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.type === 'system'
                ? 'text-emerald-400/70'
                : line.type === 'input'
                ? 'text-cyan-300'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-emerald-300/80'
            } whitespace-pre-wrap`}
          >
            {line.text}
          </div>
        ))}

        {booted && (
          <div className="mt-1 flex items-center">
            <span className="text-emerald-400">$</span>
            <div className="relative flex-1 ml-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-emerald-200 outline-none caret-emerald-400"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {typing && (
          <div className="mt-1 flex items-center gap-2 text-emerald-400/60">
            <Activity className="h-3 w-3 animate-pulse" />
            <span>Booting sequence...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="h-full w-full animate-scan-line bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
      </div>

      {/* Bottom shield indicator */}
      <div className="flex items-center gap-2 border-t border-emerald-500/10 px-4 py-1.5 text-[10px] text-emerald-500/50">
        <Shield className="h-3 w-3" />
        <span>System Secure • AES-256 • Connection Active</span>
      </div>
    </div>
  );
}