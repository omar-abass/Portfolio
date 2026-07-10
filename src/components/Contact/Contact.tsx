import { useState } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS, SITE_CONFIG } from '@utils/constants';
import { SectionTitle } from '@components/common/SectionTitle';
import { GlassCard } from '@components/common/GlassCard';
import { Button } from '@components/common/Button';
import { fadeUp } from '@animations/fade';
import { cn } from '@lib/cn';

export interface ContactProps {
  className?: string;
}

const Contact = ({ className }: ContactProps)=> {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Form submission logic will be implemented later
  };

  return (
    <section id={SECTIONS.CONTACT} className={cn('relative py-20 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss how we can build the future together."
        />
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard className="h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Email</p>
                  <p className="text-neutral-200">{SITE_CONFIG.email}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Location</p>
                  <p className="text-neutral-200">{SITE_CONFIG.location}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-neural-glow/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-neural-glow/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-neural-glow/50 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
