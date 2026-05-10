import { useEffect } from 'react';
import { SlideDefinition } from '../types/slides';
import agentsSmithImage from '/agents-smith.png?url';

const MATRIX_STYLES = `
  @keyframes matrixFall {
    0%   { transform: translateY(-100%); opacity: 0; }
    5%   { opacity: 1; }
    90%  { opacity: 0.8; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  @keyframes matrixGlow {
    0%, 100% { text-shadow: 0 0 8px var(--dou-mint), 0 0 20px color-mix(in srgb, var(--dou-mint) 35%, transparent); }
    50%       { text-shadow: 0 0 14px var(--dou-mint), 0 0 35px color-mix(in srgb, var(--dou-mint) 60%, transparent); }
  }

  .stage-viewport.agents-section-viewport .sonar-pattern { display: none; }
  .stage-viewport.agents-section-viewport .slide-chrome__city-badge,
  .stage-viewport.agents-section-viewport .slide-chrome__logo-image {
    opacity: 0;
  }

  .matrix-rain-col {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: matrixFall linear infinite;
    color: var(--dou-mint);
    font-family: var(--font-mono);
    font-size: 1.1rem;
    line-height: 1.4;
    pointer-events: none;
    user-select: none;
  }

  .matrix-rain-col span:first-child {
    color: #ffffff;
    text-shadow: 0 0 12px var(--dou-mint), 0 0 24px var(--dou-mint);
    font-weight: 700;
  }

  .matrix-rain-col span {
    opacity: 0.85;
    animation: matrixGlow 3s ease-in-out infinite;
  }

  .matrix-rain-col span:nth-child(2)  { opacity: 0.75; animation-delay: 0.2s; }
  .matrix-rain-col span:nth-child(3)  { opacity: 0.65; animation-delay: 0.4s; }
  .matrix-rain-col span:nth-child(4)  { opacity: 0.55; animation-delay: 0.6s; }
  .matrix-rain-col span:nth-child(5)  { opacity: 0.45; animation-delay: 0.8s; }
  .matrix-rain-col span:nth-child(6)  { opacity: 0.35; animation-delay: 1.0s; }
  .matrix-rain-col span:nth-child(7)  { opacity: 0.25; animation-delay: 1.2s; }
  .matrix-rain-col span:nth-child(8)  { opacity: 0.15; animation-delay: 1.4s; }

  .agents-section-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center,
      transparent 30%,
      color-mix(in srgb, var(--dou-near-black) 70%, transparent) 100%);
    pointer-events: none;
  }
`;

const VIEWPORT_BG = `radial-gradient(ellipse at center,
    color-mix(in srgb, var(--dou-deep-purple) 30%, var(--dou-near-black)) 0%,
    var(--dou-near-black) 70%)`;

// Katakana + digits + Cyrillic for Matrix-style rain
const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンАБВГДЄЖИЙКЛМНПРСТУФХЦЧШЩЯ010111001011101001';

interface RainColumn {
  left: number;
  chars: string[];
  duration: number;
  delay: number;
  opacity: number;
}

const COLUMNS: RainColumn[] = Array.from({ length: 28 }, (_, i) => {
  const seed = (i * 137.508 + 42) % 1;
  const left = (i / 28) * 98 + 1;
  const duration = 4 + ((i * 73) % 60) / 10;
  const delay = -((i * 53) % (duration * 10)) / 10;
  const colLen = 6 + ((i * 37) % 5);
  const chars = Array.from({ length: colLen }, (__, j) =>
    CHARS[Math.floor(Math.abs(Math.sin(i * 31 + j * 17)) * CHARS.length)],
  );
  return { left, chars, duration, delay, opacity: 0.5 + seed * 0.5 };
});

function MatrixRain() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {COLUMNS.map((col, i) => (
        <div
          key={i}
          className="matrix-rain-col"
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
            opacity: col.opacity,
          }}
        >
          {col.chars.map((ch, j) => (
            <span key={j}>{ch}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function AgentsSectionContent() {
  useEffect(() => {
    const vp = document.querySelector<HTMLElement>('.stage-viewport');
    if (!vp) return;
    const prevBg = vp.style.background;
    vp.classList.add('agents-section-viewport');
    vp.style.background = VIEWPORT_BG;
    return () => {
      vp.classList.remove('agents-section-viewport');
      vp.style.background = prevBg;
    };
  }, []);

  return (
    <>
      <style>{MATRIX_STYLES}</style>

      {/* Break out of .slide--body padding so the Matrix rain fills the
          stage and the title + portrait can claim the full canvas. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <MatrixRain />
        <div className="agents-section-overlay" />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            gap: 'var(--space-xl)',
            padding: '60px 120px',
          }}
        >
          {/* Title card — matches EngineerSection / TeamSection style. */}
          <h2
            style={{
              flex: '0 0 auto',
              alignSelf: 'flex-start',
              display: 'inline-block',
              padding: '0.55rem 1.4rem',
              background:
                'color-mix(in srgb, var(--dou-near-black) 62%, transparent)',
              backdropFilter: 'blur(18px) saturate(140%)',
              WebkitBackdropFilter: 'blur(18px) saturate(140%)',
              borderRadius: '14px',
              boxShadow:
                '0 12px 36px color-mix(in srgb, var(--dou-near-black) 70%, transparent)',
              textAlign: 'left',
            }}
          >
            <span style={{ display: 'block' }}>
              <span className="text-dim">//</span>{' '}
              <span className="text-orange">автономні та напівавтономні</span>
            </span>
            <span style={{ display: 'block' }}>
              <span className="text-dim">//</span>{' '}
              <span className="text-green">агенти</span>
            </span>
          </h2>

          {/* Agent Smiths portrait — claims the rest of the stage height,
              anchored to the bottom edge. */}
          <div
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <img
              src={agentsSmithImage}
              alt="Agent Smiths"
              loading="lazy"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '14px',
                border: '1px solid color-mix(in srgb, var(--dou-mint) 30%, transparent)',
                boxShadow:
                  '0 0 40px color-mix(in srgb, var(--dou-mint) 18%, transparent), 0 0 80px color-mix(in srgb, var(--dou-mint) 8%, transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const AgentsSectionSlide: SlideDefinition = {
  id: 'agents-section',
  background: VIEWPORT_BG,
  content: () => <AgentsSectionContent />,
  notes:
    'Section transition into the agents subsection. Matrix rain з кирилицею + катаканою натякає на перехід від детермінованих скілів до автономних воркфлоу. Заголовок: $ skills --агенти / // автономні та напівавтономні воркфлови.',
};
