import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink, Code } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import vibesImage from '/vibes.png?url';

const TRACER_CODE = `export function getSessionFilePath(
  sessionId: string,
  workDir: string,
): string {
  const encoded = workDir.replace(/\\//g, "-");
  return join(
    homedir(), ".claude", "projects",
    encoded, \`\${sessionId}.jsonl\`,
  );
}

export async function uploadSession(
  sessionId: string,
  workDir: string,
) {
  const file = getSessionFilePath(
    sessionId, workDir,
  );
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([await readFile(file)]),
    \`\${sessionId}.jsonl\`,
  );
  await fetch(VIBES_API_URL, {
    method: "POST",
    body: formData,
  });
}`;

type PanelVariant = {
  key: 'code' | 'image';
  label: string;
  body: React.ReactNode;
  viewportModifier?: string;
};

function panelFor(revealStage: number): PanelVariant | null {
  if (revealStage >= 3) {
    return {
      key: 'image',
      label: "vibes.png — портал сесій для людей",
      viewportModifier: 'agent-traces-panel__viewport--image',
      body: (
        <img
          src={vibesImage}
          alt="Портал vibes для шерингу сесій"
          loading="lazy"
        />
      ),
    };
  }
  if (revealStage >= 1) {
    return {
      key: 'code',
      label: "vibes.ts — завантажувач сесій агентів",
      body: <CodeBlock language="typescript" code={TRACER_CODE} />,
    };
  }
  return null;
}

function AgentTracesContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--треси-агентів</span>
      </h2>

      <div className="agent-traces-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="agent-traces-bullets">
          <SlideItem delay={0.05}>
            агенти працюють <Emphasis color="green">автономно</Emphasis> —
            {' '}людина не встигає рев'юити кожне рішення, але ви маєте могти їх{' '}
            <Emphasis color="orange">аудитити</Emphasis>
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              обгорніть <Emphasis color="orange">S3</Emphasis> тонким сервісом —
              {' '}кожен агент після запуску заливає свій session log{' '}
              (<Code>.jsonl</Code>)
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              напишіть <Emphasis color="green">скіл</Emphasis>, який витягує семпл сесій,
              {' '}аналізує їх і пропонує покращення скілам та інструкціям агентів —{' '}
              <Emphasis color="orange">агенти, що покращують агентів</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              vibe-кодіть зверху простий <Emphasis color="orange">UI</Emphasis> —
              {' '}щоб люди теж заливали свої сесії;{' '}
              <Emphasis color="green">спільний контекст</Emphasis> людських і машинних
              {' '}прогонів (<SlideLink href="https://entire.io">entire.io</SlideLink>,
              {' '}<Code>share-session</Code> — перші кроки)
            </SlideItem>
          )}
        </div>

        {/* Right column: framed mono panel — viewport content swaps per reveal stage */}
        {panel && (
          <div className="agent-traces-panel" key={panel.key}>
            <div className="agent-traces-panel__chrome agent-traces-panel__chrome--top">
              ░░░ {panel.label} ░░░
            </div>
            <div
              className={
                'agent-traces-panel__viewport' +
                (panel.viewportModifier ? ` ${panel.viewportModifier}` : '')
              }
            >
              {panel.body}
            </div>
            <div className="agent-traces-panel__chrome agent-traces-panel__chrome--bottom">
              [END OF TRANSMISSION]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const AgentTracesSlide: SlideDefinition = {
  id: 'agent-traces',
  maxRevealStages: 3,
  initialRevealStage: 0,
  content: ({ revealStage }: SlideContentProps) => <AgentTracesContent revealStage={revealStage} />,
  notes:
    'Треси агентів — observability для автономної роботи. Stage 0: агенти автономні, людина не встигає рев\'юити кожне рішення — потрібен аудит. Stage 1: тонкий S3-сервіс, кожен агент заливає session log .jsonl. Stage 2: скіл-аналізатор семплу сесій — агенти, що покращують агентів. Stage 3: UI поверх для шерингу людських сесій (entire.io, share-session у Claude Code) — спільний контекст між людськими і машинними прогонами.',
};
