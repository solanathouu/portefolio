'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <motion.header
      id={id}
      className="mb-16 text-center scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] bg-gradient-to-r from-white via-[var(--accent-violet-light)] to-[var(--accent-cyan-light)] bg-clip-text text-transparent">
        {title}
      </h2>
    </motion.header>
  );
}
