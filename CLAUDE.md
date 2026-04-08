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
│   │   ├── page.tsx           # Main page (home)
│   │   ├── layout.tsx         # Root layout (Header, Particles, LoadingProvider)
│   │   ├── globals.css        # Global styles
│   │   ├── not-found.tsx      # Custom 404 page
│   │   └── projects/[id]/     # Project detail pages
│   │       ├── page.tsx       # Server component (SSG + metadata)
│   │       ├── loading.tsx    # Loading state
│   │       └── not-found.tsx  # Project 404
│   │
│   ├── components/
│   │   ├── layout/            # Header, ParticleBackground
│   │   ├── sections/          # Preloader, Hero, Projects, Skills, Contact
│   │   ├── avatar/            # Avatar 3D system (Avatar3DLocked)
│   │   ├── projects/          # ProjectCard, ProjectDetail
│   │   ├── skills/            # SkillCard
│   │   └── ui/                # Reusable UI (Button, Badge, RevealOnScroll)
│   │
│   ├── lib/
│   │   ├── hooks/             # useScrollLockAnimation, useImageSequence
│   │   ├── contexts/          # LoadingContext
│   │   └── utils/             # cn, skillIcons, contactIcons
│   │
│   ├── data/                  # Content data
│   │   ├── projects.ts        # Placeholder projects (à remplacer)
│   │   ├── skills.ts
│   │   └── contact.ts
│   │
│   └── assets/                # Local assets
│       └── avatar/            # 173 PNG frames (fond transparent)
│
├── public/                    # Static files
│   ├── assets/avatar/         # Avatar frames served here
│   ├── projects/              # Project images (à ajouter)
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
- [x] Skills section avec 3 catégories (Langages/Data & Analyse/Outils) et SkillCard animées
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

### Phase 4: Polish + Personalisation 🔄 EN COURS
- [x] Metadata SEO : "Nathan Skwarek | Portfolio" + OpenGraph
- [x] GitHub links corrigés → solanathouu
- [x] Header : nav desktop + **mobile hamburger menu** (overlay fullscreen, animated X, stagger) — logo NS. supprimé
- [x] Footer global supprimé (layout.tsx) — pas de footer, design minimaliste
- [x] Footer "More experiments on GitHub" supprimé de Projects section
- [x] Project detail page : **server component** avec generateStaticParams (SSG) + generateMetadata
- [x] ProjectDetail.tsx : client component extrait, bg transparent (particules visibles)
- [x] Pages 404 custom : globale + par projet (neo-brutalist)
- [x] loading.tsx pour transitions projet
- [x] Scroll indicator dans Hero : visible des le debut, disparait apres rotation avatar (bottom: 40px)
- [x] HeroSimple.tsx supprimé (unused)
- [x] Skills mis a jour avec vrais skills Nathan (Python, SQL, JS, Excel, Scraping, Dataiku, Git, GitHub, VS Code, Anglais)
- [x] Categories skills renommees : Langages / Data & Analyse / Outils (etait Frontend/Backend/Tools)
- [x] Icones skills corriges (SiPython, FaDatabase, SiDataiku, FaFileExcel, FaSpider, FaGlobe, etc.)
- [x] Vrais projets ajoutés dans `src/data/projects.ts` (LaBonneNote, Tube, B2B IT Catalog Scraper)
- [x] Typographie changée : Space Mono → **Sora** (géométrique, lisible) — Space Mono gardé uniquement pour Preloader ASCII
- [x] Layout sections : containers `w-11/12 max-w-6xl` (Projects, Skills, Contact) pour marge visible des bords écran
- [x] Section headers unifiés : titres centrés (// Portfolio, // Compétences, // Contact), descriptions en français, espacements inline (40px/30px/60px)
- [x] Footer Marquee Signature : 3 rangées de mots défilant (vitesses/directions différentes), signature "© 2026 — Paris", CSS keyframes seamless loop, pointer-events-none (pas de pause hover)
- [x] Skills cliquables : Dataiku ouvre certificat PDF (`/certificates/dataiku-core-designer.pdf`), Anglais ouvre certificat PDF (`/certificates/anglais.pdf`), GitHub ouvre profil — champ `url?` dans Skill interface, label "Certifié" sur certificats
- [x] Contact description orientée alternance : "En quête d'une alternance où je peux monter en compétences et livrer du concret."
- [x] Marquee fix : inline-flex + pointer-events-none (plus de saut, plus de pause hover), vitesses ralenties (40s/30s/36s)
- [x] Navigation projets prev/next redesignée : editorial strip, grid 2 colonnes, accent line slide-in, titres centrés cyan, labels + fleches plus gros, numéro de projet en watermark
- [x] Skills grid bordures lissées : technique border-collapse (container border-top/left, cards border-right/bottom 1px), taille uniforme (h-full + justify-center), hover outline au lieu de border pour ne pas casser le layout
- [x] Images projets ajoutées dans `public/projects/` (3 screenshots par projet LaBonneNote/Tube/Scraper)
- [x] ProjectDetail : grille de vignettes cliquables (2 cols mobile, 3 cols desktop) + lightbox plein écran (navigation flèches, Escape, compteur)
- [x] Scraper : 4e vignette = première slide PDF, clic ouvre le PDF complet (`scraper-presentation.pdf`)
- [x] Interface media enrichie : champ `linkUrl?` pour ouvrir un lien externe au lieu du lightbox
- [x] ProjectCard : vraies images projets (media[0]) au lieu du placeholder emoji 📁, next/image fill + object-cover
- [x] ProjectDetail refonte images : miniatures 300x300 en bas de page, lightbox CSS pur (position fixed + z-99999, pas de portal/Framer Motion), animation fade+scale 0.3s, fleches navigation, Escape/clic ferme
- [x] Lightbox : bouton "Ouvrir le PDF" cyan quand l'image a un linkUrl (scraper presentation)
- [x] Images manquantes nettoyées : supprimé labonnenote-4.png et tube-4.png des données (fichiers inexistants)
- [x] Ordre screenshots projets réorganisé : screenshot 3 en premier, 1 en deuxième, 2 en troisième (3 projets)
- [ ] Tests responsive mobile/tablet
- [ ] Lighthouse performance audit
- [ ] Deployer sur Vercel

## 📊 Current Project State

**2 branches actives :**
- `main` — V1 glacé/Apple/anthracite (stable, déployée)
- `v2-dark-luminous` — V2 dark luminous (en cours)

### V1 (main)
| Aspect | Status | Details |
|--------|--------|---------|
| Code | ✅ Stable | DA glacé + bulles contact + 6 projets |
| Build | ✅ Passing | 0 errors TypeScript |
| Deploy | ✅ Vercel | Production |

### V2 (v2-dark-luminous)
| Aspect | Status | Details |
|--------|--------|---------|
| Code | 🔄 En cours | Single-page scroll, Three.js shaders, GlowCards |
| Config | ✅ OK | Space Grotesk, design tokens v2, Three.js installé |
| Build | ✅ Passing | 0 errors TypeScript |
| Git | ✅ Pushé | Synchronisé avec GitHub |
| Deploy | 🔄 Pas encore | Après validation design |

**Dernière action (session 2026-04-08):** Création branche v2-dark-luminous. Refonte complète du portfolio : shader aurora Three.js en fond, orbes wireframe 3D (CV/Email/GitHub/LinkedIn) avec color cycling + labels, starfield global, GlowCards data-glow avec tracking curseur, carousel 3D projets, single-page scroll.

**Projets (5 projets):**
- LaBonneNote : Assistant éducatif IA, RAG chatbot, 43k chunks, quiz auto, Python/FastAPI/ChromaDB/GPT-4o-mini
- Tube : App mobile métro parisien, signalements temps réel, gamification, React Native/Expo/Supabase/PostGIS
- B2B IT Catalog Scraper : Scraper Python, +8800 produits IT TD Synnex, 11 catégories, 440+ specs, CSV, zéro dépendance
- Hackathon PayFit — SEO : Infrastructure IA de contenu, N8N veille concurrentielle, Agent GEO Audit multi-IA, Agent Maestro Dust 4 étapes, 35h économisées, 0.30€/mois API
- Oppy — AI Copilot : Agent IA proactif (Hackathon Gemini), scan Gmail/Calendar/web, scoring urgence HuggingFace, brief d'action. GitHub: solanathouu/hack-google

**Skills (mis à jour session 2026-03-15):**
- Langages : Python, SQL, JavaScript, Anglais (certifié)
- Data & Analyse : Excel, Web Scraping, Dataiku (certifié), Power BI, Tableau
- Outils : Git, GitHub, VS Code, N8N, Make, Notion, Dust, Claude

**Contact data (réel):**
- Email: skwarek.nathan@gmail.com
- LinkedIn: https://www.linkedin.com/in/nathan-skwarek-8a3723252/
- GitHub: https://github.com/solanathouu

**Design V1 — Glacé / Apple / Premium (branche main) :**
- Background anthracite (#303030), system font stack Apple, constellation canvas, avatar 3D scroll-locked, bulles organiques contact

**Design V2 — Dark Luminous (branche v2-dark-luminous) :**
- Background #050508 (quasi-noir)
- Shader aurora Three.js plein écran (FBM noise, 35 bandes lumineuses)
- Starfield 3000 particules (fixed, visible sur tout le site)
- Orbes wireframe 3D avec glow atmosphérique fresnel + color cycling (5 couleurs par orbe)
- GlowCards avec système data-glow complet (tracking curseur global, ::before/::after border glow, inner blur)
- Carousel 3D projets (perspective, rotateY ±15°, navigation clavier)
- Typo Space Grotesk (géométrique, futuriste)
- Tokens CSS : --accent-violet #7850ff, --accent-cyan #00c8ff, --accent-rose #ff3c78
- Single-page scroll : Hero (orbes liens) → Projets (carousel) → Skills (GlowCards) → Contact (GlowCards)
- Pages détail projet : InnerOrb (wireframe vu de l'intérieur) + BackButton

## 🎯 Next Immediate Action

**V2 (branche v2-dark-luminous) :**
1. **Polish visuel** — ajuster positions orbes, responsive mobile, tailles
2. **Tests responsive mobile/tablet**
3. **Performance** — vérifier FPS shader sur mobile, lazy load Three.js
4. **Deployer v2 sur Vercel** (ou preview branch)

**V1 (branche main) :**
- Stable, rien à faire sauf si besoin de hotfix

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
| System font stack au lieu Sora | Feeling Apple/glacé, cohérent avec hero NATHAN, zero font loading |
| Framer Motion | Animations fluides, DX excellent |
| Canvas custom vs tsparticles | Zero dependance, plus leger, constellation/plexus effect |
| Sections sans backgroundColor | Transparent pour laisser voir le canvas particules fixe |

---

**Last updated:** 2026-04-08
**Status:** V2 en cours sur branche `v2-dark-luminous` — single-page scroll, shader aurora, orbes wireframe, GlowCards, carousel 3D
**V1 stable sur `main`**
**Next:** Polish v2 (responsive, perf), puis déployer
