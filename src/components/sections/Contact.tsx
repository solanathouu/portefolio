'use client';

import { motion } from 'framer-motion';
import { contactLinks } from '@/data/contact';
import { getContactIcon } from '@/lib/utils/contactIcons';
import { withBase } from '@/lib/utils/basePath';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative pt-32 px-8 md:px-12 lg:px-16"
      style={{ paddingBottom: '120px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            En quête d&apos;une alternance où je peux monter en compétences et
            livrer du concret. N&apos;hésitez pas à me contacter.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
          }}
        >
          {contactLinks.map((link, index) => {
            const Icon = getContactIcon(link.icon);
            const isExternal = link.url.startsWith('http');
            const href = isExternal || link.url.startsWith('mailto:')
              ? link.url
              : withBase(link.url);

            return (
              <motion.a
                key={link.type}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                download={link.download ? '' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
                className="contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 22px',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition:
                    'background-color 0.3s ease, border-color 0.3s ease',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background:
                      link.iconBackground ?? 'rgba(255,255,255,0.08)',
                  }}
                >
                  {Icon && <Icon size={22} style={{ color: link.iconColor }} />}
                </span>
                <span
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '4px',
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.9)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {link.value}
                  </span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
