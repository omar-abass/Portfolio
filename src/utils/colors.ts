export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a0442',
  },
  neural: {
    glow: '#00f0ff',
    deep: '#0a0a0f',
    surface: '#111118',
    surfaceLight: '#1a1a24',
    line: 'rgba(0, 240, 255, 0.15)',
    lineBright: 'rgba(0, 240, 255, 0.4)',
    text: '#e0e0e0',
    textMuted: '#888888',
  },
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #0ea5e9, #d946ef)',
  neural: 'linear-gradient(135deg, #00f0ff, #0ea5e9)',
  dark: 'linear-gradient(180deg, #0a0a0f, #111118)',
} as const;
