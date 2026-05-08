import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: ({ revealStage }) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">ще одна</span>{' '}
        <span className="text-orange">порада</span>
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
            Claude Code збільшує <Emphasis>об'єм</Emphasis> роботи, не{' '}
            <Emphasis color="orange">швидкість</Emphasis>
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0.07}>
              самостійно ви напишете код як мінімум або{' '}
              <Emphasis color="orange">краще</Emphasis> або{' '}
              <Emphasis color="orange">швидше</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              просто дивитися в термінал як клод працює -{' '}
              <Emphasis color="orange">втрата продуктивності і грошей</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              знайдіть 2-3 задачі, які можна довірити клоду з мінімальним наглядом, а{' '}
              <Emphasis color="orange">самі переключіться на одну ту саму задачу де необхідна вся ваша увага</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0.1}>
              ну або запустіть клода і{' '}<Emphasis>сходіть відпочити</Emphasis>
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
