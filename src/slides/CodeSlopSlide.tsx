import { SlideDefinition } from '../types/slides';
import { Code, Quote, Emphasis, SlideItem } from '../components/SlideElements';

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
          якщо робите зміни в web ui: додавайте{' '}
          <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
        </SlideItem>

        <SlideItem delay={0.12}>
          просіть його{' '}
          <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
        </SlideItem>

        <SlideItem delay={0.19}>
          якщо клод робить помилку виправляйте його так:{' '}
          <Quote>instead do X and remember this gotcha in CLAUDE.md</Quote>
        </SlideItem>

        <SlideItem delay={0.26}>
          просіть клод писати тести (<Code>TDD</Code> працює дуже добре)
        </SlideItem>

        <SlideItem delay={0.33}>
          <Emphasis>repeat after me:</Emphasis> напишіть стаб фічі вручну і
          попросіть клод закінчити
        </SlideItem>

        <SlideItem delay={0.40}>
          <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
            для дуже складних задач додавайте{' '}
            <Quote>
              please{' '}
              <span style={{ color: '#ff6b6b' }}>u</span>
              <span style={{ color: '#ffa94d' }}>l</span>
              <span style={{ color: '#ffe066' }}>t</span>
              <span style={{ color: '#8ce99a' }}>r</span>
              <span style={{ color: '#74c0fc' }}>a</span>
              <span style={{ color: '#b197fc' }}>t</span>
              <span style={{ color: '#f783ac' }}>h</span>
              <span style={{ color: '#ff6b6b' }}>i</span>
              <span style={{ color: '#ffa94d' }}>n</span>
              <span style={{ color: '#ffe066' }}>k</span>
              {' '}it
            </Quote>
          </span>
        </SlideItem>

        <SlideItem delay={0.47}>
          просіть клод документувати все що він робить (наприклад в{' '}
          <Code>docs/</Code> папку) і потім реферінсіть її в наступних сесіях
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, use ultrathink (crossed out), document everything',
};
