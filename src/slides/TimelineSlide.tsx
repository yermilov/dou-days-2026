import { SlideDefinition } from '../types/slides';
import { tr, type Lang } from '../context/LanguageContext';

import copilotAutocomplete from '../assets/timeline-copilot-autocomplete.png?url';
import cursorFrontend from '../assets/timeline-cursor-frontend.png?url';
import mentoringLlm from '../assets/timeline-mentoring-llm.png?url';
import aiTechDebt from '../assets/timeline-ai-tech-debt.png?url';

interface TimelineItem {
  anchorDate: Date | null;
  text: string;
  textEn: string;
  bullets?: string[];
  bulletsEn?: string[];
  image: string | null;
  imageClassName?: string;
  emphasis?: boolean;
}

function monthsUk(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'місяць';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'місяці';
  return 'місяців';
}

function timeLabel(anchorDate: Date | null, lang: Lang): string {
  if (!anchorDate) return tr(lang, 'відтоді', 'since then');
  const now = new Date();
  const months =
    (now.getFullYear() - anchorDate.getFullYear()) * 12 +
    (now.getMonth() - anchorDate.getMonth());
  return tr(
    lang,
    `${months} ${monthsUk(months)} тому`,
    `${months} ${months === 1 ? 'month' : 'months'} ago`,
  );
}

const timelineItems: TimelineItem[] = [
  { anchorDate: new Date(2024, 9),  text: 'copilot? крутий автокомпліт', textEn: 'copilot? cool autocomplete', image: copilotAutocomplete },
  { anchorDate: new Date(2024, 10), text: 'я не вмію у фронтенд, cursor, допоможи', textEn: "I can't do frontend, cursor, help me", image: cursorFrontend },
  { anchorDate: new Date(2025, 2),  text: 'а що як це не просто кодогенерація, а pair programming?', textEn: 'what if this is not just code generation, but pair programming?', image: mentoringLlm },
  { anchorDate: new Date(2025, 3),  text: 'але ж це все ще іграшкова технологія, так?', textEn: "but it's still a toy technology, right?", image: aiTechDebt, imageClassName: 'timeline-panel__image--zoom-anim' },
  {
    anchorDate: new Date(2025, 4),
    text: 'Claude Code proof of concept with Anthropic',
    textEn: 'Claude Code proof of concept with Anthropic',
    bullets: [
      'побачив потенціал і свідомо більше не писав жодного рядка коду вручну',
      'шукав і знайшов свій комфортний AI agentic coding workflow',
      'просував Claude Code у Superhuman: воркшопи, туторіали, 1-1',
      'будував внутрішні інструменти: плагіни, скіли, автономні агенти',
    ],
    bulletsEn: [
      'saw the potential and deliberately stopped writing code by hand',
      'searched for and found my comfortable AI agentic coding workflow',
      'championed Claude Code at Superhuman: workshops, tutorials, 1-1s',
      'built internal tools: plugins, skills, autonomous agents',
    ],
    image: null,
  },
];

const lastIdx = timelineItems.length - 1;
const lastBulletsCount = timelineItems[lastIdx].bullets?.length ?? 0;

export const TimelineSlide: SlideDefinition = {
  id: 'timeline',
  maxRevealStages: lastIdx + lastBulletsCount,
  content: ({ revealStage, lang }) => {
    const currentStage = Math.min(revealStage, lastIdx);
    const currentItem = timelineItems[currentStage];
    const visibleBulletCount =
      currentStage === lastIdx
        ? Math.min(lastBulletsCount, Math.max(0, revealStage - lastIdx))
        : currentItem.bullets?.length ?? 0;
    const currentText = tr(lang, currentItem.text, currentItem.textEn);
    const currentBullets = tr(lang, currentItem.bullets, currentItem.bulletsEn);

    return (
      <div className="timeline-slide-v2">
        <h2 className="timeline-title-v2">
          <span className="text-dim">//</span>{' '}{tr(lang, 'AI-first таймлайн', 'AI-first timeline')}
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
                      {timeLabel(item.anchorDate, lang)}
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
              {currentBullets ? (
                <>
                  <div className="timeline-panel__text timeline-panel__text--emphasis">
                    {currentText}
                  </div>
                  {visibleBulletCount > 0 && (
                    <ul className="timeline-panel__list">
                      {currentBullets.slice(0, visibleBulletCount).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <div className={`timeline-panel__text ${currentItem.emphasis ? 'timeline-panel__text--emphasis' : ''}`}>
                  {currentText}
                </div>
              )}

              {/* Image if available */}
              {currentItem.image && (
                <img
                  src={currentItem.image}
                  alt={currentText}
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
