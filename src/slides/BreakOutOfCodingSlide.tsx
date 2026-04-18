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
      <h2 style={{ marginBottom: '2rem' }}>
        
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--break-out-of-coding</span>
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

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            set yourself a goal: do{' '}
            <Emphasis color="green">everything</Emphasis> from inside Claude Code
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            prioritize things that will create a feedback loop for Claude Code
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            install <Emphasis color="green">CLIs</Emphasis> (not MCPs!) for all
            dev tools you use
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            use the <Emphasis color="green">Claude Chrome extension</Emphasis> for
            cases when CLI can't do something —{' '}
            <Prompt>
              hey claude, open artifactory in chrome and generate api token for my pnpm access
            </Prompt>
          </SlideItem>
        )}

        {revealStage >= 5 && (
          <SlideItem delay={0}>
            <Prompt>hey claude, please commit my changes</Prompt>
          </SlideItem>
        )}

        {revealStage >= 6 && (
          <SlideItem delay={0}>
            <Prompt>hey claude, configure dev environment for me</Prompt>
          </SlideItem>
        )}

        {revealStage >= 7 && (
          <SlideItem delay={0}>
            <Prompt>hey claude, here is a bug report I've received: ...</Prompt>
          </SlideItem>
        )}

        {revealStage >= 8 && (
          <SlideItem delay={0}>
            <Prompt>
              hey claude, take a look at the logs / metrics / AB test results / perf report: ...
            </Prompt>
          </SlideItem>
        )}
      </div>
    </>
  ),
  maxRevealStages: 8,
  notes:
    'One bullet per reveal. Stage 0: coding is just autocomplete. Stage 1: goal is everything from Claude Code. Stage 2-3: feedback loops + install CLIs. Stage 4: Chrome extension escape hatch. Stages 5-8: concrete prompt examples across SDLC stages.',
};
