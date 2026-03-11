import { CSSProperties } from 'react';
import humanSrc from '/actor-human.png?url';

interface HumanActorProps {
  x: number;
  y: number;
  size?: number;
  color: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const COLOR_FILTER: Record<string, string> = {
  '#f0883e': 'tint-orange',
  '#7ee787': 'tint-green',
  '#79c0ff': 'tint-blue',
  '#ffd166': 'tint-yellow',
  '#76e4f7': 'tint-cyan',
};

export function HumanActor({
  x,
  y,
  size = 44,
  color,
  label,
  className,
  style,
}: HumanActorProps) {
  const filterId = COLOR_FILTER[color] ?? 'tint-orange';
  const half = size / 2;

  return (
    <g className={className} style={style}>
      <image
        href={humanSrc}
        x={x - half}
        y={y - half}
        width={size}
        height={size}
        filter={`url(#${filterId})`}
      />
      {label && (
        <text
          x={x}
          y={y + half + 10}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.2}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
          opacity="0.7"
        >
          {label}
        </text>
      )}
    </g>
  );
}
