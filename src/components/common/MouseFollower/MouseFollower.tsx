import { useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@lib/cn';

export interface MouseFollowerProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
}

const MouseFollower = ({
  children,
  className,
  intensity = 20,
  scale = 1.05,
}: MouseFollowerProps)=> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x / intensity}px, ${y / intensity}px) scale(${scale})`;
    };

    const handleMouseLeave = (): void => {
      element.style.transform = 'translate(0, 0) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, scale]);

  return (
    <motion.div
      ref={ref}
      className={cn('transition-transform duration-200 ease-out', className)}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </motion.div>
  );
};

export default MouseFollower;
