"use client";

import { usePathname } from "next/navigation";

/**
 * Calque de contenu du site (au-dessus du fond BackgroundBoxes).
 *
 * Sur la page d'accueil uniquement, on laisse les événements souris « traverser »
 * vers le fond (classe `bg-passthrough`) pour que le survol colore les boxes.
 * Les éléments interactifs (a, button…) sont réactivés via globals.css.
 *
 * Sur les autres pages (détail projet + lightbox), pointer-events normaux :
 * on ne casse aucun clic sur les div (fermeture lightbox, flèches, vignettes).
 */
export default function ContentLayer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const passthrough = pathname === "/";

  return (
    <div className={`relative z-[1] ${passthrough ? "bg-passthrough" : ""}`}>
      {children}
    </div>
  );
}
