import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>the tricky part in Human+AI engineering is <Emphasis color="orange">humans</Emphasis> — mandating AI coding won't work; human inertia is real</>,
  <>don't leave engineers alone: invest in <Emphasis color="green">regular training, peer mentoring, opinionated tooling, office hours, and win/lose stories</Emphasis></>,
  <>a known pain point is that engineers don't have breathing room to go through the learning curve — consider <Emphasis color="orange">relaxing delivery expectations early</Emphasis> to give space to learn, then raise them higher than before</>,
  <>humans always remain your <Emphasis color="orange">most important asset</Emphasis> — preserve empathy, be ethical, watch for burnouts, and have fair conversations</>,
];

export const HumanAiEngSlide: SlideDefinition = {
  id: 'human-ai-eng',
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
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
        {BULLETS.map((bullet, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={i === 0 ? 0.06 : 0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>
    </>
  ),
  notes:
    'Legacy code is the organizational debt that AI exposes fastest. Greenfield is where you build the proof points.',
};
