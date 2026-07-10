import { cn } from '@lib/cn';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  id?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps)=> {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-bold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural-glow via-primary-400 to-accent-400">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn('mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-neural-glow to-accent-400 mx-auto', !centered && 'mx-0')} />
    </div>
  );
};

export default SectionTitle;
