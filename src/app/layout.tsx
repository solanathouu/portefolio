import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Playfair_Display, Space_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

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
    <html lang="fr" className={`dark ${playfair.variable} ${spaceMono.variable}`}>
      <body className="antialiased" style={{ backgroundColor: '#303030' }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
