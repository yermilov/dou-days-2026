import { CSSProperties } from 'react';
import rough from 'roughjs';

interface StageNodeProps {
  cx: number;
  cy: number;
  label: string;
  r?: number;
  color?: string;
  strokeWidth?: number;
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
}

const gen = rough.generator();

export function StageNode({
  cx,
  cy,
  label,
  r = 55,
  color = '#e2e8f0',
  strokeWidth = 2,
  fontSize = 11,
  className,
  style,
}: StageNodeProps) {
  const lines = label.split('\n');
  const lineHeight = fontSize * 1.4;
  const totalHeight = lines.length * lineHeight;
  const startY = cy - totalHeight / 2 + lineHeight / 2;

  // Generate a rough circle — consistent via seed derived from position
  const seed = Math.abs(Math.round(cx + cy * 13)) % 100;
  const shape = gen.circle(cx, cy, r * 2, {
    roughness: 1.4,
    stroke: color,
    strokeWidth,
    fill: '#141920',
    fillStyle: 'solid',
    seed,
  });
  const paths = gen.toPaths(shape);

  return (
    <g className={className} style={style} filter="url(#node-glow)">
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={p.fill ?? 'none'}
          stroke={p.stroke ?? color}
          strokeWidth={p.strokeWidth ?? strokeWidth}
          opacity={1}
        />
      ))}
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={startY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize={fontSize}
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontWeight="700"
          letterSpacing="0.08em"
          opacity="0.95"
        >
          {line}
        </text>
      ))}
    </g>
  );
}
