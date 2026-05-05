import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import aiCodeReviewImage from '/ai-code-review.png?url';

function AgentExampleContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--ai-рев'ю-коду</span>
      </h2>

      <div className="agent-example-body">
        <div className="agent-example-body__text">
          <SlideItem delay={0.05}>
            обсяг <Emphasis color="green">AI-згенерованих змін</Emphasis> вибухнув —
            {' '}інженери впевненіше контриб'ютять у{' '}
            <Emphasis color="orange">незнайомі кодбази</Emphasis>
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              людські рев'ю стають <Emphasis color="orange">штампами</Emphasis>
              {' '}— на такому обсязі неможливо тримати рівень;
              {' '}AI-рев'ю часто <Emphasis color="green">якісніше</Emphasis>
              {' '}і дозволяє витримувати єдиний quality bar
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              ми зробили <Emphasis color="green">власного агента</Emphasis>
              {' '}на Claude Code (+Codex) — той самий набір скілів, що в інженерів;
              {' '}мікс <Emphasis color="green">детермінованого</Emphasis> +{' '}
              <Emphasis color="orange">недетермінованого</Emphasis> виконання,
              {' '}<Emphasis color="green">рій агентів</Emphasis> для багатовимірного рев'ю
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              Anthropic зашипили <Emphasis color="green">власне рішення</Emphasis>:{' '}
              <SlideLink href="https://code.claude.com/docs/en/code-review">
                code.claude.com
              </SlideLink>
            </SlideItem>
          )}
        </div>

        <div className="agent-example-body__media">
          <img
            src={aiCodeReviewImage}
            alt="In-house AI code review agent"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export const AgentExampleSlide: SlideDefinition = {
  id: 'agent-example',
  maxRevealStages: 3,
  initialRevealStage: 0,
  content: ({ revealStage }: SlideContentProps) => <AgentExampleContent revealStage={revealStage} />,
  notes:
    'AI code review: обсяг AI-змін вибухнув, людські рев\'ю — штампи, AI-рев\'ю часто якісніше. Stage 0: проблема. Stage 1: людські рев\'ю не масштабуються. Stage 2: наш агент на Claude Code (+Codex) — мікс детермінованого+агентного, рій агентів. Stage 3: Anthropic зашипили code.claude.com.',
};
