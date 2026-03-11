import { CSSProperties, ReactNode } from 'react';

interface DiagramCanvasProps {
  viewBox?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ARROW_COLORS = [
  { id: 'arrow-orange', color: '#f0883e' },
  { id: 'arrow-green',  color: '#7ee787' },
  { id: 'arrow-blue',   color: '#79c0ff' },
  { id: 'arrow-yellow', color: '#ffd166' },
  { id: 'arrow-cyan',   color: '#76e4f7' },
  { id: 'arrow-purple', color: '#d2a8ff' },
  { id: 'arrow-white',  color: '#e2e8f0' },
  { id: 'arrow-dim',    color: '#8b99a8' },
];

// Tint white-on-black PNGs to actor color.
// A' = 5*R - 1.0: dark bg (R≈0.15) → A≈-0.25→0 (invisible), white strokes (R≈1) → A=4→1 (opaque).
// Color channels multiplied by 1.6 × actor color component for a vivid, saturated result.
const TINT_FILTERS = [
  { id: 'tint-orange', r: 0.94, g: 0.53, b: 0.24 },
  { id: 'tint-green',  r: 0.49, g: 0.91, b: 0.53 },
  { id: 'tint-blue',   r: 0.47, g: 0.75, b: 1.00 },
  { id: 'tint-yellow', r: 1.00, g: 0.82, b: 0.40 },
  { id: 'tint-cyan',   r: 0.46, g: 0.89, b: 0.97 },
];

const GLOW_FILTERS = [
  { id: 'glow-orange', color: '#f0883e' },
  { id: 'glow-green',  color: '#7ee787' },
  { id: 'glow-blue',   color: '#79c0ff' },
  { id: 'glow-yellow', color: '#ffd166' },
  { id: 'glow-cyan',   color: '#76e4f7' },
];

export function DiagramCanvas({
  viewBox = '0 0 1000 580',
  children,
  className,
  style,
}: DiagramCanvasProps) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      height="100%"
      className={className}
      style={{ width: 'auto', maxWidth: '100%', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {ARROW_COLORS.map(({ id, color }) => (
          <marker key={id} id={id} markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={color} />
          </marker>
        ))}

        {/* Bold tint: A' = 5R - 1, color = 1.6 × actor component */}
        {TINT_FILTERS.map(({ id, r, g, b }) => (
          <filter key={id} id={id} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={`
              ${(r * 1.6).toFixed(3)} 0 0 0 0
              ${(g * 1.6).toFixed(3)} 0 0 0 0
              ${(b * 1.6).toFixed(3)} 0 0 0 0
              5                       0 0 0 -1
            `} />
          </filter>
        ))}

        {GLOW_FILTERS.map(({ id, color }) => (
          <filter key={id} id={id} x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={color} floodOpacity="0.5" />
          </filter>
        ))}

        <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#141920" />
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
      </radialGradient>
      <rect width="100%" height="100%" fill="url(#vignette)" />

      {children}
    </svg>
  );
}
