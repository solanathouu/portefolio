# Portfolio Moderne avec Avatar 3D - Plan d'Implémentation

> **Pour Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Créer un portfolio web moderne avec avatar 3D interactif contrôlé par le scroll, galerie de projets, compétences animées, et section contact premium.

**Architecture:** Next.js 14 App Router avec React, TypeScript, Tailwind CSS, Framer Motion et GSAP. Architecture modulaire avec séparation claire entre sections, composants UI réutilisables, et données structurées. L'avatar utilise un Canvas HTML5 pour afficher une séquence de 200 images JPG contrôlée par GSAP ScrollTrigger.

**Tech Stack:** Next.js 14+, React 18+, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Icons

---

## Phase 0: Setup Initial du Projet

### Task 0.1: Analyse des animations igloo.inc

**Objectif:** Comprendre et documenter les animations du site igloo.inc pour reproduction

**Files:**
- Create: `docs/igloo-inc-analysis.md`

**Step 1: Demander les ressources à l'utilisateur**

Demander à l'utilisateur de fournir:
- Captures d'écran de la section Contact de igloo.inc
- Vidéos des animations au hover (si possible)
- Notes sur les effets observés (magnetic, morphing, etc.)

**Step 2: Créer le document d'analyse**

```markdown
# Analyse des animations igloo.inc

## Section Contact

### Animations observées

1. **Hover Effects:**
   - [Décrire les effets visuels]
   - [Timing et transitions]
   - [Changements de couleur/forme]

2. **Magnetic Effect:**
   - [Comment l'élément suit le curseur]
   - [Distance d'activation]
   - [Fluidité du mouvement]

3. **Curseur personnalisé:**
   - [Comportement du curseur]
   - [Changements selon contexte]

4. **Click/Touch feedback:**
   - [Animation de clic]
   - [Feedback visuel]

### Technologies à utiliser

- Framer Motion pour: [...]
- GSAP pour: [...]
- Custom hooks pour: [...]

### Captures d'écran

[Insérer captures d'écran fournies par l'utilisateur]

### Notes d'implémentation

[Notes techniques pour reproduire les effets]
```

**Step 3: Valider avec l'utilisateur**

Vérifier que l'analyse correspond aux attentes avant de continuer.

**Step 4: Commit**

```bash
git add docs/igloo-inc-analysis.md
git commit -m "docs: add igloo.inc animation analysis"
```

---

### Task 0.2: Initialiser le projet Next.js

**Files:**
- Create: Projet Next.js avec structure de dossiers

**Step 1: Créer le projet Next.js avec TypeScript**

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Options à sélectionner:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: Yes (@/*)

**Step 2: Naviguer dans le projet**

```bash
cd portfolio
```

**Step 3: Vérifier que le projet démarre**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

**Step 4: Arrêter le serveur**

Ctrl+C

**Step 5: Commit initial**

```bash
git add .
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 0.3: Installer les dépendances

**Files:**
- Modify: `package.json`

**Step 1: Installer Framer Motion**

```bash
npm install framer-motion
```

**Step 2: Installer GSAP**

```bash
npm install gsap
```

**Step 3: Installer React Icons**

```bash
npm install react-icons
```

**Step 4: Installer types GSAP**

```bash
npm install -D @types/gsap
```

**Step 5: Vérifier les installations**

```bash
npm list framer-motion gsap react-icons
```

Expected: All packages listed with versions

**Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add framer-motion, gsap, and react-icons"
```

---

### Task 0.4: Créer la structure de dossiers

**Files:**
- Create: Structure de dossiers selon architecture

**Step 1: Créer les dossiers de composants**

```bash
mkdir -p src/components/layout src/components/sections src/components/avatar src/components/projects src/components/ui
```

**Step 2: Créer les dossiers lib**

```bash
mkdir -p src/lib/hooks src/lib/utils
```

**Step 3: Créer le dossier data**

```bash
mkdir -p src/data
```

**Step 4: Créer le dossier assets**

```bash
mkdir -p src/assets/avatar
```

**Step 5: Créer les dossiers public**

```bash
mkdir -p public/projects public/icons
```

**Step 6: Vérifier la structure**

```bash
ls -R src/
```

Expected: All folders created

**Step 7: Commit**

```bash
git add .
git commit -m "chore: create project folder structure"
```

---

### Task 0.5: Configuration Tailwind avancée

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Configurer Tailwind avec animations personnalisées**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'breathing': 'breathing 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "config: add custom Tailwind animations"
```

---

### Task 0.6: Créer les fichiers CLAUDE.md pour chaque section

**Files:**
- Create: `src/components/layout/CLAUDE.md`
- Create: `src/components/sections/CLAUDE.md`
- Create: `src/components/avatar/CLAUDE.md`
- Create: `src/components/projects/CLAUDE.md`
- Create: `src/components/ui/CLAUDE.md`
- Create: `src/lib/CLAUDE.md`
- Create: `src/data/CLAUDE.md`

**Step 1: Créer CLAUDE.md pour layout**

```markdown
# Layout Components

## Purpose
Composants de structure et navigation du site (Header, Footer, CustomCursor).

## Components

### Header.tsx
- Navigation sticky apparaissant après l'intro avatar
- Logo/Nom à gauche, menu à droite
- Responsive avec burger menu mobile
- Animation d'apparition (slide down)

### Footer.tsx
- Footer minimal avec copyright et signature
- Année dynamique
- Liens optionnels

### CustomCursor.tsx
- Curseur personnalisé qui change selon le contexte
- Utilise Framer Motion
- Désactivé sur mobile

## Guidelines
- Mobile-first responsive
- Accessibilité clavier
- Animations fluides
- ARIA labels appropriés
```

**Step 2: Créer CLAUDE.md pour sections**

```markdown
# Main Sections

## Purpose
Sections principales du portfolio (Preloader, Hero, Projects, Skills, Contact).

## Sections

### Preloader.tsx
- Barre de chargement pour les 200 images avatar
- Affiche pourcentage 0-100%
- Transition fluide vers Hero
- Utilise Promise.all() pour preload

### Hero.tsx
- Intro interactive avec avatar 3D
- Nom en typographie imposante
- Intègre AvatarController
- Indicateur "Scroll to explore"

### Projects.tsx
- Galerie Masonry/Bento grid
- Cartes avec hover effects
- Modal pour détails projets
- Lazy loading images

### Skills.tsx
- Compétences par catégories (Frontend, Backend, Tools)
- Icônes avec animations hover
- Stagger animations on scroll
- Tooltips avec noms

### Contact.tsx
- Liens sociaux avec animations premium (style igloo.inc)
- Magnetic effects
- Hover animations complexes
- Ripple effect au clic

## Guidelines
- Reveal on scroll pour toutes sections
- Mobile responsive
- Performance optimisée
- Accessibilité
```

**Step 3: Créer CLAUDE.md pour avatar**

```markdown
# Avatar 3D System

## Purpose
Système de gestion et affichage de la séquence d'images avatar (200 JPG).

## Components

### AvatarSequence.tsx
- Canvas HTML5 pour affichage optimisé
- Gère le rendu des frames
- RequestAnimationFrame pour fluidité
- Responsive sizing

### useImageSequence.ts
- Hook custom pour preload et gestion images
- Retourne tableau d'images chargées
- Gère le progress de chargement
- Cache des images

### AvatarController.tsx
- Contrôle le scroll avec GSAP ScrollTrigger
- Pin la section pendant rotation
- Calcul: scrollProgress * 200 = frameIndex
- Déblocage après 360°

## Technical Details
- 200 frames JPG (frame_001.jpg à frame_200.jpg)
- GSAP ScrollTrigger avec pin: true, scrub: true
- Canvas 2D context pour performance
- Optimisation: preload prioritaire premières frames

## Guidelines
- Performance critique: 60fps requis
- Mobile: adapter taille canvas
- Fallback si images ne chargent pas
- Will-change CSS pour GPU acceleration
```

**Step 4: Créer CLAUDE.md pour projects**

```markdown
# Project Components

## Purpose
Composants pour affichage et interaction avec les projets.

## Components

### ProjectCard.tsx
- Carte individuelle de projet
- Hover: overlay + lift + tilt 3D
- Framer Motion animations
- Lazy load image/video

### ProjectModal.tsx
- Modal plein écran pour détails
- Navigation prev/next
- Fermeture: X, outside click, Escape
- Animations scale + fade

### ProjectGallery.tsx
- Grid Masonry responsive
- Stagger animations
- IntersectionObserver pour reveal

## Data Structure
```typescript
interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  media: { type: 'image' | 'video' | 'gif', url: string }[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}
```

## Guidelines
- Images WebP + fallback
- Lazy loading systématique
- Keyboard navigation
- URL routing pour partage
```

**Step 5: Créer CLAUDE.md pour UI**

```markdown
# UI Components

## Purpose
Composants UI réutilisables pour tout le site.

## Components

### Button.tsx
- Bouton avec variants (primary, secondary, ghost)
- Hover animations
- Disabled state
- Accessible

### Card.tsx
- Carte générique avec styles cohérents
- Variants selon usage
- Hover effects optionnels

### Badge.tsx
- Badge pour tags technologies
- Coloré avec icône optionnelle
- Tailles variables

### RevealOnScroll.tsx
- Wrapper pour animations on scroll
- Utilise IntersectionObserver
- Customizable animation type

## Guidelines
- Composants génériques et réutilisables
- Props typées avec TypeScript
- Tailwind classes avec cn() utility
- Accessible par défaut
```

**Step 6: Créer CLAUDE.md pour lib**

```markdown
# Library & Utilities

## Purpose
Hooks, utilitaires, et constantes partagés.

## Structure

### hooks/
- Custom React hooks
- useWindowSize, useScrollProgress, useMediaQuery, etc.
- Bien typés avec TypeScript

### utils/
- Fonctions utilitaires (cn, formatDate, etc.)
- Helpers pour animations
- Validation

### constants.ts
- Constantes globales
- Configuration (nombre de frames, breakpoints, etc.)
- URLs, textes réutilisés

## Guidelines
- Pure functions dans utils
- Hooks suivent conventions React
- Types exportés avec fonctions
- Tests unitaires si logique complexe
```

**Step 7: Créer CLAUDE.md pour data**

```markdown
# Data Layer

## Purpose
Données structurées du portfolio (projets, compétences, contact).

## Files

### projects.ts
- Interface Project
- Array de projets (réels + placeholders)
- Facilement éditable

### skills.ts
- Interface Skill
- Organisé par catégories
- Couleurs pour glow effects

### contact.ts
- Interface ContactLink
- Liens sociaux avec metadata
- Types pour icônes

## Guidelines
- TypeScript interfaces bien typées
- Données séparées de la logique
- Facile à éditer sans toucher code
- Possibilité future CMS headless
- Placeholders clairement identifiés
```

**Step 8: Commit**

```bash
git add src/components/*/CLAUDE.md src/lib/CLAUDE.md src/data/CLAUDE.md
git commit -m "docs: add CLAUDE.md files for all sections"
```

---

## Phase 1: Système Avatar 3D

### Task 1.1: Hook useImageSequence

**Files:**
- Create: `src/lib/hooks/useImageSequence.ts`

**Step 1: Créer le hook de gestion des images**

```typescript
'use client';

import { useState, useEffect } from 'react';

interface UseImageSequenceReturn {
  images: HTMLImageElement[];
  loadProgress: number;
  isLoaded: boolean;
  error: string | null;
}

export function useImageSequence(
  basePath: string,
  frameCount: number,
  framePrefix: string = 'frame_'
): UseImageSequenceReturn {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];

      for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(3, '0');
          img.src = `${basePath}/${framePrefix}${frameNumber}.jpg`;

          img.onload = () => {
            setLoadProgress((prev) => {
              const newProgress = ((prev * frameCount + 1) / frameCount);
              return newProgress;
            });
            resolve(img);
          };

          img.onerror = () => {
            reject(new Error(`Failed to load ${img.src}`));
          };
        });

        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setIsLoaded(true);
        setLoadProgress(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        console.error('Error loading image sequence:', err);
      }
    };

    loadImages();
  }, [basePath, frameCount, framePrefix]);

  return { images, loadProgress, isLoaded, error };
}
```

**Step 2: Vérifier qu'il n'y a pas d'erreurs TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/hooks/useImageSequence.ts
git commit -m "feat: add useImageSequence hook for avatar images"
```

---

### Task 1.2: Composant AvatarSequence (Canvas)

**Files:**
- Create: `src/components/avatar/AvatarSequence.tsx`

**Step 1: Créer le composant Canvas**

```typescript
'use client';

import { useRef, useEffect } from 'react';

interface AvatarSequenceProps {
  images: HTMLImageElement[];
  currentFrame: number;
  width?: number;
  height?: number;
}

export default function AvatarSequence({
  images,
  currentFrame,
  width = 800,
  height = 800,
}: AvatarSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Get current image (clamped to array bounds)
    const frameIndex = Math.min(
      Math.max(Math.floor(currentFrame), 0),
      images.length - 1
    );
    const img = images[frameIndex];

    if (img && img.complete) {
      // Draw image centered and scaled to fit
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    }
  }, [images, currentFrame]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full object-contain"
      style={{ willChange: 'contents' }}
    />
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/avatar/AvatarSequence.tsx
git commit -m "feat: add AvatarSequence canvas component"
```

---

### Task 1.3: Composant AvatarController (GSAP)

**Files:**
- Create: `src/components/avatar/AvatarController.tsx`

**Step 1: Créer le contrôleur avec GSAP ScrollTrigger**

```typescript
'use client';

import { useRef, useEffect, useState } from 'react';
import { useImageSequence } from '@/lib/hooks/useImageSequence';
import AvatarSequence from './AvatarSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AvatarControllerProps {
  onComplete?: () => void;
}

export default function AvatarController({ onComplete }: AvatarControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { images, isLoaded } = useImageSequence('/avatar', 200, 'frame_');

  useEffect(() => {
    if (!isLoaded || !containerRef.current || isCompleted) return;

    const frameCount = images.length;
    const frameObj = { frame: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 3}`, // 3x viewport height to scroll through
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const newFrame = Math.floor(self.progress * (frameCount - 1));
        setCurrentFrame(newFrame);

        // Check if completed (reached last frame)
        if (self.progress >= 0.99 && !isCompleted) {
          setIsCompleted(true);
          if (onComplete) {
            onComplete();
          }
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [isLoaded, images.length, onComplete, isCompleted]);

  if (!isLoaded) return null;

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl aspect-square">
        <AvatarSequence images={images} currentFrame={currentFrame} />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-150"
            style={{ width: `${(currentFrame / (images.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/avatar/AvatarController.tsx
git commit -m "feat: add AvatarController with GSAP ScrollTrigger"
```

---

### Task 1.4: Composant Preloader

**Files:**
- Create: `src/components/sections/Preloader.tsx`

**Step 1: Créer le composant Preloader**

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  progress: number;
  isComplete: boolean;
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Logo/Name watermark */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="text-8xl font-bold mb-16 text-foreground"
          >
            Portfolio
          </motion.h1>

          {/* Progress bar */}
          <div className="w-80 max-w-[80vw]">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-foreground"
              />
            </div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-foreground/60"
            >
              {Math.floor(progress * 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/Preloader.tsx
git commit -m "feat: add Preloader component with progress bar"
```

---

## Phase 2: Hero Section

### Task 2.1: Composant Hero

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Step 1: Créer le composant Hero**

```typescript
'use client';

import { motion } from 'framer-motion';
import AvatarController from '../avatar/AvatarController';
import { useState } from 'react';

interface HeroProps {
  name: string;
  onAvatarComplete?: () => void;
}

export default function Hero({ name, onAvatarComplete }: HeroProps) {
  const [showScrollHint, setShowScrollHint] = useState(true);

  const handleAvatarComplete = () => {
    setShowScrollHint(false);
    if (onAvatarComplete) {
      onAvatarComplete();
    }
  };

  return (
    <section className="relative min-h-screen">
      {/* Avatar with scroll control */}
      <div className="relative">
        <AvatarController onComplete={handleAvatarComplete} />

        {/* Name overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-center"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            {name}
          </motion.h1>
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-sm text-foreground/60">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/60"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with avatar and name"
```

---

## Phase 3: Data Layer

### Task 3.1: Interface et données des projets

**Files:**
- Create: `src/data/projects.ts`

**Step 1: Créer les interfaces et données**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // Placeholder projects
  {
    id: '1',
    title: 'Projet Portfolio 3D',
    description: 'Portfolio interactif avec avatar 3D animé et effets premium inspirés des meilleurs sites du web.',
    tags: ['Next.js', 'React', 'GSAP', 'Framer Motion', 'TypeScript'],
    thumbnail: '/projects/portfolio-thumb.jpg',
    media: [
      { type: 'image', url: '/projects/portfolio-1.jpg' },
      { type: 'image', url: '/projects/portfolio-2.jpg' },
    ],
    githubUrl: 'https://github.com/username/portfolio',
    featured: true,
  },
  {
    id: '2',
    title: '[Placeholder] Votre Projet Ici',
    description: 'Description de votre projet. Remplacez ce placeholder avec votre vrai contenu.',
    tags: ['React', 'Node.js', 'MongoDB'],
    thumbnail: '/projects/placeholder.jpg',
    media: [
      { type: 'image', url: '/projects/placeholder.jpg' },
    ],
    featured: false,
  },
  {
    id: '3',
    title: '[Placeholder] Autre Projet',
    description: 'Autre description placeholder. Ajoutez vos vrais projets ici.',
    tags: ['TypeScript', 'Express', 'PostgreSQL'],
    thumbnail: '/projects/placeholder.jpg',
    media: [
      { type: 'image', url: '/projects/placeholder.jpg' },
    ],
    featured: false,
  },
];
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data structure with placeholders"
```

---

### Task 3.2: Interface et données des compétences

**Files:**
- Create: `src/data/skills.ts`

**Step 1: Créer les interfaces et données**

```typescript
export type SkillCategory = 'frontend' | 'backend' | 'tools';

export interface Skill {
  name: string;
  icon: string; // Icon name from react-icons
  category: SkillCategory;
  color: string; // Hex color for glow effect
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'SiReact', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend', color: '#06B6D4' },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'frontend', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'SiHtml5', category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', icon: 'SiCss3', category: 'frontend', color: '#1572B6' },

  // Backend (placeholders - adapter selon vos compétences)
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend', color: '#339933' },
  { name: 'Express', icon: 'SiExpress', category: 'backend', color: '#000000' },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'backend', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'backend', color: '#4169E1' },

  // Tools
  { name: 'Git', icon: 'SiGit', category: 'tools', color: '#F05032' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools', color: '#181717' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', category: 'tools', color: '#007ACC' },
  { name: 'Figma', icon: 'SiFigma', category: 'tools', color: '#F24E1E' },
];

export const skillsByCategory = {
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
  tools: skills.filter(s => s.category === 'tools'),
};
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: add skills data structure by category"
```

---

### Task 3.3: Interface et données de contact

**Files:**
- Create: `src/data/contact.ts`

**Step 1: Créer les interfaces et données**

```typescript
export type ContactType = 'email' | 'linkedin' | 'github' | 'twitter' | 'instagram';

export interface ContactLink {
  label: string;
  icon: string; // Icon name from react-icons
  url: string;
  type: ContactType;
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    icon: 'HiMail',
    url: 'mailto:your.email@example.com',
    type: 'email',
  },
  {
    label: 'LinkedIn',
    icon: 'FaLinkedin',
    url: 'https://linkedin.com/in/your-profile',
    type: 'linkedin',
  },
  {
    label: 'GitHub',
    icon: 'FaGithub',
    url: 'https://github.com/your-username',
    type: 'github',
  },
  // Ajoutez d'autres liens selon vos besoins
];
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/data/contact.ts
git commit -m "feat: add contact data structure"
```

---

## Phase 4: Composants UI réutilisables

### Task 4.1: Utilitaire cn pour classes

**Files:**
- Create: `src/lib/utils/cn.ts`

**Step 1: Créer l'utilitaire cn (classnames)**

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Installer les dépendances**

```bash
npm install clsx tailwind-merge
```

**Step 3: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 4: Commit**

```bash
git add src/lib/utils/cn.ts package.json package-lock.json
git commit -m "feat: add cn utility for class merging"
```

---

### Task 4.2: Composant Button

**Files:**
- Create: `src/components/ui/Button.tsx`

**Step 1: Créer le composant Button**

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-foreground text-background hover:opacity-90',
      secondary: 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
      ghost: 'text-foreground hover:bg-foreground/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add Button component with variants"
```

---

### Task 4.3: Composant Badge

**Files:**
- Create: `src/components/ui/Badge.tsx`

**Step 1: Créer le composant Badge**

```typescript
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'colored';
  color?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  color,
  className
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium';

  const variants = {
    default: 'bg-foreground/10 text-foreground',
    colored: '',
  };

  const style = variant === 'colored' && color
    ? { backgroundColor: `${color}20`, color: color }
    : undefined;

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      style={style}
    >
      {children}
    </span>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat: add Badge component for tags"
```

---

### Task 4.4: Composant RevealOnScroll

**Files:**
- Create: `src/components/ui/RevealOnScroll.tsx`

**Step 1: Créer le composant avec IntersectionObserver**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  className,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ui/RevealOnScroll.tsx
git commit -m "feat: add RevealOnScroll wrapper component"
```

---

## Phase 5: Section Projets

### Task 5.1: Composant ProjectCard

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`

**Step 1: Créer la carte de projet avec animations**

```typescript
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/projects';
import Badge from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-foreground/5 hover:shadow-2xl transition-shadow duration-300"
      style={{ perspective: 1000 }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6">
          <h3 className="text-white text-2xl font-bold text-center">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 justify-center">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="bg-white/20 text-white">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-white/80 text-sm">View Project</p>
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/projects/ProjectCard.tsx
git commit -m "feat: add ProjectCard with hover animations"
```

---

### Task 5.2: Composant ProjectModal

**Files:**
- Create: `src/components/projects/ProjectModal.tsx`

**Step 1: Créer le modal de détails**

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { HiX, HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext
}: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-background rounded-2xl shadow-2xl overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors z-10"
              aria-label="Close"
            >
              <HiX className="w-6 h-6" />
            </button>

            {/* Navigation arrows */}
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                aria-label="Previous project"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                aria-label="Next project"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Hero media */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                <Image
                  src={project.media[0]?.url || project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold mb-4">{project.title}</h2>

              {/* Description */}
              <p className="text-lg text-foreground/80 mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.demoUrl && (
                  <Button
                    variant="primary"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className="gap-2"
                  >
                    <HiExternalLink className="w-5 h-5" />
                    View Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="gap-2"
                  >
                    <FaGithub className="w-5 h-5" />
                    GitHub
                  </Button>
                )}
              </div>

              {/* Additional media */}
              {project.media.length > 1 && (
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {project.media.slice(1).map((media, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={media.url}
                        alt={`${project.title} ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/projects/ProjectModal.tsx
git commit -m "feat: add ProjectModal with navigation"
```

---

### Task 5.3: Section Projects complète

**Files:**
- Create: `src/components/sections/Projects.tsx`

**Step 1: Créer la section avec galerie**

```typescript
'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '../projects/ProjectCard';
import ProjectModal from '../projects/ProjectModal';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedProject === null) return;
    const newIndex = selectedProject === 0 ? projects.length - 1 : selectedProject - 1;
    setSelectedProject(newIndex);
  };

  const handleNext = () => {
    if (selectedProject === null) return;
    const newIndex = selectedProject === projects.length - 1 ? 0 : selectedProject + 1;
    setSelectedProject(newIndex);
  };

  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-16">
      <RevealOnScroll animation="slideUp">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          Projets
        </h2>
      </RevealOnScroll>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(index)}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject !== null ? projects[selectedProject] : null}
        onClose={() => setSelectedProject(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </section>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: add Projects section with grid and modal"
```

---

## Phase 6: Section Compétences

### Task 6.1: Composant SkillIcon

**Files:**
- Create: `src/components/ui/SkillIcon.tsx`

**Step 1: Créer le composant d'icône de compétence**

```typescript
'use client';

import { motion } from 'framer-motion';
import * as SimpleIcons from 'react-icons/si';
import { IconType } from 'react-icons';

interface SkillIconProps {
  name: string;
  icon: string;
  color: string;
  index: number;
}

export default function SkillIcon({ name, icon, color, index }: SkillIconProps) {
  // Get icon component from react-icons
  const IconComponent = (SimpleIcons as Record<string, IconType>)[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{
        scale: 1.2,
        rotate: 5,
        filter: 'grayscale(0%)',
      }}
      className="group relative flex flex-col items-center gap-3"
    >
      {/* Icon container */}
      <div
        className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-foreground/5 transition-all duration-300 group-hover:shadow-lg"
        style={{
          filter: 'grayscale(20%)',
        }}
      >
        {IconComponent && (
          <IconComponent
            className="w-8 h-8 transition-all duration-300"
            style={{ color }}
          />
        )}

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
```

**Step 2: Installer react-icons/si (Simple Icons)**

```bash
npm install react-icons
```

**Step 3: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 4: Commit**

```bash
git add src/components/ui/SkillIcon.tsx package.json package-lock.json
git commit -m "feat: add SkillIcon component with hover effects"
```

---

### Task 6.2: Section Skills

**Files:**
- Create: `src/components/sections/Skills.tsx`

**Step 1: Créer la section des compétences**

```typescript
'use client';

import { skillsByCategory } from '@/data/skills';
import SkillIcon from '../ui/SkillIcon';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 md:px-8 lg:px-16 bg-foreground/[0.02]">
      <RevealOnScroll animation="slideUp">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          Compétences
        </h2>
      </RevealOnScroll>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Frontend */}
        <RevealOnScroll animation="slideUp" delay={0.2}>
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">
              Frontend
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-12">
              {skillsByCategory.frontend.map((skill, index) => (
                <SkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Backend */}
        <RevealOnScroll animation="slideUp" delay={0.3}>
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">
              Backend
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-12">
              {skillsByCategory.backend.map((skill, index) => (
                <SkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Tools */}
        <RevealOnScroll animation="slideUp" delay={0.4}>
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">
              Outils
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-12">
              {skillsByCategory.tools.map((skill, index) => (
                <SkillIcon
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/Skills.tsx
git commit -m "feat: add Skills section with categorized icons"
```

---

## Phase 7: Section Contact (Animations Premium)

### Task 7.1: Hook useMagneticEffect

**Files:**
- Create: `src/lib/hooks/useMagneticEffect.ts`

**Step 1: Créer le hook pour effet magnétique**

```typescript
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/hooks/useMagneticEffect.ts
git commit -m "feat: add useMagneticEffect hook for GSAP"
```

---

### Task 7.2: Composant ContactLink

**Files:**
- Create: `src/components/ui/ContactLink.tsx`

**Step 1: Créer le composant de lien avec animations**

```typescript
'use client';

import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/lib/hooks/useMagneticEffect';
import * as HeroIcons from 'react-icons/hi';
import * as FontAwesome from 'react-icons/fa';
import { IconType } from 'react-icons';
import { ContactLink as ContactLinkType } from '@/data/contact';

interface ContactLinkProps {
  link: ContactLinkType;
  index: number;
}

export default function ContactLink({ link, index }: ContactLinkProps) {
  const magneticRef = useMagneticEffect(0.2);

  // Get icon from react-icons
  const allIcons = { ...HeroIcons, ...FontAwesome };
  const IconComponent = (allIcons as Record<string, IconType>)[link.icon];

  return (
    <motion.a
      ref={magneticRef}
      href={link.url}
      target={link.type === 'email' ? undefined : '_blank'}
      rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative block"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 p-8 border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
              'linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
              'linear-gradient(315deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            {IconComponent && (
              <IconComponent className="w-8 h-8 text-foreground" />
            )}
          </motion.div>

          {/* Label */}
          <span className="text-xl font-semibold text-foreground group-hover:translate-x-2 transition-transform duration-300">
            {link.label}
          </span>

          {/* Arrow */}
          <motion.svg
            className="ml-auto w-6 h-6 text-foreground/60 group-hover:text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </div>

        {/* Ripple effect on click (placeholder) */}
        <motion.div
          className="absolute inset-0 bg-foreground/5 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-300"
        />
      </motion.div>
    </motion.a>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ui/ContactLink.tsx
git commit -m "feat: add ContactLink with magnetic and hover effects"
```

---

### Task 7.3: Section Contact

**Files:**
- Create: `src/components/sections/Contact.tsx`

**Step 1: Créer la section Contact**

```typescript
'use client';

import { contactLinks } from '@/data/contact';
import ContactLink from '../ui/ContactLink';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 md:px-8 lg:px-16">
      <RevealOnScroll animation="slideUp">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Let's work together
        </h2>
        <p className="text-xl text-foreground/60 mb-16 text-center max-w-2xl mx-auto">
          N'hésitez pas à me contacter pour discuter de vos projets ou opportunités
        </p>
      </RevealOnScroll>

      <div className="max-w-3xl mx-auto space-y-4">
        {contactLinks.map((link, index) => (
          <ContactLink key={link.type} link={link} index={index} />
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section with animated links"
```

---

## Phase 8: Navigation et Footer

### Task 8.1: Composant Header

**Files:**
- Create: `src/components/layout/Header.tsx`

**Step 1: Créer le header avec navigation**

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 200);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-foreground/10"
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold"
        >
          Portfolio
        </motion.button>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          {['projects', 'skills', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              whileHover={{ scale: 1.1 }}
              className="text-sm font-medium capitalize hover:text-foreground/60 transition-colors"
            >
              {section}
            </motion.button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add Header with sticky navigation"
```

---

### Task 8.2: Composant Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Créer le footer**

```typescript
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-foreground/60">
          © {currentYear} Portfolio. Made with ❤️ and Next.js
        </p>
      </div>
    </footer>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Phase 9: Page principale et intégration

### Task 9.1: Intégrer toutes les sections dans page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Remplacer le contenu de la page principale**

```typescript
'use client';

import { useState } from 'react';
import { useImageSequence } from '@/lib/hooks/useImageSequence';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const { loadProgress, isLoaded } = useImageSequence('/avatar', 200, 'frame_');
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {/* Preloader */}
      <Preloader progress={loadProgress} isComplete={isLoaded} />

      {/* Main content */}
      <main className="min-h-screen">
        <Header />

        <Hero
          name="Votre Nom"
          onAvatarComplete={() => setShowContent(true)}
        />

        {showContent && (
          <>
            <Projects />
            <Skills />
            <Contact />
          </>
        )}

        <Footer />
      </main>
    </>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate all sections in main page"
```

---

### Task 9.2: Configurer globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Mettre à jour les styles globaux**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update global styles and CSS variables"
```

---

### Task 9.3: Configurer layout.tsx avec metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Mettre à jour le layout root**

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Votre Nom",
  description: "Portfolio moderne avec projets, compétences et contact. Développeur web passionné.",
  keywords: ["portfolio", "développeur", "web", "react", "next.js"],
  authors: [{ name: "Votre Nom" }],
  openGraph: {
    title: "Portfolio | Votre Nom",
    description: "Portfolio moderne avec projets, compétences et contact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure layout with SEO metadata"
```

---

## Phase 10: Assets et placeholders

### Task 10.1: Créer placeholders pour images

**Files:**
- Create: `public/projects/placeholder.jpg` (image générée ou placeholder)
- Create: Instructions pour l'utilisateur

**Step 1: Créer le README pour assets**

```markdown
# Assets Guide

## Avatar Sequence

Placez vos 200 images JPG dans `src/assets/avatar/` avec le format:
- `frame_001.jpg`
- `frame_002.jpg`
- ...
- `frame_200.jpg`

**Recommandations:**
- Taille: 800x800px ou 1000x1000px
- Format: JPG optimisé (qualité 80-85%)
- Poids total: < 10MB si possible

## Project Images

Placez les images/vidéos de vos projets dans `public/projects/`

**Format suggéré:**
- Thumbnails: 1200x675px (16:9)
- Format: JPG ou WebP
- Compression optimisée pour le web

## Skill Icons

Les icônes des compétences utilisent `react-icons/si` (Simple Icons).
Consultez https://react-icons.github.io/react-icons/icons/si/ pour la liste complète.

## Next Steps

1. Ajoutez vos 200 images avatar dans `src/assets/avatar/`
2. Ajoutez vos images de projets dans `public/projects/`
3. Mettez à jour `src/data/projects.ts` avec vos vrais projets
4. Mettez à jour `src/data/skills.ts` avec vos compétences
5. Mettez à jour `src/data/contact.ts` avec vos liens
6. Changez "Votre Nom" dans `src/app/page.tsx`
```

Save to: `docs/ASSETS.md`

**Step 2: Commit**

```bash
git add docs/ASSETS.md
git commit -m "docs: add assets guide for images and content"
```

---

## Phase 11: Testing et optimisation

### Task 11.1: Tester le build de production

**Files:**
- N/A (test only)

**Step 1: Build le projet**

```bash
npm run build
```

Expected: Build completes successfully

**Step 2: Démarrer en mode production**

```bash
npm run start
```

Expected: Server starts successfully

**Step 3: Tester dans le navigateur**

Navigate to: http://localhost:3000

Vérifier:
- [ ] Preloader s'affiche
- [ ] Avatar se charge (même sans les 200 images, devrait gérer l'erreur)
- [ ] Sections apparaissent
- [ ] Animations fonctionnent
- [ ] Navigation fonctionne
- [ ] Modal projets s'ouvre/ferme
- [ ] Responsive sur mobile

**Step 4: Arrêter le serveur et noter les issues**

Créer des issues pour les bugs trouvés.

---

### Task 11.2: Optimisations de performance

**Files:**
- Modify: `next.config.js` (si nécessaire)

**Step 1: Vérifier les optimisations Next.js**

Assurez-vous que `next.config.js` a les optimisations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  // Optimizations
  swcMinify: true,
};

module.exports = nextConfig;
```

**Step 2: Commit si modifié**

```bash
git add next.config.js
git commit -m "perf: enable Next.js optimizations"
```

---

## Phase 12: Documentation finale

### Task 12.1: Créer le README principal

**Files:**
- Create: `README.md`

**Step 1: Créer le README**

```markdown
# Portfolio Moderne avec Avatar 3D

Portfolio web interactif avec avatar 3D animé contrôlé par le scroll, galerie de projets, compétences animées, et section contact avec effets premium.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **Icons:** React Icons

## 📦 Installation

```bash
# Cloner le repo
git clone <your-repo-url>
cd portfolio

# Installer les dépendances
npm install

# Lancer en dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🎨 Personnalisation

### 1. Ajouter vos 200 images avatar

Placez vos images dans `src/assets/avatar/`:
- Format: `frame_001.jpg` à `frame_200.jpg`
- Taille recommandée: 800x800px
- Format: JPG optimisé

### 2. Mettre à jour vos informations

**Nom:**
- `src/app/page.tsx` - ligne `name="Votre Nom"`

**Projets:**
- `src/data/projects.ts` - remplacez les placeholders

**Compétences:**
- `src/data/skills.ts` - ajoutez vos compétences

**Contact:**
- `src/data/contact.ts` - vos liens sociaux

**Metadata SEO:**
- `src/app/layout.tsx` - title, description, etc.

### 3. Ajouter vos images de projets

Placez les images dans `public/projects/` et référencez-les dans `src/data/projects.ts`

## 📁 Structure du Projet

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Composants React
│   │   ├── avatar/         # Système avatar 3D
│   │   ├── layout/         # Header, Footer
│   │   ├── projects/       # Composants projets
│   │   ├── sections/       # Sections principales
│   │   └── ui/             # Composants UI réutilisables
│   ├── data/               # Données (projets, skills, contact)
│   ├── lib/                # Hooks et utilitaires
│   └── assets/             # Assets locaux (avatar)
├── public/                 # Fichiers statiques
└── docs/                   # Documentation

```

## 🎯 Features

- ✅ Avatar 3D interactif avec scroll control
- ✅ Preloader avec barre de progression
- ✅ Galerie de projets avec modal
- ✅ Compétences animées par catégories
- ✅ Section contact avec effets premium
- ✅ Navigation sticky
- ✅ Animations fluides (Framer Motion + GSAP)
- ✅ Responsive design
- ✅ SEO optimisé
- ✅ TypeScript pour type safety

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Ou connectez votre repo GitHub à Vercel pour déploiement automatique.

### Autres plateformes

Le projet est compatible avec toute plateforme supportant Next.js:
- Netlify
- Railway
- Render
- etc.

## 📝 License

MIT

## 🙏 Crédits

Design inspiré de sites premium comme [igloo.inc](https://www.igloo.inc/)
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## 📋 Notes Finales

### Prochaines étapes après implémentation

1. **Ajouter vos vraies données:**
   - 200 images avatar
   - Images des projets
   - Informations personnelles
   - Liens sociaux

2. **Peaufiner les animations igloo.inc:**
   - Analyser les animations du site
   - Reproduire les effets spécifiques
   - Ajuster timings et transitions

3. **Optimisations supplémentaires:**
   - Images WebP
   - Lazy loading amélioré
   - Performance audit (Lighthouse)
   - Accessibility audit

4. **Fonctionnalités optionnelles:**
   - Mode sombre/clair toggle
   - Multilingue (FR/EN)
   - Analytics
   - Téléchargement CV

### Commandes utiles

```bash
# Dev
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

**Plan d'implémentation créé le 2026-02-05**
**Prêt pour exécution avec @superpowers:executing-plans ou @superpowers:subagent-driven-development**
