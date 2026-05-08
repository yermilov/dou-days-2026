import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import softwareFactoryImg from '/software-factory.jpg?url';

export const SoftwareFactorySlide: SlideDefinition = {
  id: 'software-factory',
  content: ({ revealStage }) => (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">антипатерн</span>
          <span className="text-dim">:</span>{' '}
          <span className="text-orange">software factory</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'center', minHeight: 0 }}>

          {/* Left column — bullets */}
          <div className="sf-bullets" style={{ flex: '0 0 48%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <SlideItem delay={0.05}>
              десятки агентів{' '}
              <Emphasis color="orange">автономно</Emphasis>
              {' — '}беруть задачі з джири і деплоять в продакшн
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                <Emphasis color="green">gas town</Emphasis>,
                {' '}<Emphasis color="green">ralph loop</Emphasis>,
                {' '}ваш внутрішній фреймворк який ви назвали <Emphasis color="green">міньйон</Emphasis>
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                чому антипатерн? ретельно затюнений під ваші потреби процес
                {' '}<Emphasis color="orange">дуже важко</Emphasis> масштабувати на інших людей, інші команди, інші потреби
              </SlideItem>
            )}
          </div>

          {/* Right column — image appears on reveal 1 */}
          {revealStage >= 1 && (
            <div className="code-reveal" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={softwareFactoryImg}
                alt="Are ya shipping, son?"
                loading="lazy"
                style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 240px)', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          )}

        </div>
      </div>
    </>
  ),
  maxRevealStages: 2,
  notes:
    'Антипатерн: побудова автономного "software factory" workflow. Stage 0: спокуса побудувати pipeline "дай задачу — отримай результат". Stage 1: приклади — кастомні рішення, Devin, Cursor agents. Stage 2: затюнено під особисті потреби, не масштабується на команду.',
};
