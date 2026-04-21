import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const STYLES = `
  #auto-approve-right .code-block {
    margin: 0;
  }
  @keyframes autoApproveReveal {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .auto-approve-reveal {
    animation: autoApproveReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

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

function AutoApproveContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}</style>

      <h2 style={{ marginBottom: '1.2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--auto-approve-permissions</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Left column: bullets */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            every tool call requires a manual <Emphasis color="orange">approve/deny</Emphasis> prompt
            {' '}— this breaks flow state and kills velocity in long autonomous sessions
          </SlideItem>

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              we built a <Emphasis color="green">3-tier auto-approval</Emphasis> hook:
              MCP annotations for instant reads, SHA-256 cache for repeat commands,
              LLM-as-judge for everything else — any error falls back to normal prompt
            </SlideItem>
          )}
          {revealStage === 2 && (
            <SlideItem delay={0} reveal>
              the safety prompt classifies commands as{' '}
              <Emphasis color="green">SAFE</Emphasis> or{' '}
              <Emphasis color="orange">UNSAFE</Emphasis> — read-only and test commands
              pass; destructive ops, credential access, and infra mutations get blocked
            </SlideItem>
          )}
          {revealStage === 3 && (
            <SlideItem delay={0} reveal>
              Anthropic shipped <Emphasis color="green">--permission-mode auto</Emphasis>
              {' '}— background Sonnet classifier with the same philosophy: allow safe
              local ops, block destructive actions, fall back on uncertainty
            </SlideItem>
          )}
        </div>

        {/* Right column: code panels */}
        <div
          id="auto-approve-right"
          style={{
            flex: 1,
          } as React.CSSProperties}
        >
          {revealStage === 1 && (
            <div key="1" className="auto-approve-reveal">
              <CodeBlock language="bash" filename="auto-approve.ts — 3-tier decision" code={TIER_CODE} />
            </div>
          )}
          {revealStage === 2 && (
            <div key="2" className="auto-approve-reveal">
              <CodeBlock language="bash" filename="SAFETY_PROMPT" code={SAFETY_CODE} />
            </div>
          )}
          {revealStage === 3 && (
            <div key="3" className="auto-approve-reveal">
              <CodeBlock language="bash" filename="anthropic auto-mode" code={AUTO_MODE_CODE} />
            </div>
          )}
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
    'Prompt fatigue is a real velocity killer. Stage 0: the problem. Stage 1: our 3-tier auto-approval plugin (MCP annotations → cache → LLM judge). Stage 2: the safety classification rules. Stage 3: Anthropic shipped an official version with --permission-mode auto — same philosophy, platform-level support.',
};
