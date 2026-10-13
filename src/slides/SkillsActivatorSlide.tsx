import { SlideDefinition, SlideContentProps } from '../types/slides';
import { T } from '../context/LanguageContext';
import type { ReactNode } from 'react';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const SKILL_MD_CODE = `---
activation:
  keywords:
    # block until loaded
    - { keyword: "create pr", action: require }
    # hint to load
    - { keyword: "commit",    action: suggest }
  tools:
    # match tool calls
    - { tool: Bash, match: "git (push|commit)" }
  directories:
    # required in this dir
    - { match: "my-service", action: require }
---`;

const HOOKS_CODE = `{
  "SessionStart":
    "scan SKILL.md files → index activations",
  "UserPromptSubmit":
    "match prompt keywords → suggest / block",
  "PreToolUse":
    "match tool name+input → suggest / block",
  "PostToolUse":
    "suggest skills based on tool result",
  "PostToolUseFailure":
    "suggest skills on tool failure",
  "SessionEnd":
    "cleanup session index"
}`;

const SUGGEST_CODE = `// suggest — additionalContext injection
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "UserPromptSubmit",
    additionalContext:
      "Relevant skills:\\n" +
      formatSkill(skill) +
      "\\n\\nConsider using Skill.",
  },
}));
process.exit(0);`;

const BLOCK_CODE = `// block — stderr + exit 2
console.error(
  "BLOCKED: Required skill not loaded: " +
  skillList + "\\n\\n" +
  "ACTION REQUIRED:\\n" +
  "1. Use Skill tool to load NOW.\\n" +
  "2. READ and INTERNALIZE the skill.\\n" +
  "3. REEVALUATE your approach."
);
process.exit(2);`;

type PanelVariant = { key: string; label: ReactNode; language: 'yaml' | 'json' | 'typescript'; code: string };

function panelFor(revealStage: number): PanelVariant | null {
  if (revealStage >= 4) {
    return { key: 'block', label: 'match-prompt.js — block path', language: 'typescript', code: BLOCK_CODE };
  }
  if (revealStage >= 3) {
    return { key: 'suggest', label: 'match-prompt.js — suggest path', language: 'typescript', code: SUGGEST_CODE };
  }
  if (revealStage >= 2) {
    return { key: 'hooks', label: '~/.claude/hooks.json — runtime', language: 'json', code: HOOKS_CODE };
  }
  if (revealStage >= 1) {
    return { key: 'skill', label: <T uk="SKILL.md — активаційні правила" en="SKILL.md — activation rules" />, language: 'yaml', code: SKILL_MD_CODE };
  }
  return null;
}

function SkillsActivatorContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green"><T uk="але найважливіше в усій цій історії" en="but the most important part of this whole story" /></span>{' '}—{' '}
        <span className="text-orange"><T uk="це активатор скілів" en="is the skills activator" /></span>
      </h2>

      <div className="skills-activator-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="skills-activator-bullets">
          {revealStage === 0 && (
            <SlideItem delay={0.05}>
              <T
                uk={<>Клод все ще ненадійно завантажує{' '}
              <Emphasis color="orange">потрібні скіли</Emphasis></>}
                en={<>Claude still doesn't reliably load{' '}
              <Emphasis color="orange">the right skills</Emphasis></>}
              />
            </SlideItem>
          )}

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              <T
                uk={<>тому ми зробили <Emphasis color="green">skills-activator</Emphasis> — у{' '}
              <Emphasis color="orange">SKILL.md</Emphasis> описуємо правила активації:
              {' '}ключові слова, патерни tool-викликів, директорії</>}
                en={<>so we built <Emphasis color="green">skills-activator</Emphasis> — in{' '}
              <Emphasis color="orange">SKILL.md</Emphasis> we describe activation rules:
              {' '}keywords, tool-call patterns, directories</>}
              />
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              <T
                uk={<>Claude Code <Emphasis color="green">хуки</Emphasis> перехоплюють події сесії
              {' '}і <Emphasis color="green">аналізують</Emphasis>{' '}
              промпти, bash-команди, виклики інструментів та їхні{' '}
              <Emphasis color="orange">аутпути</Emphasis></>}
                en={<>Claude Code <Emphasis color="green">hooks</Emphasis> intercept session events
              {' '}and <Emphasis color="green">analyze</Emphasis>{' '}
              prompts, bash commands, tool calls and their{' '}
              <Emphasis color="orange">outputs</Emphasis></>}
              />
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              <T
                uk={<>якщо хук бачить що потрібний скіл не завантажений —
              {' '}<Emphasis color="green">підказує</Emphasis> Клоду,
              {' '}інжектуючи контекст у промпт через{' '}
              <Emphasis color="green">additionalContext</Emphasis></>}
                en={<>if the hook sees a required skill isn't loaded, it
              {' '}<Emphasis color="green">nudges</Emphasis> Claude
              {' '}by injecting context into the prompt via{' '}
              <Emphasis color="green">additionalContext</Emphasis></>}
              />
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0} reveal>
              <T
                uk={<>а для критичних випадків — <Emphasis color="orange">блокує</Emphasis>
              {' '}виклик через <Emphasis color="orange">exit 2</Emphasis> + stderr
              {' '}з інструкцією, який скіл завантажити</>}
                en={<>and for critical cases it <Emphasis color="orange">blocks</Emphasis>
              {' '}the call via <Emphasis color="orange">exit 2</Emphasis> + stderr
              {' '}telling Claude which skill to load</>}
              />
            </SlideItem>
          )}
        </div>

        {/* Right column: framed panel — appears from stage 1 onwards. */}
        {panel && (
          <div className="skills-activator-panel" key={panel.key}>
            <div className="skills-activator-panel__chrome skills-activator-panel__chrome--top">
              ░░░ {panel.label} ░░░
            </div>
            <div className="skills-activator-panel__viewport">
              <CodeBlock language={panel.language} code={panel.code} />
            </div>
            <div className="skills-activator-panel__chrome skills-activator-panel__chrome--bottom">
              [END OF TRANSMISSION]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const SkillsActivatorSlide: SlideDefinition = {
  id: 'skills-activator',
  maxRevealStages: 4,
  content: ({ revealStage }: SlideContentProps) => <SkillsActivatorContent revealStage={revealStage} />,
  notes:
    'Skills discovery — last-mile проблема. Stage 0: проблема (одна репліка, без панелі справа). Stage 1: SKILL.md активаційні правила (keywords / tools / directories). Stage 2: ~/.claude/hooks.json — повний набір з 6 хуків (SessionStart → SessionEnd), які аналізують промпти, bash-команди, tool-виклики та їхні аутпути. Stage 3: suggest — інʼєкція в промпт через additionalContext, exit 0. Stage 4: block — stderr + exit 2 для критичних випадків.',
};
