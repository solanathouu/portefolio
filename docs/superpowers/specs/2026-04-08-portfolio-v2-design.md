# Portfolio V2 — Dark Luminous

## Vision

Refonte totale du portfolio Nathan Skwarek. Passage d'un single-page scroll (glacé/Apple/anthracite) à un **hub central multi-page** avec shaders Three.js, orbes 3D flottantes, et transitions immersives.

Mots-clés : **fluide, lumineux, premium, dark luminous**.

## Architecture des pages

```
/                  → Hub central (shader + orbes + quick-links)
/projects          → Carousel 3D des projets
/projects/[id]     → Detail projet (GlowCard layout)
/skills            → GlowCards par categorie
/contact           → Liens contact lumineux
```

## Hub Central (page d'accueil)

- **Background** : shader Three.js plein ecran — fusion de 2 shaders d'inspiration :
  - Anneaux concentriques chromatiques RGB (shader 1)
  - Aurora boreale avec FBM noise (shader 2)
  - Fond noir (#050508), effets lumineux organiques
- **Centre** : "Nathan Skwarek" en gradient lumineux (blanc → violet → bleu), sous-titre "Data Analyst & Developer"
- **3 orbes 3D** : spheres Three.js avec atmospheric glow shader (fresnel), flottant autour du nom
  - Orbe Projets : teinte violet (#7850ff)
  - Orbe Skills : teinte cyan (#00c8ff)
  - Orbe Contact : teinte rose (#ff3c78)
  - Animation : float organique (sin/cos), color cycling subtil
  - Hover : scale 1.15 + glow intensifie
  - Clic : transition zoom-in (orbe grossit → avale l'ecran → route)
- **4 quick-links** (coin bas-droit) : mini-cercles glassmorphism pour CV, Mail, GitHub, LinkedIn
  - CV : telecharge le PDF
  - Mail : mailto:skwarek.nathan@gmail.com
  - GitHub : https://github.com/solanathouu
  - LinkedIn : https://www.linkedin.com/in/nathan-skwarek-8a3723252/

## Transition orbe → page

- Clic sur orbe → l'orbe scale(20) + opacity fond → blanc/noir
- Le shader s'attenue progressivement (opacity 0.15)
- La page de destination fade-in par-dessus
- Duree : ~600ms, easing cubic-bezier(.4,2,.3,1)
- Bouton retour sur chaque page → transition inverse (zoom-out → hub)

## Page Projets — Carousel 3D

- Carousel avec perspective CSS/JS inspire du composant CircularTestimonials
- Carte active au centre, scale(1), rotateY(0)
- Cartes adjacentes : scale(0.85), rotateY(±15deg), translateX offset, opacity 0.7
- Cartes non-visibles : opacity 0, pointer-events none
- Navigation : fleches prev/next + clavier (ArrowLeft/ArrowRight)
- Autoplay optionnel (5s interval)
- Contenu carte : image projet (thumbnail), titre, description courte, tags
- Clic sur carte active → /projects/[id]
- Description du projet actif affichee sous le carousel, animation mot par mot (blur → clear)
- Shader aurora en fond attenue (opacity 0.15)

## Page Detail Projet

- Layout centre (max-width 900px)
- Header : titre + tags + liens (GitHub, demo)
- Hero image/banniere
- Sections : longDescription, technologies (GlowCards avec icones), challenges, outcomes
- Grille de screenshots avec lightbox
- Navigation prev/next entre projets
- Bouton retour → /projects

## Page Skills — GlowCards

- Cartes avec spotlight radial qui suit le curseur (inspire GlowCard component)
- Bordures lumineuses reactives au hover
- 3 categories : Langages, Data & Analyse, Outils
- Chaque skill : icone + nom + badge "Certifie" si applicable
- Liens cliquables (Dataiku cert, Anglais cert, GitHub profil)
- Layout : grid responsive ou flex-wrap centre

## Page Contact

- Liens principaux en grosses GlowCards : Email, LinkedIn, GitHub
- CV en telechargement
- Description alternance
- Ambiance coherente (shader attenue en fond)

## Design System

### Couleurs
- Background : #050508 (quasi-noir)
- Text primary : #e8e8f0
- Text secondary : rgba(255,255,255,0.45)
- Text muted : rgba(255,255,255,0.25)
- Accent violet : #7850ff / #a78bfa
- Accent cyan : #38bdf8 / #00c8ff
- Accent rose : #ff3c78 / #ff6488
- Glow : rgba des accents a 0.15-0.3
- Surfaces : rgba(255,255,255,0.03-0.06)
- Borders : rgba(255,255,255,0.06-0.12)

### Typographie
- Font : Space Grotesk (Google Fonts)
- Titres : 600-700, letter-spacing -0.03em, gradient lumineux
- Corps : 400, 14-16px, rgba(255,255,255,0.45)
- Labels : 300, 11px, letter-spacing 0.15em, uppercase, rgba(255,255,255,0.25)

### Effets
- Glassmorphism : backdrop-blur 12px, rgba(255,255,255,0.03)
- GlowCard : spotlight radial suivant le curseur, border glow
- Orbes : atmospheric glow shader (fresnel), float animation
- Transitions : cubic-bezier(.4,2,.3,1), 300-600ms

## Stack technique

- Next.js 14+ (App Router) — existant
- TypeScript — existant
- Tailwind CSS — existant
- **Three.js** — NOUVEAU (shaders, orbes 3D)
- Framer Motion — existant (transitions page, animations)
- React Icons — existant
- Space Grotesk — NOUVEAU (remplace system font)

## Contenu

Identique a la v1 : 6 projets, memes skills, memes contacts, memes assets images/PDF.

## Hors scope

- Avatar 3D scroll-locked (supprime)
- Particle constellation canvas (remplace par shader Three.js)
- Preloader ASCII (a revoir ou supprimer)
- Marquee footer (supprime)
- Single-page scroll (remplace par multi-page)
