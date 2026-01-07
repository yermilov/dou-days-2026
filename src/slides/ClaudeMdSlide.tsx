import { SlideDefinition } from '../types/slides';

// Inline code styling for file paths
function FilePath({ children }: { children: string }) {
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

// Command styling (orange with glow)
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

// Quote styling for example phrases
function Quote({ children }: { children: React.ReactNode }) {
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
function ClaudeMdItem({
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
        marginBottom: '1rem',
        lineHeight: 1.5,
        opacity: 0,
        animation: 'itemFadeIn 0.3s ease-out forwards',
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

export const ClaudeMdSlide: SlideDefinition = {
  id: 'claude-md',
  content: (
    <>
      <style>
        {`
          @keyframes itemFadeIn {
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
        <span className="text-green">cat</span>{' '}
        <span className="text-orange">CLAUDE.md</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <ClaudeMdItem delay={0.05}>
          <FilePath>CLAUDE.md</FilePath> для Claude Code — те саме, що{' '}
          <FilePath>README.md</FilePath> для людей-розробників
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.1}>
          Claude перечитує його кожного разу, коли робить щось в репозиторії
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.15}>
          автоматично генерується через команду <Command>/init</Command>
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.2}>
          можна редагувати вручну, щоб виправити неправильні висновки
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.25}>
          якщо Claude робить систематичні помилки — скажіть йому{' '}
          <Quote>instead do X and remember this information in CLAUDE.md</Quote>
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.3}>
          комітьте <FilePath>CLAUDE.md</FilePath> в git, щоб ділитися best
          practices
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.35}>
          можна класти <FilePath>CLAUDE.md</FilePath> в будь-яку підпапку для
          локальних інструкцій в монорепозиторіях
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.4}>
          створюйте <FilePath>CLAUDE.local.md</FilePath> і додавайте до{' '}
          <FilePath>.gitignore</FilePath> для персональних налаштувань
        </ClaudeMdItem>

        <ClaudeMdItem delay={0.45}>
          створюйте <FilePath>~/.claude/CLAUDE.md</FilePath> з персональними
          інструкціями для всіх сесій
        </ClaudeMdItem>
      </div>
    </>
  ),
  notes: 'How to work with CLAUDE.md files - best practices and configuration options',
};
