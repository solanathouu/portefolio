import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetail from '@/components/projects/ProjectDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: '404 | Project not found' };
  }

  return {
    title: `${project.title} | Nathan Skwarek`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nathan Skwarek`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const currentIndex = projects.findIndex((p) => p.id === id);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];

  return (
    <main className="min-h-screen">
      <ProjectDetail project={project} currentIndex={currentIndex} />
    </main>
  );
}
