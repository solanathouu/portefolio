'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push('/#projects')}
      className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full
        bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
        text-[var(--text-secondary)] text-sm
        hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
        transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg leading-none">&larr;</span>
      <span>Retour</span>
    </motion.button>
  );
}
