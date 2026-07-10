import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';

export const useTheme = (): {
  mode: 'dark' | 'light';
  toggle: () => void;
} => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
