import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { GlassCard } from '@components/common/GlassCard';
import { projectsData } from '@data/projects';
import { cardReveal, cardStagger } from '@animations/cards';
import { cn } from '@lib/cn';

export interface ProjectsProps {
  className?: string;
}

const Projects = ({ className }: ProjectsProps)=> {
  return (
    <section id={SECTIONS.PROJECTS} className={cn('relative py-20 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Projects"
          subtitle="A selection of projects that showcase the fusion of design and technology."
        />
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {projectsData.map(project => (
            <motion.div
              key={project.id}
              variants={cardReveal}
              data-project-id={project.id}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('project-hover', { detail: project.id }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('project-unhover'))}
            >
              <GlassCard className="h-full" hoverEffect>
                <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-neutral-500">{project.title.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-sm text-neutral-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
