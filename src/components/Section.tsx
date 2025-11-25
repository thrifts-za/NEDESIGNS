import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-12 px-4', className)}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className={cn('text-4xl md:text-5xl font-bold mb-4 text-black', titleClassName)}>{title}</h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
