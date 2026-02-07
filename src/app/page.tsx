'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import { useLoading } from '@/lib/contexts/LoadingContext';

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <>
      {/* Preloader */}
      <Preloader onLoadComplete={() => setIsLoading(false)} />

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="min-h-screen"
          >
            <Hero />
            <Projects />

            <section id="skills" className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">Skills</h2>
                <p className="text-xl text-foreground/60">Section à venir</p>
              </div>
            </section>

            <section id="contact" className="min-h-screen flex items-center justify-center bg-background/50">
              <div className="text-center">
                <h2 className="text-5xl font-bold mb-4">Contact</h2>
                <p className="text-xl text-foreground/60">Section à venir</p>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
