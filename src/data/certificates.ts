import type { Certificate } from '@app-types';

export const certificatesData: Certificate[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    issuer: 'Meta (Coursera)',
    date: '2024-06-15',
    url: 'https://coursera.org/verify/example-react',
    image: '/certificates/react-advanced.jpg',
  },
  {
    id: '2',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford Online (Coursera)',
    date: '2024-03-10',
    url: 'https://coursera.org/verify/example-ml',
    image: '/certificates/ml-specialization.jpg',
  },
  {
    id: '3',
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023-11-22',
    url: 'https://aws.amazon.com/verify/example-aws',
    image: '/certificates/aws-architect.jpg',
  },
  {
    id: '4',
    title: 'Web Accessibility Professional',
    issuer: 'IAAP',
    date: '2023-08-05',
    url: 'https://example.com/verify/a11y',
    image: '/certificates/accessibility.jpg',
  },
  {
    id: '5',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2024-01-20',
    url: 'https://example.com/verify/tensorflow',
    image: '/certificates/tensorflow.jpg',
  },
];

export default certificatesData;
