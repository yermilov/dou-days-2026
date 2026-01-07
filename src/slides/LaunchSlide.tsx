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
function LaunchItem({
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
        animation: 'launchItemFadeIn 0.3s ease-out forwards',
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

export const LaunchSlide: SlideDefinition = {
  id: 'launch',
  content: (
    <>
      <style>
        {`
          @keyframes launchItemFadeIn {
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
        <span className="text-green">claude</span>{' '}
        <span className="text-orange">--launch</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <LaunchItem delay={0.05}>
          зробіть зразу <Command>/model opus</Command>
        </LaunchItem>

        <LaunchItem delay={0.1}>
          <Command>/plugin marketplace add anthropics/claude-code</Command>
        </LaunchItem>

        <LaunchItem delay={0.15}>
          також зробіть зразу{' '}
          <Command>/plugin install commit-commands@claude-plugin-directory</Command>,{' '}
          <Command>/plugin install frontend-design@claude-plugin-directory</Command>,{' '}
          <Command>/plugin install code-review@claude-plugin-directory</Command>
        </LaunchItem>

        <LaunchItem delay={0.2}>
          якщо клод код питає вас чи можна зробити щось read-only і не дуже
          небезпечне — завжди вибирайте{' '}
          <Code>Yes, and don't ask me again</Code>
        </LaunchItem>

        <LaunchItem delay={0.25}>
          починайте завжди з <Code>plan mode</Code> (shift+tab двічі), ітеріться
          по плану і далі переходьте в <Code>Auto-accept everything</Code>
        </LaunchItem>
      </div>
    </>
  ),
  notes:
    'Claude Code launch checklist - model selection, plugins, permissions, and plan mode workflow',
};
