import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

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

interface Section {
  key: string;
  label: string;
  color: string;
  glowColor: string;
  x1Pct: number;
  x2Pct: number;
  items: ReactNode[];
  growItems: ReactNode[];
}

const SECTIONS: Section[] = [
  {
    key: 'multipliers',
    label: 'мультиплікатори',
    color: '#f0883e',
    glowColor: 'rgba(240,136,62,0.4)',
    x1Pct: 0,
    x2Pct: 0.18,
    items: [
      'масштабують ai на команди',
      'пишуть скіли, плагіни, інструменти',
      'будують software factories',
    ],
    growItems: [
      '1–2 на компанію, щоб запустити процес',
      <>
        антипатерн <Emphasis color="orange">«ai-enablement team»</Emphasis> з блюпринтами — краще будуйте ai-інфраструктуру
      </>,
    ],
  },
  {
    key: 'engineers',
    label: 'ai-first інженери',
    color: '#7ee787',
    glowColor: 'rgba(126,231,135,0.35)',
    x1Pct: 0.18,
    x2Pct: 0.42,
    items: [
      'досліджують плагіни та скіли',
      'пробують нові підходи',
      'end-to-end agentic engineering',
      'делегують високорівневі задачі ai',
    ],
    growItems: [
      '1–2 в команду, щоб запустити процес',
      'дайте простір і час експериментувати',
      'з’єднуйте успішних між командами',
      'популяризуйте роботу — demos, fun days, slack',
    ],
  },
  {
    key: 'majority',
    label: 'консервативна більшість',
    color: '#79c0ff',
    glowColor: 'rgba(121,192,255,0.3)',
    x1Pct: 0.42,
    x2Pct: 0.74,
    items: [
      'генерують методи та тести',
      'досліджують кодбази з ai-агентами',
      'vibe-code у незнайомих стеках',
      '«поясни, що робить X»',
    ],
    growItems: [
      <>
        антипатерн <Emphasis color="orange">«ai згори»</Emphasis> — мандати від керівництва не працюють
      </>,
    ],
  },
  {
    key: 'deniers',
    label: 'ai-скептики',
    color: '#d2a8ff',
    glowColor: 'rgba(210,168,255,0.3)',
    x1Pct: 0.74,
    x2Pct: 1,
    items: [
      '«ще не пробував»',
      '«пробував, не вийшло»',
      '«я швидший без нього»',
      '«це просто хайп з linkedin»',
    ],
    growItems: [],
  },
];

function EveryOrgContent({ revealStage }: { revealStage: number }) {
  const W = 700;
  const H = 500;
  const padTop = 10;
  const mu = W * 0.55;
  const sigma = W * 0.24;

  const path = buildCurvePoints(W, H, padTop, mu, sigma);
  const outlinePath = buildOutlinePath(W, H, padTop, mu, sigma);
  const boundaries = SECTIONS.slice(1).map(s => s.x1Pct * W);

  const activeIdx = revealStage > 0 ? SECTIONS.length - revealStage : -1;
  const activeSection = SECTIONS[activeIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem', marginRight: '-80px' }}>
      <style>{`
        .every-org-col .slide-item { margin-bottom: 0.25rem; }
        .every-org-col .section-header { margin-top: 0.35rem; margin-bottom: 0.2rem; }
      `}</style>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">всі організації</span>{' '}
        <span className="text-orange">починають однаково</span>
      </h2>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left column: section text */}
        <div
          key={activeSection?.key ?? 'intro'}
          className="every-org-col"
          style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
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

              {activeSection.growItems.length > 0 && (
                <>
                  <div
                    style={{
                      marginTop: '0.35rem',
                      paddingTop: '0.35rem',
                      borderTop: `1px solid color-mix(in srgb, ${activeSection.color} 35%, transparent)`,
                    }}
                  />
                  <div
                    className="section-header"
                    style={{ color: activeSection.color, opacity: 0.85 }}
                  >
                    {'// '}щоб виростити
                  </div>
                  {activeSection.growItems.map((item, j) => (
                    <SlideItem
                      key={`grow-${j}`}
                      delay={(activeSection.items.length + j) * 0.08}
                    >
                      <span style={{ color: activeSection.color, opacity: 0.85 }}>{item}</span>
                    </SlideItem>
                  ))}
                </>
              )}
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
  notes:
    'Крива адопції ai. Stage 0: overview. Stages 1-4: скептики → більшість → ai-first → мультиплікатори (reveal справа наліво, щоб закінчити на найважливішому левому кінці). Кожна секція показує // що вони роблять і // щоб виростити — крім скептиків, яких не конвертувати.',
};
