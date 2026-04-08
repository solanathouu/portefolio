# Portfolio V2 — Dark Luminous — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a multi-page hub with Three.js shaders, 3D orbs, carousel, and GlowCards — dark luminous premium aesthetic.

**Architecture:** Hub central (/) with shader background + 3 floating 3D orbs linking to /projects, /skills, /contact. Each page uses shared shader background (dimmed) and GlowCard components. Projects page has a 3D carousel. Transitions use Framer Motion page animations triggered by orb zoom-in.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Three.js (NEW), Framer Motion, React Icons, Space Grotesk font.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    — Root layout (font, TransitionProvider, ShaderBackground)
│   ├── page.tsx                      — Hub central (orbs + name + quick-links)
│   ├── globals.css                   — Tailwind + design tokens CSS variables
│   ├── not-found.tsx                 — 404 page (dark luminous style)
│   ├── projects/
│   │   ├── page.tsx                  — Projects carousel page
│   │   └── [id]/
│   │       ├── page.tsx              — Project detail (server component)
│   │       └── not-found.tsx         — Project 404
│   ├── skills/
│   │   └── page.tsx                  — Skills GlowCards page
│   └── contact/
│       └── page.tsx                  — Contact GlowCards page
│
├── components/
│   ├── three/
│   │   ├── ShaderBackground.tsx      — Full-screen aurora+rings shader (Three.js)
│   │   └── Orb.tsx                   — Single 3D orb with atmospheric glow
│   ├── hub/
│   │   ├── HubScene.tsx              — Three.js scene with 3 orbs + raycasting
│   │   ├── HubName.tsx               — Center name + subtitle (HTML overlay)
│   │   └── QuickLinks.tsx            — 4 mini glassmorphism circle links
│   ├── projects/
│   │   ├── ProjectCarousel.tsx       — 3D perspective carousel
│   │   ├── ProjectCarouselCard.tsx   — Single carousel card
│   │   ├── ProjectDescription.tsx    — Animated word-by-word description
│   │   └── ProjectDetail.tsx         — Detail page client component (reuse/adapt v1)
│   ├── skills/
│   │   └── SkillsGrid.tsx            — Skills grouped by category with GlowCards
│   ├── contact/
│   │   └── ContactLinks.tsx          — Contact GlowCards
│   ├── ui/
│   │   ├── GlowCard.tsx              — Cursor-tracking spotlight card
│   │   ├── PageShell.tsx             — Shared page wrapper (back button, title, shader dimmed)
│   │   ├── BackButton.tsx            — Animated back-to-hub button
│   │   └── Badge.tsx                 — Tag badge (keep from v1)
│   └── transition/
│       └── TransitionProvider.tsx     — Framer Motion AnimatePresence for page transitions
│
├── lib/
│   ├── hooks/
│   │   └── useMousePosition.ts       — Track mouse position for GlowCard spotlight
│   ├── shaders/
│   │   ├── aurora.frag               — Aurora fragment shader (from inspiration)
│   │   └── rings.frag                — Chromatic rings fragment shader (from inspiration)
│   └── utils/
│       ├── cn.ts                     — Keep from v1
│       ├── skillIcons.tsx            — Keep from v1
│       └── contactIcons.tsx          — Keep from v1
│
├── data/
│   ├── projects.ts                   — Keep from v1 (unchanged)
│   ├── skills.ts                     — Keep from v1 (unchanged)
│   └── contact.ts                    — Keep from v1 (unchanged)
```

### Files to DELETE (v1 only)

```
src/components/avatar/Avatar3D.tsx
src/components/avatar/Avatar3DLocked.tsx
src/components/layout/Footer.tsx
src/components/layout/ParticleBackground.tsx
src/components/sections/Preloader.tsx
src/components/sections/Hero.tsx
src/components/sections/Projects.tsx
src/components/sections/Skills.tsx
src/components/sections/Contact.tsx
src/components/projects/ProjectCard.tsx
src/components/skills/SkillCard.tsx
src/lib/hooks/useImageSequence.ts
src/lib/hooks/useScrollLockAnimation.ts
src/lib/contexts/LoadingContext.tsx
```

---

## Task 1: Install Three.js + Setup Design Tokens

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install three.js and types**

```bash
cd C:/Users/skwar/Desktop/portfolio-new
npm install three @types/three
```

- [ ] **Step 2: Replace globals.css with v2 design tokens**

Replace the full content of `src/app/globals.css` with:

```css
@import "tailwindcss";

/* ============ V2 Design Tokens ============ */
:root {
  --bg: #050508;
  --text-primary: #e8e8f0;
  --text-secondary: rgba(255, 255, 255, 0.45);
  --text-muted: rgba(255, 255, 255, 0.25);
  --accent-violet: #7850ff;
  --accent-violet-light: #a78bfa;
  --accent-cyan: #00c8ff;
  --accent-cyan-light: #38bdf8;
  --accent-rose: #ff3c78;
  --accent-rose-light: #ff6488;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-hover: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.12);
}

/* ============ Base ============ */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--bg);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* Hide scrollbars */
::-webkit-scrollbar { display: none; }
html { scrollbar-width: none; }

/* Selection */
::selection {
  background: rgba(120, 80, 255, 0.3);
  color: #fff;
}
```

- [ ] **Step 3: Update layout.tsx — Space Grotesk font + clean layout**

Replace the full content of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nathan Skwarek | Portfolio',
  description: 'Data Analyst & Developer — Portfolio 2026',
  openGraph: {
    title: 'Nathan Skwarek | Portfolio',
    description: 'Data Analyst & Developer — Portfolio 2026',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-space-grotesk)]">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds (pages may be empty but no TypeScript errors on layout/globals).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/app/globals.css src/app/layout.tsx
git commit -m "feat(v2): install three.js, setup design tokens + Space Grotesk font"
```

---

## Task 2: Shader Background Component

**Files:**
- Create: `src/lib/shaders/aurora.frag`
- Create: `src/lib/shaders/rings.frag`
- Create: `src/components/three/ShaderBackground.tsx`

- [ ] **Step 1: Create aurora fragment shader**

Create `src/lib/shaders/aurora.frag`:

```glsl
uniform float iTime;
uniform vec2 iResolution;

#define NUM_OCTAVES 3

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.3;
  vec2 shift = vec2(100);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
  vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
  vec2 v;
  vec4 o = vec4(0.0);

  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (float i = 0.0; i < 35.0; i++) {
    v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
    vec4 auroraColors = vec4(
      0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
      0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
      0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  o = tanh(pow(o / 100.0, vec4(1.6)));
  gl_FragColor = o * 1.5;
}
```

- [ ] **Step 2: Create rings fragment shader**

Create `src/lib/shaders/rings.frag`:

```glsl
#define TWO_PI 6.2831853072
#define PI 3.14159265359

precision highp float;
uniform vec2 resolution;
uniform float time;

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time * 0.05;
  float lineWidth = 0.002;

  vec3 color = vec3(0.0);
  for(int j = 0; j < 3; j++){
    for(int i = 0; i < 5; i++){
      color[j] += lineWidth * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01) * 5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
    }
  }
  
  gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
}
```

- [ ] **Step 3: Create ShaderBackground component**

Create `src/components/three/ShaderBackground.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Import shader sources as strings
const auroraFragmentShader = `
uniform float iTime;
uniform vec2 iResolution;

#define NUM_OCTAVES 3

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.3;
  vec2 shift = vec2(100);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
  vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
  vec2 v;
  vec4 o = vec4(0.0);

  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (float i = 0.0; i < 35.0; i++) {
    v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5
      + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
    vec4 auroraColors = vec4(
      0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
      0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
      0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8))
      / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  o = tanh(pow(o / 100.0, vec4(1.6)));
  gl_FragColor = o * 1.5;
}
`;

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

interface ShaderBackgroundProps {
  opacity?: number;
  className?: string;
}

export default function ShaderBackground({ opacity = 1, className = '' }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: auroraFragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      if (sceneRef.current) sceneRef.current.animationId = animationId;
    };

    sceneRef.current = { renderer, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 ${className}`}
      style={{ opacity, pointerEvents: 'none' }}
    />
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. ShaderBackground is created but not yet used in any page.

- [ ] **Step 5: Commit**

```bash
git add src/lib/shaders/ src/components/three/ShaderBackground.tsx
git commit -m "feat(v2): add aurora shader background component (Three.js)"
```

---

## Task 3: GlowCard UI Component

**Files:**
- Create: `src/lib/hooks/useMousePosition.ts`
- Create: `src/components/ui/GlowCard.tsx`

- [ ] **Step 1: Create useMousePosition hook**

Create `src/lib/hooks/useMousePosition.ts`:

```ts
'use client';

import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  return position;
}
```

- [ ] **Step 2: Create GlowCard component**

Create `src/components/ui/GlowCard.tsx`:

```tsx
'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(120, 80, 255, 0.08)',
  onClick,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty('--glow-x', `${x}%`);
      cardRef.current.style.setProperty('--glow-y', `${y}%`);
    },
    []
  );

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-400',
        'bg-[var(--surface)] border border-[var(--border)]',
        'backdrop-blur-[12px]',
        'hover:border-[var(--border-hover)] hover:-translate-y-1',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]',
        onClick && 'cursor-pointer',
        className
      )}
      style={
        {
          '--glow-color': glowColor,
        } as React.CSSProperties
      }
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color), transparent)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle 150px at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/hooks/useMousePosition.ts src/components/ui/GlowCard.tsx
git commit -m "feat(v2): add GlowCard component with cursor-tracking spotlight"
```

---

## Task 4: Page Shell + Back Button + Transition Provider

**Files:**
- Create: `src/components/ui/PageShell.tsx`
- Create: `src/components/ui/BackButton.tsx`
- Create: `src/components/transition/TransitionProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create BackButton**

Create `src/components/ui/BackButton.tsx`:

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push('/')}
      className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full
        bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
        text-[var(--text-secondary)] text-sm
        hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
        transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg leading-none">&larr;</span>
      <span>Hub</span>
    </motion.button>
  );
}
```

- [ ] **Step 2: Create PageShell**

Create `src/components/ui/PageShell.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import ShaderBackground from '@/components/three/ShaderBackground';
import BackButton from '@/components/ui/BackButton';

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <>
      <ShaderBackground opacity={0.15} />
      <BackButton />
      <motion.main
        className="relative z-10 min-h-screen pt-24 pb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              {subtitle}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] bg-gradient-to-r from-white via-[var(--accent-violet-light)] to-[var(--accent-cyan-light)] bg-clip-text text-transparent">
              {title}
            </h1>
          </header>
          {children}
        </div>
      </motion.main>
    </>
  );
}
```

- [ ] **Step 3: Create TransitionProvider**

Create `src/components/transition/TransitionProvider.tsx`:

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Update layout.tsx to include TransitionProvider**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import TransitionProvider from '@/components/transition/TransitionProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nathan Skwarek | Portfolio',
  description: 'Data Analyst & Developer — Portfolio 2026',
  openGraph: {
    title: 'Nathan Skwarek | Portfolio',
    description: 'Data Analyst & Developer — Portfolio 2026',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-space-grotesk)]">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/PageShell.tsx src/components/ui/BackButton.tsx src/components/transition/TransitionProvider.tsx src/app/layout.tsx
git commit -m "feat(v2): add PageShell, BackButton, TransitionProvider"
```

---

## Task 5: Hub Central — Three.js Orbs Scene

**Files:**
- Create: `src/components/three/Orb.tsx`
- Create: `src/components/hub/HubScene.tsx`
- Create: `src/components/hub/HubName.tsx`
- Create: `src/components/hub/QuickLinks.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the Orb component (Three.js sphere + atmospheric glow)**

Create `src/components/three/Orb.tsx`:

```tsx
'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface OrbConfig {
  color: THREE.Color;
  position: THREE.Vector3;
  radius: number;
}

export function createOrb(
  scene: THREE.Scene,
  config: OrbConfig
): { mesh: THREE.Mesh; glow: THREE.Mesh } {
  // Solid sphere
  const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: config.color,
    transparent: true,
    opacity: 0.6,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(config.position);
  scene.add(mesh);

  // Atmospheric glow (fresnel)
  const glowGeometry = new THREE.SphereGeometry(config.radius * 1.3, 32, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `,
    uniforms: {
      glowColor: { value: config.color },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.copy(config.position);
  scene.add(glow);

  return { mesh, glow };
}
```

- [ ] **Step 2: Create HubScene — full Three.js canvas with 3 orbs**

Create `src/components/hub/HubScene.tsx`:

```tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { createOrb } from '@/components/three/Orb';

const ORB_CONFIG = [
  { label: 'Projets', route: '/projects', color: new THREE.Color(0x7850ff), angle: -Math.PI / 3, distance: 3.5 },
  { label: 'Skills', route: '/skills', color: new THREE.Color(0x00c8ff), angle: Math.PI / 3, distance: 3.2 },
  { label: 'Contact', route: '/contact', color: new THREE.Color(0xff3c78), angle: Math.PI, distance: 3.0 },
] as const;

export default function HubScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const orbMeshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create orbs
    const orbs = ORB_CONFIG.map((cfg) => {
      const x = Math.cos(cfg.angle) * cfg.distance;
      const y = Math.sin(cfg.angle) * cfg.distance * 0.6;
      return createOrb(scene, {
        color: cfg.color,
        position: new THREE.Vector3(x, y, 0),
        radius: 0.6,
      });
    });
    orbMeshesRef.current = orbs.map((o) => o.mesh);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshesRef.current);
      if (intersects.length > 0) {
        const idx = orbMeshesRef.current.indexOf(intersects[0].object as THREE.Mesh);
        if (idx !== -1) {
          router.push(ORB_CONFIG[idx].route);
        }
      }
    };

    // Hover cursor
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshesRef.current);
      container.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    container.addEventListener('click', onClick);
    container.addEventListener('mousemove', onMove);

    // Animate
    let time = 0;
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Float animation
      orbs.forEach((orb, i) => {
        const cfg = ORB_CONFIG[i];
        const baseX = Math.cos(cfg.angle) * cfg.distance;
        const baseY = Math.sin(cfg.angle) * cfg.distance * 0.6;
        const floatX = Math.sin(time * 0.5 + i * 2) * 0.15;
        const floatY = Math.cos(time * 0.7 + i * 1.5) * 0.1;
        orb.mesh.position.set(baseX + floatX, baseY + floatY, 0);
        orb.glow.position.copy(orb.mesh.position);
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', onClick);
      container.removeEventListener('mousemove', onMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      orbs.forEach((o) => {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
        o.glow.geometry.dispose();
        (o.glow.material as THREE.Material).dispose();
      });
    };
  }, [router]);

  return <div ref={containerRef} className="fixed inset-0 z-10" />;
}
```

- [ ] **Step 3: Create HubName**

Create `src/components/hub/HubName.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export default function HubName() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.04em] bg-gradient-to-r from-white via-[var(--accent-violet-light)] to-[var(--accent-cyan-light)] bg-clip-text text-transparent">
          Nathan Skwarek
        </h1>
        <p className="text-[13px] tracking-[0.15em] uppercase text-[var(--text-muted)] mt-2">
          Data Analyst & Developer
        </p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Create QuickLinks**

Create `src/components/hub/QuickLinks.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const links = [
  { icon: FiDownload, href: '/certificates/cv.pdf', label: 'CV', download: true },
  { icon: FiMail, href: 'mailto:skwarek.nathan@gmail.com', label: 'Email' },
  { icon: FiGithub, href: 'https://github.com/solanathouu', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/', label: 'LinkedIn' },
];

export default function QuickLinks() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-30 flex gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.download ? undefined : '_blank'}
          rel={link.download ? undefined : 'noopener noreferrer'}
          download={link.download || undefined}
          title={link.label}
          className="flex items-center justify-center w-10 h-10 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-sm
            hover:bg-[var(--surface-hover)] hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]
            transition-all duration-300"
        >
          <link.icon size={16} />
        </a>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 5: Wire up the Hub in page.tsx**

Replace `src/app/page.tsx`:

```tsx
import dynamic from 'next/dynamic';
import HubName from '@/components/hub/HubName';
import QuickLinks from '@/components/hub/QuickLinks';

const ShaderBackground = dynamic(
  () => import('@/components/three/ShaderBackground'),
  { ssr: false }
);

const HubScene = dynamic(
  () => import('@/components/hub/HubScene'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <ShaderBackground />
      <HubScene />
      <HubName />
      <QuickLinks />
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000 — expect: aurora shader background, "Nathan Skwarek" centered, 3 floating orbs (violet/cyan/rose), quick-links bottom-right. Clicking an orb navigates to /projects, /skills, or /contact (404 for now is fine).

- [ ] **Step 7: Commit**

```bash
git add src/components/three/Orb.tsx src/components/hub/ src/app/page.tsx
git commit -m "feat(v2): hub central with Three.js orbs, shader bg, name + quick-links"
```

---

## Task 6: Projects Carousel Page

**Files:**
- Create: `src/components/projects/ProjectCarousel.tsx`
- Create: `src/components/projects/ProjectCarouselCard.tsx`
- Create: `src/components/projects/ProjectDescription.tsx`
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create ProjectCarouselCard**

Create `src/components/projects/ProjectCarouselCard.tsx`:

```tsx
'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectCarouselCardProps {
  project: Project;
  style: React.CSSProperties;
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCarouselCard({
  project,
  style,
  isActive,
  onClick,
}: ProjectCarouselCardProps) {
  return (
    <div
      className="absolute w-full h-full rounded-2xl overflow-hidden border border-[var(--border)]"
      style={style}
      onClick={isActive ? onClick : undefined}
    >
      <div className="w-full h-full bg-[var(--surface)] backdrop-blur-[12px] p-6 flex flex-col cursor-pointer">
        {/* Thumbnail */}
        <div className="relative flex-1 rounded-xl overflow-hidden mb-4 bg-black/20">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="400px"
          />
        </div>
        {/* Info */}
        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ProjectDescription (animated word-by-word)**

Create `src/components/projects/ProjectDescription.tsx`:

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectDescriptionProps {
  project: Project;
}

export default function ProjectDescription({ project }: ProjectDescriptionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-2xl mx-auto mt-8"
      >
        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">{project.role} — {project.year}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.description.split(' ').map((word, i) => (
            <motion.span
              key={`${project.id}-${i}`}
              initial={{ filter: 'blur(8px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.02 * i }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create ProjectCarousel**

Create `src/components/projects/ProjectCarousel.tsx`:

```tsx
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectCarouselCard from '@/components/projects/ProjectCarouselCard';
import ProjectDescription from '@/components/projects/ProjectDescription';

function getCardStyle(
  index: number,
  activeIndex: number,
  total: number,
  containerWidth: number
): React.CSSProperties {
  const gap = Math.min(containerWidth * 0.22, 280);
  const isActive = index === activeIndex;
  const isLeft = (activeIndex - 1 + total) % total === index;
  const isRight = (activeIndex + 1) % total === index;

  if (isActive) {
    return {
      zIndex: 3,
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateX(0px) scale(1) rotateY(0deg)',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  if (isLeft) {
    return {
      zIndex: 2,
      opacity: 0.7,
      pointerEvents: 'auto',
      transform: `translateX(-${gap}px) scale(0.85) rotateY(15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  if (isRight) {
    return {
      zIndex: 2,
      opacity: 0.7,
      pointerEvents: 'auto',
      transform: `translateX(${gap}px) scale(0.85) rotateY(-15deg)`,
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }
  return {
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  };
}

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const router = useRouter();

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActiveIndex((p) => (p - 1 + projects.length) % projects.length);
      if (e.key === 'ArrowRight') setActiveIndex((p) => (p + 1) % projects.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + projects.length) % projects.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % projects.length);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] md:h-[400px]"
        style={{ perspective: '1000px' }}
      >
        {projects.map((project, index) => (
          <ProjectCarouselCard
            key={project.id}
            project={project}
            style={getCardStyle(index, activeIndex, projects.length, containerWidth)}
            isActive={index === activeIndex}
            onClick={() => router.push(`/projects/${project.id}`)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-11 h-11 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-lg
            hover:bg-[rgba(120,80,255,0.15)] hover:border-[rgba(120,80,255,0.3)] hover:text-white
            transition-all duration-300"
          aria-label="Previous project"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-11 h-11 rounded-full
            bg-[var(--surface)] border border-[var(--border)] backdrop-blur-[12px]
            text-[var(--text-secondary)] text-lg
            hover:bg-[rgba(120,80,255,0.15)] hover:border-[rgba(120,80,255,0.3)] hover:text-white
            transition-all duration-300"
          aria-label="Next project"
        >
          &rarr;
        </button>
      </div>

      {/* Active project description */}
      <ProjectDescription project={projects[activeIndex]} />
    </div>
  );
}
```

- [ ] **Step 4: Create projects page**

Create `src/app/projects/page.tsx`:

```tsx
import dynamic from 'next/dynamic';
import PageShell from '@/components/ui/PageShell';

const ProjectCarousel = dynamic(
  () => import('@/components/projects/ProjectCarousel'),
  { ssr: false }
);

export const metadata = {
  title: 'Projets | Nathan Skwarek',
  description: 'Mes projets — Data, IA, Web, Automation',
};

export default function ProjectsPage() {
  return (
    <PageShell title="Projets" subtitle="Portfolio">
      <ProjectCarousel />
    </PageShell>
  );
}
```

- [ ] **Step 5: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000/projects — expect: shader dimmed in bg, "Projets" title, 3D carousel with project cards, arrows navigation, animated description.

- [ ] **Step 6: Commit**

```bash
git add src/components/projects/ProjectCarousel.tsx src/components/projects/ProjectCarouselCard.tsx src/components/projects/ProjectDescription.tsx src/app/projects/page.tsx
git commit -m "feat(v2): projects page with 3D perspective carousel"
```

---

## Task 7: Project Detail Page

**Files:**
- Modify: `src/components/projects/ProjectDetail.tsx` (rewrite for v2)
- Modify: `src/app/projects/[id]/page.tsx` (adapt for v2)

- [ ] **Step 1: Rewrite ProjectDetail for v2**

Replace `src/components/projects/ProjectDetail.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import GlowCard from '@/components/ui/GlowCard';
import BackButton from '@/components/ui/BackButton';
import ShaderBackground from '@/components/three/ShaderBackground';
import { getSkillIcon } from '@/lib/utils/skillIcons';

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <ShaderBackground opacity={0.1} />
      <BackButton />
      <motion.main
        className="relative z-10 min-h-screen pt-24 pb-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <article className="max-w-[900px] mx-auto">
          {/* Header */}
          <header className="mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              {project.role} — {project.year}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">
              {project.title}
            </h1>
            <div className="flex gap-2 flex-wrap mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                  GitHub &rarr;
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-full bg-[var(--accent-violet)] text-white hover:opacity-90 transition-opacity"
                >
                  Demo &rarr;
                </a>
              )}
            </div>
          </header>

          {/* Hero image */}
          {project.media[0] && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-[var(--border)]">
              <Image
                src={project.media[0].url}
                alt={project.media[0].caption || project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {project.longDescription && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </section>
          )}

          {/* Technologies */}
          {project.technologies && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.technologies.map((cat) => (
                  <GlowCard key={cat.category} className="p-5">
                    <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                ))}
              </div>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((ch, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent-violet)] font-bold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {project.outcomes.map((oc, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="text-[var(--accent-cyan)] font-bold">&#10003;</span>
                    <span>{oc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Media gallery */}
          {project.media.length > 1 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Captures</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.media.slice(1).map((m, i) => (
                  <button
                    key={i}
                    onClick={() => m.linkUrl ? window.open(m.linkUrl, '_blank') : setLightboxIndex(i + 1)}
                    className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-hover)] transition-all"
                  >
                    <Image src={m.url} alt={m.caption || ''} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Prev/Next nav */}
          <nav className="flex justify-between items-center pt-8 border-t border-[var(--border)]">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                &larr; {prevProject.title}
              </Link>
            ) : <div />}
            <Link
              href="/projects"
              className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Tous les projets
            </Link>
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {nextProject.title} &rarr;
              </Link>
            ) : <div />}
          </nav>
        </article>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              &times;
            </button>
            <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={project.media[lightboxIndex].url}
                alt={project.media[lightboxIndex].caption || ''}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
}
```

- [ ] **Step 2: Update the project detail page server component**

Replace `src/app/projects/[id]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetail from '@/components/projects/ProjectDetail';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Projet non trouvé' };
  return {
    title: `${project.title} | Nathan Skwarek`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />;
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds, static pages generated for all project IDs.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/ProjectDetail.tsx src/app/projects/
git commit -m "feat(v2): project detail page with GlowCards, lightbox, shader bg"
```

---

## Task 8: Skills Page

**Files:**
- Create: `src/components/skills/SkillsGrid.tsx`
- Create: `src/app/skills/page.tsx`

- [ ] **Step 1: Create SkillsGrid**

Create `src/components/skills/SkillsGrid.tsx`:

```tsx
'use client';

import { skills } from '@/data/skills';
import GlowCard from '@/components/ui/GlowCard';
import { getSkillIcon } from '@/lib/utils/skillIcons';

const categoryColors: Record<string, string> = {
  'Langages': 'rgba(120, 80, 255, 0.08)',
  'Data & Analyse': 'rgba(0, 200, 255, 0.08)',
  'Outils': 'rgba(255, 60, 120, 0.08)',
};

const categories = [...new Set(skills.map((s) => s.category))];

export default function SkillsGrid() {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category}>
          <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6">
            {category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => {
                const Icon = getSkillIcon(skill.icon);
                const Wrapper = skill.url ? 'a' : 'div';
                const wrapperProps = skill.url
                  ? { href: skill.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {};

                return (
                  <GlowCard
                    key={skill.name}
                    glowColor={categoryColors[category] || 'rgba(120, 80, 255, 0.08)'}
                    className="group p-5 flex flex-col items-center gap-3 text-center"
                  >
                    <Wrapper {...wrapperProps} className="flex flex-col items-center gap-3">
                      {Icon && <Icon className="text-2xl text-[var(--text-secondary)] group-hover:text-white transition-colors" />}
                      <span className="text-sm font-medium">{skill.name}</span>
                      {skill.url && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-violet)]/20 text-[var(--accent-violet-light)]">
                          Certifié
                        </span>
                      )}
                    </Wrapper>
                  </GlowCard>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create skills page**

Create `src/app/skills/page.tsx`:

```tsx
import PageShell from '@/components/ui/PageShell';
import SkillsGrid from '@/components/skills/SkillsGrid';

export const metadata = {
  title: 'Compétences | Nathan Skwarek',
  description: 'Langages, Data & Analyse, Outils',
};

export default function SkillsPage() {
  return (
    <PageShell title="Compétences" subtitle="Skills">
      <SkillsGrid />
    </PageShell>
  );
}
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000/skills — expect: shader dimmed, "Compétences" title, skills grouped by category in GlowCards.

- [ ] **Step 4: Commit**

```bash
git add src/components/skills/SkillsGrid.tsx src/app/skills/page.tsx
git commit -m "feat(v2): skills page with GlowCards grouped by category"
```

---

## Task 9: Contact Page

**Files:**
- Create: `src/components/contact/ContactLinks.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create ContactLinks**

Create `src/components/contact/ContactLinks.tsx`:

```tsx
'use client';

import { FiMail, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import GlowCard from '@/components/ui/GlowCard';

const contactItems = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'skwarek.nathan@gmail.com',
    href: 'mailto:skwarek.nathan@gmail.com',
    glowColor: 'rgba(255, 60, 120, 0.08)',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Nathan Skwarek',
    href: 'https://www.linkedin.com/in/nathan-skwarek-8a3723252/',
    glowColor: 'rgba(0, 119, 181, 0.08)',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'solanathouu',
    href: 'https://github.com/solanathouu',
    glowColor: 'rgba(255, 255, 255, 0.05)',
  },
  {
    icon: FiDownload,
    label: 'CV',
    value: 'Télécharger le PDF',
    href: '/certificates/cv.pdf',
    glowColor: 'rgba(120, 80, 255, 0.08)',
    download: true,
  },
];

export default function ContactLinks() {
  return (
    <div className="space-y-8">
      <p className="text-center text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-12">
        En quête d&apos;une alternance où je peux monter en compétences et livrer du concret.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.download ? undefined : '_blank'}
            rel={item.download ? undefined : 'noopener noreferrer'}
            download={item.download || undefined}
          >
            <GlowCard glowColor={item.glowColor} className="group p-6 flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface-hover)] group-hover:scale-110 transition-transform">
                <item.icon size={20} className="text-[var(--text-secondary)] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="text-xs text-[var(--text-muted)]">{item.value}</p>
              </div>
            </GlowCard>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create contact page**

Create `src/app/contact/page.tsx`:

```tsx
import PageShell from '@/components/ui/PageShell';
import ContactLinks from '@/components/contact/ContactLinks';

export const metadata = {
  title: 'Contact | Nathan Skwarek',
  description: 'Me contacter — Email, LinkedIn, GitHub',
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="Get in touch">
      <ContactLinks />
    </PageShell>
  );
}
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000/contact — expect: shader dimmed, "Contact" title, 4 GlowCards (Email, LinkedIn, GitHub, CV).

- [ ] **Step 4: Commit**

```bash
git add src/components/contact/ContactLinks.tsx src/app/contact/page.tsx
git commit -m "feat(v2): contact page with GlowCards"
```

---

## Task 10: Clean Up V1 Files + Update 404

**Files:**
- Delete: all v1-only files (avatar, particle bg, preloader, sections, footer, v1 hooks/contexts)
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/projects/[id]/not-found.tsx`

- [ ] **Step 1: Delete v1-only files**

```bash
cd C:/Users/skwar/Desktop/portfolio-new
rm -f src/components/avatar/Avatar3D.tsx
rm -f src/components/avatar/Avatar3DLocked.tsx
rm -rf src/components/avatar
rm -f src/components/layout/Footer.tsx
rm -f src/components/layout/ParticleBackground.tsx
rm -f src/components/sections/Preloader.tsx
rm -f src/components/sections/Hero.tsx
rm -f src/components/sections/Projects.tsx
rm -f src/components/sections/Skills.tsx
rm -f src/components/sections/Contact.tsx
rm -rf src/components/sections
rm -f src/components/projects/ProjectCard.tsx
rm -f src/components/skills/SkillCard.tsx
rm -f src/lib/hooks/useImageSequence.ts
rm -f src/lib/hooks/useScrollLockAnimation.ts
rm -f src/lib/contexts/LoadingContext.tsx
rm -rf src/lib/contexts
```

- [ ] **Step 2: Update global 404**

Replace `src/app/not-found.tsx`:

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">404</p>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Page introuvable</h1>
      <Link
        href="/"
        className="text-sm px-6 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)]
          text-[var(--text-secondary)] hover:text-white transition-colors"
      >
        Retour au hub
      </Link>
    </div>
  );
}
```

- [ ] **Step 3: Update project 404**

Replace `src/app/projects/[id]/not-found.tsx`:

```tsx
import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">404</p>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Projet introuvable</h1>
      <Link
        href="/projects"
        className="text-sm px-6 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)]
          text-[var(--text-secondary)] hover:text-white transition-colors"
      >
        Voir tous les projets
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Delete unused Header if not needed in v2**

The hub has no traditional header. Delete or keep `src/components/layout/Header.tsx` — it is not imported by any v2 page. Delete it:

```bash
rm -f src/components/layout/Header.tsx
```

- [ ] **Step 5: Verify full build**

```bash
npm run build
```

Expected: Build succeeds with 0 TypeScript errors. All pages render correctly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(v2): remove v1-only files, update 404 pages"
```

---

## Task 11: Final Polish — Verify All Pages

- [ ] **Step 1: Run dev server and manually verify**

```bash
npm run dev
```

Check each page:
- `/` — Hub: shader bg, name, 3 orbs floating, quick-links. Click each orb navigates correctly.
- `/projects` — Carousel: cards rotate, arrows work, keyboard works, click active card opens detail.
- `/projects/labonnenote` — Detail: header, image, description, tech, challenges, outcomes, lightbox, prev/next.
- `/skills` — GlowCards by category, hover glow, certifié badges.
- `/contact` — 4 cards, links open correctly.
- `/nonexistent` — 404 page styled correctly.

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds. All static pages generated.

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(v2): final polish and fixes"
```
