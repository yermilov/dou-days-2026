import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import vibesImage from '/vibes.png?url';

const STYLES = `
  #agent-traces-right .code-block {
    margin: 0;
  }
  @keyframes revealPanel {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .code-reveal {
    animation: revealPanel 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

const TRACER_CODE = `export function getSessionFilePath(
  sessionId: string, workDir: string,
): string {
  const encodedPath = workDir.replace(/\\//g, "-");
  return join(
    homedir(), ".claude", "projects",
    encodedPath, \`\${sessionId}.jsonl\`,
  );
}

export async function uploadSession(
  sessionId: string, workDir: string,
) {
  const filePath = getSessionFilePath(sessionId, workDir);
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([await readFile(filePath)]),
    \`\${sessionId}.jsonl\`,
  );
  await fetch(VIBES_API_URL, { method: "POST", body: formData });
}`;

function AgentTracesContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}{`
        .at-bullets .slide-item { margin-bottom: 0; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{ marginBottom: '0.8rem' }}>
          
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--agent-traces</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2rem', alignItems: 'center', minHeight: 0 }}>

        {/* ── Left column: bullets ── */}
        <div className="at-bullets" style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              since agents work autonomously, you need an <Emphasis color="green">observability system</Emphasis> — you can't review every decision, but you must be able to audit them
            </SlideItem>
          )}
          {revealStage >= 1 && (
            <SlideItem delay={0.08} reveal>
              build a thin wrapper around <Emphasis color="orange">S3</Emphasis> and have all agents upload their session log <code>.jsonl</code> files there after every run
            </SlideItem>
          )}
          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              create a <Emphasis color="green">skill</Emphasis> that downloads a sample of sessions, analyzes them, and suggests improvements to skills and agent instructions — agents improving agents
            </SlideItem>
          )}
          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              vibe-code a nice <Emphasis color="orange">UI</Emphasis> around it so humans can also upload their own sessions for knowledge sharing and debugging — shared context between human and machine runs
            </SlideItem>
          )}
          {revealStage >= 3 && (
            <SlideItem delay={0.08} reveal>
              <a href="https://entire.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-green)', textDecoration: 'underline' }}>entire.io</a>{' '}
              and the <code>share-session</code> Claude Code feature are the first steps in this direction
            </SlideItem>
          )}
        </div>

        {/* ── Right column: code / image panels ── */}
        <div
          id="agent-traces-right"
          style={{
            flex: 1,
            '--font-size-code': '0.82rem',
          } as React.CSSProperties}
        >
          {revealStage >= 1 && revealStage < 3 && (
            <div key="code" className="code-reveal">
              <CodeBlock language="typescript" filename="vibes.ts" code={TRACER_CODE} />
            </div>
          )}
          {revealStage === 3 && (
            <div key="image" className="code-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img
                src={vibesImage}
                alt="Vibes session sharing UI"
                loading="lazy"
                style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        </div>
      </div>
    </>
  );
}

export const AgentTracesSlide: SlideDefinition = {
  id: 'agent-traces',
  maxRevealStages: 3,
  initialRevealStage: 1,
  content: ({ revealStage }: SlideContentProps) => <AgentTracesContent revealStage={revealStage} />,
  notes:
    'Session traces are your audit log, your training data, and your improvement loop all in one. The UI makes it social — engineers start reading each other\'s sessions.',
};
