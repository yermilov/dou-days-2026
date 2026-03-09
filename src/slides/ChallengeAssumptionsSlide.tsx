import { SlideDefinition } from '../types/slides';
import { SlideItem, SectionHeader, Emphasis } from '../components/SlideElements';

export const ChallengeAssumptionsSlide: SlideDefinition = {
  id: 'challenge-assumptions',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ marginBottom: '1.2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">org</span>{' '}
        <span className="text-orange">--rethink</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* decisions — always visible */}
        <SectionHeader color="green" size="dense">decisions</SectionHeader>
        <SlideItem size="dense" delay={0.06}>
          if we deliver 2×–10× faster, will we be able to <Emphasis color="orange">make decisions</Emphasis> as fast?
        </SlideItem>
        <SlideItem size="dense" delay={0.14}>
          do we need weeks writing design docs if we can build <Emphasis color="green">prototypes faster</Emphasis> than we can write the document?
        </SlideItem>
        <SlideItem size="dense" delay={0.22}>
          do we need to <Emphasis color="orange">plan in quarters</Emphasis> if we can ship a feature two weeks after inception and get user feedback one month after?
        </SlideItem>

        {/* infrastructure — revealStage >= 1 */}
        {revealStage >= 1 && (
          <>
            <SectionHeader color="purple" size="dense">infrastructure</SectionHeader>
            <SlideItem size="dense">
              will agents thrive in <Emphasis color="green">centralised infrastructure</Emphasis> or "you build it you own it"?
            </SlideItem>
            <SlideItem size="dense">
              have we investigated which <Emphasis color="orange">infrastructure primitives</Emphasis> are more convenient for AI coding agents?
            </SlideItem>
            <SlideItem size="dense">
              what are the highest-leverage points to improve <Emphasis color="green">AgentsX</Emphasis>?
            </SlideItem>
          </>
        )}

        {/* tradeoffs — revealStage >= 2 */}
        {revealStage >= 2 && (
          <>
            <SectionHeader color="blue" size="dense">tradeoffs</SectionHeader>
            <SlideItem size="dense">
              can we trade some <Emphasis color="orange">uptime standards</Emphasis> for development velocity?
            </SlideItem>
            <SlideItem size="dense">
              can we relax <Emphasis color="green">rigorous code review</Emphasis> standards to allow AI-assisted reviews?
            </SlideItem>
            <SlideItem size="dense">
              Anthropic does automated <Emphasis color="orange">security reviews</Emphasis> with Claude Code — can we?
            </SlideItem>
          </>
        )}

        {/* practices — revealStage >= 3 */}
        {revealStage >= 3 && (
          <>
            <SectionHeader color="green" size="dense">practices</SectionHeader>
            <SlideItem size="dense">
              should we evaluate <Emphasis color="orange">AI-coding skills</Emphasis> in interviews?
            </SlideItem>
            <SlideItem size="dense">
              what <Emphasis color="green">architectural paradigms</Emphasis> help agents avoid sloppy generated code?
            </SlideItem>
            <SlideItem size="dense">
              what discussions are <Emphasis color="orange">no longer meaningful</Emphasis> when code generation is increasingly cheap — do we need architecture if code can be fully regenerated weekly?
            </SlideItem>
          </>
        )}
      </div>
    </>
  ),
  maxRevealStages: 4,
  notes:
    "These aren't rhetorical. Each question is a team conversation waiting to happen. Pick the two that would change the most for your org and start there.",
};
