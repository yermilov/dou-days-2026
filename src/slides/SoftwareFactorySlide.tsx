import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import softwareFactoryImg from '/software-factory.jpg?url';

export const SoftwareFactorySlide: SlideDefinition = {
  id: 'software-factory',
  content: ({ revealStage }) => (
    <>
      <style>{`
        .sf-bullets .slide-item { margin-bottom: 0; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">antipattern</span>{' '}
          <span className="text-orange">--software-factory</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'center', minHeight: 0 }}>

          {/* Left column — bullets */}
          <div className="sf-bullets" style={{ flex: '0 0 48%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <SlideItem delay={0.05}>
              вас може спокусити побудувати{' '}
              <Emphasis color="orange">автономний workflow</Emphasis>
              {' — '}дати йому задачу, отримати готову роботу
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                це може бути щось, що ви побудували самі
                {' — '}<Emphasis color="green">superpowers plugin</Emphasis>,
                {' '}<Emphasis color="green">ralph loop</Emphasis>,
                {' '}кастомний multi-agent pipeline
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                ви ретельно затюните його під свої потреби, але{' '}
                <Emphasis color="orange">дуже малоймовірно</Emphasis>, що хтось інший
                зможе це впровадити
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
