import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nathan Skwarek | Portfolio',
  description: 'Data Analyst & Developer — Portfolio 2026',
  openGraph: {
    title: 'Nathan Skwarek | Portfolio',
    description: 'Data Analyst & Developer — Portfolio 2026',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-space-grotesk)]">
        {children}
      </body>
    </html>
  );
}
