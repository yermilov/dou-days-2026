import { SlideDefinition } from '../types/slides';

// Inline code styling for tool names
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

// Quote/hint styling (orange)
function Hint({ children }: { children: string }) {
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

// Link styling
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--terminal-cyan)',
        textDecoration: 'none',
        borderBottom: '1px dashed var(--terminal-cyan)',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </a>
  );
}

// List item with > prefix
function McpItem({
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
        animation: 'mcpItemFadeIn 0.3s ease-out forwards',
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

export const McpSlide: SlideDefinition = {
  id: 'mcp',
  content: (
    <>
      <style>
        {`
          @keyframes mcpItemFadeIn {
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
        <span className="text-green">mcp</span>{' '}
        <span className="text-orange">--list</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <McpItem delay={0.05}>
          <Code>MCP</Code> (Model Context Protocol) — новий стандарт інтеграції
          LLM-застосунків з інструментами
        </McpItem>

        <McpItem delay={0.1}>
          <Code>tool</Code> — спосіб дозволити LLM виконувати дії, а не лише
          генерувати текст
        </McpItem>

        <McpItem delay={0.15}>
          думайте про це як про надання доступу до dev-інструментів для вашого
          інтерна
        </McpItem>

        <McpItem delay={0.2}>
          іноді Claude Code пробує використати MCP tool самостійно, але краще
          підказувати <Hint>"use GitLab MCP server to ..."</Hint>
        </McpItem>

        <McpItem delay={0.25}>
          досліджуйте рекомендовані MCP servers тут:{' '}
          <Link href="https://eng-shared.gpages.io/awesome-claude-code/best-practices/collections/mcp-servers/">
            awesome-claude-code/mcp-servers
          </Link>
        </McpItem>

        <McpItem delay={0.3}>
          CLI майже завжди краще за MCP: <Code>github</Code>, <Code>gitlab</Code>
        </McpItem>

        <McpItem delay={0.35}>
          чесно кажучи, немає MCP серверів які можу абсолютно рекомендувати
          (honorable mentions: <Code>time</Code>, <Code>sourcegraph</Code>,{' '}
          <Code>sumologic</Code>, <Code>workflow</Code>)
        </McpItem>
      </div>
    </>
  ),
  notes: 'MCP servers overview - what they are, how to use them, and current recommendations',
};
