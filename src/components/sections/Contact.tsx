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
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="mx-auto w-11/12 max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px' }}
        >
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-bold leading-none uppercase text-white">
              // Contact
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ marginTop: '40px' }}
            >
              Un projet en tête, une question ou simplement envie d&apos;échanger ?
              N&apos;hésitez pas à me contacter via l&apos;un de ces canaux.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="h-1 origin-left bg-white/20"
            style={{ marginTop: '30px' }}
          />
        </motion.div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactLinks.map((link, index) => {
            const Icon = getContactIcon(link.icon);
            const accentColor = '#00f0ff';

            return (
              <motion.a
                key={link.type}
                href={link.url}
                target={link.type === 'email' ? undefined : '_blank'}
                rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-5 bg-black/30 p-6 cursor-pointer"
                style={{
                  border: '2px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.boxShadow = `8px 8px 0 0 ${accentColor}`;
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                  e.currentTarget.style.transform = 'translate(0, 0)';
                }}
              >
                {Icon && <Icon size={28} className="text-white" />}
                <span className="text-sm uppercase tracking-wider text-white">
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
