import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { GlassCard } from '@components/common/GlassCard';
import { experienceData } from '@data/experience';
import { fadeLeft } from '@animations/fade';
import { cn } from '@lib/cn';

export interface ExperienceProps {
  className?: string;
}

const Experience = ({ className }: ExperienceProps)=> {
  return (
    <section id={SECTIONS.EXPERIENCE} className={cn('relative py-20 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Experience"
          subtitle="Professional journey through the world of AI and web development."
        />
        <div className="relative mt-16 space-y-8">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neural-glow/50 via-primary-400/30 to-transparent" />
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-[50%] md:pr-12' : 'md:pl-[50%] md:pl-12'}`}
            >
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neural-glow shadow-lg shadow-neural-glow/50" />
              <GlassCard>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neural-glow">{exp.period}</span>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-neural-glow/20 text-neural-glow">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-neutral-400 mb-4">{exp.company}</p>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
