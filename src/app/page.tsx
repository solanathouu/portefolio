'use client';

import dynamic from 'next/dynamic';
import HubName from '@/components/hub/HubName';
import SectionHeader from '@/components/sections/SectionHeader';
import SkillsGrid from '@/components/skills/SkillsGrid';
import ContactLinks from '@/components/contact/ContactLinks';

const ShaderBackground = dynamic(
  () => import('@/components/three/ShaderBackground'),
  { ssr: false }
);

const Starfield = dynamic(
  () => import('@/components/three/Starfield'),
  { ssr: false }
);

const HeroOrbs = dynamic(
  () => import('@/components/hub/HeroOrbs'),
  { ssr: false }
);

import ProjectBentoGrid from '@/components/projects/ProjectBentoGrid';

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <Starfield />

      {/* Hero — full screen with orbs */}
      <section className="relative h-screen w-full overflow-hidden">
        <HeroOrbs />
        <HubName />
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)]">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 py-24 px-6" id="projects">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Projets" subtitle="Portfolio" />
          <ProjectBentoGrid />
        </div>
      </section>

      {/* Skills */}
      <section className="relative z-10 py-24 px-6" id="skills">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Compétences" subtitle="Skills" />
          <SkillsGrid />
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 py-24 px-6" id="contact">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Contact" subtitle="Get in touch" />
          <ContactLinks />
        </div>
      </section>
    </>
  );
}
