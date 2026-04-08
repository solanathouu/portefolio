'use client';

import dynamic from 'next/dynamic';
import HubName from '@/components/hub/HubName';
import QuickLinks from '@/components/hub/QuickLinks';

const ShaderBackground = dynamic(
  () => import('@/components/three/ShaderBackground'),
  { ssr: false }
);

const HubScene = dynamic(
  () => import('@/components/hub/HubScene'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <ShaderBackground />
      <HubScene />
      <HubName />
      <QuickLinks />
    </main>
  );
}
