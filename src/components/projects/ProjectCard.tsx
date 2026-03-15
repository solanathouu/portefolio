'use client';

import { Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const hasImage = project.media && project.media.length > 0;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="bento-card group block relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Screenshot background */}
      {hasImage ? (
        <Image
          src={project.media[0].url}
          alt={project.media[0].caption || project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          transition: 'opacity 0.5s ease',
        }}
        className="group-hover:opacity-80"
      />

      {/* Content — bottom left */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px',
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            marginTop: '8px',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.5,
            maxWidth: '400px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tags — glass pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                color: 'rgba(255,255,255,0.8)',
                borderRadius: '999px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
