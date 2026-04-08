'use client';

import { motion } from 'framer-motion';

export default function HubName() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.04em] bg-gradient-to-r from-white via-[var(--accent-violet-light)] to-[var(--accent-cyan-light)] bg-clip-text text-transparent">
          Nathan Skwarek
        </h1>
        <p className="text-[13px] tracking-[0.15em] uppercase text-[var(--text-muted)] mt-2">
          Data Analyst &amp; Developer
        </p>
      </motion.div>
    </div>
  );
}
