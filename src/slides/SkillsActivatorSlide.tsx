import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const SKILL_MD_CODE = `---
activation:
  keywords:
    - { keyword: "create pr",  action: require }  # block until loaded
    - { keyword: "commit",     action: suggest }  # hint to load
  tools:
    - { tool: Bash, match: "git (push|commit)" }  # match tool calls
  directories:
    - { match: "my-service", action: require }    # required in this dir
---`;

const HOOKS_CODE = `{
  "SessionStart":     "scan SKILL.md files → index activations",
  "UserPromptSubmit": "match prompt keywords → suggest / block",
  "PreToolUse":       "match tool name+input → suggest / block"
}`;

const RUNTIME_EXAMPLES = `# user: "create a pr for my changes"
# keyword "create pr" → require

[activator] skill not loaded: cicd:update-pull-request
[activator] BLOCKING — injecting into prompt:
  ⚠ SKILL REQUIRED: cicd:update-pull-request
  Load it first with: /cicd:update-pull-request

────────────────────────────────────

# claude calls: Bash("git push origin main")
# pattern "git (push|commit)" → require

[activator] skill not loaded: cicd:commit-and-push
[activator] BLOCKING tool call:
  { "decision": "block",
    "reason": "load cicd:commit-and-push first" }`;

const OVERVIEW_TEXT = `# skills-activator
# як це працює

  Phase 1 │ index    SessionStart → scan SKILL.md activations
  Phase 2 │ match    UserPromptSubmit + PreToolUse → suggest / block
  Phase 3 │ inject   missing skill → prompt injection / tool decision

  fail-safe: будь-яка помилка → стандартний Claude flow`;

type PanelVariant =
  | { key: string; label: string; mode: 'overview'; text: string }
  | { key: string; label: string; mode: 'code'; language: 'yaml' | 'json' | 'bash'; code: string };

function panelFor(revealStage: number): PanelVariant {
  if (revealStage >= 3) {
    return { key: 'runtime', label: 'runtime — інʼєкція + блокування', mode: 'code', language: 'bash', code: RUNTIME_EXAMPLES };
  }
  if (revealStage >= 2) {
    return { key: 'hooks', label: '~/.claude/hooks.json — runtime', mode: 'code', language: 'json', code: HOOKS_CODE };
  }
  if (revealStage >= 1) {
    return { key: 'skill', label: 'SKILL.md — активаційні правила', mode: 'code', language: 'yaml', code: SKILL_MD_CODE };
  }
  return { key: 'overview', label: 'skills-activator — як це працює', mode: 'overview', text: OVERVIEW_TEXT };
}

function SkillsActivatorContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--активатор-скілів</span>
      </h2>

      <div className="skills-activator-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="skills-activator-bullets">
          <SlideItem delay={0.05}>
            claude все ще ненадійно завантажує{' '}
            <Emphasis color="orange">потрібний скіл</Emphasis> — він часто існує, але мовчить
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              ми зробили <Emphasis color="green">skills-activator</Emphasis> — у{' '}
              <Emphasis color="orange">SKILL.md</Emphasis> описуємо правила активації:
              {' '}ключові слова, патерни tool-викликів, директорії
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              Claude Code <Emphasis color="green">хуки</Emphasis> перехоплюють події сесії
              {' '}і <Emphasis color="green">підказують</Emphasis> або{' '}
              <Emphasis color="orange">блокують</Emphasis>, доки потрібний скіл не завантажений
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              пропущений скіл → <Emphasis color="green">інʼєкція в промпт</Emphasis>;
              {' '}небезпечний tool-виклик → <Emphasis color="orange">блокування</Emphasis>
              {' '}з підказкою, який скіл завантажити
            </SlideItem>
          )}
        </div>

        {/* Right column: framed panel — stable height across all reveal stages */}
        <div className="skills-activator-panel" key={panel.key}>
          <div className="skills-activator-panel__chrome skills-activator-panel__chrome--top">
            ░░░ {panel.label} ░░░
          </div>
          <div className="skills-activator-panel__viewport">
            {panel.mode === 'overview' ? (
              <div className="skills-activator-panel__overview">{panel.text}</div>
            ) : (
              <CodeBlock language={panel.language} code={panel.code} />
            )}
          </div>
          <div className="skills-activator-panel__chrome skills-activator-panel__chrome--bottom">
            [END OF TRANSMISSION]
          </div>
        </div>
      </div>
    </>
  );
}

export const SkillsActivatorSlide: SlideDefinition = {
  id: 'skills-activator',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <SkillsActivatorContent revealStage={revealStage} />,
  notes:
    'Skills discovery — last-mile проблема. Stage 0: проблема + overview панелі (3 фази: index → match → inject). Stage 1: SKILL.md активаційні правила (keywords / tools / directories). Stage 2: ~/.claude/hooks.json — як хуки перехоплюють події сесії. Stage 3: runtime — приклади інʼєкції в промпт і блокування tool-виклику.',
};
