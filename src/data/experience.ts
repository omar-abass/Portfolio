import type { Experience } from '@app-types';

export const experienceData: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'TechCorp AI',
    period: '2024 - Present',
    description: [
      'Leading frontend architecture for AI-driven applications',
      'Implementing 3D visualizations with Three.js and React Three Fiber',
      'Optimizing performance for real-time data processing dashboards',
    ],
    technologies: ['React', 'TypeScript', 'Three.js', 'WebGL'],
    current: true,
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'InnovateTech',
    period: '2022 - 2024',
    description: [
      'Developed responsive web applications with React and Next.js',
      'Integrated AI APIs for intelligent content recommendations',
      'Built design system components used across 5+ products',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    current: false,
  },
  {
    id: '3',
    role: 'Junior Developer',
    company: 'StartUp Inc.',
    period: '2020 - 2022',
    description: [
      'Developed and maintained company website and landing pages',
      'Collaborated with designers to implement pixel-perfect UI',
      'Implemented CI/CD pipelines for automated deployments',
    ],
    technologies: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
    current: false,
  },
];

export default experienceData;
