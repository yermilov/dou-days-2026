import { CSSProperties } from 'react';

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
  bidirectional?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

function colorToMarkerId(color: string): string {
  const map: Record<string, string> = {
    '#f0883e': 'arrow-orange',
    '#7ee787': 'arrow-green',
    '#79c0ff': 'arrow-blue',
    '#ffd166': 'arrow-yellow',
    '#76e4f7': 'arrow-cyan',
    '#d2a8ff': 'arrow-purple',
    '#e2e8f0': 'arrow-white',
    '#8b99a8': 'arrow-dim',
  };
  return map[color] ?? 'arrow-white';
}

export function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  color = '#e2e8f0',
  dashed = false,
  bidirectional = false,
  label,
  className,
  style,
}: ConnectionLineProps) {
  const markerId = colorToMarkerId(color);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <g className={className} style={style}>
      <line
        x1={x1} y1={y1}
        x2={x2} y2={y2}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={dashed ? '6 4' : undefined}
        opacity="0.85"
        markerEnd={`url(#${markerId})`}
        markerStart={bidirectional ? `url(#${markerId})` : undefined}
      />
      {label && (
        <text
          x={mx}
          y={my - 8}
          textAnchor="middle"
          fill={color}
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.75"
        >
          {label}
        </text>
      )}
    </g>
  );
}
