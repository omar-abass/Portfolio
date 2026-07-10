import { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/cn';

export interface CursorProps {
  size?: number;
  color?: string;
  className?: string;
}

const Cursor = ({ size = 20, color = '#00f0ff', className }: CursorProps)=> {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = (): void => {
      const speed = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * speed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - size / 2}px, ${mousePos.current.y - size / 2}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - size * 2.5}px, ${ringPos.current.y - size * 2.5}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  if (isTouch) return <></>;

  return (
    <>
      <div
        ref={dotRef}
        className={cn('fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference', className)}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-neural-glow/30 transition-transform duration-100"
        style={{
          width: size * 5,
          height: size * 5,
        }}
      />
    </>
  );
};

export default Cursor;
