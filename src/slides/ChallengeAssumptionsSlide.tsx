import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const ChallengeAssumptionsSlide: SlideDefinition = {
  id: 'challenge-assumptions',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ marginBottom: '1.2rem' }}>
        
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--challenge-assumptions</span>
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
          if we deliver 2×–10× faster, will we be able to <Emphasis color="orange">make decisions</Emphasis> as fast?
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            do we need weeks writing design docs if we can build <Emphasis color="green">prototypes faster</Emphasis> than we can write the document?
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            do we need to <Emphasis color="orange">plan in quarters</Emphasis> if we can ship a feature two weeks after inception and get user feedback one month after?
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            can we trade some <Emphasis color="orange">uptime standards</Emphasis> for development velocity?
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            can we relax <Emphasis color="green">rigorous code review</Emphasis> standards to allow AI-assisted code reviews?
          </SlideItem>
        )}

        {revealStage >= 5 && (
          <SlideItem delay={0}>
            should we evaluate <Emphasis color="orange">AI-coding skills</Emphasis> in interviews?
          </SlideItem>
        )}

        {revealStage >= 6 && (
          <SlideItem delay={0}>
            what discussions are <Emphasis color="orange">no longer meaningful</Emphasis> when code generation is increasingly cheap — do we need architecture if code can be fully regenerated weekly?
          </SlideItem>
        )}
      </div>
    </>
  ),
  maxRevealStages: 6,
  notes:
    "These aren't rhetorical. Each question is a team conversation waiting to happen. Pick the two that would change the most for your org and start there.",
};
