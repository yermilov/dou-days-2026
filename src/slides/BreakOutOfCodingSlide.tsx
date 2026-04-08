import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

function Prompt({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
        fontSize: '0.85em',
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
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">personal pattern</span>{' '}
        <span className="text-orange">"break out of coding"</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.05}>
          coding is the obvious starting point — but that's just very smart, costly{' '}
          <Emphasis color="orange">autocomplete</Emphasis>
        </SlideItem>

        <SlideItem delay={0.15}>
          set yourself a goal: do{' '}
          <Emphasis color="green">everything</Emphasis> from inside Claude Code
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            prioritize things that will create a feedback loop for Claude Code
          </SlideItem>
        )}

        {revealStage >= 1 && (
          <SlideItem delay={0.1}>
            install <Emphasis color="green">CLIs</Emphasis> (not MCPs!) for all
            dev tools you use
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            use the <Emphasis color="green">Claude Chrome extension</Emphasis> for
            cases when CLI can't do something —{' '}
            <Prompt>
              hey claude, open artifactory in chrome and generate api token for my pnpm access
            </Prompt>
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <>
            <SlideItem delay={0}>
              <Prompt>hey claude, please commit my changes</Prompt>
            </SlideItem>
            <SlideItem delay={0.08}>
              <Prompt>hey claude, configure dev environment for me</Prompt>
            </SlideItem>
            <SlideItem delay={0.16}>
              <Prompt>hey claude, here is a bug report I've received: ...</Prompt>
            </SlideItem>
            <SlideItem delay={0.24}>
              <Prompt>
                hey claude, take a look at the logs / metrics / AB test results / perf report: ...
              </Prompt>
            </SlideItem>
          </>
        )}
      </div>
    </>
  ),
  maxRevealStages: 3,
  notes:
    'Stage 0: coding is just autocomplete, goal is everything from Claude Code. Stage 1: feedback loops + install CLIs. Stage 2: Chrome extension escape hatch. Stage 3: concrete prompt examples across SDLC stages.',
};
