# Portfolio Moderne avec Avatar 3D

Portfolio web interactif avec avatar 3D animé contrôlé par le scroll, galerie de projets, compétences animées, et section contact avec effets premium inspirés de igloo.inc.

## 🚀 Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # Type check
```

## 📁 Architecture Rules

### File Organization
- **1 file = 1 responsibility** - Max 200-300 lines par fichier
- **No god files** - Séparer en composants plus petits si nécessaire
- **Clear naming** - Le nom du fichier doit refléter exactement son contenu

### Import Rules
```typescript
// ✅ GOOD - Use @ aliases
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils/cn';

// ❌ BAD - No deep relative imports
import Button from '../../../components/ui/Button';
```

**Import order:**
1. External packages (react, next, etc.)
2. @/ aliases (organized)
3. Relative imports (if absolutely necessary)

### Separation of Concerns

```
┌─────────────────────────────────────────┐
│  UI Layer (components/)                 │  ← Presentation only
├─────────────────────────────────────────┤
│  Logic Layer (hooks/, lib/)             │  ← Business logic
├─────────────────────────────────────────┤
│  Data Layer (data/)                     │  ← Data structures
└─────────────────────────────────────────┘
```

**Rules:**
- **components/** = UI ONLY (no fetch, no business logic)
  - Receive data via props
  - Use hooks for state/effects
  - Delegate logic to hooks/services

- **hooks/** = State + Effects (use utils for logic)
  - Custom React hooks (useXxx)
  - Can use other hooks
  - Keep logic in utils when possible

- **lib/utils/** = Pure functions (no side effects)
  - No React, no DOM
  - Testable independently
  - Reusable everywhere

- **data/** = Static data and types
  - TypeScript interfaces
  - Content arrays
  - Easy to edit without code changes

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Hooks | camelCase + `use` | `useImageSequence.ts` |
| Utils | camelCase | `cn.ts`, `formatDate.ts` |
| Types | PascalCase | `Project`, `Skill`, `ContactLink` |
| Constants | UPPER_SNAKE_CASE | `FRAME_COUNT`, `API_URL` |
| Files/folders | kebab-case or PascalCase | `project-card/` or `ProjectCard/` |

### Component Structure

```typescript
// ✅ GOOD - Clean component
'use client'; // Only if needed (hooks, events)

import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('base-styles', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Anti-Spaghetti Checklist

Before committing, check:

- [ ] No file > 300 lines
- [ ] No circular imports
- [ ] All imports use @ aliases (no ../../../)
- [ ] Components don't contain business logic
- [ ] Hooks don't contain UI
- [ ] Utils are pure functions
- [ ] Types are exported and reused
- [ ] No duplicate code (DRY)
- [ ] No unused code (YAGNI)

## 🎨 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **Icons:** React Icons
- **Deployment:** Vercel

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   ├── layout/            # Header, Footer, ParticleBackground
│   │   ├── sections/          # Preloader, Hero, Projects, Skills, Contact
│   │   ├── avatar/            # Avatar 3D system
│   │   ├── projects/          # ProjectCard
│   │   ├── skills/            # SkillCard
│   │   └── ui/                # Reusable UI (Button, Card, Badge, etc.)
│   │
│   ├── lib/
│   │   ├── hooks/             # Custom hooks (useScrollLockAnimation)
│   │   ├── contexts/          # LoadingContext
│   │   └── utils/             # Pure utilities (cn, skillIcons, contactIcons)
│   │
│   ├── data/                  # Content data
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── contact.ts
│   │
│   └── assets/                # Local assets
│       └── avatar/            # 200 JPG frames
│
├── public/                    # Static files
│   ├── projects/              # Project images
│   └── icons/                 # Tech logos
│
├── docs/                      # Documentation
│   └── plans/                 # Design & implementation plans
│
└── CLAUDE.md                  # This file

```

## 🎯 Implementation Status

### Phase 0: Fondations ✅ COMPLETE
- [x] Project initialization
- [x] Folder structure with CLAUDE.md
- [x] TypeScript + Tailwind configuration
- [x] Animation libraries installed (Framer Motion, GSAP, react-icons)
- [x] Utility function cn() créée
- [x] Data structures (projects, skills, contact)
- [x] UI components de base (Button, Badge, RevealOnScroll)
- [x] Layout components (Header, Footer)

### Phase 1: Hero + Avatar ✅ COMPLETE
- [x] Avatar 3D system avec 173 frames PNG (fond transparent)
- [x] Hero section avec animations Framer Motion
- [x] Système de scroll bloqué pour rotation 360°
- [x] Hook useScrollLockAnimation pour contrôle précis
- [x] Preload intelligent des images
- [x] Background gradient slate-900 moderne
- [x] Responsive design (mobile + desktop)

### Phase 2: Projects Gallery ✅ COMPLETE
- [x] Projects section créée avec design Editorial Neo-Brutalist
- [x] ProjectCard component avec hover effects premium
- [x] Grid responsive avec espacement amélioré
- [x] Typographie Space Mono (mono technique)
- [x] Couleurs électriques (Cyan, Magenta, Lime)
- [x] Chiffres géants alignés en arrière-plan
- [x] Animations stagger on scroll
- [x] Preloader minimaliste avec animation ASCII
- [x] LoadingContext pour gérer transitions
- [x] Pages détaillées de projets (/projects/[id])
- [x] Navigation prev/next entre projets
- [x] Data structure enrichie (longDescription, technologies, challenges, outcomes)

### Phase 3: Skills + Contact ✅ COMPLETE
- [x] Skills section avec 3 catégories (Frontend/Backend/Tools) et SkillCard animées
- [x] Contact section avec liens (Email, LinkedIn, GitHub)
- [x] Icon mapping utilities (skillIcons.tsx, contactIcons.tsx)
- [x] Scrollbars cachées (X + Y)
- [x] Hamburger menu placeholder supprimé
- [x] Preloader lié au vrai chargement (window.load) au lieu d'un timer fixe
- [x] Avatar scroll lock : ne bloque que devant le hero, 1 seule fois par session (sessionStorage)
- [x] Espacement réduit entre project cards

### Phase 3.5: Particle Background ✅ COMPLETE
- [x] Canvas HTML5 custom (zero dependance) — `ParticleBackground.tsx`
- [x] 200 micro-particules blanches avec opacite subtile (0.1-0.4)
- [x] Mouvement de derive naturel + scintillement (pulse opacity)
- [x] Repulsion souris : particules fuient le curseur (rayon 80px, force douce)
- [x] Friction pour ralentissement fluide apres repulsion
- [x] Fixed canvas z-0, contenu z-1 — sections transparentes (pas de backgroundColor)
- [x] Parametres documentes inline pour tweaking facile
- [x] Responsive (resize), cleanup propre, pointer-events: none

## 📊 Current Project State

| Aspect | Status | Details |
|--------|--------|---------|
| Code | ✅ Phase 3.5 complète | Hero + Avatar + Projects + Skills + Contact + Particules |
| Config | ✅ Optimisé | Space Mono font, anthracite theme, LoadingContext |
| Tests | 🔄 Pas encore | TDD à implémenter |
| Git | ✅ Clean | Dernier commit: 38d0d0d (particle mouse repulsion + docs) |
| Build | ✅ Passing | TypeScript 0 errors, Next.js build OK |
| Deploy | 🔄 Pas encore | Prêt pour Vercel |

**Dernière action:** Phase 3.5 — Particules canvas en arriere-plan avec repulsion souris

**Contact data (réel):**
- Email: skwarek.nathan@gmail.com
- LinkedIn: https://www.linkedin.com/in/nathan-skwarek-8a3723252/
- GitHub: https://github.com/solanathouu

**Design cohérent Neo-Brutalist:**
- Background anthracite (#303030), accent Electric Cyan (#00f0ff)
- Space Mono font, uppercase, tracking-widest
- Hover: border color + box-shadow offset + translate
- Grain texture overlay sur toutes les sections
- Particules canvas en arriere-plan (200, repulsion souris, params dans ParticleBackground.tsx)
- Sections sans backgroundColor (transparent) pour laisser voir les particules
- Scrollbars cachées, scroll fonctionnel
- Preloader lié au vrai window.load (min 800ms)
- Avatar rotation 360° une seule fois par session (sessionStorage)

## 🎯 Next Immediate Action

**PHASE 4 - Polish & Deployment:**

1. **Ajouter les vrais assets:**
   - Images de projets dans `public/projects/` (remplacer placeholders 📁)
   - Mettre à jour `src/data/projects.ts` avec vrais projets
   - Mettre à jour GitHub username dans Projects footer

2. **Mobile menu:**
   - Le hamburger menu a été supprimé (placeholder)
   - Implémenter un vrai menu mobile si nécessaire

3. **Optimisations:**
   - Ajouter `loading.tsx` pour transitions entre pages projet
   - Tester responsive mobile/tablet
   - Performance audit (Lighthouse)

4. **Déployer sur Vercel:**
   ```bash
   npm i -g vercel && vercel
   ```
   Ou connecter le repo GitHub https://github.com/solanathouu/portefolio.git

## 🔧 Performance Guidelines

- Use `next/image` for all images
- Lazy load below-the-fold content
- Use `will-change` for animated elements
- IntersectionObserver for scroll animations
- Debounce/throttle scroll events
- Code splitting per route
- Preload critical resources

## ♿ Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels where needed
- Keyboard navigation support
- Focus visible on interactive elements
- Reduced motion for users who prefer it
- Sufficient color contrast (WCAG AA)

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

Or connect GitHub repo to Vercel for automatic deployments.

## 💡 Tips

- **Start small:** Implement features incrementally
- **Test often:** Check responsiveness and performance regularly
- **Keep it DRY:** Reuse components and utilities
- **YAGNI:** Don't add features you don't need yet
- **Performance first:** Smooth animations > Complex animations
- **Mobile matters:** Test on real devices

## 🔧 Avatar Configuration

Pour ajuster la vitesse de rotation:
```typescript
// Dans src/lib/hooks/useScrollLockAnimation.ts
const scrollSensitivity = 20; // Plus grand = plus lent
```

Valeurs recommandées:
- **10-15**: Rotation rapide (5-10 coups de molette)
- **20-30**: Rotation normale (20-25 coups de molette) ← Actuel
- **40-50**: Rotation lente (immersive)

## 📊 Technical Decisions

| Decision | Reason |
|----------|--------|
| PNG transparent au lieu JPG | Flexibility du background |
| Scroll bloqué | Expérience immersive forcée |
| 173 frames | Équilibre qualité/performance |
| Slate-900 gradient | Moderne, contraste avec avatar |
| Framer Motion | Animations fluides, DX excellent |
| Canvas custom vs tsparticles | Zero dependance, plus leger, suffisant pour dust effect |
| Sections sans backgroundColor | Transparent pour laisser voir le canvas particules fixe |

---

**Last updated:** 2026-02-13
**Status:** Phase 3.5 Complete - Particle Background ✅
**Next:** Phase 4 - Polish, real assets & deployment
