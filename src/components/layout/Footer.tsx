'use client';

import { contactLinks } from '@/data/contact';
import { getContactIcon } from '@/lib/utils/contactIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-8 md:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Copyright */}
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            &copy; {currentYear} Nathan Skwarek
          </p>

          {/* Center - Social Icons */}
          <div className="flex items-center gap-6">
            {contactLinks.map((link) => {
              const Icon = getContactIcon(link.icon);
              return (
                <a
                  key={link.type}
                  href={link.url}
                  target={link.type === 'email' ? undefined : '_blank'}
                  rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                  className="text-white/40 hover:text-[#00f0ff] transition-colors"
                  aria-label={link.label}
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>

          {/* Right - Built with */}
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
