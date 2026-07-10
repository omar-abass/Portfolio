import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@lib/cn';

export interface LoaderProps {
  className?: string;
  minDuration?: number;
}

const Loader = ({ className, minDuration = 2000 }: LoaderProps)=> {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className={cn(
            'fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-neural-deep',
            className
          )}
        >
          <div className="relative">
            <div className="h-32 w-32 animate-spin-neural rounded-full border-2 border-neural-line border-t-neural-glow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-sm text-neural-glow">{Math.min(100, Math.round(progress))}%</span>
            </div>
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            Initializing AI Modules...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
