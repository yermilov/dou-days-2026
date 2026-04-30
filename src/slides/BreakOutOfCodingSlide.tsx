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
          <SlideItem delay={0.05}>
            кодинг — очевидна точка старту, але це лише дуже розумне і дороге{' '}
            <Emphasis color="orange">автозаповнення</Emphasis>
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              поставте собі ціль: робити <Emphasis color="green">усе</Emphasis> з Claude Code
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              пріоритизуйте те, що створить feedback loop для Claude Code
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              встановіть <Emphasis color="green">CLI</Emphasis> (не MCP!) для всіх dev tools,
              якими користуєтесь
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0}>
              використовуйте <Emphasis color="green">Claude Chrome extension</Emphasis> для
              випадків, коли CLI не може щось зробити
            </SlideItem>
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
          {revealStage >= 5 && (
            <SlideItem delay={0}>
              <Prompt>
                hey claude, open artifactory in chrome and generate api token for my pnpm access
              </Prompt>
            </SlideItem>
          )}

          {revealStage >= 6 && (
            <SlideItem delay={0}>
              <Prompt>hey claude, please commit my changes</Prompt>
            </SlideItem>
          )}

          {revealStage >= 7 && (
            <SlideItem delay={0}>
              <Prompt>hey claude, configure dev environment for me</Prompt>
            </SlideItem>
          )}

          {revealStage >= 8 && (
            <SlideItem delay={0}>
              <Prompt>hey claude, here is a bug report I've received: ...</Prompt>
            </SlideItem>
          )}

          {revealStage >= 9 && (
            <SlideItem delay={0}>
              <Prompt>
                hey claude, take a look at the logs / metrics / AB test results / perf report: ...
              </Prompt>
            </SlideItem>
          )}
        </div>
      </div>
    </>
  ),
  maxRevealStages: 9,
  notes:
    'Один пункт на reveal. Ліва колонка (Stage 0–4): кодинг — це автозаповнення; ціль — робити все з Claude Code; feedback loops; CLI замість MCP; Chrome extension як escape hatch. Права колонка (Stage 5–9): конкретні приклади промптів через стадії SDLC.',
};
