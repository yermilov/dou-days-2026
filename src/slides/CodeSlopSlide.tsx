import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem } from '../components/SlideElements';

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">code</span>{' '}
        <span className="text-orange">--no-slop</span>
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
          when making UI changes: add{' '}
          <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            explore <Code>anthropics/claude-code</Code> marketplace for other helpful plugins
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            ask it to{' '}
            <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            if Claude makes a mistake, correct it like this:{' '}
            <Quote>instead do X and remember this gotcha in CLAUDE.md</Quote>
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            add{' '}
            <Quote>ask questions first — never assume, use AskUserQuestion tool</Quote>{' '}
            to your CLAUDE.md to stop Claude from guessing
          </SlideItem>
        )}
      </div>
    </>
  ),
  maxRevealStages: 4,
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, ask questions first instead of assuming, write tests with TDD, write stubs manually, use ultrathink (crossed out), document everything',
};
