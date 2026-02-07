'use client';

import { contactLinks } from '@/data/contact';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLoading } from '@/lib/contexts/LoadingContext';

const iconMap = {
  HiMail,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isLoading } = useLoading();

  if (isLoading) return null;

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-foreground/60 text-sm">
            © {currentYear} Portfolio. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              if (!Icon) return null;

              return (
                <a
                  key={link.type}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
