import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';
import { tr } from '../context/LanguageContext';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: ({ revealStage, lang }) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">{tr(lang, 'ще одна', 'one more')}</span>{' '}
        <span className="text-orange">{tr(lang, 'порада', 'tip')}</span>
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          flex: 1,
          minHeight: 0,
          marginRight: '-100px',
        }}
      >
        {/* Left column - bullet points */}
        <div
          style={{
            flex: '1 1 60%',
            maxWidth: '900px',
            textAlign: 'left',
          }}
        >
          <SlideItem delay={0.05}>
            {tr(
              lang,
              <>
                Claude Code збільшує <Emphasis>об'єм</Emphasis> роботи, не{' '}
                <Emphasis color="orange">швидкість</Emphasis>
              </>,
              <>
                Claude Code increases the <Emphasis>volume</Emphasis> of work, not the{' '}
                <Emphasis color="orange">speed</Emphasis>
              </>,
            )}
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0.07}>
              {tr(
                lang,
                <>
                  самостійно ви напишете код або{' '}
                  <Emphasis color="orange">краще</Emphasis>, або{' '}
                  <Emphasis color="orange">швидше</Emphasis>
                </>,
                <>
                  on your own, you'll write code either{' '}
                  <Emphasis color="orange">better</Emphasis> or{' '}
                  <Emphasis color="orange">faster</Emphasis>
                </>,
              )}
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              {tr(
                lang,
                <>
                  дивитися, як Клод працює в терміналі —{' '}
                  <Emphasis color="orange">втрата продуктивності і грошей</Emphasis>
                </>,
                <>
                  watching Claude work in the terminal is a{' '}
                  <Emphasis color="orange">waste of productivity and money</Emphasis>
                </>,
              )}
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              {tr(
                lang,
                <>
                  знайдіть 2–3 завдання, які можна довірити Клоду із мінімальним наглядом, а{' '}
                  <Emphasis color="orange">самі переключіться на те завдання, де необхідна вся ваша увага</Emphasis>
                </>,
                <>
                  find 2–3 tasks you can trust Claude with under minimal supervision, and{' '}
                  <Emphasis color="orange">switch yourself to the task that needs your full attention</Emphasis>
                </>,
              )}
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0.1}>
              {tr(
                lang,
                <>ну або запустіть Клода і{' '}<Emphasis>відпочиньте</Emphasis></>,
                <>or just launch Claude and{' '}<Emphasis>take a break</Emphasis></>,
              )}
            </SlideItem>
          )}
        </div>

        {/* Right column - Pac-Man animation. The parent row has a negative
            right margin that bleeds past the slide's 120px right padding into
            the chrome margin (the DOU logo sits well above this band), so the
            canvas can claim that space too. */}
        <div
          style={{
            flex: '0 0 53%',
            aspectRatio: '320 / 240',
          }}
        >
          <PacManCanvas revealStage={revealStage} />
        </div>
      </div>
    </div>
  ),
  maxRevealStages: 4,
  notes:
    "Перевірка реальності з 8-bit анімацією. 5 reveal-стадій, кожна синхронізована з правою Pac-Man сценою: 0 — людина сама (Claude дає об'єм, не швидкість); 1 — без змін, людина сама (самостійно ви ефективні); 2 — з'являється clawd, людина freeze (дивитися = втрата продуктивності); 3 — ще 2 clawds, людина повертається до своєї задачі (делегуйте 2-3, фокусуйтесь на одній); 4 — людина спить (запустіть і йдіть відпочити).",
};
