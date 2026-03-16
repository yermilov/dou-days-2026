import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const OrgDecisionSlide: SlideDefinition = {
  id: 'org-decision',
  maxRevealStages: 4,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">org</span>{' '}
        <span className="text-orange">--reboot</span>
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
          you can bet on same approach too, but first decide if this is <Emphasis color="orange">truly your priority</Emphasis> — half-hearted attempts will slow you down, not speed you up
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            it is entirely reasonable to <Emphasis color="green">choose not to</Emphasis> pursue this path — betting on reliable uptime or deep compliance certifications is a valid strategy
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            if yes, you need a <Emphasis color="orange">clear organizational goal</Emphasis> — not "everyone should use Claude Code" (test: replace the tool name with a non-AI tool — "everyone should use VSCode" sounds meaningless)
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            good goal examples: <Emphasis color="green">time from idea to real user experiment is X</Emphasis> / X features released every week / X% time spent on KTLO
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            task <Emphasis color="orange">"AI-enablement" team</Emphasis> to work on AI coding infrastructure, not AI coding blueprints (individual teams/engineers knows better how to make their workflows AI-first)
          </SlideItem>
        )}
      </div>
    </>
  ),
  notes:
    "The kitchen test is the real litmus. If a random engineer can't recite the goal, it isn't the goal yet.",
};
