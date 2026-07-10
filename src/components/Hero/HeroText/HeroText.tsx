import { motion } from 'framer-motion';
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
      <motion.h1
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8 text-5xl font-black tracking-[-0.05em] leading-[0.95] text-white sm:text-6xl md:text-7xl"
      >
        Omar
        <span className="block bg-gradient-to-r from-sky-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
          Abbas
        </span>
      </motion.h1>

      <motion.p
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-5 text-sm uppercase tracking-[0.22em] text-slate-400"
      >
        AI Engineer • Software Developer • Computer Science Student
      </motion.p>

      <motion.p
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8 max-w-xl text-base leading-8 text-slate-300"
      >
        I build intelligent digital products that blend AI, software, and premium interfaces. My work is focused on delivering clean, futuristic experiences that feel polished, reliable, and beautifully engineered.
      </motion.p>

      <motion.div
        custom={0.5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-col gap-6"
      >
        <div className="flex flex-wrap gap-4">
          <a href={`#${SECTIONS.ABOUT}`} onClick={handleAboutClick} className="inline-block">
            <Button variant="primary" size="lg" className="rounded-[18px] px-8 py-4">
              About Me
            </Button>
          </a>
          <a href={`#${SECTIONS.CONTACT}`} className="inline-block">
            <Button variant="outline" size="lg" className="rounded-[18px] px-8 py-4">
              Get In Touch
            </Button>
          </a>
        </div>

        <div className="hero-social-links-row justify-start">
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
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=om1747440@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
          >
            <FiMail /> Email
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;
