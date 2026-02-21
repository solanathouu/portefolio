import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import ParticleBackground from "@/components/layout/ParticleBackground";
import { Sora, Space_Mono } from 'next/font/google';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nathan Skwarek | Portfolio",
  description: "Portfolio de Nathan Skwarek — Développeur web passionné. Projets, compétences et contact.",
  keywords: ["nathan skwarek", "portfolio", "développeur web", "react", "next.js", "typescript"],
  authors: [{ name: "Nathan Skwarek" }],
  openGraph: {
    title: "Nathan Skwarek | Portfolio",
    description: "Portfolio de Nathan Skwarek — Développeur web passionné",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${sora.variable} ${spaceMono.variable}`}>
      <body className="antialiased" style={{ backgroundColor: '#303030' }}>
        <ParticleBackground />
        <LoadingProvider>
          <div className="relative z-[1]">
            <Header />
            {children}
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
