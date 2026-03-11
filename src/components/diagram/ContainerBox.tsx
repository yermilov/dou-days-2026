import { CSSProperties } from 'react';

interface ContainerBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color?: string;
  rx?: number;
  className?: string;
  style?: CSSProperties;
}

export function ContainerBox({
  x,
  y,
  width,
  height,
  label,
  color = '#8b99a8',
  rx = 12,
  className,
  style,
}: ContainerBoxProps) {
  return (
    <g className={className} style={style}>
      <rect
        x={x} y={y}
        width={width} height={height}
        rx={rx}
        fill="rgba(255,255,255,0.02)"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="8 4"
        opacity="0.7"
      />
      {/* Corner label tab */}
      <rect
        x={x + 10} y={y - 9}
        width={label.length * 7.5 + 16} height={18}
        rx="4"
        fill="#0a0e14"
        stroke={color}
        strokeWidth="1"
        opacity="0.9"
      />
      <text
        x={x + 18} y={y + 0.5}
        dominantBaseline="middle"
        fill={color}
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
        letterSpacing="0.06em"
        opacity="0.9"
      >
        {label}
      </text>
    </g>
  );
}
