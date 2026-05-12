import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink, Code } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

// Compact single-function variant — inlines the path builder into the
// uploader so the panel fits next to the bullet at the new code font size.
const TRACER_CODE = `export async function uploadSession(
  sessionId: string,
  workDir: string,
) {
  const encoded = workDir.replace(/\\//g, "-");
  const path = join(homedir(), ".claude",
    "projects", encoded, \`\${sessionId}.jsonl\`);
  const body = new FormData();
  body.append("file",
    new Blob([await readFile(path)]),
    \`\${sessionId}.jsonl\`);
  await fetch(VIBES_API_URL, {
    method: "POST", body,
  });
}`;

// Phase 0: one thesis bullet + the uploader code panel.
const FIRST_BULLET: ReactNode = (
  <>
    завантажуйте <Code>.jsonl</Code>-лог кожної сесії агента
    {' '}на <Emphasis color="green">S3</Emphasis>
    {' '}і <Emphasis color="orange">ви зможете подебажити</Emphasis> як він працює і що можна покращити
  </>
);

// Phase 1 (stages 1..3): three bullets reveal one-by-one, no right column.
const SECOND_SET: ReactNode[] = [
  <>
    <Emphasis color="orange">СТОП, ПОПАЛИСЬ!</Emphasis>
    {' '}не робіть нічого вручну, напишіть <Emphasis color="green">скіл</Emphasis>,
    {' '}який витягує семпл сесій, аналізує їх і пропонує покращення
    {' '}у ваших скілах та в інструкціях агентів
  </>,
  <>
    людям шарити свої сесії ще цінніше — це створює основу для{' '}
    <Emphasis color="orange">командної пам'яті</Emphasis>;
    {' '}можна використати ту саму інфраструктуру, або спробувати{' '}
    <SlideLink href="https://entire.io">entire.io</SlideLink>
  </>,
  <>
    тепер агенти можуть <Emphasis color="green">рев'ювати людські сесії</Emphasis>,
    {' '}а також створювати чи оновлювати скіли напів-автоматично
    {' '}на основі аналізу сесій людей
  </>,
];

function AgentTracesContent({ revealStage }: { revealStage: number }) {
  const setIndex = revealStage === 0 ? 0 : 1;
  const visibleCount = setIndex === 1 ? revealStage : 0;

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">зберігайте</span>{' '}
        <span className="text-orange">квитанції</span>
      </h2>

      <div
        key={setIndex}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: setIndex === 0 ? '2rem' : 0,
          minHeight: 0,
          ['--slide-line-height-normal' as string]: '1.3',
        } as React.CSSProperties}
      >
        {/* Bullets — half-width on phase 0 (paired with code panel), then
            full-width on phase 1 (no panel). */}
        <div
          style={{
            flex: setIndex === 0 ? '0 0 50%' : 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.6rem',
            textAlign: 'left',
          }}
        >
          {setIndex === 0 ? (
            <SlideItem delay={0.05}>{FIRST_BULLET}</SlideItem>
          ) : (
            SECOND_SET.slice(0, visibleCount).map((bullet, i) => (
              <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
            ))
          )}
        </div>

        {/* Right — uploader code panel, only on phase 0. */}
        {setIndex === 0 && (
          <div className="agent-traces-panel">
            <div className="agent-traces-panel__chrome agent-traces-panel__chrome--top">
              ░░░ vibes.ts — завантажувач сесій агентів ░░░
            </div>
            <div className="agent-traces-panel__viewport">
              <CodeBlock language="typescript" code={TRACER_CODE} />
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
  maxRevealStages: SECOND_SET.length,
  initialRevealStage: 0,
  content: ({ revealStage }: SlideContentProps) => <AgentTracesContent revealStage={revealStage} />,
  notes:
    'Треси агентів — observability для автономної роботи. Phase 0 (stage 0): теза "завантажуйте .jsonl кожної сесії на S3" + компактний uploadSession TS-сніпет. Phase 1 (stages 1–3, по одному булету, без правої панелі): "СТОП, ПОПАЛИСЬ — напишіть скіл-аналізатор" → "людям шарити свої сесії ще цінніше — entire.io" → "агенти рев\'юють людські сесії і напів-автоматично оновлюють скіли".',
};
