import { CSSProperties } from 'react';
import rough from 'roughjs';

interface FlowArrowProps {
  d: string;
  color: string;
  strokeWidth?: number;
  dashed?: boolean;
  markerId?: string;
  glowId?: string;
  className?: string;
  style?: CSSProperties;
}

const gen = rough.generator();

export function FlowArrow({
  d,
  color,
  strokeWidth = 2.5,
  dashed = false,
  markerId,
  glowId,
  className,
  style,
}: FlowArrowProps) {
  const markerEnd = markerId ? `url(#${markerId})` : undefined;

  // roughjs path for the chalk body
  const shape = gen.path(d, {
    roughness: 0.9,
    stroke: color,
    strokeWidth,
    fill: 'none',
    seed: 42,
  });
  const paths = gen.toPaths(shape);

  return (
    <g className={className} style={style} filter={glowId ? `url(#${glowId})` : undefined}>
      {/* Ambient halo */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 3.5}
        strokeLinecap="round"
        strokeDasharray={dashed ? '7 5' : undefined}
        opacity="0.07"
      />
      {/* Roughjs chalk body */}
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={color}
          strokeWidth={p.strokeWidth ?? strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashed ? '7 5' : undefined}
          opacity={dashed ? 0.72 : 0.9}
          markerEnd={i === paths.length - 1 ? markerEnd : undefined}
        />
      ))}
      {/* Chalk dust highlight */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={strokeWidth * 0.3}
        strokeLinecap="round"
        strokeDasharray={dashed ? '7 5' : undefined}
        opacity="0.5"
      />
    </g>
  );
}
