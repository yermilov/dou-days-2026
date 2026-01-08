import { SlideDefinition } from '../types/slides';

// Inline code styling (cyan) - for technical terms
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

// Quote styling (orange) - for English instructions
function Quote({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
        textShadow: '0 0 6px var(--terminal-orange-glow)',
      }}
    >
      '{children}'
    </span>
  );
}

// Emphasis text (green) - for key phrases
function Emphasis({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-green)',
        fontWeight: 600,
        textShadow: '0 0 6px var(--terminal-green-glow)',
      }}
    >
      {children}
    </span>
  );
}

// List item with > prefix and staggered animation
function SlopItem({
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
        gap: '0.6rem',
        fontSize: '1.15rem',
        marginBottom: '1.1rem',
        lineHeight: 1.55,
        opacity: 0,
        animation: 'slopItemFadeIn 0.35s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          color: 'var(--terminal-orange)',
          fontWeight: 'bold',
          textShadow: '0 0 10px var(--terminal-orange-glow)',
          marginTop: '0.05rem',
        }}
      >
        &gt;
      </span>
      <span style={{ color: 'var(--terminal-white)' }}>{children}</span>
    </div>
  );
}

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  content: (
    <>
      <style>
        {`
          @keyframes slopItemFadeIn {
            from {
              opacity: 0;
              transform: translateX(-12px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes noSlopPulse {
            0%, 100% {
              text-shadow: 0 0 10px var(--terminal-green-glow);
              filter: brightness(1);
            }
            50% {
              text-shadow: 0 0 25px var(--terminal-green-glow), 0 0 40px var(--terminal-green-glow);
              filter: brightness(1.1);
            }
          }
        `}
      </style>

      <h2
        style={{
          marginBottom: '2rem',
          animation: 'noSlopPulse 2.5s ease-in-out infinite',
        }}
      >
        <span className="text-dim">$</span>{' '}
        <span className="text-green">code</span>{' '}
        <span className="text-orange">--no-slop</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlopItem delay={0.05}>
          якщо робите зміни в web ui: додавайте{' '}
          <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
        </SlopItem>

        <SlopItem delay={0.12}>
          просіть його{' '}
          <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
        </SlopItem>

        <SlopItem delay={0.19}>
          якщо клод робить помилку виправляйте його так:{' '}
          <Quote>instead do X and remember this gotcha in CLAUDE.md</Quote>
        </SlopItem>

        <SlopItem delay={0.26}>
          просіть клод писати тести (<Code>TDD</Code> працює дуже добре)
        </SlopItem>

        <SlopItem delay={0.33}>
          <Emphasis>repeat after me:</Emphasis> напишіть стаб фічі вручну і
          попросіть клод закінчити
        </SlopItem>

        <SlopItem delay={0.40}>
          для дуже складних задач додавайте{' '}
          <Quote>please ultathink it</Quote>
        </SlopItem>

        <SlopItem delay={0.47}>
          просіть клод документувати все що він робить (наприклад в{' '}
          <Code>docs/</Code> папку) і потім реферінсіть її в наступних сесіях
        </SlopItem>
      </div>
    </>
  ),
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, use ultathink, document everything',
};
