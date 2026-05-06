'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Footer from '@/components/layout/Footer';
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
            <div style={{ height: '120px' }} />
            <Skills />
            <div style={{ height: '100px' }} />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
