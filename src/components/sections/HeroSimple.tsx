'use client';

import Avatar3D from '@/components/avatar/Avatar3D';
import Button from '@/components/ui/Button';

export default function HeroSimple() {
  return (
    <section
      id="hero"
      className="relative min-h-[300vh] bg-gradient-to-b from-background via-background to-background/50"
    >
      {/* Sticky container pour l'avatar */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold">
                Bonjour, je suis{' '}
                <span className="text-primary">Votre Nom</span>
              </h1>

              <p className="text-xl md:text-2xl text-foreground/70">
                Développeur Web Full Stack passionné par la création
                d'expériences digitales innovantes et performantes.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg">
                  <a href="#projects">Voir mes projets</a>
                </Button>
                <Button variant="secondary" size="lg">
                  <a href="#contact">Me contacter</a>
                </Button>
              </div>
            </div>

            {/* Avatar à droite */}
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <Avatar3D
                frameCount={173}
                scrollStart={0}
                scrollEnd={200}
                className="w-full h-full"
              />

              {/* Glow effect derrière l'avatar */}
              <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-foreground/50">Scrollez pour animer</p>
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-foreground/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
