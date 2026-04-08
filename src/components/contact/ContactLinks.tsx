'use client';

import { FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import GlowCard from '@/components/ui/GlowCard';

const contactItems = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'skwarek.nathan@gmail.com',
    href: 'mailto:skwarek.nathan@gmail.com',
    glowColor: 'rgba(255, 60, 120, 0.08)',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Nathan Skwarek',
    href: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    glowColor: 'rgba(0, 119, 181, 0.08)',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'solanathouu',
    href: 'https://github.com/solanathouu',
    glowColor: 'rgba(255, 255, 255, 0.05)',
  },
  {
    icon: FiDownload,
    label: 'CV',
    value: 'Télécharger le PDF',
    href: '/certificates/cv.pdf',
    glowColor: 'rgba(120, 80, 255, 0.08)',
    download: true,
  },
];

export default function ContactLinks() {
  return (
    <div className="space-y-8">
      <p className="text-center text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-12">
        En quête d&apos;une alternance où je peux monter en compétences et livrer du concret.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.download ? undefined : '_blank'}
            rel={item.download ? undefined : 'noopener noreferrer'}
            download={item.download || undefined}
          >
            <GlowCard glowColor={item.glowColor} className="group p-6 flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface-hover)] group-hover:scale-110 transition-transform">
                <item.icon size={20} className="text-[var(--text-secondary)] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="text-xs text-[var(--text-muted)]">{item.value}</p>
              </div>
            </GlowCard>
          </a>
        ))}
      </div>
    </div>
  );
}
