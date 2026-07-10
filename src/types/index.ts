export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  year: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  toggle: () => void;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollProgress: number;
}
