import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <h1
          className="text-[12rem] md:text-[16rem] font-bold font-mono leading-none"
          style={{ color: '#00f0ff', opacity: 0.15 }}
        >
          404
        </h1>

        <div className="-mt-20 relative">
          <p className="text-white font-mono text-xl uppercase tracking-widest mb-2">
            Page not found
          </p>
          <p className="text-white/50 font-mono text-sm mb-10">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all"
            style={{
              border: '3px solid #00f0ff',
              color: '#00f0ff',
            }}
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
