import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const STYLES = `
  #skills-activator-right .code-block {
    margin: 0;
  }
  @keyframes activatorPanelIn {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .activator-panel-reveal {
    animation: activatorPanelIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

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

const PROMPT_INJECT_EXAMPLE = `# user: "create a pr for my changes"
# keyword "create pr" matched → action: require

[activator] skill not loaded: cicd:update-pull-request
[activator] BLOCKING — injecting into prompt:

  ⚠ SKILL REQUIRED: cicd:update-pull-request
  Load it first with: /cicd:update-pull-request`;

const TOOL_BLOCK_EXAMPLE = `# claude calls: Bash("git push origin main")
# pattern "git (push|commit)" matched → action: require

[activator] skill not loaded: cicd:commit-and-push
[activator] BLOCKING tool call — returning to claude:

  { "decision": "block",
    "reason": "load cicd:commit-and-push first" }`;

function SkillsActivatorContent({ revealStage }: { revealStage: number }) {
  const showExamples = revealStage >= 1;

  return (
    <>
      <style>{STYLES}</style>

      <h2 style={{ marginBottom: '1.2rem' }}>
        
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--skills-activator</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

        {/* ── Left column: bullets ── */}
        <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            claude is still not very good at loading the <Emphasis color="orange">right skill</Emphasis>
          </SlideItem>

          <SlideItem delay={0.18}>
            invest your time to build a system that invokes the right skill when needed — use claude code hooks to intercept session events, analyze them (by keywords, pattern matching, or even llm analysis) and inject skill suggestions or even block execution without required skills loaded
          </SlideItem>
        </div>

        {/* ── Right column: config → examples on reveal ── */}
        <div
          id="skills-activator-right"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            '--font-size-code': '0.85rem',
          } as React.CSSProperties}
        >
          {!showExamples ? (
            <>
              <CodeBlock language="yaml" filename="SKILL.md" code={SKILL_MD_CODE} />
              <CodeBlock language="json" filename="hooks.json" code={HOOKS_CODE} />
            </>
          ) : (
            <div className="activator-panel-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <CodeBlock language="bash" filename="prompt injection" code={PROMPT_INJECT_EXAMPLE} />
              <CodeBlock language="bash" filename="tool blocking" code={TOOL_BLOCK_EXAMPLE} />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export const SkillsActivatorSlide: SlideDefinition = {
  id: 'skills-activator',
  maxRevealStages: 1,
  content: ({ revealStage }: SlideContentProps) => <SkillsActivatorContent revealStage={revealStage} />,
  notes: 'Skills discovery is the last mile problem. Stage 0: show the SKILL.md config + hooks wiring. Stage 1 (reveal): show what prompt injection and tool blocking look like in practice.',
};
