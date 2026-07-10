import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { skillsData } from '@data/skills';
import './Skills.css';

export interface SkillsProps {
  className?: string;
}

/* ── Category config ── */
type CategoryKey = 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Tools';

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'Frontend',  label: 'Frontend'  },
  { key: 'Backend',   label: 'Backend'   },
  { key: 'AI/ML',     label: 'AI / ML'   },
  { key: 'Database',  label: 'Database'  },
  { key: 'Tools',     label: 'Tools'     },
];

/* ── Animation variants ── */
const panelVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 16 : -16,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -16 : 16,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.055, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* ── Skill Icon with graceful fallback ── */
interface SkillIconProps {
  src?: string;
  name: string;
}

const SkillIcon = ({ src, name }: SkillIconProps) => {
  const [errored, setErrored] = useState(false);
  const initials = name.slice(0, 2).toUpperCase();

  if (!src || errored) {
    return (
      <span className="skill-card-icon-fallback" aria-hidden="true">
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="skill-card-icon"
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
};

/* ── Main component ── */
const Skills = ({ className }: SkillsProps) => {
  const [active, setActive] = useState<CategoryKey>('Frontend');
  const [direction, setDirection] = useState(0);

  const handleSelect = useCallback(
    (key: CategoryKey) => {
      const currentIdx = CATEGORIES.findIndex((c) => c.key === active);
      const nextIdx    = CATEGORIES.findIndex((c) => c.key === key);
      setDirection(nextIdx > currentIdx ? 1 : -1);
      setActive(key);
    },
    [active],
  );

  const filtered = skillsData.filter((s) => s.category === active);

  return (
    <section
      id={SECTIONS.SKILLS}
      className={`relative py-20 md:py-32${className ? ` ${className}` : ''}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Tools of the trade in the modern AI ecosystem."
        />

        {/* ── Category navigation ── */}
        <nav className="skills-nav mt-14" aria-label="Skill categories">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              className={`skills-nav-btn${active === key ? ' active' : ''}`}
              aria-pressed={active === key}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ── Animated panel ── */}
        <div className="skills-panel">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ul className="skills-grid" role="list" aria-label={`${active} skills`}>
                {filtered.map((skill, i) => (
                  <motion.li
                    key={skill.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="skill-card"
                    title={skill.name}
                    data-skill-id={skill.id}
                    onMouseEnter={() => window.dispatchEvent(new CustomEvent('skill-hover', { detail: skill.id }))}
                    onMouseLeave={() => window.dispatchEvent(new CustomEvent('skill-unhover'))}
                  >
                    <SkillIcon src={skill.icon} name={skill.name} />
                    <span className="skill-card-name">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
