import { useRef, useEffect } from 'react';
import { cn } from '@lib/cn';

export interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

const AnimatedBackground = ({
  className,
  particleCount = 50,
  interactive = true,
}: AnimatedBackgroundProps)=> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (interactive && mouseX > 0) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 10 && dist < 300) {
            particle.x += (dx / dist) * 0.2;
            particle.y += (dy / dist) * 0.2;
          }
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed inset-0 pointer-events-none z-0', className)}
    />
  );
};

export default AnimatedBackground;
