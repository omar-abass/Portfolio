import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@lib/cn';
import { SECTIONS } from '@utils/constants';
import './Navbar.css';

export interface NavbarProps {
  className?: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  sectionId: string;
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', href: `#${SECTIONS.HERO}`, sectionId: SECTIONS.HERO },
  { label: 'About', href: `#${SECTIONS.ABOUT}`, sectionId: SECTIONS.ABOUT },
  { label: 'Skills', href: `#${SECTIONS.SKILLS}`, sectionId: SECTIONS.SKILLS },
  { label: 'Projects', href: `#${SECTIONS.PROJECTS}`, sectionId: SECTIONS.PROJECTS },
  { label: 'Experience', href: `#${SECTIONS.EXPERIENCE}`, sectionId: SECTIONS.EXPERIENCE },
  { label: 'Certificates', href: `#${SECTIONS.CERTIFICATES}`, sectionId: SECTIONS.CERTIFICATES },
  { label: 'Contact', href: `#${SECTIONS.CONTACT}`, sectionId: SECTIONS.CONTACT },
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ─── Icons ─── */
const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);


const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

/* ─── Component ─── */
const Navbar = ({ className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS.HERO);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Track scroll for navbar styling */
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isActive = (sectionId: string): boolean => activeSection === sectionId;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        'navbar-container',
        isScrolled ? 'scrolled' : 'not-scrolled',
        className
      )}
    >
      {/* ── Left: Spacer ── */}
      <div className="hidden md:block w-[150px] flex-shrink-0" />

      {/* ── Center: Nav Links ── */}
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                'navbar-link-item text-sm font-medium tracking-wide',
                'transition-all duration-300 ease-out',
                'hover:text-cyan-400 hover:-translate-y-[2px]',
                isActive(link.sectionId) ? 'text-cyan-400' : 'text-white/80'
              )}
            >
              {link.label}
              {/* Animated underline on hover */}
              <span
                className={cn(
                  'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full',
                  'bg-gradient-to-r from-cyan-400 to-primary-400',
                  'transition-all duration-300 ease-out',
                  isActive(link.sectionId) ? 'w-5 opacity-100' : 'w-0 opacity-0'
                )}
              />
              {/* Glow dot for active state */}
              {isActive(link.sectionId) && (
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                  style={{ boxShadow: '0 0 8px rgba(34,211,238,0.8)' }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Right: Download CV ── */}
      <a
        href="/Omar-Abass-CV.pdf"
        download
        className="navbar-cv-btn"
        style={
          {
            '--glow': '0 0 20px rgba(0,240,255,0.25)',
          } as React.CSSProperties
        }
        onClick={(e) => {
          e.preventDefault();
          const a = document.createElement('a');
          a.href = '/Omar-Abass-CV.pdf';
          a.download = 'Omar-Abass-CV.pdf';
          a.click();
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,240,255,0.25)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        <DownloadIcon />
        <span>Download CV</span>
      </a>

      {/* ── Mobile: Hamburger ── */}
      <button
        className="navbar-hamburger"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={cn(
              'w-full h-[2px] rounded-full transition-all duration-300 origin-center',
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-cyan-400' : 'bg-white'
            )}
          />
          <span
            className={cn(
              'w-full h-[2px] rounded-full transition-all duration-300',
              isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'bg-white/60'
            )}
          />
          <span
            className={cn(
              'w-full h-[2px] rounded-full transition-all duration-300 origin-center',
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-cyan-400' : 'bg-white'
            )}
          />
        </div>
      </button>

      {/* ── Mobile: Dropdown Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="navbar-mobile-menu"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <motion.li
                  key={link.label}
                  variants={mobileItemVariants}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive(link.sectionId)
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-neutral-300 hover:text-cyan-400 hover:bg-white/[0.03]'
                    )}
                  >
                    {isActive(link.sectionId) ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                        style={{ boxShadow: '0 0 8px rgba(34,211,238,0.8)' }}
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0" />
                    )}
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              variants={mobileItemVariants}
              className="mt-3 pt-3 border-t border-white/[0.06]"
            >
              <a
                href="/Omar-Abass-CV.pdf"
                download
                onClick={(e) => {
                  e.preventDefault();
                  const a = document.createElement('a');
                  a.href = '/Omar-Abass-CV.pdf';
                  a.download = 'Omar-Abass-CV.pdf';
                  a.click();
                }}
                className={cn(
                  'flex items-center justify-center gap-2 w-full rounded-full text-sm font-semibold',
                  'h-[46px]',
                  'bg-transparent border border-cyan-400/40 text-cyan-400',
                  'transition-all duration-[250ms]',
                  'hover:bg-cyan-400 hover:text-[#0a0a12] hover:border-cyan-400'
                )}
              >
                <DownloadIcon />
                <span>Download CV</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
