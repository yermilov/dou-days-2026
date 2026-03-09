import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem, SlideLink } from '../components/SlideElements';

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  content: (
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

        <SlideItem delay={0.12}>
          explore <Code>anthropics/claude-code</Code> marketplace for other helpful plugins
        </SlideItem>

        <SlideItem delay={0.19}>
          ask it to{' '}
          <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
        </SlideItem>

        <SlideItem delay={0.26}>
          if Claude makes a mistake, correct it like this:{' '}
          <Quote>instead do X and remember this gotcha in CLAUDE.md</Quote>
        </SlideItem>

        <SlideItem delay={0.33}>
          install the Chrome extension{' '}
          <SlideLink href="https://claude.com/chrome">claude.com/chrome</SlideLink>{' '}
          and configure it with <Code>/chrome</Code>
        </SlideItem>

      </div>
    </>
  ),
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, use ultrathink (crossed out), document everything',
};
