import { motion } from 'framer-motion';
import { TypingText } from '@components/common/TypingText';
import { Button } from '@components/common/Button';
import { SECTIONS } from '@utils/constants';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './HeroText.css';

export interface HeroTextProps {
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const aboutSection = document.getElementById(SECTIONS.ABOUT);
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroText = ({ className }: HeroTextProps) => {
  return (
    <div className={`max-w-2xl ${className || ''}`}>
      {/* Eyebrow */}
      <motion.p
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-neural-glow/80 font-mono text-xs uppercase tracking-[0.3em] mb-5"
      >
        Welcome to the Future
      </motion.p>

      {/* Main Title */}
      <motion.h1
        custom={0.25}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <span
          className="hero-gradient-text block font-bold tracking-tight leading-[1.05]"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
          }}
        >
          Omar Abass
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-neutral-400/80 font-light tracking-[0.2em] uppercase text-sm md:text-base mt-2"
      >
        Portfolio
      </motion.p>

      {/* Typing text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 mb-8 text-base md:text-lg text-neutral-400 leading-relaxed"
        aria-label="Typing effect description"
      >
        <TypingText
          text="Crafting intelligent digital experiences that blur the line between human creativity and machine precision."
          speed={30}
          delay={1500}
        />
      </motion.div>

      {/* Buttons & Social links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 items-center lg:items-start"
      >
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <a href={`#${SECTIONS.ABOUT}`} onClick={handleAboutClick} className="inline-block">
            <Button variant="primary" size="lg">
              About Me
            </Button>
          </a>
          <a href={`#${SECTIONS.CONTACT}`}>
            <Button variant="outline" size="lg">
              Get In Touch
            </Button>
          </a>
        </div>

        {/* Centered beneath the buttons on mobile/tablet, aligned on desktop */}
        <div className="hero-social-links-row justify-center lg:justify-start">
          <a
            href="https://github.com/omar-abass"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
          >
            <FiGithub /> GitHub
          </a>
          <span className="hero-social-separator">•</span>
          <a
            href="https://www.linkedin.com/in/omar-mohamed-abass-08440a407/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
          >
            <FiLinkedin /> LinkedIn
          </a>
          <span className="hero-social-separator">•</span>
          <a href="mailto:om1747440@gmail.com" className="hero-social-link">
            <FiMail /> Email
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;
