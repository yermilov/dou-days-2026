import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: ({ revealStage }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-xl)',
        width: '100%',
        height: '100%',
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
        <h2 style={{ marginBottom: '1.2rem', lineHeight: 1.4 }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">personal-patterns</span>
          <br />
          <span className="text-orange">--throughput-vs-latency</span>
        </h2>

        <SlideItem delay={0.05} size="compact">
          Claude almost certainly understands your domain{' '}
          <Emphasis color="orange">worse</Emphasis> than you
        </SlideItem>

        <SlideItem delay={0.12} size="compact">
          often you can write code{' '}
          <Emphasis color="orange">MUCH</Emphasis> better than it
        </SlideItem>

        <SlideItem delay={0.19} size="compact">
          often you can also write code{' '}
          <Emphasis color="orange">faster</Emphasis> than it
        </SlideItem>

        <SlideItem delay={0.26} size="compact">
          <Emphasis>exception</Emphasis> — unfamiliar tech saves hours to weeks
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0} size="compact">
            give it a task and{' '}
            <Emphasis>switch to something else</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 1 && (
          <SlideItem delay={0.1} size="compact">
            staring at the terminal ={' '}
            <Emphasis color="orange">losing productivity</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0} size="compact">
            or run <Emphasis>two tasks</Emphasis> in parallel
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0} size="compact">
            or run four tasks and go eat / sleep
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0} size="compact">
            Claude Code increases <Emphasis>throughput</Emphasis> of your work, not
            your latency
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
  ),
  maxRevealStages: 4,
  notes:
    'Important reality check with 8-bit animation. First 3 points visible immediately, press r 6 times for the rest. Value is in parallelization and delegation, watching Claude work is counterproductive, exception is unfamiliar technologies.',
};
