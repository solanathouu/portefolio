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

### Phase 1: À venir
- [ ] Avatar 3D system
- [ ] Hero section
- [ ] Projects gallery
- [ ] Skills section
- [ ] Contact section
- [ ] Optimizations & deployment

## 📊 Current Project State

| Aspect | Status | Details |
|--------|--------|---------|
| Code | ✅ Fondations complètes | 9 fichiers créés, 5 commits |
| Config | ✅ Prêt | Next.js 16, TypeScript, Tailwind CSS v4 |
| Tests | 🔄 Pas encore | TDD à implémenter pour les prochaines phases |
| Git | ✅ Synced | Branch main, pushed to GitHub |

**Dernière action:** Implémentation complète des fondations (utilities, data, UI components, layout)

**Fichiers créés:**
- `src/lib/utils/cn.ts` - Utility pour class merging
- `src/data/projects.ts` - 3 projets avec placeholders
- `src/data/skills.ts` - 16 compétences
- `src/data/contact.ts` - 5 liens sociaux
- `src/components/ui/Button.tsx` - Bouton avec 3 variants
- `src/components/ui/Badge.tsx` - Badge pour tags
- `src/components/ui/RevealOnScroll.tsx` - Animation wrapper
- `src/components/layout/Header.tsx` - Navigation sticky
- `src/components/layout/Footer.tsx` - Footer minimal

## 🎯 Next Immediate Action

**TESTER LES FONDATIONS:**

1. **Démarrer le serveur de développement:**
   ```bash
   cd portfolio-new
   npm run dev
   ```
   Server will start on http://localhost:3000 or http://localhost:3001

2. **Créer une page de test pour visualiser les composants:**
   - Intégrer Header et Footer dans layout.tsx
   - Créer une section de demo dans page.tsx avec Button, Badge, RevealOnScroll
   - Vérifier que tout s'affiche correctement

3. **Après les tests:**
   - Si OK → Continuer avec Phase 1 (Hero + Avatar system)
   - Si bugs → Corriger puis retester

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

---

**Last updated:** 2026-02-05
**Status:** Initial structure ready ✅
