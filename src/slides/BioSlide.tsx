import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { tr } from '../context/LanguageContext';
import yarikBadges from '../assets/yarik-badges.jpg?url';

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
const BIO_ITEMS: { level: Level; content: ReactNode; en: ReactNode }[] = [
  { level: 'low',    content: <>починав як Java backend-інженер</>, en: <>started as a Java backend engineer</> },
  { level: 'medium', content: <>потім: техлідив продуктові фічі</>, en: <>then: tech lead for product features</> },
  { level: 'medium', content: <>потім: техлід платформної організації</>, en: <>then: tech lead of a platform org</> },
  { level: 'high',   content: <>зараз: AI-first розробка</>, en: <>now: AI-first development</> },
];

export const BioSlide: SlideDefinition = {
  id: 'bio',
  maxRevealStages: BIO_ITEMS.length - 1,
  content: ({ revealStage, lang }) => (
    <div className="bio-body">
      <div className="bio-body__text">
        <h2 className="bio-body__title">
          <span className="text-dim">//</span>{' '}{tr(lang, 'хто я', 'who am I')}
        </h2>

        <p className="bio-body__subtitle">{tr(lang, '9 років у компанії Superhuman (раніше відомої як Grammarly)', '9 years at Superhuman (formerly known as Grammarly)')}</p>

        <div className="bio-body__items">
          {BIO_ITEMS.map((item, i) =>
            revealStage >= i ? (
              <BioItem key={i} level={item.level}>{tr(lang, item.content, item.en)}</BioItem>
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
