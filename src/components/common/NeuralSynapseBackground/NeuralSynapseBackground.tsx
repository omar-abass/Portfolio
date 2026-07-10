import { useEffect, useRef, useState } from 'react';

/* ── Types ── */
interface MicroParticle {
  id: string;
  angle: number;
  speed: number;
  radius: number;
  size: number;
  baseAlpha: number;
  alphaSpeed: number;
}

interface FloatingHex {
  key: number;
  radius: number;
  rotationSpeed: number;
  pulseSpeed: number;
  opacity: number;
}

interface CircuitFrag {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  opacity: number;
  pulseSpeed: number;
}

/* ── Anchored positions (scattered around the portrait's AI side) ── */
function useBrainPosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const anchor = document.getElementById('hero-portrait-brain-anchor');
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      frameRef.current = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return pos;
}

/* ── Animation time hook (drives particle motion) ── */
function useAnimTime() {
  const [time, setTime] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    let start = performance.now();
    const tick = (now: number) => {
      setTime((now - start) * 0.001);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return time;
}

/* ── Constants ── */
const CYAN = '#00f0ff';
const DEEP_BLUE = '#0072ff';

/* ── Component ── */
export const NeuralSynapseBackground = () => {
  const brain = useBrainPosition();
  const t = useAnimTime();

  // ── Memoized particle systems (stable across renders) ──
  const particlesRef = useRef<MicroParticle[]>([]);
  const hexesRef = useRef<FloatingHex[]>([]);
  const circuitsRef = useRef<CircuitFrag[]>([]);
  const pixelsRef = useRef<{ angle: number; dist: number; size: number; speed: number }[]>([]);
  const nodesRef = useRef<{ angle: number; radius: number; speed: number }[]>([]);

  // Init once
  if (particlesRef.current.length === 0) {
    // Orbit particles (holographic dust)
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push({
        id: `p-${i}`,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 90 + 15,
        size: Math.random() * 1.3 + 0.4,
        baseAlpha: Math.random() * 0.35 + 0.08,
        alphaSpeed: Math.random() * 2 + 0.5,
      });
    }

    // Floating hexagons
    for (let i = 0; i < 5; i++) {
      hexesRef.current.push({
        key: i,
        radius: Math.random() * 50 + 25,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        pulseSpeed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.12 + 0.04,
      });
    }

    // Circuit fragments
    for (let i = 0; i < 15; i++) {
      circuitsRef.current.push({
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 160,
        w: Math.random() * 12 + 5,
        h: Math.random() * 1.2 + 0.3,
        angle: (Math.PI / 4) * Math.floor(Math.random() * 4),
        opacity: Math.random() * 0.15 + 0.03,
        pulseSpeed: Math.random() * 3 + 1.5,
      });
    }

    // Digital pixels
    for (let i = 0; i < 12; i++) {
      pixelsRef.current.push({
        angle: i * 2.5,
        dist: 30 + i * 6,
        size: Math.random() * 3 + 1.5,
        speed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Neural nodes
    for (let i = 0; i < 8; i++) {
      nodesRef.current.push({
        angle: (i / 8) * Math.PI * 2,
        radius: 25 + i * 10,
        speed: 0.0005 * (i + 1),
      });
    }
  }

  const particles = particlesRef.current;
  const hexes = hexesRef.current;
  const circuits = circuitsRef.current;
  const pixels = pixelsRef.current;
  const nodes = nodesRef.current;

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    >
      <defs>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="particle-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor={CYAN} stopOpacity="0.6" />
          <stop offset="100%" stopColor={DEEP_BLUE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ═══════════════════════════════════════════
          TIGHT LOCALIZED AI FIELD (Portrait Only)
          All effects stay within ~120px of the AI
          side of the portrait and fade into the bg.
          ═══════════════════════════════════════════ */}
      <g filter="url(#soft-glow)" opacity="0.65">
        {/* ── 1. Invisible orbit rings (very subtle) ── */}
        <circle
          cx={brain.x}
          cy={brain.y}
          r={20}
          fill="none"
          stroke={CYAN}
          strokeWidth="0.3"
          strokeDasharray="1 8"
          opacity={0.25 + Math.sin(t * 0.002) * 0.05}
        />
        <circle
          cx={brain.x}
          cy={brain.y}
          r={40}
          fill="none"
          stroke={CYAN}
          strokeWidth="0.25"
          strokeDasharray="2 10"
          opacity={0.15 + Math.sin(t * 0.0015 + 1) * 0.03}
        />
        <circle
          cx={brain.x}
          cy={brain.y}
          r={70}
          fill="none"
          stroke={CYAN}
          strokeWidth="0.15"
          strokeDasharray="3 15"
          opacity={0.08 + Math.sin(t * 0.001 + 2) * 0.02}
        />

        {/* ── 2. Floating Hexagons ── */}
        {hexes.map((hex, i) => {
          const pulse = 0.5 + 0.5 * Math.sin(t * hex.pulseSpeed + i);
          const rotation = t * hex.rotationSpeed + i * 60;
          const points = Array.from({ length: 6 }).map((_, j) => {
            const a = (j * Math.PI) / 3 + (rotation * Math.PI) / 180;
            const r = hex.radius * (0.7 + pulse * 0.3);
            const x = brain.x + Math.cos(a) * r;
            const y = brain.y + Math.sin(a) * r;
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke={CYAN}
              strokeWidth="0.4"
              opacity={hex.opacity * (0.6 + pulse * 0.4)}
            />
          );
        })}

        {/* ── 3. Circuit Fragments ── */}
        {circuits.map((frag, i) => {
          const pulse = Math.sin(t * frag.pulseSpeed + i * 2.5);
          const alpha = frag.opacity * (0.7 + pulse * 0.3);
          return (
            <g key={i}>
              <line
                x1={brain.x + frag.x}
                y1={brain.y + frag.y}
                x2={brain.x + frag.x + Math.cos(frag.angle) * frag.w}
                y2={brain.y + frag.y + Math.sin(frag.angle) * frag.w}
                stroke={CYAN}
                strokeWidth={frag.h}
                opacity={Math.max(0, alpha)}
              />
              {i % 3 === 0 && (
                <circle
                  cx={brain.x + frag.x + Math.cos(frag.angle) * frag.w}
                  cy={brain.y + frag.y + Math.sin(frag.angle) * frag.w}
                  r="1"
                  fill={CYAN}
                  opacity={Math.max(0, alpha * 1.5)}
                />
              )}
            </g>
          );
        })}

        {/* ── 4. Tiny Glowing Particles (holographic dust) ── */}
        {particles.map((p, i) => {
          const px = brain.x + Math.cos(p.angle + t * p.speed) * (p.radius + Math.sin(t * 0.002 + i) * 5);
          const py = brain.y + Math.sin(p.angle + t * p.speed) * (p.radius + Math.cos(t * 0.003 + i) * 5);
          const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * 0.003 * p.alphaSpeed + i * 0.5));
          return (
            <g key={p.id}>
              <circle
                cx={px}
                cy={py}
                r={p.size}
                fill="url(#particle-grad)"
                opacity={Math.max(0, alpha)}
              />
              {p.size > 1 && (
                <circle
                  cx={px}
                  cy={py}
                  r={p.size * 3}
                  fill={CYAN}
                  opacity={Math.max(0, alpha * 0.15)}
                />
              )}
            </g>
          );
        })}

        {/* ── 5. Soft light pulses (breathing rings) ── */}
        <circle
          cx={brain.x}
          cy={brain.y}
          r={12 + 8 * Math.sin(t * 0.003)}
          fill="none"
          stroke={CYAN}
          strokeWidth="0.4"
          opacity={0.09 + 0.04 * Math.sin(t * 0.003)}
        />
        <circle
          cx={brain.x}
          cy={brain.y}
          r={18 + 10 * Math.sin(t * 0.0025 + 1)}
          fill="none"
          stroke={CYAN}
          strokeWidth="0.25"
          opacity={0.06 + 0.03 * Math.sin(t * 0.0025 + 1)}
        />

        {/* ── 6. Digital pixel fragments ── */}
        {pixels.map((px, i) => {
          const angle = px.angle + t * px.speed;
          const pX = brain.x + Math.cos(angle) * px.dist;
          const pY = brain.y + Math.sin(angle) * px.dist;
          const flicker = Math.sin(t * (i + 1) * 0.001 + i);
          return (
            <rect
              key={i}
              x={pX}
              y={pY}
              width={flicker > 0.5 ? 2 : 3}
              height={flicker > 0.5 ? 3 : 2}
              fill={CYAN}
              opacity={Math.max(0, 0.12 + flicker * 0.08)}
            />
          );
        })}

        {/* ── 7. Small neural nodes (scattered data points) ── */}
        {nodes.map((node, i) => {
          const angle = node.angle + t * node.speed;
          const nx = brain.x + Math.cos(angle) * node.radius;
          const ny = brain.y + Math.sin(angle) * node.radius;
          return (
            <circle
              key={i}
              cx={nx}
              cy={ny}
              r={1.2 + 0.8 * Math.sin(t * 0.002 + i)}
              fill={CYAN}
              opacity={0.25 + 0.1 * Math.sin(t * 0.003 + i)}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default NeuralSynapseBackground;
