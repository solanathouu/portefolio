# Analyse des animations igloo.inc

## Objectif
Comprendre et documenter les animations du site https://www.igloo.inc/ pour reproduction dans notre portfolio, particulièrement pour la section Contact.

---

## 📋 Ce qu'il faut capturer

### 1. Section Contact - Animations principales

**À capturer :**
- [ ] Captures d'écran de la section contact (état normal)
- [ ] Vidéo/GIF des animations au hover des liens sociaux
- [ ] Vidéo du comportement du curseur personnalisé
- [ ] Vidéo de l'effet magnetic (si présent)
- [ ] Animation au clic/touch sur un lien

**Questions à observer :**
- Comment les liens réagissent au hover ?
- Y a-t-il un effet magnetic (élément qui suit le curseur) ?
- Quelles transitions de couleurs/formes ?
- Durée approximative des animations ?
- Le curseur change-t-il de forme ?

---

### 2. Navigation et Header

**À capturer :**
- [ ] Animation d'apparition du header (si sticky)
- [ ] Transitions des liens de menu
- [ ] Effets hover sur navigation

---

### 3. Scroll Animations

**À capturer :**
- [ ] Comment les sections apparaissent au scroll
- [ ] Y a-t-il du parallax ?
- [ ] Effets de transition entre sections

---

### 4. Interactions générales

**À capturer :**
- [ ] Curseur personnalisé (tous les états)
- [ ] Boutons et leurs animations
- [ ] Cartes/cards et hover effects
- [ ] Transitions de page (si applicable)

---

## 📸 Comment capturer

### Pour les captures d'écran :
1. Utilisez Windows + Shift + S
2. Ou Snipping Tool
3. Capturez différents états (normal, hover, clic)

### Pour les vidéos/GIFs :
**Option 1 : ScreenToGif (Recommandé)**
- Télécharger : https://www.screentogif.com/
- Gratuit, léger, facile à utiliser
- Permet de capturer en GIF ou vidéo

**Option 2 : Windows Game Bar**
- Windows + G
- Cliquer sur "Capturer"
- Enregistrer l'interaction

**Option 3 : OBS Studio**
- Plus avancé mais très puissant
- Gratuit et open source

### Conseils :
- Enregistrez des séquences courtes (5-10 secondes)
- Montrez chaque interaction séparément
- Capturez en qualité raisonnable (pas besoin de 4K)
- Ralentissez vos mouvements pour bien voir les transitions

---

## 📝 Notes à prendre

Pour chaque animation observée, notez :

### Timing
- Durée de l'animation (estimation en secondes)
- Type de transition (ease, ease-in-out, spring, etc.)
- Y a-t-il un délai avant l'animation ?

### Effets visuels
- Changements de couleur (de quoi vers quoi ?)
- Transformations (scale, rotate, translate ?)
- Opacité
- Effets de flou/blur
- Ombres portées

### Comportement
- L'animation se joue au hover, au clic, au scroll ?
- L'animation se répète en boucle ?
- Retour à l'état initial (reverse) ?

---

## 🎯 Priorités

**High Priority (Essentiel) :**
1. ✅ Section Contact - Liens sociaux avec hover effects
2. ✅ Curseur personnalisé et ses états
3. ✅ Effet magnetic sur les liens (si présent)

**Medium Priority :**
4. Scroll animations générales
5. Navigation et menu
6. Transitions entre sections

**Low Priority :**
7. Détails secondaires
8. Animations de chargement

---

## 📦 Format de livraison

Une fois capturé, partagez-moi :

1. **Images :** Format PNG ou JPG
2. **Vidéos/GIFs :** Format MP4, MOV ou GIF
3. **Notes textuelles :** Décrivez ce que vous voyez

Vous pouvez :
- Les mettre dans un dossier et me dire où ils sont
- Me les décrire en détail par texte
- Partager des liens si hébergés quelque part

---

## 📊 Template d'analyse

Pour chaque animation captée, utilisez ce template :

```markdown
### Animation : [Nom de l'animation]

**Où :** [Section / Élément]

**Déclencheur :** [hover / click / scroll / auto]

**Description :**
- [Décrire visuellement ce qui se passe]

**Timing :**
- Durée : ~X secondes
- Transition : ease-in-out / spring / etc.

**Effets techniques :**
- Transform : scale(1.1) / rotate(5deg) / etc.
- Color : #000 → #fff
- Opacity : 0 → 1
- Autres : blur, shadow, etc.

**Notes d'implémentation :**
- Framer Motion : [comment l'implémenter]
- GSAP : [si nécessaire]
- CSS : [si simple]
```

---

## ✨ Exemples de ce qu'on recherche

### Effet Magnetic
```
Au hover d'un lien, le lien "suit" légèrement le curseur
→ GSAP avec calcul de distance curseur/élément
```

### Morphing Background
```
Le fond du lien change de forme au hover
→ SVG morphing ou border-radius animé
```

### Gradient animé
```
Un gradient se déplace sur l'élément
→ background-position animé ou gradient animé
```

---

## 🚀 Prochaines étapes

1. **Vous :** Capturer les animations du site igloo.inc
2. **Moi :** Analyser les captures et créer le plan technique
3. **Ensemble :** Reproduire les effets dans votre portfolio

---

**Status:** ⏳ En attente des captures

**Dernière mise à jour :** 2026-02-05
