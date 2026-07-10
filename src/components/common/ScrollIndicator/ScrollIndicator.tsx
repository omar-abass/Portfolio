import { useScroll } from '@hooks/useScroll';
import { cn } from '@lib/cn';

export interface ScrollIndicatorProps {
  className?: string;
  threshold?: number;
}

const ScrollIndicator = ({ className, threshold = 200 }: ScrollIndicatorProps)=> {
  const { scrollY } = useScroll();
  const isVisible = scrollY < threshold;

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Scroll</span>
        <div className="relative h-10 w-5 rounded-full border border-white/20">
          <div className="absolute top-2 left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-neural-glow animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
