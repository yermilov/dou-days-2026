const ORANGE = '#f0883e';

export const PULSE_STYLES = `
  @keyframes node-pulse {
    0%   { transform: scale(1);   opacity: 0.75; }
    60%  { transform: scale(1.35); opacity: 0; }
    100% { transform: scale(1.35); opacity: 0; }
  }
  .node-pulse-ring {
    animation: node-pulse 1.6s ease-out infinite;
  }
  @keyframes claude-icon-pop {
    0%   { opacity: 0; transform: scale(0.4); }
    60%  { opacity: 1; transform: scale(1.15); }
    100% { opacity: 1; transform: scale(1); }
  }
  .claude-icon-appear {
    animation: claude-icon-pop 0.4s ease-out forwards;
    transform-box: fill-box;
    transform-origin: center;
  }
`;

export function PulseRing({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={ORANGE}
      strokeWidth={2.5}
      className="node-pulse-ring"
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

// Inline Claude/Anthropic logo as SVG path — no external asset needed
export function ClaudeIcon({ cx, cy, size = 16 }: { cx: number; cy: number; size?: number }) {
  const s = size / 24;
  return (
    <g transform={`translate(${cx}, ${cy})`} style={{ filter: 'drop-shadow(0 0 4px #f0883e)' }}>
      <g className="claude-icon-appear">
        <g transform={`translate(${-size / 2}, ${-size / 2}) scale(${s})`}>
          <circle cx={12} cy={12} r={13} fill="#1a1f26" stroke={ORANGE} strokeWidth={1.2} />
          <path
            d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
            fill={ORANGE}
          />
        </g>
      </g>
    </g>
  );
}
