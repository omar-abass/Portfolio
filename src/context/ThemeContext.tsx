import { createContext, useState, useCallback, ReactNode } from 'react';

export interface ThemeContextType {
  mode: 'dark' | 'light';
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps)=> {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  const toggle = useCallback(() => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return <ThemeContext.Provider value={{ mode, toggle }}>{children}</ThemeContext.Provider>;
};
