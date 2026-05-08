import { ReactNode } from 'react';
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

// One BIO_ITEM per reveal stage: index 0 is always visible, index N appears at revealStage >= N.
const BIO_ITEMS: { level: Level; content: ReactNode }[] = [
  { level: 'low',    content: <>починав як Java backend-інженер</> },
  { level: 'medium', content: <>потім: розробляв продуктові фічі</> },
  { level: 'medium', content: <>потім: техлід feature-фреймворків</> },
  { level: 'medium', content: <>потім: техлід платформної організації</> },
  { level: 'high',   content: <>зараз: AI-first розробка</> },
];

export const BioSlide: SlideDefinition = {
  id: 'bio',
  maxRevealStages: BIO_ITEMS.length - 1,
  content: ({ revealStage }) => (
    <div className="bio-body">
      <div className="bio-body__text">
        <h2 className="bio-body__title">
          <span className="text-dim">//</span>{' '}хто я
        </h2>

        <p className="bio-body__subtitle">9 років у Superhuman (раніше відомої як Grammarly)</p>

        <div className="bio-body__items">
          {BIO_ITEMS.map((item, i) =>
            revealStage >= i ? (
              <BioItem key={i} level={item.level}>{item.content}</BioItem>
            ) : null,
          )}
        </div>
      </div>

      <div className="bio-body__image">
        <img src={yarikBadges} alt="Grammarly badges" loading="lazy" />
      </div>
    </div>
  ),
};
