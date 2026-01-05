import { SlideDefinition } from '../types/slides';
import comparisonImage from '/junior-engineer-comparison.png?url';

type PointLevel = 'insight' | 'primary' | 'secondary';

const pointStyles = {
  insight: {
    prefix: '>>>',
    prefixColor: 'var(--terminal-orange)',
    textColor: 'var(--terminal-white)',
    glow: '0 0 20px rgba(240, 136, 62, 0.4)',
    background: 'linear-gradient(90deg, rgba(240, 136, 62, 0.08) 0%, transparent 100%)',
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  primary: {
    prefix: '>>',
    prefixColor: 'var(--terminal-green)',
    textColor: 'var(--terminal-white)',
    glow: 'none',
    background: 'transparent',
    fontSize: '1.35rem',
    fontWeight: 400,
  },
  secondary: {
    prefix: '>',
    prefixColor: 'var(--terminal-blue)',
    textColor: 'var(--terminal-white-dim)',
    glow: 'none',
    background: 'transparent',
    fontSize: '1.25rem',
    fontWeight: 400,
  },
};

function MentalModelPoint({
  level,
  children,
  delay = 0,
}: {
  level: PointLevel;
  children: React.ReactNode;
  delay?: number;
}) {
  const s = pointStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3rem 1fr',
        alignItems: 'baseline',
        gap: '0.75rem',
        padding: level === 'insight' ? '0.75rem 1rem 0.75rem 0' : '0.4rem 0',
        marginLeft: level === 'secondary' ? '1.5rem' : 0,
        background: s.background,
        borderRadius: level === 'insight' ? '4px' : 0,
        animation: 'pointReveal 0.4s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <span
        style={{
          color: s.prefixColor,
          fontWeight: 'bold',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '-0.05em',
          textShadow: level === 'insight' ? s.glow : 'none',
        }}
      >
        {s.prefix}
      </span>
      <span
        style={{
          color: s.textColor,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: 1.5,
          textShadow: s.glow,
        }}
      >
        {children}
      </span>
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
        @keyframes pointReveal {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
          <span style={{ color: 'var(--terminal-cyan)' }}>junior-engineer</span>
        </h2>

        {/* Section: Core Metaphor */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            color: 'var(--terminal-blue)',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            # CORE METAPHOR
          </div>
          <MentalModelPoint level="primary" delay={100}>
            Treat Claude Code as a <em style={{ color: 'var(--terminal-orange)', fontStyle: 'normal', fontWeight: 600 }}>very talented junior engineer</em> hired in your team
          </MentalModelPoint>
          <MentalModelPoint level="secondary" delay={200}>
            it is <em style={{ color: 'var(--terminal-cyan)', fontStyle: 'normal' }}>(always)</em> their first day and you are their mentor
          </MentalModelPoint>
          <MentalModelPoint level="secondary" delay={300}>
            they have no industry experience
          </MentalModelPoint>
        </div>

        {/* Section: Interface */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            color: 'var(--terminal-blue)',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            # INTERFACE
          </div>
          <MentalModelPoint level="primary" delay={400}>
            terminal interface = your chat application
          </MentalModelPoint>
          <MentalModelPoint level="secondary" delay={500}>
            you can give them your tasks but need to help with <em style={{ color: 'var(--terminal-green)', fontStyle: 'normal' }}>context</em> and <em style={{ color: 'var(--terminal-green)', fontStyle: 'normal' }}>reviews</em>
          </MentalModelPoint>
        </div>

        {/* Key insight */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--terminal-border)',
        }}>
          <MentalModelPoint level="insight" delay={700}>
            What you would write to human?
            <KeyInsightArrow />
            <span style={{ color: 'var(--terminal-orange)' }}>Write to Claude Code</span>
          </MentalModelPoint>
        </div>
      </div>

      {/* Image section */}
      <div className="junior-engineer-image-wrapper">
        <img
          src={comparisonImage}
          alt="Chat interface connecting to terminal - same interaction pattern, different interface"
          className="junior-engineer-image"
          style={{
            animation: 'imageFloat 6s ease-in-out infinite, glowBreath 4s ease-in-out infinite',
          }}
        />
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: 'var(--terminal-white-muted)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
        }}>
          same interaction <span style={{ color: 'var(--terminal-cyan)' }}>↔</span> different interface
        </div>
      </div>
    </div>
  ),
};
