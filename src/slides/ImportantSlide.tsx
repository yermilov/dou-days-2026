import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: ({ revealStage }) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <h2 style={{ marginBottom: '1rem' }}>
        
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--throughput-vs-latency</span>
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left column - bullet points */}
        <div
          style={{
            flex: '0 0 40%',
            maxWidth: '550px',
            textAlign: 'left',
          }}
        >
          <SlideItem delay={0.05}>
            Claude Code increases <Emphasis>throughput</Emphasis> of your work, not
            your latency
          </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            give it a task and{' '}
            <Emphasis>switch to something else</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            Claude almost certainly understands your domain{' '}
            <Emphasis color="orange">worse</Emphasis> than you
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0.07}>
            often you can write{' '}
            <Emphasis color="orange">MUCH</Emphasis> better code, and sometimes even{' '}
            <Emphasis color="orange">faster</Emphasis> than it
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0.14}>
            <Emphasis>exception</Emphasis> — unfamiliar tech saves hours to weeks
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            staring at the terminal ={' '}
            <Emphasis color="orange">losing productivity</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0.1}>
            instead — launch claude to do something and{' '}
            <Emphasis>switch</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            or launch claude and go eat / rest
          </SlideItem>
        )}

      </div>

      {/* Right column - Pac-Man animation */}
      <div
        style={{
          flex: '0 0 55%',
          maxHeight: 'calc(var(--vh-full) - 220px)',
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
    'Important reality check with 8-bit animation. First 3 points visible immediately, press r 6 times for the rest. Value is in parallelization and delegation, watching Claude work is counterproductive, exception is unfamiliar technologies.',
};
