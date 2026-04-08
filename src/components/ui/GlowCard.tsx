'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(120, 80, 255, 0.08)',
  onClick,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty('--glow-x', `${x}%`);
      cardRef.current.style.setProperty('--glow-y', `${y}%`);
    },
    []
  );

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-400',
        'bg-[var(--surface)] border border-[var(--border)]',
        'backdrop-blur-[12px]',
        'hover:border-[var(--border-hover)] hover:-translate-y-1',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]',
        onClick && 'cursor-pointer',
        className
      )}
      style={
        {
          '--glow-color': glowColor,
        } as React.CSSProperties
      }
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color), transparent)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle 150px at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
