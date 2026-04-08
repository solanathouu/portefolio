'use client';

import { motion } from 'framer-motion';
import ShaderBackground from '@/components/three/ShaderBackground';
import BackButton from '@/components/ui/BackButton';

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <>
      <ShaderBackground opacity={0.15} />
      <BackButton />
      <motion.main
        className="relative z-10 min-h-screen pt-24 pb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              {subtitle}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] bg-gradient-to-r from-white via-[var(--accent-violet-light)] to-[var(--accent-cyan-light)] bg-clip-text text-transparent">
              {title}
            </h1>
          </header>
          {children}
        </div>
      </motion.main>
    </>
  );
}
