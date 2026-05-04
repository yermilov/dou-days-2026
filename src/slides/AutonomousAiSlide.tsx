import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>every org decision should have an <Emphasis color="green">agent perspective</Emphasis> — optimize for what agents can do best; remove friction that exists only for historical reasons</>,
  <>Anthropic chose TypeScript/React/Ink/Bun for Claude Code partly because <Emphasis color="orange">the model writes it best</Emphasis> — tool choices and AI capabilities should co-evolve</>,
  <><Emphasis color="green">legacy codebases</Emphasis> are the biggest drag — it is often unrealistic to adapt massive legacy repositories to AI-first principles in a reasonable timeframe</>,
  <>greenfield projects should be <Emphasis color="orange">AI-first from day one</Emphasis> — they give the highest velocity returns and prove what is possible at scale</>,
];

export const AutonomousAiSlide: SlideDefinition = {
  id: 'autonomous-ai',
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--agent-experience</span>
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
    "Agent-native isn't a constraint on humans — it's an upgrade path. Every decision that removes friction for agents ends up removing friction for humans too.",
};
