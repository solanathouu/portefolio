import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Test spacing with Header */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Portfolio Test
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Test des composants de base : Button, Badge, RevealOnScroll, Header & Footer
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Test Buttons Section */}
      <section id="buttons" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-12 text-center">Buttons</h2>
          </RevealOnScroll>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <RevealOnScroll delay={0.1}>
              <Button variant="primary">Primary Button</Button>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <Button variant="secondary">Secondary Button</Button>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <Button variant="ghost">Ghost Button</Button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Test Badges Section */}
      <section id="badges" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-12 text-center">Badges</h2>
          </RevealOnScroll>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <RevealOnScroll delay={0.1}>
              <Badge>React</Badge>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <Badge>TypeScript</Badge>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <Badge>Next.js</Badge>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <Badge>Tailwind CSS</Badge>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <Badge>Framer Motion</Badge>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Test Scroll Animation Section */}
      <section id="scroll-test" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-12 text-center">Scroll Animations</h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <RevealOnScroll key={item} delay={index * 0.1}>
                <div className="p-8 rounded-lg bg-foreground/5 border border-foreground/10">
                  <h3 className="text-2xl font-bold mb-3">Card {item}</h3>
                  <p className="text-foreground/60 mb-4">
                    This card animates on scroll with RevealOnScroll component.
                  </p>
                  <Badge>Animation {item}</Badge>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Test Footer spacing */}
      <section id="footer-test" className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-6">Tests Completed ✅</h2>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Scroll to see all components in action. Check console for any errors.
            </p>
            <Button variant="primary">Ready for Phase 1</Button>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
