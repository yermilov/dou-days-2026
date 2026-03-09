import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const AgentWorkflowSlide: SlideDefinition = {
  id: 'agent-workflow',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">agents</span>{' '}
        <span className="text-orange">--workflow</span>
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
          you need an <Emphasis color="green">environment</Emphasis> for agent execution — start locally with human-controlled proof of concepts, then graduate to CI or a dedicated Kubernetes cluster
        </SlideItem>

        <SlideItem delay={0.16}>
          use <Emphasis color="orange">claude agents sdk</Emphasis> — essentially a TypeScript wrapper around the Claude Code CLI — as your agent runtime
        </SlideItem>

        <SlideItem delay={0.24}>
          always clone your <Emphasis color="green">skills marketplace</Emphasis> and inject it into the SDK execution context; enable needed plugins and skill activation hooks
        </SlideItem>

        <SlideItem delay={0.32}>
          embrace <Emphasis color="orange">mixed deterministic/agentic execution</Emphasis>: write traditional scripts with loops and conditionals that invoke the Claude SDK only for the complex, non-deterministic work
        </SlideItem>

        <SlideItem delay={0.40}>
          use <Emphasis color="green">claude structured output</Emphasis> for decisions and deterministic code for all side effects — keeps agents predictable and auditable
        </SlideItem>

        <SlideItem delay={0.48}>
          we have several competing internal frameworks for this — and we are still waiting for a <Emphasis color="orange">native solution from Anthropic</Emphasis>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'The key insight: agents should be deterministic at the boundaries. Claude handles ambiguity in the middle; traditional code handles I/O, retries, and side effects.',
};
