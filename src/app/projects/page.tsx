'use client';

import dynamic from 'next/dynamic';
import PageShell from '@/components/ui/PageShell';

const ProjectCarousel = dynamic(
  () => import('@/components/projects/ProjectCarousel'),
  { ssr: false }
);

export default function ProjectsPage() {
  return (
    <PageShell title="Projets" subtitle="Portfolio" orbColor="#7850ff">
      <ProjectCarousel />
    </PageShell>
  );
}
