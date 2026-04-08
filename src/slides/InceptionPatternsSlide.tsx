import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const InceptionPatternsSlide: SlideDefinition = {
  id: 'inception-patterns',
  maxRevealStages: 7,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--inception</span>
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
          you need at least 1-2 <Emphasis color="orange">ai multipliers</Emphasis> in your org and at least 1-2 <Emphasis color="green">ai-first engineers</Emphasis> in every team to start ai adoption
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            anti-pattern <Emphasis color="orange">"ai from above"</Emphasis> — mandating ai coding from leadership won't work
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            give <Emphasis color="green">space and time</Emphasis> for your best (or just curious) engineers to experiment
          </SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            <Emphasis color="green">connect</Emphasis> ai-successful engineers — they might not know about each other
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            help them to <Emphasis color="green">popularize</Emphasis> their work on demos, fun days, shared slack channels
          </SlideItem>
        )}

        {revealStage >= 5 && (
          <SlideItem delay={0}>
            you need a <Emphasis color="orange">clear organizational goal</Emphasis> — not "everyone should use Claude Code" (test: replace the tool name with a non-AI tool — "everyone should use VSCode" sounds meaningless)
          </SlideItem>
        )}

        {revealStage >= 6 && (
          <SlideItem delay={0}>
            good goal examples: <Emphasis color="green">time from idea to real user experiment is X</Emphasis> / X features released every week / X% time spent on KTLO
          </SlideItem>
        )}

        {revealStage >= 7 && (
          <SlideItem delay={0}>
            task <Emphasis color="orange">"AI-enablement" team</Emphasis> to work on AI coding infrastructure, not AI coding blueprints (individual teams/engineers knows better how to make their workflows AI-first)
          </SlideItem>
        )}
      </div>
    </>
  ),
  notes:
    'Inception patterns for AI adoption. You need multipliers and ai-first engineers as seeds. Top-down mandates fail. Give engineers space to experiment, connect successful adopters, and help them share their wins.',
};
