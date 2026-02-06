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
│   │   ├── layout/            # Header, Footer, CustomCursor
│   │   ├── sections/          # Preloader, Hero, Projects, Skills, Contact
│   │   ├── avatar/            # Avatar 3D system
│   │   ├── projects/          # Project components
│   │   └── ui/                # Reusable UI (Button, Card, Badge, etc.)
│   │
│   ├── lib/
│   │   ├── hooks/             # Custom hooks
│   │   └── utils/             # Pure utilities
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
- [x] Grid responsive asymétrique
- [x] Typographie Space Mono (mono technique)
- [x] Couleurs électriques (Cyan, Magenta, Lime)
- [x] Chiffres géants alignés en arrière-plan
- [x] Animations stagger on scroll

### Phase 3: À venir
- [ ] Skills section (animations par catégorie)
- [ ] Contact section (effets premium)
- [ ] Optimizations & deployment

## 📊 Current Project State

| Aspect | Status | Details |
|--------|--------|---------|
| Code | ✅ Phase 2 complète | Hero + Avatar + Projects fonctionnels |
| Config | ✅ Optimisé | Space Mono font, anthracite theme |
| Tests | 🔄 Pas encore | TDD à implémenter |
| Git | ⚠️ Uncommitted | Projects section à committer |
| Build | ✅ Passing | TypeScript 0 errors, Next.js build OK |

**Dernière action:** Section Projects finalisée avec design Neo-Brutalist

**Nouveaux composants créés:**
- `src/components/sections/Projects.tsx` - Section projects avec grid
- `src/components/projects/ProjectCard.tsx` - Carte projet avec effets
- `src/app/layout.tsx` - Fonts Google (Space Mono + Playfair Display)
- `src/app/globals.css` - Custom font classes

**Design Projects:**
- ✅ Neo-Brutalist style (borders épais, ombres dures)
- ✅ Space Mono mono technique (une seule police)
- ✅ Couleurs électriques : #00f0ff (cyan), #ff00ff (magenta), #ccff00 (lime)
- ✅ Chiffres géants (01, 02, 03) alignés top-right
- ✅ Hover: translate + hard shadow 12px
- ✅ Grid responsive avec gap 20
- ✅ Hero height réduit (200vh → 120vh) pour rapprocher sections

## 🎯 Next Immediate Action

**COMMIT & CONTINUER PHASE 3:**

1. **Committer la section Projects:**
   ```bash
   git add .
   git commit -m "feat: create Projects section with Editorial Neo-Brutalist design"
   git push origin main
   ```

2. **Tester en local:**
   ```bash
   npm run dev
   ```
   Vérifier hover effects, responsive, alignement chiffres

3. **Commencer Phase 3 - Skills Section:**
   - Créer `src/components/sections/Skills.tsx`
   - Style cohérent avec Projects (mono, couleurs électriques)
   - Animations par catégories
   - Utiliser les données de `src/data/projects.ts`
   - Ajouter filtres par technologie
   - Modal pour détails projet

## 📝 Next Steps (Après tests)

1. **Préparer les assets:**
   - 200 images JPG pour avatar dans `src/assets/avatar/`
   - Format: `frame_001.jpg` to `frame_200.jpg`
   - Images de projets dans `public/projects/`

3. **Follow implementation plan:**
   - See `docs/plans/2026-02-05-portfolio-implementation.md`
   - Execute with `@superpowers:executing-plans` or `@superpowers:subagent-driven-development`

4. **Update content:**
   - Edit `src/data/projects.ts` with your projects
   - Edit `src/data/skills.ts` with your skills
   - Edit `src/data/contact.ts` with your links
   - Update name in `src/app/page.tsx`

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

---

**Last updated:** 2026-02-06
**Status:** Phase 1 Complete - Avatar 3D Scroll System ✅
