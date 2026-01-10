import { SlideDefinition } from '../types/slides';

// Import images with ?url suffix for GitHub Pages
import cursorFrontend from '/timeline-cursor-frontend.png?url';
import mentoringLlm from '/timeline-mentoring-llm.png?url';
import aiTechDebt from '/timeline-ai-tech-debt.png?url';
import claudeCodeEmail from '/timeline-claude-code-email.png?url';

interface TimelineItem {
  time: string;
  text: string;
  image: string | null;
  emphasis?: boolean;
}

const timelineItems: TimelineItem[] = [
  { time: '15 місяців тому', text: 'cursor? прикольний автокомпліт', image: null },
  { time: '14 місяців тому', text: 'я не вмію у фронтенд, cursor допоможи', image: cursorFrontend },
  { time: '10 місяців тому', text: 'а що якщо це не тільки про код генерацію а про парне програмування?', image: mentoringLlm },
  { time: '9 місяців тому', text: 'але це все ще іграшкова технологія, так?', image: aiTechDebt },
  { time: '8 місяців тому', text: 'клод код? давайте спробуємо', image: claudeCodeEmail },
  { time: 'з тих пір', text: 'жодного рядка коду я не написав руками', image: null, emphasis: true },
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
          <span className="text-dim">$</span> мій таймлайн
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
                      {item.time}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hint - styled like tooltip */}
            <div className="timeline-hint-box">
              <div className="timeline-hint-box__header">
                <span className="timeline-hint-box__icon">{'>'}</span>
                <span className="timeline-hint-box__title">Таймлайн</span>
              </div>
              <ul className="timeline-hint-box__list">
                <li>
                  <code>move</code> або <code>m</code> — Наступний пункт
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Content panel - text + image */}
          <div className="timeline-panel">
            <div className="timeline-panel__content" key={currentStage}>
              {/* Text */}
              <div className={`timeline-panel__text ${currentItem.emphasis ? 'timeline-panel__text--emphasis' : ''}`}>
                {currentItem.text}
              </div>

              {/* Image if available */}
              {currentItem.image && (
                <img
                  src={currentItem.image}
                  alt={currentItem.text}
                  className="timeline-panel__image"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
