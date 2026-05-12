import { SlideDefinition, SlideContentProps } from '../types/slides';

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

function AIInnovatorCurveContent({ revealStage }: { revealStage: number }) {
  // viewBox is wider (1700) and shorter aspect-wise so the SVG renders larger
  // inside the slide. padTop and BULLET_BAND grow proportionally so the
  // section labels above the curve and the bullet columns below can fit body
  // text at standard size.
  const W = 1700;
  const H = 540;        // curve area — let the bell fill the space above bullets
  const BULLET_BAND = 240; // just enough for the four-row bullet columns
  const padTop = 100;
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
        'збереження сесій'
      ],
    },
    {
      section: 2,
      items: [
        'маркетплейс плагінів',
        'мета-скіли',
        'авто-підтвердження доступів',
        'AI код-ревʼю',
      ],
    },
  ];

  const labels = [
    { section: 0, text: 'Anthropic', text2: 'всередині' },
    { section: 1, text: 'AI-first', text2: 'команди' },
    { section: 2, text: 'Anthropic', text2: 'публічно' },
    { section: 3, text: 'більшість', text2: '' },
  ];

  const sectionCx = (s: { x1: number; x2: number }) => ((s.x1 + s.x2) / 2).toFixed(1);
  const bulletY = H + 50;  // gap between curve baseline and first bullet
  const bulletLineH = 50;
  // Two-line section label band above the curve — baselines computed so the
  // pair sits inside the padTop reserve without bumping the slide chrome.
  const topLabelY = 35;
  const subtitleY = 85;
  // SVG text uses the deck's body token; in SVG user units this means
  // labels/bullets stay visually consistent with bullets in other slides.
  const TEXT_BODY_STYLE: React.CSSProperties = {
    fontSize: 'var(--slide-text-body)',
    fontFamily: "'IBM Plex Sans', sans-serif",
  };

  // 4 reveal stages, right-to-left:
  //   stage 0 → section 3 (більшість, violet)
  //   stage 1 → section 2 (Anthropic публічно, cyan)
  //   stage 2 → section 1 (AI-first команди, mint)
  //   stage 3 → section 0 (Anthropic всередині, magenta — "????")
  const activeIdx = sections.length - 1 - revealStage;
  const sectionOpacity = (i: number) =>
    i === activeIdx ? 1 : 0.18;

  return (
    <div className="ainnovator-curve-body">
      <style>{CURVE_STYLES}</style>

      <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">знайдіть своє</span>{' '}
          <span className="text-orange">місце</span>
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
              <clipPath key={`clip-${i}`} id={`clip-s${i}`}>
                <rect x={s.x1} y={0} width={s.x2 - s.x1} height={H + BULLET_BAND + 20} />
              </clipPath>
            ))}
            {/* Vertical gradient per section — saturated at the baseline,
                fades to transparent toward the top of the curve so the
                fill reads as soft glow rather than a flat colored block. */}
            {sections.map((s, i) => (
              <linearGradient
                key={`grad-${i}`}
                id={`grad-s${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity={0} />
                <stop offset="70%" stopColor={s.color} stopOpacity={0.18} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.32} />
              </linearGradient>
            ))}
            {/* Soft mint glow behind the curve outline. */}
            <filter id="curve-glow" x="-5%" y="-15%" width="110%" height="130%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Filled curve — gradient per section, clipped; inactive sections
              fade back so the active one reads as the focus. */}
          {sections.map((_, i) => (
            <path
              key={i}
              d={path}
              fill={`url(#grad-s${i})`}
              clipPath={`url(#clip-s${i})`}
              opacity={sectionOpacity(i)}
              style={{ transition: 'opacity 0.45s ease' }}
            />
          ))}

          {/* Soft glow underlay for the curve outline. */}
          <path
            d={outlinePath}
            fill="none"
            stroke={DOU_MINT}
            strokeOpacity={0.22}
            strokeWidth={6}
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#curve-glow)"
          />

          {/* Curve outline */}
          <path
            d={outlinePath}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Baseline */}
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />

          {/* Vertical dividers — fade from solid near the curve to dim below. */}
          {[b1, b2, b3].map((bx, i) => (
            <line
              key={i}
              x1={bx}
              y1={padTop}
              x2={bx}
              y2={H + BULLET_BAND}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          ))}

          {/* Section labels above curve (two lines) */}
          {labels.map((lbl, i) => {
            const s = sections[i];
            const cx = parseFloat(sectionCx(s));
            return (
              <g
                key={i}
                opacity={sectionOpacity(i)}
                style={{ transition: 'opacity 0.45s ease' }}
              >
                <text
                  x={cx}
                  y={topLabelY}
                  textAnchor="middle"
                  fill={s.color}
                  fontWeight={600}
                  style={TEXT_BODY_STYLE}
                >
                  {lbl.text}
                </text>
                {lbl.text2 && (
                  <text
                    x={cx}
                    y={subtitleY}
                    textAnchor="middle"
                    fill={s.color}
                    fontWeight={500}
                    opacity={0.9}
                    style={TEXT_BODY_STYLE}
                  >
                    {lbl.text2}
                  </text>
                )}
              </g>
            );
          })}

          {/* Section 0 "????" glowing text inside curve — wrapped in a <g> so
              the section-active opacity multiplies with the mysterGlow
              animation's own opacity pulse instead of being overridden. */}
          {(() => {
            const s = sections[0];
            const cx = parseFloat(sectionCx(s));
            const midY = H * 0.62;
            return (
              <g
                opacity={sectionOpacity(0)}
                style={{ transition: 'opacity 0.45s ease' }}
              >
                <text
                  x={cx}
                  y={midY}
                  textAnchor="middle"
                  fill={DOU_MAGENTA}
                  fontWeight={700}
                  style={{
                    ...TEXT_BODY_STYLE,
                    animation: 'mysterGlow 2.4s ease-in-out infinite',
                    letterSpacing: '0.15em',
                  }}
                >
                  ????
                </text>
              </g>
            );
          })()}

          {/* Bullet items below curve */}
          {bullets.map(({ section, items }) => {
            const s = sections[section];
            const cx = parseFloat(sectionCx(s));
            return (
              <g
                key={section}
                opacity={sectionOpacity(section)}
                style={{ transition: 'opacity 0.45s ease' }}
              >
                {items.map((item, j) => (
                  <text
                    key={j}
                    x={cx}
                    y={bulletY + j * bulletLineH}
                    textAnchor="middle"
                    fill={s.color}
                    fillOpacity={0.85}
                    fontWeight={500}
                    style={TEXT_BODY_STYLE}
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
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <AIInnovatorCurveContent revealStage={revealStage} />,
  notes:
    'Крива адопції інновацій Роджерса, прикладена до AI. Чотири стадії, справа наліво: stage 0 — більшість (violet, копіпастять з ChatGPT); stage 1 — Anthropic публічно (cyan, маркетплейс/мета-скіли/auto-mode/ai code review); stage 2 — AI-first команди (mint, активатор + збереження сесій); stage 3 — Anthropic всередині (magenta, ????). Активна секція — повна непрозорість, інші ~0.18.',
};
