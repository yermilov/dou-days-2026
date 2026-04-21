import { SlideDefinition } from '../types/slides';
import yarikBadges from '/yarik-badges.jpg?url';

type Level = 'high' | 'medium' | 'low';

const levelStyles: Record<Level, { prefix: string; prefixColor: string; opacity: number }> = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--dou-magenta)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--dou-violet-light)',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--dou-white-muted)',
    opacity: 0.85,
  },
};

function BioItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div className="bio-body__item" style={{ opacity: s.opacity }}>
      <span className="bio-body__item-prefix" style={{ color: s.prefixColor }}>
        {s.prefix}
      </span>
      <span className="bio-body__item-label">{children}</span>
    </div>
  );
}

// Reveal-stage map preserved verbatim from the prior hero version:
//   stage 0: "0 -> 1 проєкти" (high)
//   stage 1: + AI-агентів line (high)
//   stage 2: + техлід платформної організації (medium)
//   stage 3: + техлід feature-фреймворків (medium)
//   stage 4: + розробляв продуктові фічі (medium)
//   stage 5: + Java backend-інженер (low)
export const BioSlide: SlideDefinition = {
  id: 'bio',
  maxRevealStages: 5,
  content: ({ revealStage }) => (
    <div className="bio-body">
      <div className="bio-body__text">
        <h2 className="bio-body__title">
          <span className="text-dim">$</span> whoami
        </h2>

        <p className="bio-body__subtitle">майже 9 років у Grammarly / Superhuman</p>

        <div className="bio-body__items">
          <BioItem level="high">0 -&gt; 1 проєкти</BioItem>
          {revealStage >= 1 && (
            <BioItem level="high">у 2025: розгортаю AI-агентів для кодування у компанії</BioItem>
          )}
          {revealStage >= 2 && (
            <BioItem level="medium">до того: техлід платформної організації</BioItem>
          )}
          {revealStage >= 3 && (
            <BioItem level="medium">до того: техлід feature-фреймворків</BioItem>
          )}
          {revealStage >= 4 && (
            <BioItem level="medium">до того: розробляв продуктові фічі</BioItem>
          )}
          {revealStage >= 5 && <BioItem level="low">починав як Java backend-інженер</BioItem>}
        </div>
      </div>

      <div className="bio-body__image">
        <img src={yarikBadges} alt="Grammarly badges" loading="lazy" />
      </div>
    </div>
  ),
};
