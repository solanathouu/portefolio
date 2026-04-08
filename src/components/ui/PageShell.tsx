'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import BackButton from '@/components/ui/BackButton';

const InnerOrb = dynamic(
  () => import('@/components/three/InnerOrb'),
  { ssr: false }
);

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  orbColor?: string;
}

export default function PageShell({
  children,
  title,
  subtitle,
  orbColor = '#7850ff',
}: PageShellProps) {
  return (
    <>
      <InnerOrb color={orbColor} />
      <BackButton />
      <motion.main
        className="relative z-10 min-h-screen pt-24 pb-16 px-6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
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
