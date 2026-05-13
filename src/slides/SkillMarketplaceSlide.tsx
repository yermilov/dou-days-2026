import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import superhumanAidevImage from '../assets/superhuman-aidev.png?url';

// Two consecutive bullet sets revealed one-by-one. Set 1 = the DIY symlink
// approach Superhuman built; set 2 = how Anthropic's native marketplaces
// land the same idea natively. The slide moves from set 1 → set 2 once all
// of set 1's bullets have been revealed.
const FIRST_SET: ReactNode[] = [
  <>скіли — <Emphasis color="green">будівельні блоки</Emphasis>, з яких кожен інженер може побудувати свій власний воркфлоу</>,
  <>люди не люблять читати і писати документацію, а <Emphasis color="orange">агенти це обожнюють</Emphasis> — конвертуйте всю документацію в скіли</>,
  <>у Superhuman ми достатньо рано зробили скіли спільними за допомогою тули, яка клонує GitHub-репо зі скілами і симлінкає їх у директорію <code>~/.claude/skills/</code></>,
  <>кожен інженер, який використовує скіл, додає покращення — і всі стають <Emphasis color="green">продуктивнішими</Emphasis></>,
];

const SECOND_SET: ReactNode[] = [
  <>ну а потім Anthropic представили <Emphasis color="green">marketplaces</Emphasis> — працює так само, але нативно</>,
  <>створіть ОДИН центральний внутрішній <Emphasis color="orange">marketplace</Emphasis> для скілів у вашій організації</>,
  <>використовуйте плагіни для <Emphasis color="orange">неймспейсингу</Emphasis> — кожен користувач сам обирає, які плагіни встановити</>,
  <>якщо є можливість — використовуйте <Emphasis color="green">Claude Enterprise</Emphasis>, щоб примусово встановити marketplace і певні плагіни всім в організації</>,
];

export const SkillMarketplaceSlide: SlideDefinition = {
  id: 'skill-marketplace',
  // 8 reveal stages: 0..3 walk through FIRST_SET, 4..7 walk through SECOND_SET.
  maxRevealStages: FIRST_SET.length + SECOND_SET.length - 1,
  content: ({ revealStage }: SlideContentProps) => {
    const setIndex = revealStage < FIRST_SET.length ? 0 : 1;
    const currentSet = setIndex === 0 ? FIRST_SET : SECOND_SET;
    const visibleCount =
      setIndex === 0 ? revealStage + 1 : revealStage - FIRST_SET.length + 1;

    return (
      <>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">маркетплейс</span>{' '}
          <span className="text-orange">скілів</span>
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
          {/* Bullets — full-width on the DIY set, half-width once the
              Anthropic marketplaces screenshot enters the layout. */}
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

          {/* Right — Superhuman AI Dev marketplace screenshot, only on the
              Anthropic-marketplaces half of the slide. */}
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
                src={superhumanAidevImage}
                alt="Superhuman AI Dev marketplace"
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
    'Stage 0–3: наш Superhuman DIY-підхід — будівельні блоки, конвертація документації, ефект мережі, дистрибуція через симлінки в ~/.claude/skills/. Stage 4–7: Anthropic нативні marketplaces — створи один внутрішній marketplace, використовуй плагіни для неймспейсингу, Enterprise-контролі для примусового встановлення.',
};
