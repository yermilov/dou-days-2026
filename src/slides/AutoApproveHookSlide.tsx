import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const TIER_CODE = `# PermissionRequest hook → bun run auto-approve.ts

# Tier 1: MCP Annotation Fast-Path (~0ms)
if tool.readOnlyHint    → approve
if tool.destructiveHint → deny

# Tier 2: SHA-256 Cache (~0ms)
hash = sha256(tool_name + command)
if cache.has(hash) → return cached_decision

# Tier 3: LLM-as-Judge (~2-18s)
verdict = llm.classify(command, SAFETY_PROMPT)
cache.set(hash, verdict)

# fail-safe: any error → exit(0) → normal prompt`;

const SAFETY_CODE = `# SAFETY_PROMPT for LLM-as-Judge
SAFE:
  read-only cmds    | cat, ls, git status/log/diff
  safe git          | add, commit, push feature/*
  test runners      | npm test, pytest, go test
  k8s reads         | kubectl get/describe/logs

UNSAFE:
  destructive       | rm -rf, git push --force
  infra mutations   | terraform apply/destroy
  network writes    | curl -X POST/PUT/DELETE
  privilege esc     | sudo, chmod 777
  credential ops    | env | grep SECRET`;

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
    "environment": ["trusted: *.internal.acme.com"]
  } }`;

const OVERVIEW_TEXT = `# auto-approve.ts
# 3-tier permission classifier

  Tier 1 │ MCP annotation        ~0ms
  Tier 2 │ SHA-256 cache         ~0ms
  Tier 3 │ LLM-as-judge          ~2-18s

  fail-safe: any error → manual prompt`;

type PanelVariant =
  | { key: string; label: string; mode: 'overview'; text: string }
  | { key: string; label: string; mode: 'code'; language: 'bash'; code: string };

function panelFor(revealStage: number): PanelVariant {
  if (revealStage >= 3) {
    return { key: 'auto-mode', label: 'anthropic auto-mode', mode: 'code', language: 'bash', code: AUTO_MODE_CODE };
  }
  if (revealStage >= 2) {
    return { key: 'safety', label: 'SAFETY_PROMPT', mode: 'code', language: 'bash', code: SAFETY_CODE };
  }
  if (revealStage >= 1) {
    return { key: 'tiers', label: 'auto-approve.ts — 3-tier decision', mode: 'code', language: 'bash', code: TIER_CODE };
  }
  return { key: 'overview', label: 'auto-approve — overview', mode: 'overview', text: OVERVIEW_TEXT };
}

function AutoApproveContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--авто-підтвердження</span>
      </h2>

      <div className="auto-approve-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="auto-approve-bullets">
          <SlideItem delay={0.05}>
            кожен виклик інструмента потребує ручного <Emphasis color="orange">approve / deny</Emphasis>
            {' '}— це руйнує flow state і вбиває швидкість у довгих автономних сесіях
          </SlideItem>

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              ми зробили <Emphasis color="green">3-рівневий хук авто-підтвердження</Emphasis>:
              {' '}MCP-анотації для миттєвих читань, SHA-256-кеш для повторних команд,
              {' '}LLM-as-judge для всього іншого — будь-яка помилка fail-safe → стандартний промпт
            </SlideItem>
          )}

          {revealStage === 2 && (
            <SlideItem delay={0} reveal>
              safety-промпт класифікує команди як{' '}
              <Emphasis color="green">SAFE</Emphasis> чи{' '}
              <Emphasis color="orange">UNSAFE</Emphasis> — read-only і тести проходять;
              {' '}деструктивні операції, доступ до credentials і зміни інфраструктури блокуються
            </SlideItem>
          )}

          {revealStage === 3 && (
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
            {panel.mode === 'overview' ? (
              <div className="auto-approve-panel__overview">{panel.text}</div>
            ) : (
              <CodeBlock language={panel.language} code={panel.code} />
            )}
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
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <AutoApproveContent revealStage={revealStage} />,
  notes:
    'Prompt fatigue — реальний вбивця швидкості. Stage 0: проблема + overview панелі. Stage 1: наш 3-рівневий плагін авто-підтвердження (MCP-анотації → кеш → LLM-як-суддя). Stage 2: правила safety-класифікації. Stage 3: Anthropic зашипили офіційну версію --permission-mode auto — та сама філософія, підтримка на рівні платформи.',
};
