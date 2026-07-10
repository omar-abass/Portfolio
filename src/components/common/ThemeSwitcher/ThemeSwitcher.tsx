import { useTheme } from '@hooks/useTheme';
import { cn } from '@lib/cn';

export interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps)=> {
  const { mode, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative w-14 h-8 rounded-full p-1 transition-colors duration-300',
        mode === 'dark' ? 'bg-white/10' : 'bg-neural-deep',
        className
      )}
      aria-label="Toggle theme"
    >
      <div
        className={cn(
          'h-6 w-6 rounded-full bg-gradient-to-br from-neural-glow to-primary-400 shadow-lg transition-transform duration-300',
          mode === 'dark' ? 'translate-x-0' : 'translate-x-6'
        )}
      />
    </button>
  );
};

export default ThemeSwitcher;
