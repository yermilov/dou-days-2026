import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
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
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--ai-code-review</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* ── Left column: bullets ── */}
        <div style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: '0.45rem', textAlign: 'left' }}>
          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              volume of <Emphasis color="orange">AI-generated changes</Emphasis> increased dramatically
            </SlideItem>
          )}
          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              engineers more confident contributing to <Emphasis color="green">unfamiliar codebases</Emphasis>
            </SlideItem>
          )}
          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              human reviews becoming <Emphasis color="orange">rubber stamps</Emphasis> — can't sustain rigor at this volume
            </SlideItem>
          )}
          {revealStage >= 4 && (
            <SlideItem delay={0} reveal>
              AI review often <Emphasis color="green">higher quality</Emphasis>; easy to enforce a consistent quality bar
            </SlideItem>
          )}
          {revealStage >= 5 && (
            <SlideItem delay={0} reveal>
              built an <Emphasis color="green">in-house agent</Emphasis> on Claude Code (+Codex) — uses same skills as engineers
            </SlideItem>
          )}
          {revealStage >= 6 && (
            <SlideItem delay={0} reveal>
              mixed <Emphasis color="green">deterministic</Emphasis> + <Emphasis color="orange">non-deterministic</Emphasis> execution; launches <Emphasis color="green">agent swarm</Emphasis> for multi-dimensional review
            </SlideItem>
          )}
          {revealStage >= 7 && (
            <SlideItem delay={0} reveal>
              Anthropic launched their own solution: <SlideLink href="https://code.claude.com/docs/en/code-review">code.claude.com</SlideLink>
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
  maxRevealStages: 7,
  initialRevealStage: 1,
  content: ({ revealStage }: SlideContentProps) => <AgentExampleContent revealStage={revealStage} />,
  notes:
    'AI code review: volume up, human reviews degrading, AI often better quality. Our in-house agent built on Claude Code SDK. Anthropic now has their own solution.',
};
