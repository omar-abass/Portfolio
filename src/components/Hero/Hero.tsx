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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-8 top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute left-10 top-32 h-1 w-48 rounded-full bg-cyan-400/20 blur-sm" />
        <div className="absolute right-16 top-24 h-1 w-32 rounded-full bg-sky-400/15 blur-sm" />
        <div className="absolute left-1/2 top-28 h-1 w-60 -translate-x-1/2 rounded-full bg-sky-400/15 blur-sm" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          variants={heroImageReveal}
          initial="hidden"
          animate="visible"
          className="order-1 lg:order-2"
        >
          <HeroImage />
        </motion.div>

        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1"
        >
          <motion.div variants={heroTextReveal}>
            <HeroText />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
