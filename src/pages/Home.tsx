import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import FuturisticDashboard from '@components/FuturisticDashboard';

export interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div className={className}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <FuturisticDashboard />
    </div>
  );
};

export default Home;
