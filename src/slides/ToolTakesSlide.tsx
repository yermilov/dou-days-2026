import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import claudeLogo from '/logos/claude.svg?url';
import openaiLogo from '/logos/openai.svg?url';
import cursorLogo from '/logos/cursor.svg?url';
import sourcegraphLogo from '/logos/sourcegraph.svg?url';
import geminiLogo from '/logos/gemini.svg?url';
import copilotLogo from '/logos/github-copilot.svg?url';
import lovableLogo from '/logos/lovable.svg?url';

type Tool = {
  id: string;
  name: string;
  logo: string | null;
  take: ReactNode;
};

const TOOLS: Tool[] = [
  { id: 'claude',   name: 'Claude Code',  logo: claudeLogo,      take: 'легенда, кращого не існує' },
  { id: 'codex',    name: 'Codex',        logo: openaiLogo,      take: 'класна модель, cli відстає' },
  { id: 'cursor',   name: 'Cursor',       logo: cursorLogo,      take: 'для тих, хто не відпускає IDE' },
  { id: 'amp',      name: 'Amp',          logo: sourcegraphLogo, take: 'цікаво, але навіщо неясно' },
  { id: 'gemini',   name: 'Gemini CLI',   logo: geminiLogo,      take: 'просто навіщо неясно' },
  { id: 'copilot',  name: 'Copilot',      logo: copilotLogo,     take: 'погано як і все що пов\'язано з гітхабом' },
  { id: 'lovable',  name: 'Lovable',      logo: lovableLogo,     take: 'для не інженерів' },
  { id: 'wildcard', name: '?',            logo: null,            take: '' },
];

function ToolCard({
  tool,
  takeShown,
  identityShown,
}: {
  tool: Tool;
  takeShown: boolean;
  identityShown: boolean;
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
      <div className="tool-takes-take">{takeShown ? tool.take : ' '}</div>
    </div>
  );
}

function ToolTakesContent({ revealStage }: { revealStage: number }) {
  // Stage 0: всі takes видно одразу + Claude Code вже розкрита (не секрет,
  // це інструмент спікера). Stages 1..N-1 — інші 7 ідентичностей по черзі.
  return (
    <>
      <h2 className="tool-takes-title">
        <span className="text-dim">//</span>{' '}
        <span className="text-orange">(не)популярні</span>{' '}
        <span className="text-green">думки про тули</span>
      </h2>

      <div className="tool-takes-grid">
        {TOOLS.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            takeShown={true}
            identityShown={revealStage >= i}
          />
        ))}
      </div>
    </>
  );
}

export const ToolTakesSlide: SlideDefinition = {
  id: 'tool-takes',
  maxRevealStages: TOOLS.length - 1,
  content: ({ revealStage }: SlideContentProps) => <ToolTakesContent revealStage={revealStage} />,
  notes:
    'Stage 0: всі takes видно одразу, Claude Code вже розкрита, інші 7 — силуети + ???. Аудиторія читає takes і вгадує. Stages 1–7: інші 7 ідентичностей де-силуетуються по черзі.',
};
