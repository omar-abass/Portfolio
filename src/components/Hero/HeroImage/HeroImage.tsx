import { useState, useEffect, useRef } from 'react';
import { cn } from '@lib/cn';
import meWithAI from '@assets/images/Me with AI (1)2.png';
import meWithoutAI from '@assets/images/Me without AI.png';
import './HeroImage.css';

export interface HeroImageProps {
  className?: string;
}

/* ─── Data Pulse travelling along a connection ─── */
class DataPulse {
  progress: number;
  speed: number;

  constructor() {
    this.progress = 0;
    this.speed = Math.random() * 0.012 + 0.006;
  }

  update() {
    this.progress += this.speed;
  }
}

/* ─── Neural Node orbiting the portrait ─── */
class NeuralNode {
  baseAngle: number;
  baseRadius: number;
  angleSpeed: number;
  radiusSpeed: number;
  radiusAmplitude: number;
  time: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  size: number;
  pulses: Map<number, DataPulse>;

  constructor(baseAngle: number, baseRadius: number) {
    this.baseAngle = baseAngle;
    this.baseRadius = baseRadius;
    this.angleSpeed = (Math.random() - 0.5) * 0.003;
    this.radiusSpeed = Math.random() * 0.015 + 0.005;
    this.radiusAmplitude = Math.random() * 12 + 4;
    this.time = Math.random() * 100;
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.size = Math.random() * 2 + 1.5;
    this.pulses = new Map();
  }

  update(cx: number, cy: number, mouseX: number, mouseY: number, isHovering: boolean) {
    this.time += 0.1;
    const angle = this.baseAngle + this.time * this.angleSpeed;
    const radius =
      this.baseRadius + Math.sin(this.time * this.radiusSpeed) * this.radiusAmplitude;

    const targetX = cx + radius * Math.cos(angle);
    const targetY = cy + radius * Math.sin(angle);

    let targetOffsetX = 0;
    let targetOffsetY = 0;

    if (isHovering) {
      const dx = mouseX - (targetX + this.offsetX);
      const dy = mouseY - (targetY + this.offsetY);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130 && dist > 0) {
        const force = (130 - dist) / 130;
        targetOffsetX = (dx / dist) * force * 22;
        targetOffsetY = (dy / dist) * force * 22;
      }
    }

    this.offsetX += (targetOffsetX - this.offsetX) * 0.07;
    this.offsetY += (targetOffsetY - this.offsetY) * 0.07;
    this.x = targetX + this.offsetX;
    this.y = targetY + this.offsetY;

    this.pulses.forEach((pulse, otherIdx) => {
      pulse.update();
      if (pulse.progress >= 1) this.pulses.delete(otherIdx);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = this.size * 4;
    ctx.fill();
    ctx.restore();
  }

  spawnPulse(otherIdx: number) {
    if (!this.pulses.has(otherIdx) && Math.random() < 0.005) {
      this.pulses.set(otherIdx, new DataPulse());
    }
  }
}

interface CircuitPoint {
  x: number;
  y: number;
}

interface CircuitTrace {
  points: CircuitPoint[];
  width: number;
  opacity: number;
  phase: number;
  particles: { offset: number; size: number; phase: number }[];
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getPointAlongPath = (points: CircuitPoint[], t: number): CircuitPoint => {
  if (points.length === 0) {
    return { x: 0, y: 0 };
  }

  const segmentLengths = points.slice(1).map((point, index) => {
    const prev = points[index];
    return Math.hypot(point.x - prev.x, point.y - prev.y);
  });
  const totalLength = segmentLengths.reduce((sum, len) => sum + len, 0);
  if (totalLength === 0) {
    return points[0];
  }

  let target = clamp(t, 0, 1) * totalLength;
  for (let i = 0; i < segmentLengths.length; i += 1) {
    const segmentLength = segmentLengths[i];
    if (target <= segmentLength || i === segmentLengths.length - 1) {
      const start = points[i];
      const end = points[i + 1];
      const ratio = segmentLength === 0 ? 0 : target / segmentLength;
      return {
        x: start.x + (end.x - start.x) * ratio,
        y: start.y + (end.y - start.y) * ratio,
      };
    }
    target -= segmentLength;
  }

  return points[points.length - 1];
};

const createCircuitTrace = (
  start: CircuitPoint,
  maxX: number,
  portraitSize: number,
  index: number,
): CircuitTrace => {
  const maxLength = Math.max(maxX - start.x - portraitSize * 0.04, portraitSize * 0.12);
  const length = Math.min(maxLength, portraitSize * (0.24 + Math.random() * 0.10));
  const directionSign = index % 2 === 0 ? 1 : -1;

  const firstCornerX = start.x + length * (0.28 + Math.random() * 0.05);
  const firstCornerY = start.y;
  const secondCornerX = firstCornerX;
  const secondCornerY = clamp(
    firstCornerY + directionSign * portraitSize * (0.06 + Math.random() * 0.03),
    start.y - portraitSize * 0.18,
    start.y + portraitSize * 0.18,
  );
  const thirdCornerX = secondCornerX + length * (0.24 + Math.random() * 0.09);
  const thirdCornerY = secondCornerY;
  const finalX = clamp(start.x + length, start.x + portraitSize * 0.15, maxX);
  const finalY = clamp(
    thirdCornerY + (Math.random() - 0.5) * portraitSize * 0.04,
    start.y - portraitSize * 0.12,
    start.y + portraitSize * 0.12,
  );

  const points: CircuitPoint[] = [
    start,
    { x: firstCornerX, y: firstCornerY },
    { x: secondCornerX, y: secondCornerY },
    { x: thirdCornerX, y: thirdCornerY },
    { x: finalX, y: finalY },
  ];

  const particles = points.map((_, idx) => ({
    offset: idx / Math.max(points.length - 1, 1),
    size: 1 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
  }));

  return {
    points,
    width: 1.2 + Math.random() * 1.4,
    opacity: 0.55 + Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
    particles,
  };
};

const generateCircuitLines = (w: number, h: number): CircuitTrace[] => {
  const portraitSize = Math.min(w * 0.95, 480);
  const px = (w - portraitSize) / 2;
  const py = (h - portraitSize) / 2;
  const maxX = w - portraitSize * 0.04;

  const anchors = [
    { x: 0.66, y: 0.22 },
    { x: 0.62, y: 0.15 },
    { x: 0.68, y: 0.34 },
    { x: 0.62, y: 0.58 },
    { x: 0.60, y: 0.78 },
  ];

  return anchors.flatMap((anchor, index) => {
    const start = { x: px + portraitSize * anchor.x, y: py + portraitSize * anchor.y };
    const main = createCircuitTrace(start, maxX, portraitSize, index);
    const branchStart = {
      x: main.points[2].x,
      y: clamp(
        main.points[2].y + (index % 2 === 0 ? portraitSize * 0.02 : -portraitSize * 0.02),
        py + portraitSize * 0.08,
        py + portraitSize * 0.92,
      ),
    };
    const branch = createCircuitTrace(branchStart, maxX, portraitSize, index + 7);

    return [main, branch];
  });
};

const drawCircuitNetwork = (
  ctx: CanvasRenderingContext2D,
  traces: CircuitTrace[],
  phase: number,
) => {
  traces.forEach((trace, traceIndex) => {
    const gradient = ctx.createLinearGradient(
      trace.points[0].x,
      trace.points[0].y,
      trace.points[trace.points.length - 1].x,
      trace.points[trace.points.length - 1].y,
    );
    gradient.addColorStop(0, 'rgba(0, 191, 255, 0.95)');
    gradient.addColorStop(0.65, 'rgba(79, 195, 255, 0.62)');
    gradient.addColorStop(1, 'rgba(0, 191, 255, 0.18)');

    ctx.save();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = trace.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(79, 195, 255, 0.45)';
    ctx.shadowBlur = 12;
    ctx.globalAlpha = trace.opacity;
    ctx.beginPath();
    trace.points.forEach((point, idx) => {
      if (idx === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = Math.max(0.8, trace.width * 0.4);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = trace.opacity * 0.55;
    ctx.beginPath();
    trace.points.forEach((point, idx) => {
      if (idx === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.restore();

    trace.particles.forEach((particle) => {
      const point = getPointAlongPath(trace.points, (particle.offset + Math.sin(particle.phase + phase) * 0.03) % 1);
      ctx.save();
      ctx.fillStyle = `rgba(173, 216, 255, ${0.3 + (Math.sin(phase + particle.phase) + 1) * 0.12})`;
      ctx.shadowColor = 'rgba(79, 195, 255, 0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    const pulsePoint = getPointAlongPath(trace.points, (Math.sin(phase + trace.phase) * 0.5 + 0.5) % 1);
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 191, 255, 0.75)';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(pulsePoint.x, pulsePoint.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

/* ─── Main Component ─── */

const HeroImage = ({ className }: HeroImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const topImgRef = useRef<HTMLImageElement | null>(null);
  const nodesRef = useRef<NeuralNode[]>([]);
  const trailPointsRef = useRef<
    { x: number; y: number; size: number; life: number; decay: number }[]
  >([]);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const canvasWidthRef = useRef(480);
  const canvasHeightRef = useRef(480);
  const dprRef = useRef(1);
  const isHoveringRef = useRef(false);

  /* ── Preload images ── */
  useEffect(() => {
    let loadedCount = 0;
    const checkLoaded = () => {
      if (++loadedCount === 2) setImagesLoaded(true);
    };
    const imgBase = new Image();
    imgBase.src = meWithoutAI;
    imgBase.onload = checkLoaded;
    baseImgRef.current = imgBase;

    const imgTop = new Image();
    imgTop.src = meWithAI;
    imgTop.onload = checkLoaded;
    topImgRef.current = imgTop;
  }, []);

  /* ── Initialize neural nodes & offscreen canvas ── */
  useEffect(() => {
    const numNodes = 18;
    const nodes: NeuralNode[] = [];
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const radius = 230 + Math.random() * 55;
      nodes.push(new NeuralNode(angle, radius));
    }
    nodesRef.current = nodes;
    offscreenCanvasRef.current = document.createElement('canvas');
  }, []);

  /* ── Handle resize + DPR ── */
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const offscreen = offscreenCanvasRef.current;
      if (!container || !canvas || !offscreen) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      offscreen.width = rect.width * dpr;
      offscreen.height = rect.height * dpr;

      canvasWidthRef.current = rect.width;
      canvasHeightRef.current = rect.height;
      dprRef.current = dpr;

      const scaleMultiplier = Math.min(rect.width / 480, 1.2);
      nodesRef.current.forEach((node) => {
        node.baseRadius = (210 + Math.random() * 55) * scaleMultiplier;
      });

      if (imagesLoaded) {
        circuitLinesRef.current = generateCircuitLines(rect.width, rect.height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  /* ── Main render loop ── */
  useEffect(() => {
    let animationId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const offCtx = offscreenCanvasRef.current?.getContext('2d');
      if (!canvas || !imagesLoaded || !baseImgRef.current || !topImgRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvasWidthRef.current;
      const h = canvasHeightRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const dpr = dprRef.current;

      /* — smooth mouse interpolation (reveal only, no displacement) — */
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      /* — clear — */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      /* ─── 1. Base portrait (real face) ─── */
      const portraitSize = Math.min(w * 0.95, 480);
      const px = cx - portraitSize / 2;
      const py = cy - portraitSize / 2;

      ctx.save();
      ctx.drawImage(baseImgRef.current, px, py, portraitSize, portraitSize);
      ctx.restore();

      /* ─── 2. AI face layer with eraser compositing ─── */
      // decay trail
      trailPointsRef.current.forEach((pt) => { pt.life -= pt.decay; });
      trailPointsRef.current = trailPointsRef.current.filter((pt) => pt.life > 0);

      // add new trail point when hovering
      if (isHoveringRef.current) {
        trailPointsRef.current.push({
          x: mouse.x,
          y: mouse.y,
          // brush radius — keep same reveal area, feathering handles softness
          size: Math.min(w * 0.15, 78),
          life: 1.0,
          // slightly slower decay for a smoother healing feel
          decay: 0.009,
        });
      }

      const offscreen = offscreenCanvasRef.current;
      if (offCtx && offscreen) {
        offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

        // draw AI face
        offCtx.save();
        
        // Exact pixel alignment values based on image ratios:
        // Base image is 1023x1537, Top image (right half AI) is 502x1537, starting at X = 521.
        const baseWidth = 1023;
        const topWidth = 502;
        const topOffset = 521;

        const px_top = px + portraitSize * (topOffset / baseWidth);
        const width_top = portraitSize * (topWidth / baseWidth);

        offCtx.drawImage(
          topImgRef.current,
          px_top * dpr, py * dpr,
          width_top * dpr, portraitSize * dpr
        );
        offCtx.restore();

        // erase with a soft, fully-feathered brush — no hard core, no glow
        offCtx.save();
        offCtx.scale(dpr, dpr);
        offCtx.globalCompositeOperation = 'destination-out';
        trailPointsRef.current.forEach((pt) => {
          const grad = offCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size);
          // Gentle bell-curve falloff: strong centre, completely transparent edge
          grad.addColorStop(0,    `rgba(0,0,0,${pt.life * 0.92})`);
          grad.addColorStop(0.35, `rgba(0,0,0,${pt.life * 0.65})`);
          grad.addColorStop(0.65, `rgba(0,0,0,${pt.life * 0.28})`);
          grad.addColorStop(0.88, `rgba(0,0,0,${pt.life * 0.06})`);
          grad.addColorStop(1,    'rgba(0,0,0,0)');
          offCtx.beginPath();
          offCtx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          offCtx.fillStyle = grad;
          offCtx.fill();
        });
        offCtx.restore();
      }

      if (offscreen) {
        ctx.save();
        ctx.drawImage(offscreen, 0, 0, w, h);
        ctx.restore();
      }

      /* ─── 3. Hairline reveal shimmer (very subtle, no bloom) ─── */
      // A faint ring drawn only at the boundary of the erased area —
      // opacity is capped at 6% so it is a texture cue, not a glowing effect.
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      trailPointsRef.current.forEach((pt) => {
        if (pt.life > 0.25) {
          const innerR = pt.size * 0.82;
          const outerR = pt.size * 1.0;
          const g = ctx.createRadialGradient(pt.x, pt.y, innerR, pt.x, pt.y, outerR);
          g.addColorStop(0,   'rgba(0,240,255,0)');
          g.addColorStop(0.5, `rgba(0,240,255,${pt.life * 0.06})`);
          g.addColorStop(1,   'rgba(0,240,255,0)');
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, outerR, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      });
      ctx.restore();

      /* ─── 4. Neural network (ring-bound, mouse-reactive) ─── */
      const nodes = nodesRef.current;
      nodes.forEach((node) =>
        node.update(cx, cy, mouse.x, mouse.y, isHoveringRef.current)
      );

      // connection lines
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,240,255,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            a.spawnPulse(j);
            const pulse = a.pulses.get(j);
            if (pulse) {
              const ppx = a.x + dx * pulse.progress;
              const ppy = a.y + dy * pulse.progress;
              ctx.save();
              ctx.beginPath();
              ctx.arc(ppx, ppy, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#00f0ff';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }
      ctx.restore();

      // nodes
      nodes.forEach((node) => node.draw(ctx));

      drawCircuitNetwork(ctx, circuitLinesRef.current, circuitPhaseRef.current);
      circuitPhaseRef.current += 0.01;

      ctx.restore(); // restore dpr scale
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [imagesLoaded]);

  /* ── Mouse / touch handlers ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  };
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    mouseRef.current.isHovering = true;
  };
  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    mouseRef.current.isHovering = false;
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches.length) return;
    isHoveringRef.current = true;
    mouseRef.current.isHovering = true;
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    mouseRef.current.targetX = mouseRef.current.x = x;
    mouseRef.current.targetY = mouseRef.current.y = y;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches.length) return;
    mouseRef.current.targetX = e.touches[0].clientX - rect.left;
    mouseRef.current.targetY = e.touches[0].clientY - rect.top;
  };
  const handleTouchEnd = () => {
    isHoveringRef.current = false;
    mouseRef.current.isHovering = false;
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className="hero-portrait-card relative w-full max-w-[640px]">
        <div
          ref={containerRef}
          className="hero-portrait-wrapper"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Canvas: portraits + neural network */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          />

          {/* Brain Anchor for the scrolling neural network */}
          <div
            id="hero-portrait-brain-anchor"
            className="absolute left-[58%] top-[36%] w-2 h-2 rounded-full bg-cyan-400 opacity-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          />

          {/* Loading state */}
          {!imagesLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/65 backdrop-blur-md z-20 rounded-[28px]">
              <div className="w-12 h-12 rounded-full border-2 border-t-cyan-300 border-white/10 animate-spin" />
              <div className="text-xs text-neutral-400 mt-3 font-mono uppercase tracking-[0.2em] animate-pulse">
                Syncing Neural Core…
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
