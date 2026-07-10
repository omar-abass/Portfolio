export const SITE_CONFIG = {
  name: 'AI Portfolio',
  tagline: 'Where Human Creativity Meets Artificial Intelligence',
  author: 'Omar Mohamed',
  email: 'omar@example.com',
  location: 'Remote',
  resumeUrl: '/resume.pdf',
} as const;

export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  CERTIFICATES: 'certificates',
  CONTACT: 'contact',
} as const;

export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.5,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
  },
  EASE: {
    SMOOTH: [0.25, 0.1, 0.25, 1],
    BOUNCE: [0.34, 1.56, 0.64, 1],
    EXPO: [0.16, 1, 0.3, 1],
    CIRCULAR: [0.85, 0, 0.15, 1],
  },
  DELAY: {
    STAGGER: 0.1,
    SECTION: 0.2,
  },
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
