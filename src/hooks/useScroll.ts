import { useState, useEffect, useCallback } from 'react';

export interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollProgress: number;
}

export const useScroll = (): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    scrollProgress: 0,
  });

  const handleScroll = useCallback((): void => {
    const currentScrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;

    setScrollState(prev => ({
      scrollY: currentScrollY,
      scrollDirection: currentScrollY > prev.scrollY ? 'down' : 'up',
      scrollProgress: Math.min(100, Math.max(0, progress)),
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrollState;
};
