interface SparkTrailProps {
  d: string;
  color: string;
  dur: number;
  count?: number;
  glowId?: string;
}

export function SparkTrail({ d, color, dur, count = 2, glowId }: SparkTrailProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const begin = `${-(i * dur / count)}s`;
        return (
          <circle key={i} r={3.5} fill={color} filter={glowId ? `url(#${glowId})` : undefined}>
            <animateMotion
              path={d}
              dur={`${dur}s`}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.1;1;0.8;0.5;0"
              keyTimes="0;0.05;0.25;0.7;0.9;1"
              dur={`${dur}s`}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1;3.5;4.5;3.5;2;1"
              keyTimes="0;0.1;0.3;0.6;0.85;1"
              dur={`${dur}s`}
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </>
  );
}
