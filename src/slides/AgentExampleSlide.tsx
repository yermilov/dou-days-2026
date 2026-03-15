import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import aiCodeReviewImage from '/ai-code-review.png?url';

const STYLES = `
  @keyframes revealPanel {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .code-reveal {
    animation: revealPanel 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

function AgentExampleContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}</style>

      <h2 style={{ marginBottom: '1.2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">agents</span>{' '}
        <span className="text-orange">--example</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* ── Left column: bullets ── */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              built an <Emphasis color="green">in-house code review agent</Emphasis> based on Claude Code (+ Codex) instead of generic boxed solutions
            </SlideItem>
          )}
          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              why: tight integration with <Emphasis color="orange">internal knowledge</Emphasis>, full customization, and model control
            </SlideItem>
          )}
          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              uses the same <Emphasis color="green">skills</Emphasis> as engineers — Sourcegraph, design system, project guidelines
            </SlideItem>
          )}
          {revealStage >= 4 && (
            <SlideItem delay={0} reveal>
              executed in <Emphasis color="orange">CI jobs</Emphasis> — runs on every merge request automatically
            </SlideItem>
          )}
          {revealStage >= 5 && (
            <SlideItem delay={0} reveal>
              mixed <Emphasis color="green">deterministic</Emphasis> (TypeScript) and <Emphasis color="orange">non-deterministic</Emphasis> (Claude Code SDK) execution
            </SlideItem>
          )}
          {revealStage >= 6 && (
            <SlideItem delay={0} reveal>
              launches a <Emphasis color="green">swarm of agents</Emphasis> for multi-dimensional review — can invoke Codex for a second opinion
            </SlideItem>
          )}
        </div>

        {/* ── Right column: image (always visible) ── */}
        <div style={{ flex: 1 }}>
          <div className="code-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <img
              src={aiCodeReviewImage}
              alt="In-house AI code review agent"
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
        </div>

      </div>
    </>
  );
}

export const AgentExampleSlide: SlideDefinition = {
  id: 'agent-example',
  maxRevealStages: 6,
  initialRevealStage: 1,
  content: ({ revealStage }: SlideContentProps) => <AgentExampleContent revealStage={revealStage} />,
  notes:
    'Real example: our in-house code review agent. Not a SaaS product — built on Claude Code SDK with full control over skills, models, and review dimensions.',
};
