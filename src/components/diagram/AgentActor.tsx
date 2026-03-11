import { CSSProperties } from 'react';
import agentSrc from '/actor-agent.png?url';

interface AgentActorProps {
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

export function AgentActor({
  x,
  y,
  size = 40,
  color,
  label,
  className,
  style,
}: AgentActorProps) {
  const filterId = COLOR_FILTER[color] ?? 'tint-green';
  const half = size / 2;

  return (
    <g className={className} style={style}>
      <image
        href={agentSrc}
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
          fontSize={size * 0.22}
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
