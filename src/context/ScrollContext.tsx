import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface ScrollContextType {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollProgress: number;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollDirection: null,
  scrollProgress: 0,
});

export interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps)=> {
  const [scrollState, setScrollState] = useState<ScrollContextType>({
    scrollY: 0,
    scrollDirection: null,
    scrollProgress: 0,
  });

  const handleScroll = useCallback(() => {
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

  return <ScrollContext.Provider value={scrollState}>{children}</ScrollContext.Provider>;
};
