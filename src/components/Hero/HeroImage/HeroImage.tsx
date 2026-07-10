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
