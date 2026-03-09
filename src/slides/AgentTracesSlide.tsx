import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const AgentTracesSlide: SlideDefinition = {
  id: 'agent-traces',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">agents</span>{' '}
        <span className="text-orange">--traces</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.08}>
          since agents work autonomously, you need an <Emphasis color="green">observability system</Emphasis> — you can't review every decision, but you must be able to audit them
        </SlideItem>

        <SlideItem delay={0.16}>
          build a thin wrapper around <Emphasis color="orange">S3</Emphasis> and have all agents upload their session log <code>.jsonl</code> files there after every run
        </SlideItem>

        <SlideItem delay={0.24}>
          create a <Emphasis color="green">skill</Emphasis> that downloads a sample of sessions, analyzes them, and suggests improvements to skills and agent instructions — agents improving agents
        </SlideItem>

        <SlideItem delay={0.32}>
          vibe-code a nice <Emphasis color="orange">UI</Emphasis> around it so humans can also upload their own sessions for knowledge sharing and debugging — shared context between human and machine runs
        </SlideItem>

        <SlideItem delay={0.40}>
          <Emphasis color="green">entire.io</Emphasis> and the <code>share-session</code> Claude Code feature are the first steps in this direction — but we still keep our home-grown solution as it is more feature-rich
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Session traces are your audit log, your training data, and your improvement loop all in one. The UI makes it social — engineers start reading each other\'s sessions.',
};
