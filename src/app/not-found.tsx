import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">404</p>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">Page introuvable</h1>
      <Link
        href="/"
        className="text-sm px-6 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)]
          text-[var(--text-secondary)] hover:text-white transition-colors"
      >
        Retour au hub
      </Link>
    </div>
  );
}
