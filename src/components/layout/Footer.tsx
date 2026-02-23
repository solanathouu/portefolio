'use client';

import { motion } from 'framer-motion';

interface MarqueeRowConfig {
  words: string[];
  duration: number;
  reverse: boolean;
  opacity: number;
  fontSize: string;
}

const MARQUEE_ROWS: MarqueeRowConfig[] = [
  {
    words: [
      'nathan skwarek', 'python', 'vibe', 'café', 'data',
      'creative', 'scraping', 'paris', 'pixel perfect',
      'dark mode', 'curious', 'deploy', 'dev life',
    ],
    duration: 40,
    reverse: true,
    opacity: 0.07,
    fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
  },
  {
    words: [
      'clean code', 'coding', 'claude', 'git push', 'terminal',
      'flow', 'automation', 'JSON', 'localhost:3000',
      'open source', 'debug', 'nathan skwarek', 'next.js',
      'ship it', 'nocturne',
    ],
    duration: 30,
    reverse: false,
    opacity: 0.85,
    fontSize: 'clamp(2rem, 5.5vw, 5rem)',
  },
  {
    words: [
      'npm run dev', 'SQL', 'react', 'café & code', 'design',
      'API', 'no bugs', 'CSV', 'nathan skwarek', 'fastapi',
      'ctrl+c', '01101', 'wifi & café',
    ],
    duration: 36,
    reverse: true,
    opacity: 0.12,
    fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
  },
];

function MarqueeRow({ config }: { config: MarqueeRowConfig }) {
  const { words, duration, reverse, opacity, fontSize } = config;
  const content = words.join('  \u00b7  ').toUpperCase() + '  \u00b7  ';

  return (
    <div
      className="overflow-hidden whitespace-nowrap pointer-events-none select-none"
      style={{ opacity }}
    >
      <div
        className="marquee-track inline-flex"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
          fontSize,
        }}
      >
        <span className="inline-block font-bold uppercase tracking-wider text-white">
          {content}
        </span>
        <span className="inline-block font-bold uppercase tracking-wider text-white">
          {content}
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Separator — gradient fade line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto w-11/12 max-w-6xl h-px origin-left"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
        }}
      />

      {/* Marquee zone — 3 rows, different speeds & directions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="overflow-hidden flex flex-col gap-2"
        style={{ paddingTop: '50px', paddingBottom: '40px' }}
      >
        {MARQUEE_ROWS.map((row, i) => (
          <MarqueeRow key={i} config={row} />
        ))}
      </motion.div>

      {/* Signature line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-white/25 text-xs uppercase tracking-[0.2em] relative"
        style={{ paddingBottom: '30px' }}
      >
&copy; {currentYear} &mdash; Paris
      </motion.p>
    </footer>
  );
}
