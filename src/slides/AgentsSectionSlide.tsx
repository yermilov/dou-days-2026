import agentsSmithImage from '/agents-smith.png?url';
import { SlideDefinition } from '../types/slides';

const MATRIX_STYLES = `
  @keyframes matrixFall {
    0%   { transform: translateY(-100%); opacity: 0; }
    5%   { opacity: 1; }
    90%  { opacity: 0.8; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  @keyframes matrixGlow {
    0%, 100% { text-shadow: 0 0 8px #7ee787, 0 0 20px rgba(126,231,135,0.4); }
    50%       { text-shadow: 0 0 14px #7ee787, 0 0 35px rgba(126,231,135,0.7), 0 0 60px rgba(126,231,135,0.2); }
  }

  @keyframes headGlow {
    0%, 100% { opacity: 0.95; }
    50%       { opacity: 1; }
  }

  .matrix-rain-col {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: matrixFall linear infinite;
    color: #7ee787;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.4;
    pointer-events: none;
    user-select: none;
  }

  .matrix-rain-col span:first-child {
    color: #e2e8f0;
    text-shadow: 0 0 12px #7ee787, 0 0 24px #7ee787;
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
    background: radial-gradient(ellipse at center, transparent 30%, rgba(10,14,20,0.7) 100%);
    pointer-events: none;
  }

  .agents-section-title {
    position: relative;
    z-index: 10;
    text-align: center;
    animation: headGlow 2.5s ease-in-out infinite;
  }
`;

// Katakana + digits + symbols for Matrix-style rain
const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01011100101110100111';

function randChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface RainColumn {
  left: number;      // percent
  chars: string[];
  duration: number;  // seconds
  delay: number;     // seconds
  opacity: number;
}

// Pre-generate deterministic columns (no random at render time for SSR safety)
const COLUMNS: RainColumn[] = Array.from({ length: 28 }, (_, i) => {
  const seed = (i * 137.508 + 42) % 1;
  const left = (i / 28) * 98 + 1;
  const duration = 4 + ((i * 73) % 60) / 10;
  const delay = -((i * 53) % (duration * 10)) / 10;
  const colLen = 6 + ((i * 37) % 5);
  const chars = Array.from({ length: colLen }, (__, j) =>
    CHARS[Math.floor(Math.abs(Math.sin(i * 31 + j * 17)) * CHARS.length)]
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

function AgentsSectionSlideContent() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: 'calc(var(--vh-full) - 120px)',
      overflow: 'hidden',
    }}>
      <style>{MATRIX_STYLES}</style>

      {/* Matrix rain background */}
      <MatrixRain />

      {/* Radial vignette */}
      <div className="agents-section-overlay" />

      {/* Two-column layout: title left, image right */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '1100px',
        padding: '0 2rem',
      }}>
        {/* Left: title */}
        <div className="agents-section-title" style={{ flex: '0 0 auto' }}>
          <div style={{ fontSize: '2.8rem', lineHeight: 1.3 }}>
            <span className="text-dim">$</span>{' '}
            <span className="text-green">skills</span>{' '}
            <span className="text-orange">--agents</span>
          </div>
          <div style={{ fontSize: '1.5rem', marginTop: '0.5rem' }} className="text-muted">
            // autonomous and semi-autonomous workflows
          </div>
        </div>

        {/* Right: Agent Smith image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <img
            src={agentsSmithImage}
            alt="Agent Smiths"
            loading="lazy"
            style={{
              maxHeight: 'calc(var(--vh-full) - 180px)',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              border: '1px solid rgba(126,231,135,0.3)',
              boxShadow: '0 0 40px rgba(126,231,135,0.15), 0 0 80px rgba(126,231,135,0.05)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const AgentsSectionSlide: SlideDefinition = {
  id: 'agents-section',
  content: <AgentsSectionSlideContent />,
  notes: 'Transition slide into the agents subsection — Matrix digital rain aesthetic signals shift from skills infrastructure to autonomous agent workflows.',
};
