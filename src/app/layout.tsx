import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import BackgroundSilk from "@/components/layout/BackgroundSilk";
import ContentLayer from "@/components/layout/ContentLayer";
import { Space_Mono } from 'next/font/google';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';

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
    <html lang="fr" className={`dark ${spaceMono.variable}`}>
      <body className="antialiased" style={{ backgroundColor: '#303030' }}>
        <BackgroundSilk />
        <LoadingProvider>
          <ContentLayer>
            <Header />
            {children}
          </ContentLayer>
        </LoadingProvider>
      </body>
    </html>
  );
}
