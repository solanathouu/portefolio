'use client';

import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  return position;
}
