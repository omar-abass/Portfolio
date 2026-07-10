import { useState } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS, SITE_CONFIG } from '@utils/constants';
import { experienceData } from '@data/experience';
import { certificatesData } from '@data/certificates';
import { fadeLeft, fadeRight, fadeUp } from '@animations/fade';
import './FuturisticDashboard.css';

/* ════════════════════════════════════════
   INLINE SVG ICONS
════════════════════════════════════════ */

const CertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="fdb-cert-icon-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="fdb-contact-icon-svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* Social icons by name */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="fdb-social-icon-svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="fdb-social-icon-svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="fdb-social-icon-svg">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);



/* ════════════════════════════════════════
   AI CHIP SVG ILLUSTRATION
════════════════════════════════════════ */
const AiChipSVG = () => (
  <svg
    viewBox="0 0 320 320"
    className="fdb-chip-svg"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="fdb-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="fdb-glow-lg" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="7" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <radialGradient id="fdb-bloom" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#00f0ff" stopOpacity="0.18" />
        <stop offset="55%"  stopColor="#00f0ff" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="fdb-body-fill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#0a1628" />
        <stop offset="100%" stopColor="#050816" />
      </linearGradient>
    </defs>

    {/* ── Ambient bloom ── */}
    <ellipse cx="160" cy="160" rx="145" ry="145" fill="url(#fdb-bloom)" />

    {/* ── Outer dashed orbit ring ── */}
    <circle
      cx="160" cy="160" r="135"
      fill="none" stroke="#00f0ff" strokeWidth="0.6"
      strokeOpacity="0.18" strokeDasharray="5 9"
      className="fdb-orbit-ring"
    />
    {/* ── Inner orbit ring ── */}
    <circle
      cx="160" cy="160" r="105"
      fill="none" stroke="#00f0ff" strokeWidth="0.5"
      strokeOpacity="0.12" strokeDasharray="3 7"
      className="fdb-orbit-ring-rev"
    />

    {/* ── Circuit traces — horizontal ── */}
    {[120, 150, 180].map((y, i) => (
      <g key={`hl-${i}`}>
        <line x1="25" y1={y} x2="88" y2={y} stroke="#00f0ff" strokeWidth="1.2"
          strokeOpacity={y === 150 ? 0.75 : 0.45}
          className={y === 150 ? 'fdb-trace-pulse' : undefined} />
        <line x1="232" y1={y} x2="295" y2={y} stroke="#00f0ff" strokeWidth="1.2"
          strokeOpacity={y === 150 ? 0.75 : 0.45}
          className={y === 150 ? 'fdb-trace-pulse' : undefined} />
        <circle cx="25"  cy={y} r={y === 150 ? 3.5 : 2.5} fill="#00f0ff"
          strokeOpacity={y === 150 ? 1 : 0.6}
          className={y === 150 ? 'fdb-dot-pulse' : undefined}
          filter={y === 150 ? 'url(#fdb-glow-sm)' : undefined} />
        <circle cx="295" cy={y} r={y === 150 ? 3.5 : 2.5} fill="#00f0ff"
          strokeOpacity={y === 150 ? 1 : 0.6}
          className={y === 150 ? 'fdb-dot-pulse' : undefined}
          filter={y === 150 ? 'url(#fdb-glow-sm)' : undefined} />
      </g>
    ))}

    {/* ── Circuit traces — vertical ── */}
    {[120, 150, 180].map((x, i) => (
      <g key={`vl-${i}`}>
        <line x1={x} y1="25" x2={x} y2="88" stroke="#00f0ff" strokeWidth="1.2"
          strokeOpacity={x === 150 ? 0.75 : 0.45}
          className={x === 150 ? 'fdb-trace-pulse' : undefined} />
        <line x1={x} y1="232" x2={x} y2="295" stroke="#00f0ff" strokeWidth="1.2"
          strokeOpacity={x === 150 ? 0.75 : 0.45}
          className={x === 150 ? 'fdb-trace-pulse' : undefined} />
        <circle cx={x} cy="25"  r={x === 150 ? 3.5 : 2.5} fill="#00f0ff"
          opacity={x === 150 ? 1 : 0.6}
          className={x === 150 ? 'fdb-dot-pulse' : undefined}
          filter={x === 150 ? 'url(#fdb-glow-sm)' : undefined} />
        <circle cx={x} cy="295" r={x === 150 ? 3.5 : 2.5} fill="#00f0ff"
          opacity={x === 150 ? 1 : 0.6}
          className={x === 150 ? 'fdb-dot-pulse' : undefined}
          filter={x === 150 ? 'url(#fdb-glow-sm)' : undefined} />
      </g>
    ))}

    {/* ── Main chip body ── */}
    <rect x="88" y="88" width="144" height="144" rx="14"
      fill="url(#fdb-body-fill)" stroke="#00f0ff" strokeWidth="1.5"
      filter="url(#fdb-glow-sm)" />

    {/* ── Inner chip surface ── */}
    <rect x="91" y="91" width="138" height="138" rx="12"
      fill="rgba(0,240,255,0.025)" />

    {/* ── Corner bracket decorations ── */}
    <path d="M95 115 L95 95 L115 95" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />
    <path d="M205 95 L225 95 L225 115" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />
    <path d="M225 205 L225 225 L205 225" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />
    <path d="M115 225 L95 225 L95 205" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />

    {/* ── Inner grid lines ── */}
    {[118, 145, 175, 202].map((v) => (
      <g key={`grid-${v}`}>
        <line x1={v} y1="91" x2={v} y2="229" stroke="#00f0ff" strokeWidth="0.4" strokeOpacity="0.12" />
        <line x1="91" y1={v} x2="229" y2={v} stroke="#00f0ff" strokeWidth="0.4" strokeOpacity="0.12" />
      </g>
    ))}

    {/* ── Corner sub-processor blocks ── */}
    {[[108, 108], [204, 108], [108, 204], [204, 204]].map(([cx, cy], i) => (
      <rect key={i} x={cx} y={cy} width="8" height="8" rx="2"
        fill="rgba(0,240,255,0.28)" stroke="#00f0ff" strokeWidth="0.6" />
    ))}

    {/* ── Centre processor core ── */}
    <rect x="128" y="128" width="64" height="64" rx="8"
      fill="rgba(0,240,255,0.07)" stroke="#00f0ff" strokeWidth="1.2"
      filter="url(#fdb-glow-sm)" />
    <rect x="134" y="134" width="52" height="52" rx="6"
      fill="rgba(0,240,255,0.04)" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.4" />

    {/* ── "AI" label ── */}
    <text
      x="160" y="166"
      textAnchor="middle" dominantBaseline="middle"
      fill="#00f0ff" fontSize="18" fontWeight="800"
      fontFamily="'JetBrains Mono','Fira Code',monospace"
      filter="url(#fdb-glow-lg)"
      className="fdb-ai-label"
    >
      AI
    </text>

    {/* ── Floating particles ── */}
    <circle cx="58"  cy="78"  r="2"   fill="#00f0ff" opacity="0.35" className="fdb-particle" />
    <circle cx="255" cy="68"  r="1.5" fill="#00f0ff" opacity="0.28" className="fdb-particle-d1" />
    <circle cx="44"  cy="245" r="2"   fill="#00f0ff" opacity="0.3"  className="fdb-particle-d2" />
    <circle cx="268" cy="252" r="1.5" fill="#00f0ff" opacity="0.38" className="fdb-particle" />
    <circle cx="82"  cy="48"  r="1.5" fill="#00f0ff" opacity="0.22" className="fdb-particle-d2" />
    <circle cx="238" cy="268" r="2"   fill="#00f0ff" opacity="0.28" className="fdb-particle-d1" />
  </svg>
);

/* ════════════════════════════════════════
   PAPER PLANE SVG ILLUSTRATION
════════════════════════════════════════ */
const PaperPlaneSVG = () => (
  <svg
    viewBox="0 0 200 180"
    className="fdb-plane-svg"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="fdb-plane-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <linearGradient id="fdb-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#00f0ff" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#00c8d4" stopOpacity="0.06" />
      </linearGradient>
    </defs>

    {/* Trail lines */}
    <line x1="10" y1="100" x2="68" y2="92" stroke="#00f0ff" strokeWidth="1"
      strokeOpacity="0.2" strokeDasharray="5 5" />
    <line x1="10" y1="112" x2="60" y2="104" stroke="#00f0ff" strokeWidth="0.7"
      strokeOpacity="0.12" strokeDasharray="3 6" />
    <line x1="10" y1="88" x2="55" y2="83" stroke="#00f0ff" strokeWidth="0.5"
      strokeOpacity="0.1" strokeDasharray="4 7" />

    {/* Plane body */}
    <g transform="translate(100 90) rotate(-18)" filter="url(#fdb-plane-glow)">
      {/* Left wing */}
      <polygon points="0,-55 -38,35 0,18" fill="url(#fdb-wing-grad)" stroke="#00f0ff"
        strokeWidth="1.4" strokeLinejoin="round" />
      {/* Right wing highlight */}
      <polygon points="0,-55 38,35 0,18" fill="rgba(0,240,255,0.12)" stroke="#00f0ff"
        strokeWidth="1.4" strokeLinejoin="round" />
      {/* Fold centre line */}
      <line x1="0" y1="-55" x2="0" y2="18" stroke="#00f0ff" strokeWidth="1"
        strokeOpacity="0.45" />
      {/* Nose tip glow */}
      <circle cx="0" cy="-55" r="3" fill="#00f0ff" opacity="0.7"
        filter="url(#fdb-plane-glow)" />
    </g>

    {/* Accent particles */}
    <circle cx="148" cy="48" r="2"   fill="#00f0ff" opacity="0.45" className="fdb-particle" />
    <circle cx="162" cy="62" r="1.4" fill="#00f0ff" opacity="0.3"  className="fdb-particle-d1" />
    <circle cx="143" cy="38" r="1"   fill="#00f0ff" opacity="0.25" className="fdb-particle-d2" />
    <circle cx="155" cy="35" r="1.5" fill="#00f0ff" opacity="0.35" className="fdb-particle" />
  </svg>
);

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export interface FuturisticDashboardProps {
  className?: string;
}

const FuturisticDashboard = ({ className }: FuturisticDashboardProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1300);
  };

  const topCerts = certificatesData.slice(0, 3);

  return (
    <section
      id={SECTIONS.CONTACT}
      className={`fdb-section${className ? ` ${className}` : ''}`}
    >
      {/* Invisible anchors so navbar links still work */}
      <span id={SECTIONS.EXPERIENCE}    className="fdb-anchor" aria-hidden="true" />
      <span id={SECTIONS.CERTIFICATES} className="fdb-anchor" aria-hidden="true" />

      <div className="fdb-container">

        {/* ════════════════ TOP ROW ════════════════ */}
        <div className="fdb-top-row">

          {/* ── LEFT: Experience Timeline ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-experience-panel"
          >
            <h2 className="fdb-panel-title">Experience &amp; Education</h2>

            <div className="fdb-timeline">
              <div className="fdb-timeline-line" aria-hidden="true" />

              {experienceData.map((exp) => (
                <div key={exp.id} className="fdb-timeline-item">
                  <div className="fdb-timeline-node-wrap" aria-hidden="true">
                    <div className={`fdb-timeline-node${exp.current ? ' fdb-timeline-node--active' : ''}`} />
                    <div className="fdb-timeline-h-line" />
                  </div>

                  <div className="fdb-timeline-content">
                    <span className="fdb-timeline-period">
                      {exp.period}
                      {exp.current && <span className="fdb-badge">Now</span>}
                    </span>
                    <h3 className="fdb-timeline-role">{exp.role}</h3>
                    <p className="fdb-timeline-company">{exp.company}</p>
                    <p className="fdb-timeline-desc">{exp.description[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={SITE_CONFIG.resumeUrl}
              className="fdb-outline-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </motion.div>

          {/* ── CENTER: AI Chip ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-chip-panel"
          >
            <div className="fdb-chip-wrap">
              <div className="fdb-chip-halo" aria-hidden="true" />
              <AiChipSVG />
              <p className="fdb-chip-caption">Neural Processing Unit</p>
            </div>
          </motion.div>

          {/* ── RIGHT: Certificates ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-certs-panel"
          >
            <div className="fdb-panel-header">
              <h2 className="fdb-panel-title">Certificates</h2>
              <a href="#certificates-all" className="fdb-view-all">View All →</a>
            </div>

            <div className="fdb-cert-list">
              {topCerts.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fdb-cert-card"
                >
                  <div className="fdb-cert-icon-wrap">
                    <CertIcon />
                  </div>
                  <div className="fdb-cert-text">
                    <span className="fdb-cert-title">{cert.title}</span>
                    <span className="fdb-cert-issuer">{cert.issuer}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ════════════════ DIVIDER ════════════════ */}
        <div className="fdb-divider" aria-hidden="true">
          <span className="fdb-divider-dot" />
          <span className="fdb-divider-line" />
          <span className="fdb-divider-dot" />
        </div>

        {/* ════════════════ BOTTOM ROW ════════════════ */}
        <div className="fdb-bottom-row">

          {/* ── LEFT: Let's Connect ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-connect-panel"
          >
            <h2 className="fdb-panel-title">Let's Connect</h2>
            <p className="fdb-connect-desc">
              Have an exciting project or just want to say hello? I&apos;d love to
              hear from you. Let&apos;s build something remarkable together.
            </p>
            <div className="fdb-plane-wrap">
              <PaperPlaneSVG />
            </div>
          </motion.div>

          {/* ── CENTER: Contact Form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-form-panel"
          >
            <form onSubmit={handleSubmit} className="fdb-form" noValidate>
              {/* Name + Email row */}
              <div className="fdb-form-row">
                <div className="fdb-form-group">
                  <label htmlFor="fdb-name" className="fdb-form-label">Name</label>
                  <input
                    id="fdb-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="fdb-input"
                  />
                </div>
                <div className="fdb-form-group">
                  <label htmlFor="fdb-email" className="fdb-form-label">Email</label>
                  <input
                    id="fdb-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="fdb-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="fdb-form-group">
                <label htmlFor="fdb-message" className="fdb-form-label">Message</label>
                <textarea
                  id="fdb-message"
                  rows={5}
                  required
                  placeholder="Tell me about your project…"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="fdb-input fdb-textarea"
                />
              </div>

              {/* Submit */}
              <div className="fdb-form-footer">
                <button
                  type="submit"
                  className="fdb-send-btn"
                  disabled={sending || sent}
                  aria-label="Send message"
                >
                  {sending ? (
                    <span className="fdb-spinner" aria-label="Sending…" />
                  ) : sent ? (
                    '✓ Message Sent!'
                  ) : (
                    <>
                      <SendIcon />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* ── RIGHT: Contact Info + Socials ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="fdb-panel fdb-info-panel"
          >
            <ul className="fdb-contact-list" aria-label="Contact information">
              <li className="fdb-contact-item">
                <a href="mailto:om1747440@gmail.com" className="fdb-contact-item hover:text-cyan-400 transition-colors">
                  <span className="fdb-contact-icon" aria-hidden="true"><EmailIcon /></span>
                  <span className="fdb-contact-text">om1747440@gmail.com</span>
                </a>
              </li>
            </ul>

            <div className="fdb-social-row" role="list" aria-label="Social media links">
              <a
                href="https://github.com/omar-abass"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="fdb-social-btn"
                role="listitem"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/omar-mohamed-abass-08440a407/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="fdb-social-btn"
                role="listitem"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:om1747440@gmail.com"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="fdb-social-btn"
                role="listitem"
              >
                <MailIcon />
              </a>
            </div>
            <p className="fdb-contact-text mt-3">om1747440@gmail.com</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FuturisticDashboard;
