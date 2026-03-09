import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

export const VibeFlowSlide: SlideDefinition = {
  id: 'vibe-flow',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">vibe</span>{' '}
        <span className="text-orange">--flow</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.05}>
          <Command>/clear</Command> clear the session
        </SlideItem>

        <SlideItem delay={0.1}>
          switch to <Code>plan mode</Code>
        </SlideItem>

        <SlideItem delay={0.15}>describe the feature / bug, <span className="text-orange" style={{ textShadow: '0 0 8px rgba(240, 136, 62, 0.9), 0 0 20px rgba(240, 136, 62, 0.6), 0 0 40px rgba(240, 136, 62, 0.3)' }}>form the context</span></SlideItem>

        <SlideItem delay={0.2}>
          wait for the plan, review it, and iterate
        </SlideItem>

        <SlideItem delay={0.25}>
          <Code>Yes, and auto-accept edits</Code>
        </SlideItem>

        <SlideItem delay={0.28}>
          if Claude Code asks you whether it can do something read-only and not very dangerous — always choose{' '}
          <Emphasis>Yes, and don't ask me again</Emphasis>
        </SlideItem>

        <SlideItem delay={0.3}>
          <Command>/commit-push-pr</Command>
        </SlideItem>

        <SlideItem delay={0.35}>
          <Command>/clear</Command>
        </SlideItem>

        <SlideItem delay={0.4}>
          <Command>/simplify</Command>
        </SlideItem>

        <SlideItem delay={0.45}>
          <Command>/review</Command>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'The vibe flow workflow - clear session, plan mode, describe problem, iterate on plan, auto-accept, commit',
};
