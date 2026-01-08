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

// List item with > prefix
function VibeItem({
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
        animation: 'vibeItemFadeIn 0.3s ease-out forwards',
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

export const VibeFlowSlide: SlideDefinition = {
  id: 'vibe-flow',
  content: (
    <>
      <style>
        {`
          @keyframes vibeItemFadeIn {
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
        <span className="text-green">vibe</span>{' '}
        <span className="text-orange">--flow</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <VibeItem delay={0.05}>
          <Command>/clear</Command> очищуємо сесію
        </VibeItem>

        <VibeItem delay={0.1}>
          переходимо у <Code>plan mode</Code>
        </VibeItem>

        <VibeItem delay={0.15}>описуємо фічу / багу, формуємо контекст</VibeItem>

        <VibeItem delay={0.2}>
          чекаємо і чекаємо план, вичитуємо його і ітеруємося
        </VibeItem>

        <VibeItem delay={0.25}>
          <Code>Yes, and auto-accept edits</Code>
        </VibeItem>

        <VibeItem delay={0.3}>
          <Command>/commit-push-pr</Command>
        </VibeItem>

        <VibeItem delay={0.35}>
          <Command>/clear</Command>
        </VibeItem>

        <VibeItem delay={0.4}>
          <Command>/review</Command>
        </VibeItem>
      </div>
    </>
  ),
  notes:
    'The vibe flow workflow - clear session, plan mode, describe problem, iterate on plan, auto-accept, commit',
};
