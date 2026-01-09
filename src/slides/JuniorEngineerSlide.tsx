import { SlideDefinition } from '../types/slides';
import comparisonImage from '/junior-engineer-comparison.png?url';

type Level = 'high' | 'medium' | 'low';

const levelStyles = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    labelColor: 'var(--terminal-white)',
    labelGlow: '0 0 20px rgba(240, 136, 62, 0.3)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-blue)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-dim)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    opacity: 0.85,
  },
};

function ContentItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: 'var(--slide-text-normal)',
        opacity: s.opacity,
        marginBottom: '0.35rem',
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold' }}>{s.prefix}</span>
      <span
        style={{
          color: s.labelColor,
          textShadow: s.labelGlow,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        className="section-header section-header--blue"
        style={{
          borderBottom: '1px solid var(--terminal-border)',
          paddingBottom: '0.2rem',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>{children}</div>
    </div>
  );
}

function KeyInsightArrow() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0 0.5rem',
        color: 'var(--terminal-orange)',
        animation: 'arrowPulse 2s ease-in-out infinite',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 4px var(--terminal-orange-glow))' }}
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export const JuniorEngineerSlide: SlideDefinition = {
  id: 'junior-engineer',
  content: (
    <div className="junior-engineer-slide">
      {/* Inline keyframes */}
      <style>{`
        @keyframes arrowPulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(0);
          }
          50% {
            opacity: 0.7;
            transform: translateX(4px);
          }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glowBreath {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                        0 0 0 1px var(--terminal-border);
          }
          50% {
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5),
                        0 0 0 1px var(--terminal-orange-dim),
                        0 0 40px rgba(240, 136, 62, 0.1);
          }
        }
      `}</style>

      <div className="junior-engineer-content">
        {/* Command header */}
        <h2 style={{
          marginBottom: '1.5rem',
          textAlign: 'left',
          fontSize: '2rem',
        }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">think</span>{' '}
          <span className="text-orange">--model</span>{' '}
          <span className="text-cyan">lawful-chaotic-engineer</span>
        </h2>

        <ContentSection title="ключова метафора">
          <ContentItem level="high">
            Ставтеся до Claude Code як до <em className="text-emphasis text-emphasis--orange">дуже талановитого але хаотичного партнера</em>, а ви — їх ментор
          </ContentItem>
        </ContentSection>

        <ContentSection title="інтерфейс">
          <ContentItem level="high">
            термінальний інтерфейс = ваш чат-застосунок
          </ContentItem>
          <ContentItem level="medium">
            ви можете давати їм завдання, але потрібно допомагати з <em className="text-emphasis text-emphasis--green">контекстом</em> та <em className="text-emphasis text-emphasis--green">не давати все поламати</em>
          </ContentItem>
        </ContentSection>

      </div>

      {/* Image section */}
      <div className="junior-engineer-image-wrapper">
        <img
          src={comparisonImage}
          alt="Чат інтерфейс з'єднується з терміналом — однакова взаємодія, різний інтерфейс"
          className="junior-engineer-image"
          style={{
            maxWidth: '520px',
            animation: 'imageFloat 6s ease-in-out infinite, glowBreath 4s ease-in-out infinite',
          }}
        />
        <div style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          fontSize: 'var(--slide-text-normal)',
          color: 'var(--terminal-white)',
        }}>
          Що б ви написали людині?
          <KeyInsightArrow />
          <span className="text-emphasis text-emphasis--orange">Пишіть Claude Code</span>
        </div>
      </div>
    </div>
  ),
};
