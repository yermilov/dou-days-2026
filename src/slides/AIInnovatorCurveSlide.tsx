import { SlideDefinition } from '../types/slides';

// DOU palette — JS constants are the design-system-sanctioned exception
// for SVG fill/stroke. Mirror --dou-magenta/--dou-mint/--dou-cyan/--dou-violet
// in src/styles/theme.css.
const DOU_MAGENTA = '#FF16B1';
const DOU_MINT = '#02FEB9';
const DOU_CYAN = '#02D6FE';
const DOU_VIOLET = '#7626FF';

const CURVE_STYLES = `
  @keyframes mysterGlow {
    0%, 100% { opacity: 0.7; text-shadow: 0 0 12px ${DOU_MAGENTA}, 0 0 24px ${DOU_MAGENTA}; }
    50%       { opacity: 1;   text-shadow: 0 0 20px ${DOU_MAGENTA}, 0 0 40px ${DOU_MAGENTA}, 0 0 60px rgba(255,22,177,0.4); }
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
  return (
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
    ` L${W},${H} L0,${H} Z`
  );
}

function AIInnovatorCurveContent() {
  const W = 1400;
  const H = 540;        // curve area
  const BULLET_BAND = 200; // space below curve for two columns of bullets
  const padTop = 20;
  const padBot = 0;

  const path = buildCurvePoints(W, H, padTop, padBot);
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
  const b1 = W * 0.15; // 0–15%: Anthropic / всередині
  const b2 = W * 0.42; // 15–42%: ai-first / інженери/команди
  const b3 = W * 0.75; // 42–75%: Anthropic / публічно

  const sections = [
    { x1: 0,  x2: b1, color: DOU_MAGENTA },
    { x1: b1, x2: b2, color: DOU_MINT },
    { x1: b2, x2: b3, color: DOU_CYAN },
    { x1: b3, x2: W,  color: DOU_VIOLET },
  ];

  const bullets: { section: number; items: string[] }[] = [
    {
      section: 1,
      items: [
        'активатор скілів',
        'метрики скілів',
        'воркфлов агентів',
        'треси агентів',
      ],
    },
    {
      section: 2,
      items: [
        'маркетплейс плагінів',
        'мета-скіли',
        'авто-підтвердження',
        'ai-ревʼю коду',
      ],
    },
  ];

  const labels = [
    { section: 0, text: 'Anthropic', text2: 'всередині' },
    { section: 1, text: 'AI-first', text2: 'інженери/команди' },
    { section: 2, text: 'Anthropic', text2: 'публічно' },
    { section: 3, text: 'більшість', text2: '' },
  ];

  const sectionCx = (s: { x1: number; x2: number }) => ((s.x1 + s.x2) / 2).toFixed(1);
  const bulletY = H + 36;
  const bulletLineH = 38;

  return (
    <div className="ainnovator-curve-body">
      <style>{CURVE_STYLES}</style>

      <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
        <h2>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--крива-ai-інноваторів</span>
        </h2>
      </div>

      <div className="ainnovator-curve-body__media">
        <svg
          viewBox={`0 0 ${W} ${H + BULLET_BAND}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            overflow: 'visible',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {sections.map((s, i) => (
              <clipPath key={i} id={`clip-s${i}`}>
                <rect x={s.x1} y={0} width={s.x2 - s.x1} height={H + BULLET_BAND + 20} />
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
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Baseline */}
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

          {/* Vertical dividers */}
          {[b1, b2, b3].map((bx, i) => (
            <line
              key={i}
              x1={bx}
              y1={padTop}
              x2={bx}
              y2={H + BULLET_BAND}
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
                  y={padTop - 38}
                  textAnchor="middle"
                  fill={s.color}
                  fontSize={26}
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight={600}
                >
                  {lbl.text}
                </text>
                {lbl.text2 && (
                  <text
                    x={cx}
                    y={padTop - 12}
                    textAnchor="middle"
                    fill={s.color}
                    fontSize={24}
                    fontFamily="'IBM Plex Sans', sans-serif"
                    fontWeight={500}
                    opacity={0.9}
                  >
                    {lbl.text2}
                  </text>
                )}
              </g>
            );
          })}

          {/* Section 0 "????" glowing text inside curve */}
          {(() => {
            const s = sections[0];
            const cx = parseFloat(sectionCx(s));
            const midY = H * 0.62;
            return (
              <text
                x={cx}
                y={midY}
                textAnchor="middle"
                fill={DOU_MAGENTA}
                fontSize={40}
                fontFamily="'IBM Plex Sans', sans-serif"
                fontWeight={700}
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
            return (
              <g key={section}>
                {items.map((item, j) => (
                  <text
                    key={j}
                    x={cx}
                    y={bulletY + j * bulletLineH}
                    textAnchor="middle"
                    fill={s.color}
                    fillOpacity={0.7}
                    fontSize={24}
                    fontFamily="'IBM Plex Sans', sans-serif"
                    fontWeight={500}
                  >
                    {item}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export const AIInnovatorCurveSlide: SlideDefinition = {
  id: 'ai-innovator-curve',
  content: <AIInnovatorCurveContent />,
  notes:
    'Крива адопції інновацій Роджерса, прикладена до AI. Секція 1: Anthropic внутрішньо (чорна скринька). Секція 2: ai-first інженери/команди — активатор скілів, метрики, воркфлов агентів, треси. Секція 3: Anthropic публічно — маркетплейс плагінів, мета-скіли. Секція 4: більшість — ще копіпастять із ChatGPT.',
};
