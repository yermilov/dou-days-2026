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

// Command styling (orange) - for quoted instructions
function Quote({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
        textShadow: '0 0 6px var(--terminal-orange-glow)',
      }}
    >
      "{children}"
    </span>
  );
}

// External link styling (blue with dashed underline)
function Link({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--terminal-blue)',
        textDecoration: 'none',
        borderBottom: '1px dashed var(--terminal-blue)',
        transition: 'all 0.15s ease',
        textShadow: '0 0 8px var(--terminal-blue-glow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--terminal-cyan)';
        e.currentTarget.style.borderBottomColor = 'var(--terminal-cyan)';
        e.currentTarget.style.textShadow = '0 0 12px var(--terminal-cyan-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--terminal-blue)';
        e.currentTarget.style.borderBottomColor = 'var(--terminal-blue)';
        e.currentTarget.style.textShadow = '0 0 8px var(--terminal-blue-glow)';
      }}
    >
      {children}
    </a>
  );
}

// List item with > prefix and staggered animation
function ContextItem({
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
        fontSize: '1.25rem',
        marginBottom: '1.5rem',
        lineHeight: 1.6,
        opacity: 0,
        animation: 'contextItemFadeIn 0.4s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          color: 'var(--terminal-orange)',
          fontWeight: 'bold',
          textShadow: '0 0 10px var(--terminal-orange-glow)',
          marginTop: '0.1rem',
        }}
      >
        &gt;
      </span>
      <span style={{ color: 'var(--terminal-white)' }}>{children}</span>
    </div>
  );
}

export const ContextToolsSlide: SlideDefinition = {
  id: 'context-tools',
  content: (
    <>
      <style>
        {`
          @keyframes contextItemFadeIn {
            from {
              opacity: 0;
              transform: translateX(-15px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes titleGlitch {
            0%, 100% { text-shadow: 0 0 10px var(--terminal-green-glow); }
            50% { text-shadow: 0 0 20px var(--terminal-green-glow), 2px 0 var(--terminal-cyan); }
          }
        `}
      </style>

      <h2
        style={{
          marginBottom: '2.5rem',
          animation: 'titleGlitch 3s ease-in-out infinite',
        }}
      >
        <span className="text-dim">$</span>{' '}
        <span className="text-green">context</span>{' '}
        <span className="text-orange">--tools</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <ContextItem delay={0.05}>
          опишіть свою задачу максимально детально наскільки тільки можете (або
          використовуйте <Link href="https://handy.computer/">handy.computer</Link>{' '}
          чи <Link href="https://wisprflow.ai/">wisprflow.ai</Link> якщо вам
          зручніше надиктувати)
        </ContextItem>

        <ContextItem delay={0.15}>
          якщо проблема достатньо складна — спочатку обговоріть її з{' '}
          <Code>Deep Research</Code> агентом як от ChatGPT чи Gemini, і додайте
          ріпорт до Claude Code
        </ContextItem>

        <ContextItem delay={0.25}>
          пошукайте блогпости чи статті на тему і додайте лінки (або{' '}
          <Code>pdf</Code>-ки)
        </ContextItem>

        <ContextItem delay={0.35}>
          пошукайте опен-сорс проєкти які вирішують схожі задачі, попросіть
          клода <Quote>install gh cli and browse these repos for inspiration</Quote>
        </ContextItem>

        <ContextItem delay={0.45}>
          намалюйте схему чи дизайн на листочку, дошці чи у цифровому вигляді,
          сфоткайте або зробіть скріншот і додайте до Claude Code
        </ContextItem>
      </div>
    </>
  ),
  notes:
    'Context building tools - describe task in detail, use Deep Research, add articles/PDFs, browse open-source repos, add diagrams/screenshots',
};
