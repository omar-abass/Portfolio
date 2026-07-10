import { motion } from 'framer-motion';
import { SECTIONS } from '@utils/constants';
import { fadeLeft, fadeRight, fadeUp } from '@animations/fade';
import { cn } from '@lib/cn';
import aboutImage from '@assets/images/about me.png';

export interface AboutProps {
  className?: string;
}

const stats = [
  { label: 'Years Coding', value: '2+', icon: 'code' },
  { label: 'Projects Completed', value: '5+', icon: 'briefcase' },
  { label: 'Hackathon Participated', value: '1', icon: 'trophy' },
  { label: 'Passion & Dedication', value: '100%', icon: 'heart' },
];

const techPills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'];

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 6L2 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 5V3h8v2" strokeLinecap="round" />
          <path d="M6 5h12a2 2 0 012 2v2a4 4 0 01-3 3.87V14a4 4 0 01-4 4h-4a4 4 0 01-4-4v-1.13A4 4 0 014 9V7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 20s-7.5-4.35-10-9.5C-1.5 5.5 2.5 2 6.5 2c2.01 0 3.89 1.03 5 2.63C12.61 3.03 14.5 2 16.5 2 20.5 2 24.5 5.5 22 10.5 19.5 15.65 12 20 12 20z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

const DeveloperIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M6 22v-2a4 4 0 014-4h4a4 4 0 014 4v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const About = ({ className }: AboutProps)=> {
  return (
    <section id={SECTIONS.ABOUT} className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute -left-10 top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute left-10 top-32 h-1 w-48 bg-cyan-400/20 blur-sm" />
        <div className="absolute right-12 top-14 h-1 w-36 bg-violet-400/15 blur-sm" />
        <div className="absolute left-1/2 top-24 h-1 w-60 -translate-x-1/2 bg-sky-400/15 blur-sm" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.10)]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              WHO I AM
            </div>

            <div className="mt-8 max-w-2xl">
              <h2 className="text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl md:text-7xl leading-[0.95]">
                About<br />
                <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 shadow-[0_0_22px_rgba(56,189,248,0.35)]" />
              <p className="mt-8 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
                I’m <span className="text-cyan-300">Omar Abass</span>, a modern AI-focused developer crafting premium digital experiences with precision, clarity, and style. My work blends software engineering, design systems, and intelligent interfaces to bring futuristic concepts to life.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="group flex h-full min-h-[210px] flex-col justify-between rounded-[26px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_28px_rgba(0,240,255,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_42px_rgba(56,189,248,0.22)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(56,189,248,0.15)]">
                    <Icon name={stat.icon} />
                  </div>
                  <div>
                    <p className="mt-6 text-4xl font-semibold text-white sm:text-5xl">{stat.value}</p>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="relative mx-auto w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-2 shadow-[0_0_45px_rgba(0,240,255,0.10)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />
              <div className="absolute left-4 top-4 h-20 w-20 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-2xl" />
              <div className="absolute right-6 top-14 h-12 w-12 rounded-full border border-violet-400/15 bg-violet-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[26px] border border-cyan-300/20 bg-slate-950/40 shadow-[0_0_50px_rgba(0,240,255,0.14)]">
                <img
                  src={aboutImage}
                  alt="Omar Abass"
                  className="h-[520px] w-full object-cover md:h-[560px] lg:h-[620px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.08),rgba(2,6,15,0.72))]" />
                <div className="absolute bottom-6 left-6 h-20 w-20 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute top-10 right-8 h-5 w-20 rounded-full bg-sky-400/20 blur-xl" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-8 top-8 h-1 w-24 rounded-full bg-cyan-300/40 blur-sm" />
                  <div className="absolute right-8 top-24 h-1 w-28 rounded-full bg-violet-300/30 blur-sm" />
                  <div className="absolute bottom-16 left-10 h-1 w-32 rounded-full bg-sky-300/25 blur-sm" />
                  <div className="absolute right-10 bottom-28 h-1 w-16 rounded-full bg-cyan-300/30 blur-sm" />
                  <span className="absolute left-12 bottom-24 block h-2 w-2 rounded-full bg-cyan-200/80 shadow-[0_0_18px_rgba(56,189,248,0.5)]" />
                  <span className="absolute right-16 top-14 block h-2 w-2 rounded-full bg-violet-200/70 shadow-[0_0_18px_rgba(168,85,247,0.4)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/45 to-slate-950/70 p-8 shadow-[0_0_30px_rgba(0,240,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_42px_rgba(56,189,248,0.18)]"
          >
            <div className="absolute inset-0 rounded-[30px] border border-cyan-300/10 opacity-50" />
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-3xl" />
            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.18)]">
                  <DeveloperIcon />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">The Developer</h3>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  I build intuitive, scalable applications that feel futuristic and grounded. My focus is on bringing modern AI interfaces, seamless user flows, and polished interactions together into one premium experience.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {techPills.map(tech => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-200 hover:shadow-[0_0_18px_rgba(56,189,248,0.15)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-slate-950/75 p-8 shadow-[0_0_30px_rgba(0,240,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_42px_rgba(56,189,248,0.18)]"
          >
            <div className="absolute inset-0 rounded-[30px] border border-sky-300/10 opacity-40" />
            <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-violet-300/20 bg-violet-400/10 blur-3xl" />
            <div className="absolute right-6 top-24 hidden h-24 w-24 rounded-full border border-cyan-300/10 bg-cyan-400/5 blur-3xl lg:block" />
            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.18)]">
                  <EyeIcon />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">The Vision</h3>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  I envision AI-powered digital experiences that empower people through clarity, elegance, and intelligence. Every interface should feel effortless, immersive, and distinctly premium.
                </p>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-6 top-28 hidden w-32 lg:block">
                <div className="absolute top-2 right-4 h-[1px] w-16 rounded-full bg-cyan-300/10" />
                <div className="absolute top-12 right-8 h-10 w-[1px] bg-sky-300/10" />
                <div className="absolute bottom-16 right-4 h-2 w-10 rounded-full bg-cyan-300/10" />
                <div className="absolute bottom-6 right-12 h-0.5 w-20 rounded-full bg-violet-300/10" />
                <span className="absolute top-16 right-2 block h-2 w-2 rounded-full bg-cyan-300/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
