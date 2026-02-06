import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'colored';
  color?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  color,
  className
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors';

  const variantStyles = {
    default: 'bg-secondary text-foreground',
    colored: '',
  };

  const customStyles = variant === 'colored' && color
    ? {
        backgroundColor: `${color}20`,
        color: color,
      }
    : {};

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
      style={customStyles}
    >
      {children}
    </span>
  );
}
