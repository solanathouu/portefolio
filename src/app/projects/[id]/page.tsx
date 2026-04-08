import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetail from '@/components/projects/ProjectDetail';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Projet non trouvé' };
  return {
    title: `${project.title} | Nathan Skwarek`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />;
}
