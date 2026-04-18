import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const HumanAiEngSlide: SlideDefinition = {
  id: 'human-ai-eng',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--human-centered</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.06}>
          the tricky part in Human+AI engineering is <Emphasis color="orange">humans</Emphasis> — mandating AI coding won't work; human inertia is real
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            don't leave engineers alone: invest in <Emphasis color="green">regular training, peer mentoring, opinionated tooling, office hours, and win/lose stories</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            a known pain point is that engineers don't have breathing room to go through the learning curve — consider <Emphasis color="orange">relaxing delivery expectations early</Emphasis> to give space to learn, then raise them higher than before
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            humans always remain your <Emphasis color="orange">most important asset</Emphasis> — preserve empathy, be ethical, watch for burnouts, and have fair conversations
          </SlideItem>
        )}
      </div>
    </>
  ),
  notes:
    'Legacy code is the organizational debt that AI exposes fastest. Greenfield is where you build the proof points.',
};
