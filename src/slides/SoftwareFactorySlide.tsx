import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const SoftwareFactorySlide: SlideDefinition = {
  id: 'software-factory',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">antipattern</span>{' '}
        <span className="text-orange">--software-factory</span>
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
          you might feel temptation to build an{' '}
          <Emphasis color="orange">autonomous workflow</Emphasis> — feed it a
          task, receive done work
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            it might be something you built yourself — a{' '}
            <Emphasis color="green">superpowers plugin</Emphasis>, a{' '}
            <Emphasis color="green">ralph loop</Emphasis>, a custom multi-agent
            pipeline
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            you will do careful tuning to your personal needs, but it's{' '}
            <Emphasis color="orange">highly unlikely</Emphasis> anyone else will
            be able to adopt it
          </SlideItem>
        )}
      </div>
    </>
  ),
  maxRevealStages: 2,
  notes:
    'Antipattern: building a "software factory" autonomous workflow. Stage 0: temptation to build feed-task-get-result pipeline. Stage 1: examples — custom builds, Devin, Cursor agents. Stage 2: over-tuned to personal needs, not adoptable by others.',
};
