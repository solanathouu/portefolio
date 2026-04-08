'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const links = [
  { icon: FiDownload, href: '/certificates/cv.pdf', label: 'CV', download: true },
  { icon: FiMail, href: 'mailto:skwarek.nathan@gmail.com', label: 'Email' },
  { icon: FiGithub, href: 'https://github.com/solanathouu', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/', label: 'LinkedIn' },
];

export default function QuickLinks() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-30 flex gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.download ? undefined : '_blank'}
          rel={link.download ? undefined : 'noopener noreferrer'}
          download={link.download || undefined}
          title={link.label}
          className="flex items-center justify-center w-10 h-10 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-sm
            hover:bg-[var(--surface-hover)] hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]
            transition-all duration-300"
        >
          <link.icon size={16} />
        </a>
      ))}
    </motion.div>
  );
}
