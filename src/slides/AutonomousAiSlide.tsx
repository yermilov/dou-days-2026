import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const AutonomousAiSlide: SlideDefinition = {
  id: 'autonomous-ai',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">./org</span>{' '}
        <span className="text-orange">--agent-native</span>
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
          every org decision should have an <Emphasis color="green">agent perspective</Emphasis> — optimize for what agents can do best; remove friction that exists only for historical reasons
        </SlideItem>

        <SlideItem delay={0.14}>
          agents are better aligned with <Emphasis color="orange">monorepo</Emphasis> approaches — for agents, switching between GitHub and GitLab MCP servers is trivial; for humans, it is mentally exhausting
        </SlideItem>

        <SlideItem delay={0.22}>
          investigate which <Emphasis color="green">infrastructure primitives</Emphasis> agents can navigate without human help — self-setup dev envs, ephemeral environments, test analysis with flakiness history
        </SlideItem>

        <SlideItem delay={0.30}>
          Anthropic chose TypeScript/React/Ink/Bun for Claude Code partly because <Emphasis color="orange">the model writes it best</Emphasis> — tool choices and AI capabilities should co-evolve
        </SlideItem>

        <SlideItem delay={0.36}>
          some human processes will need to change: <Emphasis color="green">design docs written over weeks</Emphasis> become obsolete when we can prototype faster than we can write; quarterly cycles compress
        </SlideItem>

        <SlideItem delay={0.42}>
          some current human workflows may become <Emphasis color="orange">impossible or discouraged</Emphasis> — that is real friction, but agent-native decisions ultimately raise the ceiling for humans and agents alike
        </SlideItem>
      </div>
    </>
  ),
  notes:
    "Agent-native isn't a constraint on humans — it's an upgrade path. Every decision that removes friction for agents ends up removing friction for humans too.",
};
