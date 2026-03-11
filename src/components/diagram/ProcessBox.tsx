import { CSSProperties } from 'react';

interface ProcessBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color?: string;
  sublabel?: string;
  className?: string;
  style?: CSSProperties;
}

export function ProcessBox({
  x,
  y,
  width,
  height,
  label,
  color = '#e2e8f0',
  sublabel,
  className,
  style,
}: ProcessBoxProps) {
  const cx = x + width / 2;
  const cy = y + height / 2;

  return (
    <g className={className} style={style}>
      <rect
        x={x} y={y}
        width={width} height={height}
        rx="8"
        fill="rgba(10, 14, 20, 0.9)"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.9"
      />
      <text
        x={cx}
        y={sublabel ? cy - 8 : cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="13"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
        letterSpacing="0.04em"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.6"
          letterSpacing="0.03em"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}
