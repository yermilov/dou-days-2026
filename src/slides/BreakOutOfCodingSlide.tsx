import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

function Prompt({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
      }}
    >
      '{children}'
    </span>
  );
}

const LEFT_BULLETS: ReactNode[] = [
  <>кодинг — очевидна точка старту, але це лише дуже розумне і дороге{' '}<Emphasis color="orange">автозаповнення</Emphasis></>,
  <>поставте собі ціль: робити <Emphasis color="green">усе</Emphasis> з Claude Code</>,
  <>пріоритизуйте те, що створить feedback loop для Claude Code</>,
  <>встановіть <Emphasis color="green">CLI</Emphasis> (не MCP!) для всіх dev tools, якими користуєтесь</>,
  <>використовуйте <Emphasis color="green">Claude Chrome extension</Emphasis> для випадків, коли CLI не може щось зробити</>,
];

const PROMPTS: ReactNode[] = [
  <Prompt>hey claude, open artifactory in chrome and generate api token for my pnpm access</Prompt>,
  <Prompt>hey claude, please commit my changes</Prompt>,
  <Prompt>hey claude, configure dev environment for me</Prompt>,
  <Prompt>hey claude, here is a bug report I've received: ...</Prompt>,
  <Prompt>hey claude, take a look at the logs / metrics / AB test results / perf report: ...</Prompt>,
];

export const BreakOutOfCodingSlide: SlideDefinition = {
  id: 'break-out-of-coding',
  content: ({ revealStage }) => (
    <>
      <h2 className="title--break-out-of-coding">
        <span className="text-dim">//</span>{' '}
        <span className="text-green">порада щодо</span>{' '}
        <span className="text-orange">персональної продуктивності</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left column: Ukrainian conceptual bullets */}
        <div
          style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'left',
          }}
        >
          {LEFT_BULLETS.map((bullet, i) =>
            revealStage >= i ? (
              <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
            ) : null,
          )}
        </div>

        {/* Right column: English Claude prompts */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'left',
          }}
        >
          {PROMPTS.map((prompt, i) =>
            revealStage >= LEFT_BULLETS.length + i ? (
              <SlideItem key={i} delay={0}>{prompt}</SlideItem>
            ) : null,
          )}
        </div>
      </div>
    </>
  ),
  maxRevealStages: LEFT_BULLETS.length + PROMPTS.length - 1,
  notes:
    'Один пункт на reveal. Ліва колонка: кодинг — це автозаповнення; ціль — робити все з Claude Code; feedback loops; CLI замість MCP; Chrome extension як escape hatch. Права колонка: конкретні приклади промптів через стадії SDLC.',
};
