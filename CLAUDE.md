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

- [x] Project initialization
- [x] Folder structure with CLAUDE.md
- [x] TypeScript + Tailwind configuration
- [ ] Install animation libraries (Framer Motion, GSAP)
- [ ] Avatar 3D system
- [ ] Hero section
- [ ] Projects gallery
- [ ] Skills section
- [ ] Contact section
- [ ] Navigation & Footer
- [ ] Optimizations & deployment

## 📝 Next Steps

1. **Install dependencies:**
   ```bash
   npm install framer-motion gsap react-icons clsx tailwind-merge
   ```

2. **Add avatar images:**
   - Place 200 JPG in `src/assets/avatar/`
   - Format: `frame_001.jpg` to `frame_200.jpg`

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
