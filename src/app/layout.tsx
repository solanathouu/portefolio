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
