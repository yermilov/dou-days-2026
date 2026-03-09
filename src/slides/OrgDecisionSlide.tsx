import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const OrgDecisionSlide: SlideDefinition = {
  id: 'org-decision',
  content: (
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
          first: decide if this is <Emphasis color="orange">truly your priority</Emphasis> — half-hearted attempts will slow you down, not speed you up
        </SlideItem>

        <SlideItem delay={0.12}>
          it is entirely reasonable to <Emphasis color="green">choose not to</Emphasis> pursue this path — betting on reliable uptime or deep compliance certifications is a valid strategy
        </SlideItem>

        <SlideItem delay={0.20}>
          if yes, you need a <Emphasis color="orange">clear organizational goal</Emphasis> — not "everyone should use Claude Code" (test: replace the tool name with a non-AI tool — "everyone should use VSCode" sounds meaningless)
        </SlideItem>

        <SlideItem delay={0.28}>
          good goal examples: <Emphasis color="green">time from idea to real user experiment is X</Emphasis> / X features released every week / X% time spent on KTLO
        </SlideItem>

        <SlideItem delay={0.36}>
          goal must be set at the <Emphasis color="orange">executive level</Emphasis>, socialized with everyone (kitchen test: ask in the lunch room), and tracked at every major forum
        </SlideItem>

        <SlideItem delay={0.42}>
          consider creating a <Emphasis color="green">tiger team</Emphasis> from people who have already demonstrated results, with a mandate to make the changes needed to hit the goal
        </SlideItem>
      </div>
    </>
  ),
  notes:
    "The kitchen test is the real litmus. If a random engineer can't recite the goal, it isn't the goal yet.",
};
