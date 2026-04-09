import { SlideDefinition } from '../types/slides';

const CURVE_STYLES = `
  @keyframes mysterGlow {
    0%, 100% { opacity: 0.7; text-shadow: 0 0 12px #f0883e, 0 0 24px #f0883e; }
    50%       { opacity: 1;   text-shadow: 0 0 20px #f0883e, 0 0 40px #f0883e, 0 0 60px rgba(240,136,62,0.4); }
  }
`;

// Bell curve: normal distribution points across [0, W]
// peak at mu=75% of W (majority section), sigma=16% of W
function buildCurvePoints(W: number, H: number, padTop: number, padBot: number): string {
  const mu = W * 0.75;
  const sigma = W * 0.16;
  const availH = H - padTop - padBot;
  const pts: [number, number][] = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    const norm = Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
    const y = padTop + availH * (1 - norm);
    pts.push([x, y]);
  }
  // Close at bottom
  return (
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
    ` L${W},${H} L0,${H} Z`
  );
}

function AIInnovatorCurveContent() {
  const W = 1400;
  const H = 340;
  const padTop = 20;
  const padBot = 0;

  const path = buildCurvePoints(W, H, padTop, padBot);
  // Curve outline only (open path, no fill)
  const mu = W * 0.75;
  const sigma = W * 0.16;
  const outlinePts: [number, number][] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * W;
    const norm = Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
    const y = padTop + (H - padTop) * (1 - norm);
    outlinePts.push([x, y]);
  }
  const outlinePath = outlinePts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  // Section boundaries in pixels
  const b1 = W * 0.15; // 0–15%: anthropic internally
  const b2 = W * 0.42; // 15–42%: ai-first teams
  const b3 = W * 0.75; // 42–75%: anthropic publicly

  const sections = [
    { x1: 0,   x2: b1, color: '#f0883e', labelColor: '#f0883e', dimColor: 'rgba(240,136,62,0.55)' },
    { x1: b1,  x2: b2, color: '#7ee787', labelColor: '#7ee787', dimColor: 'rgba(126,231,135,0.55)' },
    { x1: b2,  x2: b3, color: '#79c0ff', labelColor: '#79c0ff', dimColor: 'rgba(121,192,255,0.55)' },
    { x1: b3,  x2: W,  color: '#d2a8ff', labelColor: '#d2a8ff', dimColor: 'rgba(210,168,255,0.55)' },
  ];

  // Bullet items below the curve per section
  const bullets: { section: number; items: string[] }[] = [
    {
      section: 1,
      items: [
        'skills activator',
        'skills metrics',
        'agentic workflows',
        'agents tracing',
      ],
    },
    {
      section: 2,
      items: ['plugins marketplace', 'meta skills', 'auto-approve'],
    },
    {
      section: 3,
      items: ['generate code'],
    },
  ];

  // Labels above curve
  const labels = [
    { section: 0, text: 'anthropic', text2: 'internally' },
    { section: 1, text: 'ai-first', text2: 'engineers/teams' },
    { section: 2, text: 'anthropic', text2: 'publicly' },
    { section: 3, text: 'majority', text2: '' },
  ];

  const sectionCx = (s: { x1: number; x2: number }) => ((s.x1 + s.x2) / 2).toFixed(1);

  // Bullet y-start (below curve bottom)
  const bulletY = H + 18;
  const bulletLineH = 28;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', width: '100%' }}>
      <style>{CURVE_STYLES}</style>

      <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 0 }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--ainnovator-curve</span>
        </h2>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H + 140}`}
        style={{
          width: '100%',
          height: 'calc(var(--vh-full) - 240px)',
          display: 'block',
          overflow: 'visible',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur-text" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          {sections.map((s, i) => (
            <clipPath key={i} id={`clip-s${i}`}>
              <rect x={s.x1} y={0} width={s.x2 - s.x1} height={H + 200} />
            </clipPath>
          ))}
        </defs>

        {/* Filled curve — one per section, clipped */}
        {sections.map((s, i) => (
          <path
            key={i}
            d={path}
            fill={s.color}
            fillOpacity={0.32}
            clipPath={`url(#clip-s${i})`}
          />
        ))}

        {/* Curve outline */}
        <path
          d={outlinePath}
          fill="none"
          stroke="rgba(226,232,240,0.55)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Baseline */}
        <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(226,232,240,0.15)" strokeWidth={1} />

        {/* Vertical dividers */}
        {[b1, b2, b3].map((bx, i) => (
          <line
            key={i}
            x1={bx}
            y1={padTop}
            x2={bx}
            y2={H + 140}
            stroke="rgba(255,255,255,0.13)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
        ))}

        {/* Section labels above curve (two lines) */}
        {labels.map((lbl, i) => {
          const s = sections[i];
          const cx = parseFloat(sectionCx(s));
          return (
            <g key={i}>
              <text
                x={cx}
                y={padTop - 32}
                textAnchor="middle"
                fill={s.labelColor}
                fontSize={20}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                {lbl.text}
              </text>
              {lbl.text2 && (
                <text
                  x={cx}
                  y={padTop - 10}
                  textAnchor="middle"
                  fill={s.labelColor}
                  fontSize={19}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  opacity={0.9}
                >
                  {lbl.text2}
                </text>
              )}
            </g>
          );
        })}

        {/* Section 1 "????" glowing text inside curve */}
        {(() => {
          const s = sections[0];
          const cx = parseFloat(sectionCx(s));
          // Y midpoint of curve in this section (roughly middle vertically)
          const midY = H * 0.65;
          return (
            <text
              x={cx}
              y={midY}
              textAnchor="middle"
              fill="#f0883e"
              fontSize={28}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="800"
              style={{ animation: 'mysterGlow 2.4s ease-in-out infinite' }}
            >
              ????
            </text>
          );
        })()}

        {/* Bullet items below curve */}
        {bullets.map(({ section, items }) => {
          const s = sections[section];
          const cx = parseFloat(sectionCx(s));
          const isBlurred = section === 1; // green section — disclosed later
          return (
            <g key={section} filter={isBlurred ? 'url(#blur-text)' : undefined}>
              {items.map((item, j) => (
                <text
                  key={j}
                  x={cx}
                  y={bulletY + j * bulletLineH}
                  textAnchor="middle"
                  fill={s.dimColor}
                  fontSize={17}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {item}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export const AIInnovatorCurveSlide: SlideDefinition = {
  id: 'ai-innovator-curve',
  content: <AIInnovatorCurveContent />,
  notes: 'Rogers Innovation Adoption Curve applied to AI adoption. Section 1: Anthropic internal (black box). Section 2: ai-first engineers/teams — skills activator, metrics, agentic workflows, traces. Section 3: Anthropic publicly — marketplaces, meta skills. Section 4: laggards — still copy-pasting from ChatGPT.',
};
