import { SlideDefinition } from '../types/slides';

// Import images with ?url suffix for GitHub Pages
import cursorFrontend from '/timeline-cursor-frontend.png?url';
import mentoringLlm from '/timeline-mentoring-llm.png?url';
import aiTechDebt from '/timeline-ai-tech-debt.png?url';
import claudeCodeEmail from '/timeline-claude-code-email.png?url';

interface TimelineItem {
  anchorDate: Date | null;
  text: string;
  bullets?: string[];
  image: string | null;
  imageClassName?: string;
  emphasis?: boolean;
}

function timeLabel(anchorDate: Date | null): string {
  if (!anchorDate) return 'since then';
  const now = new Date();
  const months =
    (now.getFullYear() - anchorDate.getFullYear()) * 12 +
    (now.getMonth() - anchorDate.getMonth());
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

const timelineItems: TimelineItem[] = [
  { anchorDate: new Date(2024, 9),  text: 'copilot? cool autocomplete', image: null },
  { anchorDate: new Date(2024, 10), text: "I can't do frontend, cursor help me", image: cursorFrontend },
  { anchorDate: new Date(2025, 2),  text: 'what if this is not just about code generation but pair programming?', image: mentoringLlm },
  { anchorDate: new Date(2025, 3),  text: "but it's still a toy technology, right?", image: aiTechDebt, imageClassName: 'timeline-panel__image--zoom-anim' },
  { anchorDate: new Date(2025, 4),  text: "claude code? let's try it", image: claudeCodeEmail },
  {
    anchorDate: null,
    text: "haven't written a single line of code by hand since",
    bullets: [
      "haven't written a single line of code by hand since",
      "spent 2025 figuring out personal effective AI agentic coding workflow",
      "evangelising Claude Code among Superhuman: workshops, tutorials, 1-1s",
      "building internal tools: plugin system, skills, autonomous agents",
    ],
    image: null,
    emphasis: true,
  },
];

export const TimelineSlide: SlideDefinition = {
  id: 'timeline',
  maxRevealStages: 5,
  content: ({ revealStage }) => {
    const currentStage = Math.min(revealStage, timelineItems.length - 1);
    const currentItem = timelineItems[currentStage];

    return (
      <div className="timeline-slide-v2">
        <h2 className="timeline-title-v2">
          My AI coding timeline
        </h2>

        <div className="timeline-layout">
          {/* LEFT: Git log - time markers only */}
          <div className="timeline-log">
            <div className="timeline-log__list">
              {timelineItems.map((item, idx) => {
                const isActive = idx === currentStage;
                const isPast = idx < currentStage;
                const isEmphasis = item.emphasis;

                return (
                  <div
                    key={idx}
                    className={`timeline-log__item ${isActive ? 'timeline-log__item--active' : ''} ${isPast ? 'timeline-log__item--past' : ''} ${isEmphasis && isActive ? 'timeline-log__item--emphasis' : ''}`}
                  >
                    <div className={`timeline-log__time ${isEmphasis ? 'timeline-log__time--emphasis' : ''}`}>
                      {timeLabel(item.anchorDate)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Content panel - text + image */}
          <div className="timeline-panel">
            <div className="timeline-panel__content" key={currentStage}>
              {/* Text */}
              {currentItem.bullets ? (
                <ul className={`timeline-panel__list ${currentItem.emphasis ? 'timeline-panel__list--emphasis' : ''}`}>
                  {currentItem.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ) : (
                <div className={`timeline-panel__text ${currentItem.emphasis ? 'timeline-panel__text--emphasis' : ''}`}>
                  {currentItem.text}
                </div>
              )}

              {/* Image if available */}
              {currentItem.image && (
                <img
                  src={currentItem.image}
                  alt={currentItem.text}
                  className={`timeline-panel__image ${currentItem.imageClassName ?? ''}`}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
