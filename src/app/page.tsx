import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Placeholder sections pour scroll */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-background/50">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Projects</h2>
          <p className="text-xl text-foreground/60">Section à venir</p>
        </div>
      </section>

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
    </main>
  );
}
