import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import aiCodeReviewImage from '../assets/ai-code-review.png?url';

// Two-phase reveal (same idiom as SkillMarketplaceSlide / MetaSkillsSlide):
// FIRST_SET shows three bullets full-width as one column; once they're all
// out, SECOND_SET swaps to a half-width bullet + the in-house AI code review
// agent screenshot on the right.
const FIRST_SET: ReactNode[] = [
  <>
    завдяки <Emphasis color="green">AI асистентам</Emphasis> люди більше і впевненіше
    {' '}контриб'ютять навіть у <Emphasis color="orange">незнайомі кодбази</Emphasis>
  </>,
  <>
    людські рев'ю стають <Emphasis color="orange">штампами</Emphasis>
    {' '}— на таких обсягах неможливо втримати попередній рівень якості;
    {' '}рев'ювери відчувають <Emphasis color="green">несправедливість</Emphasis>
    {' '}через вкладений час
  </>,
  <>
    AI-рев'ю <Emphasis color="green">дозволяє</Emphasis> людині зосередитися
    {' '}на складних питаннях (навіщо? як?), а агент набагато ретельніше
    {' '}перевірить саме код
  </>,
];

const SECOND_SET: ReactNode[] = [
  <>
    Anthropic має власне рішення:{' '}
    <SlideLink href="https://code.claude.com/docs/en/code-review">
      code.claude.com/docs/en/code-review
    </SlideLink>
    , є також непогане від Codex і погане від Copilot;
    а також декілька стартапів (CodeRabbit, Greplit, Graphite);
    але ми зробили <Emphasis color="green">власного агента</Emphasis>
    {' '}на Claude Code (+Codex) —
    {' '}<Emphasis color="orange">як?</Emphasis> і{' '}
    <Emphasis color="orange">чому?</Emphasis>
  </>,
];

export const AgentExampleSlide: SlideDefinition = {
  id: 'agent-example',
  // Stages 0..2 walk through FIRST_SET bullets one-by-one; stage 3 swaps to
  // the SECOND_SET single bullet alongside the in-house agent screenshot.
  maxRevealStages: FIRST_SET.length + SECOND_SET.length - 1,
  initialRevealStage: 0,
  content: ({ revealStage }: SlideContentProps) => {
    const setIndex = revealStage < FIRST_SET.length ? 0 : 1;
    const currentSet = setIndex === 0 ? FIRST_SET : SECOND_SET;
    const visibleCount =
      setIndex === 0 ? revealStage + 1 : revealStage - FIRST_SET.length + 1;

    return (
      <>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">ai</span>{' '}
          <span className="text-orange">код рев'ю</span>
        </h2>

        <div
          key={setIndex}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: setIndex === 0 ? 0 : '2rem',
            minHeight: 0,
            ['--slide-line-height-normal' as string]: '1.3',
          } as React.CSSProperties}
        >
          {/* Bullets — full-width during phase 1, half-width once the
              in-house code-review screenshot enters the layout. */}
          <div
            style={{
              flex: setIndex === 0 ? 1 : '0 0 50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.6rem',
              textAlign: 'left',
            }}
          >
            {currentSet.slice(0, visibleCount).map((bullet, i) => (
              <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
            ))}
          </div>

          {/* Right — in-house AI code review agent screenshot, only on the
              "власне рішення" half of the slide. */}
          {setIndex === 1 && (
            <div
              style={{
                flex: 1,
                alignSelf: 'stretch',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'color-mix(in srgb, var(--dou-bg-solid) 70%, transparent)',
                border: '1px solid color-mix(in srgb, var(--dou-white) 12%, transparent)',
                borderRadius: '14px',
                padding: '20px',
                boxShadow:
                  '0 18px 48px color-mix(in srgb, var(--dou-near-black) 60%, transparent), inset 0 1px 0 color-mix(in srgb, var(--dou-white) 10%, transparent)',
                overflow: 'hidden',
              }}
            >
              <img
                src={aiCodeReviewImage}
                alt="In-house AI code review agent"
                loading="lazy"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>
      </>
    );
  },
  notes:
    'AI code review. Stages 0–2 (full-width column): обсяг AI-змін → людські рев\'ю стають штампами → AI-рев\'ю дозволяє людині фокус на складних питаннях. Stage 3 (split layout): Anthropic code.claude.com + наш власний агент на Claude Code (+Codex), мікс детермінованого+агентного виконання, рій агентів — поряд із скріншотом нашого in-house рев\'ю-агента.',
};
