import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { GlassCard } from '@components/common/GlassCard';
import { certificatesData } from '@data/certificates';
import { scaleIn } from '@animations/scale';
import { cn } from '@lib/cn';

export interface CertificatesProps {
  className?: string;
}

const Certificates = ({ className }: CertificatesProps)=> {
  return (
    <section id={SECTIONS.CERTIFICATES} className={cn('relative py-20 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Certificates"
          subtitle="Certifications that validate expertise in AI and web development."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <GlassCard className="h-full" hoverEffect>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-neural-glow">{cert.title.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                    <p className="text-sm text-neutral-400">{cert.issuer}</p>
                    <p className="text-xs text-neutral-500 mt-1">{cert.date}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
