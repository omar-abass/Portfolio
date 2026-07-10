import { useRef, useEffect } from 'react';
import { cn } from '@lib/cn';

export interface NeuralLinesProps {
  className?: string;
  lineColor?: string;
  nodeColor?: string;
}

const NeuralLines = ({ className, lineColor = 'rgba(0, 240, 255, 0.15)', nodeColor = '#00f0ff' }: NeuralLinesProps)=> {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const drawLines = (): void => {
      const nodes = svg.querySelectorAll('circle');
      if (nodes.length === 0) return;

      const lines = svg.querySelectorAll('line.neural-line');
      lines.forEach(line => line.remove());

      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i >= j) return;

          const x1 = parseFloat(node.getAttribute('cx') || '0');
          const y1 = parseFloat(node.getAttribute('cy') || '0');
          const x2 = parseFloat(other.getAttribute('cx') || '0');
          const y2 = parseFloat(other.getAttribute('cy') || '0');

          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          if (distance < 150) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', String(x1));
            line.setAttribute('y1', String(y1));
            line.setAttribute('x2', String(x2));
            line.setAttribute('y2', String(y2));
            line.setAttribute('stroke', lineColor);
            line.setAttribute('stroke-width', '0.5');
            line.setAttribute('class', 'neural-line');
            svg.appendChild(line);
          }
        });
      });
    };

    drawLines();
  }, [lineColor, nodeColor]);

  return (
    <svg ref={svgRef} className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}>
      <circle cx="20%" cy="30%" r="3" fill={nodeColor} opacity="0.6" />
      <circle cx="40%" cy="20%" r="2" fill={nodeColor} opacity="0.4" />
      <circle cx="60%" cy="40%" r="4" fill={nodeColor} opacity="0.7" />
      <circle cx="80%" cy="25%" r="2.5" fill={nodeColor} opacity="0.5" />
      <circle cx="30%" cy="60%" r="3" fill={nodeColor} opacity="0.6" />
      <circle cx="70%" cy="70%" r="2" fill={nodeColor} opacity="0.4" />
      <circle cx="50%" cy="80%" r="3.5" fill={nodeColor} opacity="0.5" />
    </svg>
  );
};

export default NeuralLines;
