import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { heroStagger, heroTextReveal, heroImageReveal } from '@animations/hero';
import HeroText from '@components/Hero/HeroText/HeroText';
import HeroImage from '@components/Hero/HeroImage/HeroImage';

export interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section
      id={SECTIONS.HERO}
      className={`relative min-h-screen flex items-center overflow-hidden ${className || ''}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.div variants={heroTextReveal}>
            <HeroText />
          </motion.div>
        </motion.div>
        <motion.div variants={heroImageReveal} initial="hidden" animate="visible">
          <HeroImage />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
