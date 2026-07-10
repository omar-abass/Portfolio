import { createContext, useState, useCallback, ReactNode } from 'react';

export interface AnimationContextType {
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  prefersReducedMotion: boolean;
}

export const AnimationContext = createContext<AnimationContextType>({
  isAnimating: false,
  setIsAnimating: () => {},
  prefersReducedMotion: false,
});

export interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps)=> {
  const [isAnimating, setIsAnimatingState] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setIsAnimating = useCallback((value: boolean) => {
    setIsAnimatingState(value);
  }, []);

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating, prefersReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
};
