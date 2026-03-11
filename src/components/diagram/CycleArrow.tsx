import { CSSProperties } from 'react';

interface CycleArrowProps {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  color: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function arcPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function CycleArrow({
  cx,
  cy,
  r,
  startAngle,
  endAngle,
  color,
  strokeWidth = 2.5,
  className,
  style,
}: CycleArrowProps) {
  const start = arcPoint(cx, cy, r, startAngle);
  const end = arcPoint(cx, cy, r, endAngle);

  // Determine large-arc flag
  const delta = ((endAngle - startAngle) % 360 + 360) % 360;
  const largeArc = delta > 180 ? 1 : 0;

  // Marker ID derived from color
  const colorMap: Record<string, string> = {
    '#f0883e': 'arrow-orange',
    '#7ee787': 'arrow-green',
    '#79c0ff': 'arrow-blue',
    '#ffd166': 'arrow-yellow',
    '#76e4f7': 'arrow-cyan',
    '#d2a8ff': 'arrow-purple',
    '#e2e8f0': 'arrow-white',
    '#8b99a8': 'arrow-dim',
  };
  const markerId = colorMap[color] ?? 'arrow-white';

  const d = `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity="0.85"
      markerEnd={`url(#${markerId})`}
      className={className}
      style={style}
    />
  );
}
