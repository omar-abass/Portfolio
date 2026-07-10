import { ReactNode } from 'react';
import { cn } from '@lib/cn';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
  as?: 'div' | 'article' | 'section';
}

const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  glow = false,
  as: Component = 'div',
}: GlassCardProps)=> {
  return (
    <Component
      className={cn(
        'relative rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6',
        hoverEffect && 'transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1',
        glow && 'shadow-lg shadow-neural-glow/10',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
