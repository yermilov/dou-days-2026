import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const TIER_CODE = `# Tier 1: MCP annotations (~0ms)
if tool.readOnlyHint    → approve
if tool.destructiveHint → deny

# Tier 2: SHA-256 cache (~0ms)
if cache.has(sha256(tool + cmd)) → cached_decision

# Tier 3: LLM-as-judge with SAFETY_PROMPT (~2-18s)
#   SAFE   | cat, ls, git status, npm test, kubectl get
#   UNSAFE | rm -rf, terraform apply, sudo, env|SECRET
verdict = llm.classify(cmd, SAFETY_PROMPT)
# fail-safe: any error → exit(0) → normal prompt`;

const AUTO_MODE_CODE = `$ claude --permission-mode auto

# Sonnet classifier evaluates every tool call
allows: file read/write, npm install,
        push to feature/*, read-only HTTP
blocks: download+exec, credential leaks,
        force-push to main, mass deletion

# 3x consecutive block → resumes prompting

# enterprise config
{ "permissions": {
    "defaultMode": "auto",
    "allow": ["Bash(npm install:*)"]
  },
  "autoMode": {
    "environment": [
      "trusted: *.internal.acme.com"
    ]
  } }`;

type PanelVariant = { key: string; label: string; language: 'bash'; code: string };

function panelFor(revealStage: number): PanelVariant {
  if (revealStage >= 1) {
    return { key: 'auto-mode', label: 'anthropic auto-mode', language: 'bash', code: AUTO_MODE_CODE };
  }
  return { key: 'tiers', label: 'auto-approve.ts — 3-tier hook', language: 'bash', code: TIER_CODE };
}

function AutoApproveContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">тепер</span>{' '}
        <span className="text-orange">серйозно</span>
      </h2>

      <div className="auto-approve-body">
        {/* Left column: one bullet per reveal stage (swap, not accumulate). */}
        <div className="auto-approve-bullets">
          {revealStage === 0 && (
            <SlideItem delay={0.05}>
              <Emphasis color="green">3-рівневий хук авто-підтвердження</Emphasis>:
              {' '}MCP-анотації + SHA-256-кеш для миттєвих рішень, LLM-as-judge класифікує решту
              {' '}як <Emphasis color="green">SAFE</Emphasis> (read-only, тести) чи{' '}
              <Emphasis color="orange">UNSAFE</Emphasis> (деструктивне, credentials, інфра)
              {' '}— помилка fail-safe → стандартний промпт
            </SlideItem>
          )}

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              Anthropic зашипили <Emphasis color="green">--permission-mode auto</Emphasis>
              {' '}— фоновий Sonnet-класифікатор з тією самою філософією: дозволяй безпечне
              {' '}локальне, блокуй деструктивне, fail-safe → ручне підтвердження при невпевненості
            </SlideItem>
          )}
        </div>

        {/* Right column: framed panel — stable height across all reveal stages */}
        <div className="auto-approve-panel" key={panel.key}>
          <div className="auto-approve-panel__chrome auto-approve-panel__chrome--top">
            ░░░ {panel.label} ░░░
          </div>
          <div className="auto-approve-panel__viewport">
            <CodeBlock language={panel.language} code={panel.code} />
          </div>
          <div className="auto-approve-panel__chrome auto-approve-panel__chrome--bottom">
            [END OF TRANSMISSION]
          </div>
        </div>
      </div>
    </>
  );
}

export const AutoApproveHookSlide: SlideDefinition = {
  id: 'auto-approve-hook',
  maxRevealStages: 1,
  content: ({ revealStage }: SlideContentProps) => <AutoApproveContent revealStage={revealStage} />,
  notes:
    'Stage 0: наш 3-рівневий плагін авто-підтвердження (MCP-анотації → SHA-кеш → LLM-як-суддя з SAFE/UNSAFE класифікацією, fail-safe на помилці). Stage 1: Anthropic зашипили офіційну версію --permission-mode auto — та сама філософія, підтримка на рівні платформи.',
};
