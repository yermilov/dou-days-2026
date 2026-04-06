import { SlideDefinition } from '../types/slides';
import { SlideItem } from '../components/SlideElements';

// Bell curve helpers
function buildCurvePoints(W: number, H: number, padTop: number, mu: number, sigma: number): string {
  const availH = H - padTop;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * W;
    const norm = Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
    const y = padTop + availH * (1 - norm);
    pts.push([x, y]);
  }
  return (
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
    ` L${W},${H} L0,${H} Z`
  );
}

function buildOutlinePath(W: number, H: number, padTop: number, mu: number, sigma: number): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * W;
    const norm = Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
    const y = padTop + (H - padTop) * (1 - norm);
    pts.push([x, y]);
  }
  return pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
}

const SECTIONS = [
  {
    key: 'multipliers',
    label: 'ai multipliers',
    color: '#f0883e',
    glowColor: 'rgba(240,136,62,0.4)',
    x1Pct: 0,
    x2Pct: 0.18,
    items: [
      'scale adoption across teams',
      'author skills, plugins, tools',
      'build software factories',
    ],
  },
  {
    key: 'engineers',
    label: 'ai-first engineers',
    color: '#7ee787',
    glowColor: 'rgba(126,231,135,0.35)',
    x1Pct: 0.18,
    x2Pct: 0.42,
    items: [
      'explore plugins & skills',
      'follow novel approaches',
      'end-to-end agentic engineering',
      'delegate high-level tasks to AI',
    ],
  },
  {
    key: 'majority',
    label: 'conservative majority',
    color: '#79c0ff',
    glowColor: 'rgba(121,192,255,0.3)',
    x1Pct: 0.42,
    x2Pct: 0.74,
    items: [
      'generate methods & test files',
      'explore codebases with AI agents',
      'vibe-code in unfamiliar stacks',
      '"explain what X does"',
    ],
  },
  {
    key: 'deniers',
    label: 'ai deniers',
    color: '#d2a8ff',
    glowColor: 'rgba(210,168,255,0.3)',
    x1Pct: 0.74,
    x2Pct: 1,
    items: [
      '"haven\'t tried it yet"',
      '"tried it, didn\'t work"',
      '"I\'m faster without it"',
      '"it\'s just LinkedIn hype"',
    ],
  },
];

function EveryOrgContent({ revealStage }: { revealStage: number }) {
  const W = 700;
  const H = 320;
  const padTop = 10;
  const mu = W * 0.58;
  const sigma = W * 0.18;

  const path = buildCurvePoints(W, H, padTop, mu, sigma);
  const outlinePath = buildOutlinePath(W, H, padTop, mu, sigma);
  const boundaries = SECTIONS.slice(1).map(s => s.x1Pct * W);

  const activeIdx = revealStage > 0 ? SECTIONS.length - revealStage : -1;
  const activeSection = SECTIONS[activeIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>
      <h2 style={{ flexShrink: 0 }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">org</span>{' '}
        <span className="text-orange">--adoption-curve</span>
      </h2>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left column: section text */}
        <div
          key={activeSection?.key ?? 'intro'}
          style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {activeSection && (
            <>
              <div
                className="section-header"
                style={{
                  color: activeSection.color,
                  textShadow: `0 0 10px ${activeSection.glowColor}`,
                }}
              >
                {'// '}{activeSection.label}
              </div>

              {activeSection.items.map((item, j) => (
                <SlideItem key={j} delay={j * 0.08}>
                  <span style={{ color: activeSection.color, opacity: 0.85 }}>{item}</span>
                </SlideItem>
              ))}
            </>
          )}
        </div>

        {/* Right column: bell curve */}
        <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
          <svg
            viewBox={`0 0 ${W} ${H + 40}`}
            style={{ width: '100%', display: 'block' }}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {SECTIONS.map((s, i) => (
                <clipPath key={i} id={`clip-eo${i}`}>
                  <rect x={s.x1Pct * W} y={0} width={(s.x2Pct - s.x1Pct) * W} height={H + 10} />
                </clipPath>
              ))}
            </defs>

            {/* Section fills — only active one is bright */}
            {SECTIONS.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <path
                  key={i}
                  d={path}
                  fill={s.color}
                  fillOpacity={isActive ? 0.5 : revealStage === 0 ? 0.15 : 0.06}
                  clipPath={`url(#clip-eo${i})`}
                  style={{ transition: 'fill-opacity 0.4s ease' }}
                />
              );
            })}

            {/* Curve outline */}
            <path
              d={outlinePath}
              fill="none"
              stroke="rgba(226,232,240,0.45)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Baseline */}
            <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(226,232,240,0.12)" strokeWidth={1} />

            {/* Vertical dividers */}
            {boundaries.map((bx, i) => (
              <line
                key={i}
                x1={bx}
                y1={padTop}
                x2={bx}
                y2={H + 5}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
            ))}

            {/* Section labels below baseline */}
            {SECTIONS.map((s, i) => {
              const cx = ((s.x1Pct + s.x2Pct) / 2) * W;
              const isActive = i === activeIdx;
              return (
                <text
                  key={i}
                  x={cx}
                  y={H + 28}
                  textAnchor="middle"
                  fill={s.color}
                  fontSize={14}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isActive ? '700' : '400'}
                  opacity={isActive ? 1 : revealStage === 0 ? 0.6 : 0.25}
                  style={{ transition: 'opacity 0.4s ease' }}
                >
                  {s.label}
                </text>
              );
            })}

            {/* Active section glow bar */}
            {activeSection && (
              <rect
                x={activeSection.x1Pct * W}
                y={H}
                width={(activeSection.x2Pct - activeSection.x1Pct) * W}
                height={3}
                fill={activeSection.color}
                opacity={0.8}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

export const EveryOrgRightNowSlide: SlideDefinition = {
  id: 'every-org-right-now',
  maxRevealStages: 4,
  content: ({ revealStage }) => <EveryOrgContent revealStage={revealStage} />,
  notes: 'Innovation adoption curve — reveal one section at a time. Stage 0: curve overview. Stages 1-4: ai multipliers, ai-first engineers, conservative majority, ai deniers.',
};
