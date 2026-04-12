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
        <h2 style={{ marginBottom: '0.8rem' }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">antipattern</span>{' '}
          <span className="text-orange">--software-factory</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'center', minHeight: 0 }}>

          {/* Left column — bullets */}
          <div className="sf-bullets" style={{ flex: '0 0 48%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <SlideItem delay={0.05}>
              you might feel temptation to build an{' '}
              <Emphasis color="orange">autonomous workflow</Emphasis>
              {' — '}feed it a task, receive done work
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                it might be something you built yourself
                {' — '}a <Emphasis color="green">superpowers plugin</Emphasis>,
                {' '}a <Emphasis color="green">ralph loop</Emphasis>,
                {' '}a custom multi-agent pipeline
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                you will do careful tuning to your personal needs, but it's{' '}
                <Emphasis color="orange">highly unlikely</Emphasis> anyone else
                will be able to adopt it
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
    'Antipattern: building a "software factory" autonomous workflow. Stage 0: temptation to build feed-task-get-result pipeline. Stage 1: examples — custom builds, Devin, Cursor agents. Stage 2: over-tuned to personal needs, not adoptable by others.',
};
