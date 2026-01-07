import { SlideDefinition } from '../types/slides';

// Inline code styling (cyan)
function Code({ children }: { children: string }) {
  return (
    <code
      style={{
        background: 'rgba(118, 228, 247, 0.1)',
        padding: '0.1rem 0.4rem',
        borderRadius: '4px',
        color: 'var(--terminal-cyan)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95em',
        fontWeight: 600,
        border: '1px solid rgba(118, 228, 247, 0.3)',
        textShadow: '0 0 8px var(--terminal-cyan-glow)',
      }}
    >
      {children}
    </code>
  );
}

// Command styling (orange)
function Command({ children }: { children: string }) {
  return (
    <code
      style={{
        background: 'rgba(240, 136, 62, 0.1)',
        padding: '0.1rem 0.4rem',
        borderRadius: '4px',
        color: 'var(--terminal-orange)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.95em',
        fontWeight: 600,
        border: '1px solid rgba(240, 136, 62, 0.3)',
        textShadow: '0 0 8px var(--terminal-orange-glow)',
      }}
    >
      {children}
    </code>
  );
}

// Hint/quote styling (orange, italic)
function Hint({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-white-dim)',
        fontStyle: 'italic',
        borderLeft: '2px solid var(--terminal-orange)',
        paddingLeft: '0.5rem',
        marginLeft: '0.25rem',
      }}
    >
      "{children}"
    </span>
  );
}

// List item with > prefix
function TryItItem({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5rem 1fr',
        alignItems: 'start',
        gap: '0.75rem',
        fontSize: '1.35rem',
        marginBottom: '1.25rem',
        lineHeight: 1.5,
        opacity: 0,
        animation: 'tryItItemFadeIn 0.3s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          color: 'var(--terminal-orange)',
          fontWeight: 'bold',
          textShadow: '0 0 10px var(--terminal-orange-glow)',
        }}
      >
        &gt;
      </span>
      <span style={{ color: 'var(--terminal-white)' }}>{children}</span>
    </div>
  );
}

export const TryItSlide: SlideDefinition = {
  id: 'try-it',
  content: (
    <>
      <style>
        {`
          @keyframes tryItItemFadeIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">bootstrap</span>{' '}
        <span className="text-orange">--try</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <TryItItem delay={0.05}>чиста сесія</TryItItem>

        <TryItItem delay={0.1}>
          переходимо в <Code>plan mode</Code>
        </TryItItem>

        <TryItItem delay={0.15}>
          копіюємо репорт від <Code>Deep Research</Code> агента і просимо клод{' '}
          <Hint>
            please bootstrap the project from scratch using this guide, include
            initial version of CLAUDE.md
          </Hint>
        </TryItItem>

        <TryItItem delay={0.2}>
          чекаємо і чекаємо план, вичитуємо його і ітеруємося
        </TryItItem>

        <TryItItem delay={0.25}>
          <Code>Yes, and auto-accept all edits</Code>
        </TryItItem>

        <TryItItem delay={0.3}>
          <Command>/commit-push-pr</Command>
        </TryItItem>
      </div>
    </>
  ),
  notes:
    'First try workflow - clean session, plan mode, paste Deep Research report, iterate, auto-accept, commit',
};
