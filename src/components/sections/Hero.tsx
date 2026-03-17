'use client';

import Avatar3DLocked from '@/components/avatar/Avatar3DLocked';
import { motion, useAnimation } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

const CONTACT_BUBBLES = [
  {
    icon: SiGithub,
    label: 'GitHub',
    url: 'https://github.com/solanathouu',
    color: '#ffffff',
    finalX: 280,
    finalY: -180,
    threshold: 0.25,
  },
  {
    icon: SiLinkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    color: '#0A66C2',
    finalX: -300,
    finalY: 20,
    threshold: 0.45,
  },
  {
    icon: HiMail,
    label: 'Email',
    url: 'mailto:skwarek.nathan@gmail.com',
    color: '#EA4335',
    finalX: 250,
    finalY: 160,
    threshold: 0.65,
  },
];

function ContactBubble({ bubble, scrollProgress }: {
  bubble: typeof CONTACT_BUBBLES[0];
  scrollProgress: number;
}) {
  const controls = useAnimation();
  const hasTriggered = useRef(false);
  const Icon = bubble.icon;

  useEffect(() => {
    if (scrollProgress >= bubble.threshold && !hasTriggered.current) {
      hasTriggered.current = true;

      // Phase 1: Birth at center
      controls.set({
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0,
        borderRadius: '50%',
      });

      // Phase 2: Fast expulsion then slow settle
      const fx = `calc(-50% + ${bubble.finalX}px)`;
      const fy = `calc(-50% + ${bubble.finalY}px)`;
      controls.start({
        x: fx,
        y: fy,
        scale: [0, 0.5, 0.85, 0.95, 1.02, 1],
        opacity: [0, 1, 1, 1, 1, 1],
        borderRadius: [
          '50%',
          '45% 55% 52% 48% / 48% 50% 55% 45%',
          '43% 57% 54% 46% / 46% 52% 57% 43%',
          '46% 54% 52% 48% / 49% 54% 54% 46%',
          '47% 53% 54% 46% / 46% 54% 53% 47%',
          '48% 52% 55% 45% / 45% 55% 48% 52%',
        ],
        transition: {
          duration: 1.8,
          times: [0, 0.04, 0.15, 0.35, 0.6, 1],
          x: { duration: 1.8, ease: [0.2, 0.9, 0.1, 1] },
          y: { duration: 1.8, ease: [0.2, 0.9, 0.1, 1] },
        },
      }).then(() => {
        // Phase 3: Infinite organic float
        const fx = bubble.finalX;
        const fy = bubble.finalY;
        controls.start({
          x: [
            `calc(-50% + ${fx}px)`,
            `calc(-50% + ${fx + 14}px)`,
            `calc(-50% + ${fx - 8}px)`,
            `calc(-50% + ${fx + 11}px)`,
            `calc(-50% + ${fx - 12}px)`,
            `calc(-50% + ${fx + 6}px)`,
            `calc(-50% + ${fx - 4}px)`,
            `calc(-50% + ${fx + 9}px)`,
            `calc(-50% + ${fx}px)`,
          ],
          y: [
            `calc(-50% + ${fy}px)`,
            `calc(-50% + ${fy - 16}px)`,
            `calc(-50% + ${fy + 10}px)`,
            `calc(-50% + ${fy - 7}px)`,
            `calc(-50% + ${fy + 14}px)`,
            `calc(-50% + ${fy - 11}px)`,
            `calc(-50% + ${fy + 8}px)`,
            `calc(-50% + ${fy - 5}px)`,
            `calc(-50% + ${fy}px)`,
          ],
          scale: [1, 1.06, 0.94, 1.04, 0.96, 1.05, 0.97, 1.03, 1],
          borderRadius: [
            '35% 65% 58% 42% / 42% 58% 65% 35%',
            '58% 42% 35% 65% / 65% 35% 58% 42%',
            '42% 58% 65% 35% / 35% 65% 42% 58%',
            '65% 35% 42% 58% / 58% 42% 35% 65%',
            '38% 62% 55% 45% / 62% 38% 45% 55%',
            '62% 38% 45% 55% / 38% 62% 55% 45%',
            '45% 55% 62% 38% / 55% 45% 38% 62%',
            '55% 45% 38% 62% / 45% 55% 62% 38%',
            '35% 65% 58% 42% / 42% 58% 65% 35%',
          ],
          transition: {
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
          },
        });
      });
    }
  }, [scrollProgress, bubble, controls]);

  return (
    <motion.a
      href={bubble.url}
      target={bubble.url.startsWith('mailto') ? undefined : '_blank'}
      rel={bubble.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      className="contact-bubble"
      animate={controls}
      initial={{
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0,
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '68px',
        height: '68px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.15)',
        textDecoration: 'none',
        color: 'rgba(255,255,255,0.8)',
        cursor: 'pointer',
        pointerEvents: hasTriggered.current ? 'auto' : 'none',
      }}
    >
      <Icon style={{ width: 26, height: 26, color: bubble.color }} />
    </motion.a>
  );
}

export default function Hero() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleProgressChange = useCallback((p: number) => {
    setScrollProgress(p);
  }, []);

  return (
    <section
      id="hero"
      className="relative"
      style={{
        minHeight: animationComplete ? '120vh' : '100vh',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">
        {/* Texte NATHAN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 0 }}
        >
          <h1
            className="font-black tracking-tighter"
            style={{
              fontSize: 'clamp(8rem, 20vw, 18rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(2px)',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.05)',
            } as React.CSSProperties}
          >
            NATHAN
          </h1>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl mx-auto px-6"
          style={{ height: '700px', zIndex: 10 }}
        >
          <Avatar3DLocked
            frameCount={173}
            onAnimationComplete={() => setAnimationComplete(true)}
            onProgressChange={handleProgressChange}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-primary/10 blur-[120px] -z-10" />
        </motion.div>

        {/* Contact bubbles */}
        {CONTACT_BUBBLES.map((bubble) => (
          <ContactBubble
            key={bubble.label}
            bubble={bubble}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Scroll indicator */}
        {!animationComplete && (
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ zIndex: 20, bottom: '40px' }}
          >
            <span className="text-xs uppercase tracking-widest text-white/40">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/30"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
