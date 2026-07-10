import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { GlassCard } from '@components/common/GlassCard';
import { fadeUp } from '@animations/fade';
import { cn } from '@lib/cn';

export interface AboutProps {
  className?: string;
}

const About = ({ className }: AboutProps)=> {
  return (
    <section id={SECTIONS.ABOUT} className={cn('relative py-20 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="About Me"
          subtitle="The intersection of human intuition and artificial intelligence."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard id="about-card-1">
              <h3 className="text-xl font-bold mb-4 text-white">The Developer</h3>
              <p className="text-neutral-400 leading-relaxed">
                Passionate about creating innovative digital experiences that leverage the power of AI
                and modern web technologies. I combine human creativity with machine precision to
                build products that push boundaries.
              </p>
            </GlassCard>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard id="about-card-2">
              <h3 className="text-xl font-bold mb-4 text-white">The Vision</h3>
              <p className="text-neutral-400 leading-relaxed">
                To create a world where technology amplifies human potential, not replaces it.
                Every project is designed with the goal of making complex technology feel
                intuitive and accessible.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
