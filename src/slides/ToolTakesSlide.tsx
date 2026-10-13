import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { tr, type Lang } from '../context/LanguageContext';
import claudeLogo from '../assets/logos/claude.svg?url';
import openaiLogo from '../assets/logos/openai.svg?url';
import cursorLogo from '../assets/logos/cursor.svg?url';
import sourcegraphLogo from '../assets/logos/sourcegraph.svg?url';
import geminiLogo from '../assets/logos/gemini.svg?url';
import copilotLogo from '../assets/logos/github-copilot.svg?url';
import lovableLogo from '../assets/logos/lovable.svg?url';

type Tool = {
  id: string;
  name: string;
  logo: string | null;
  take: ReactNode;
  takeEn: ReactNode;
};

const TOOLS: Tool[] = [
  { id: 'claude',   name: 'Claude Code',  logo: claudeLogo,      take: 'легенда, кращого не існує', takeEn: 'a legend, nothing better exists' },
  { id: 'codex',    name: 'Codex',        logo: openaiLogo,      take: 'класна модель, cli відстає', takeEn: 'great model, the cli lags behind' },
  { id: 'cursor',   name: 'Cursor',       logo: cursorLogo,      take: 'для тих, хто не відпускає IDE', takeEn: "for those who won't let go of the IDE" },
  { id: 'amp',      name: 'Amp',          logo: sourcegraphLogo, take: 'цікаво, але навіщо неясно', takeEn: 'interesting, but why is unclear' },
  { id: 'gemini',   name: 'Gemini CLI',   logo: geminiLogo,      take: 'загалом неясно навіщо', takeEn: 'unclear why at all' },
  { id: 'copilot',  name: 'Copilot',      logo: copilotLogo,     take: 'просто погано', takeEn: 'just bad' },
  { id: 'lovable',  name: 'Lovable',      logo: lovableLogo,     take: 'для фахівців не з інжинірингу', takeEn: 'for non-engineering folks' },
  { id: 'wildcard', name: '?',            logo: null,            take: '', takeEn: '' },
];

function ToolCard({
  tool,
  takeShown,
  identityShown,
  lang,
}: {
  tool: Tool;
  takeShown: boolean;
  identityShown: boolean;
  lang: Lang;
}) {
  // Wildcard is not a real tool — render a single big ? glyph in place of
  // icon + name + ??? so it reads as "the unknown next thing", not a brand.
  const isWildcard = tool.logo === null;

  const classes = [
    'tool-takes-card',
    takeShown && 'tool-takes-card--take-shown',
    identityShown && 'tool-takes-card--identity-shown',
    isWildcard && 'tool-takes-card--wildcard',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="tool-takes-icon">
        {tool.logo ? (
          <img src={tool.logo} alt="" loading="lazy" />
        ) : (
          <span className="tool-takes-icon__glyph">?</span>
        )}
      </div>
      {!isWildcard && (
        <div className="tool-takes-name">{identityShown ? tool.name : '???'}</div>
      )}
      <div className="tool-takes-take">{takeShown ? tr(lang, tool.take, tool.takeEn) : ' '}</div>
    </div>
  );
}

function ToolTakesContent({ revealStage, lang }: { revealStage: number; lang: Lang }) {
  // Stage 0: всі takes видно одразу + Claude Code вже розкрита (не секрет,
  // це інструмент спікера). Stages 1..N-1 — інші 7 ідентичностей по черзі.
  return (
    <>
      <h2 className="tool-takes-title">
        <span className="text-dim">//</span>{' '}
        <span className="text-orange">{tr(lang, '(не)популярні', '(un)popular')}</span>{' '}
        <span className="text-green">{tr(lang, 'думки про тули', 'opinions on tools')}</span>
      </h2>

      <div className="tool-takes-grid">
        {TOOLS.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            takeShown={true}
            identityShown={revealStage >= i}
            lang={lang}
          />
        ))}
      </div>
    </>
  );
}

export const ToolTakesSlide: SlideDefinition = {
  id: 'tool-takes',
  maxRevealStages: TOOLS.length - 1,
  content: ({ revealStage, lang }: SlideContentProps) => <ToolTakesContent revealStage={revealStage} lang={lang} />,
  notes:
    'Stage 0: всі takes видно одразу, Claude Code вже розкрита, інші 7 — силуети + ???. Аудиторія читає takes і вгадує. Stages 1–7: інші 7 ідентичностей де-силуетуються по черзі.',
};
