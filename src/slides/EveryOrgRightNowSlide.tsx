import { SlideDefinition } from '../types/slides';
import { SlideItem } from '../components/SlideElements';
import { ORG_SECTIONS } from './orgArchetypes';

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

function EveryOrgContent({ revealStage }: { revealStage: number }) {
  const W = 700;
  const H = 500;
  const padTop = 10;
  const mu = W * 0.55;
  const sigma = W * 0.24;

  const path = buildCurvePoints(W, H, padTop, mu, sigma);
  const outlinePath = buildOutlinePath(W, H, padTop, mu, sigma);
  const boundaries = ORG_SECTIONS.slice(1).map(s => s.x1Pct * W);

  const activeIdx = revealStage > 0 ? ORG_SECTIONS.length - revealStage : -1;
  const activeSection = ORG_SECTIONS[activeIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem', marginRight: '-80px' }}>
      <style>{`
        .every-org-col .slide-item { margin-bottom: 0.5rem; }
        .every-org-col .section-header { margin-bottom: 1rem; }
      `}</style>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">тепер давайте поговоримо про</span>{' '}
        <span className="text-orange">команди і організації</span>
      </h2>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'center', minHeight: 0 }}>

        {/* Left column: section text — items only, vertically centered to align with curve peak */}
        <div
          key={activeSection?.key ?? 'intro'}
          className="every-org-col"
          style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {activeSection && (
            <>
              <div
                className="section-header"
                style={{
                  color: activeSection.color,
                  textShadow: `0 0 14px ${activeSection.glowColor}`,
                  paddingBottom: '0.4rem',
                  borderBottom: `1px solid color-mix(in srgb, ${activeSection.color} 28%, transparent)`,
                }}
              >
                {'// '}{activeSection.label}
              </div>

              {activeSection.items.map((item, j) => (
                <SlideItem key={j} delay={j * 0.08}>
                  <span style={{ color: activeSection.color, opacity: 0.88 }}>{item}</span>
                </SlideItem>
              ))}
            </>
          )}
        </div>

        {/* Right column: bell curve */}
        <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
          <svg
            viewBox={`0 0 ${W} ${H + 6}`}
            style={{ width: '100%', display: 'block' }}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {ORG_SECTIONS.map((s, i) => (
                <clipPath key={i} id={`clip-eo${i}`}>
                  <rect x={s.x1Pct * W} y={0} width={(s.x2Pct - s.x1Pct) * W} height={H + 10} />
                </clipPath>
              ))}
            </defs>

            {/* Section fills — only active one is bright */}
            {ORG_SECTIONS.map((s, i) => {
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
  maxRevealStages: ORG_SECTIONS.length,
  content: ({ revealStage }) => <EveryOrgContent revealStage={revealStage} />,
  notes:
    'Крива адопції ai. Stage 0: overview. Stages 1-4: скептики → більшість → ai-first → мультиплікатори (reveal справа наліво, щоб закінчити на найважливішому лівому кінці). Кожна секція показує що люди роблять; як їх ростити — на наступному слайді.',
};
