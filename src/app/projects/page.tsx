import dynamic from 'next/dynamic';
import PageShell from '@/components/ui/PageShell';

const ProjectCarousel = dynamic(
  () => import('@/components/projects/ProjectCarousel'),
  { ssr: false }
);

export const metadata = {
  title: 'Projets | Nathan Skwarek',
  description: 'Mes projets — Data, IA, Web, Automation',
};

export default function ProjectsPage() {
  return (
    <PageShell title="Projets" subtitle="Portfolio">
      <ProjectCarousel />
    </PageShell>
  );
}
