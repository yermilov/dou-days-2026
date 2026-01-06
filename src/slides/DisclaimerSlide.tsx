import { SlideDefinition } from '../types/slides';

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

function DisclaimerItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        alignItems: 'start',
        gap: '0.75rem',
        fontSize: '1.5rem',
        opacity: s.opacity,
        marginBottom: '1.25rem',
        lineHeight: 1.5,
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold', marginTop: '0.1em' }}>{s.prefix}</span>
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

const linkStyle: React.CSSProperties = {
  color: 'var(--terminal-cyan)',
  textDecoration: 'none',
  borderBottom: '1px dashed var(--terminal-cyan)',
  transition: 'all 0.2s ease',
};

export const DisclaimerSlide: SlideDefinition = {
  id: 'disclaimer',
  content: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      <h2
        style={{
          marginBottom: '2.5rem',
          textAlign: 'center',
          fontSize: '2.25rem',
        }}
      >
        <span className="text-dim">$</span>{' '}
        <span className="text-green">echo</span>{' '}
        <span className="text-orange">"дисклеймер"</span>
      </h2>

      <div style={{ textAlign: 'left', width: '100%' }}>
        <DisclaimerItem level="high">
          персонально для мене набагато краще заходить флоу у якому я працюю з{' '}
          <em style={{ color: 'var(--terminal-orange)', fontStyle: 'normal', fontWeight: 600 }}>
            Claude Code повністю в терміналі
          </em>
        </DisclaimerItem>

        <DisclaimerItem level="medium">
          але можу використати IDE (найчастіше{' '}
          <span style={{ color: 'var(--terminal-cyan)' }}>VS Code</span>) для точкових невеликих
          змін які я хочу зробити вручну
        </DisclaimerItem>

        <DisclaimerItem level="low">
          якщо ви не почуваєтеся впевнено в терміналі — використовуйте плагіни:{' '}
          <a
            href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            VS Code
          </a>
          {' '}або{' '}
          <a
            href="https://plugins.jetbrains.com/plugin/27310-claude-code-beta-"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            JetBrains IDE
          </a>
        </DisclaimerItem>
      </div>
    </div>
  ),
  notes: 'Personal disclaimer about terminal vs IDE workflow preferences',
};
