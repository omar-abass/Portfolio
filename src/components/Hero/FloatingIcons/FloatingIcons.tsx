import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface FloatingIconsProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const FloatingIcons = ({ children, className, duration = 6, delay = 0 }: FloatingIconsProps)=> {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingIcons;
