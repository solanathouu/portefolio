'use client';

import { motion } from 'framer-motion';
import { contactLinks } from '@/data/contact';
import { getContactIcon } from '@/lib/utils/contactIcons';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-8 md:px-12 lg:px-16"
      style={{ paddingTop: '120px', paddingBottom: '64px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Contact
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            En quête d&apos;une alternance où je peux monter en compétences
            et livrer du concret. Si ça vous parle, on s&apos;écrit.
          </p>
        </motion.div>

        {/* Contact Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {contactLinks.map((link, index) => {
            const Icon = getContactIcon(link.icon);

            return (
              <motion.a
                key={link.type}
                href={link.url}
                target={link.type === 'email' ? undefined : '_blank'}
                rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="contact-chip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 22px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {Icon && <Icon size={22} style={{ color: 'rgba(255,255,255,0.7)' }} />}
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
