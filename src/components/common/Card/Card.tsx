import { ReactNode } from 'react';
import { cn } from '@lib/cn';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className, hover = true }: CardProps)=> {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-surface-light border border-white/5 p-6',
        hover && 'transition-all duration-500 hover:border-white/15 hover:shadow-xl hover:shadow-primary-500/5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
