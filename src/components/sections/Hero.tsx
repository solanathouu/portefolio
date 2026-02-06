'use client';

import Avatar3D from '@/components/avatar/Avatar3D';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[500vh] bg-gradient-to-b from-background via-background to-background/50"
    >
      {/* Sticky container pour l'avatar */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-16">
            {/* Texte à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold"
              >
                Bonjour, je suis{' '}
                <span className="text-primary">Votre Nom</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-foreground/70"
              >
                Développeur Web Full Stack passionné par la création
                d'expériences digitales innovantes et performantes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Button variant="primary" size="lg">
                  <a href="#projects">Voir mes projets</a>
                </Button>
                <Button variant="secondary" size="lg">
                  <a href="#contact">Me contacter</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Avatar à droite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-md mx-auto"
              style={{ height: '600px' }}
            >
              <Avatar3D
                frameCount={173}
                scrollStart={0}
                scrollEnd={400}
                className="w-full h-full"
              />

              {/* Overlay gradient pour fondre l'arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background pointer-events-none" />

              {/* Glow effect derrière l'avatar */}
              <div className="absolute inset-0 bg-primary/10 blur-[120px] -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - fixé en bas de l'écran */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-foreground/50 font-medium">Scrollez pour animer</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2 bg-foreground/40 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
