import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const SDK_CODE = `import { query } from
  "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt:
    "Review the PR and post comments on issues",
  options: {
    allowedTools: ["Bash", "Read", "Glob"],
  },
})) {
  // handle streaming messages
}`;

const PLUGINS_CODE = `for (const mp of marketplaces) {
  const dir =
    \`/tmp/agent-runner/\${mp.owner}-\${mp.repo}\`;
  await apiClient.cloneRepo(mp.owner, mp.repo, {
    targetDir: dir, depth: 1,
  });
  for (const pluginsDir of mp.pluginsDirs) {
    const found = discoverPluginsInDir(
      \`\${dir}/\${pluginsDir}\`,
      // allowlist filter
      mp.enabledPlugins,
    );
    pluginPaths.push(...found);
  }
}`;

const EXECUTION_CODE = `// agentic: Claude → structured ReviewResult
const { result } =
  await claudeClient.executeWithSkills<ReviewResult>(
    steps, reviewResultSchema,
    plugins, ["cicd:github"],
  );

// deterministic: code processes the result
// and drives side effects
const valid = sanitizeReviewResult(
  result, minConfidence, minSeverity,
);
for (const c of valid.review.comments) {
  await cicdClient.postInlineComment(prNumber, c);
}
if (valid.review.approve) {
  await cicdClient.approvePR(prNumber);
}`;

const SCHEMA_CODE = `const reviewResultSchema = z.object({
  approve: z.boolean(),
  comments: z.array(z.object({
    file:         z.string().optional(),
    comment_body: z.string(),
    severity: z.enum([
      "critical", "high", "medium", "low",
    ]),
    confidence:
      z.number().int().min(0).max(100),
  })),
});
export type ReviewResult =
  z.infer<typeof reviewResultSchema>;`;

type PanelVariant = {
  key: string;
  label: string;
  language: 'typescript';
  code: string;
};

function panelFor(revealStage: number): PanelVariant | null {
  if (revealStage >= 4) {
    return { key: 'schema', label: 'types.ts — structured output schema', language: 'typescript', code: SCHEMA_CODE };
  }
  if (revealStage >= 3) {
    return { key: 'execution', label: 'federated-orchestrator.ts — mixed execution', language: 'typescript', code: EXECUTION_CODE };
  }
  if (revealStage >= 2) {
    return { key: 'plugins', label: 'plugins.ts — marketplace injection', language: 'typescript', code: PLUGINS_CODE };
  }
  if (revealStage >= 1) {
    return { key: 'sdk', label: 'agent.ts — claude agents sdk', language: 'typescript', code: SDK_CODE };
  }
  return null;
}

function AgentWorkflowContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--воркфлов-агента</span>
      </h2>

      <div className="agent-workflow-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="agent-workflow-bullets">
          <SlideItem delay={0.05}>
            <Emphasis color="green">середовище виконання</Emphasis> —
            {' '}від локальних PoC під контролем людини до CI чи окремого Kubernetes-кластера
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              <Emphasis color="orange">Claude Agent SDK</Emphasis>
              {' '}— TypeScript-обгортка над Claude Code CLI — ваш рантайм для агентів
            </SlideItem>
          )}
          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              клонуйте свій <Emphasis color="green">маркетплейс скілів</Emphasis>
              {' '}у контекст SDK — вмикайте потрібні плагіни та хуки активації
            </SlideItem>
          )}
          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              <Emphasis color="orange">змішане детерміністичне/агентне виконання</Emphasis>:
              {' '}звичайні скрипти кличуть Claude SDK лише для недетермінованої роботи
            </SlideItem>
          )}
          {revealStage >= 4 && (
            <SlideItem delay={0} reveal>
              <Emphasis color="green">Claude Structured Output</Emphasis> для рішень
              {' '}+ детерміністичний код для сайд-ефектів — передбачувано та прозоро
            </SlideItem>
          )}
        </div>

        {/* Right column: framed code panel — mounts only at reveal stage >= 1 */}
        {panel && (
          <div className="agent-workflow-panel" key={panel.key}>
            <div className="agent-workflow-panel__chrome agent-workflow-panel__chrome--top">
              ░░░ {panel.label} ░░░
            </div>
            <div className="agent-workflow-panel__viewport">
              <CodeBlock language={panel.language} code={panel.code} />
            </div>
            <div className="agent-workflow-panel__chrome agent-workflow-panel__chrome--bottom">
              [END OF TRANSMISSION]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const AgentWorkflowSlide: SlideDefinition = {
  id: 'agent-workflow',
  maxRevealStages: 4,
  content: ({ revealStage }: SlideContentProps) => <AgentWorkflowContent revealStage={revealStage} />,
  notes:
    'Структурний blueprint побудови агентів. Stage 0: середовище виконання (локально → CI → K8s). Stage 1: Claude Agent SDK як рантайм. Stage 2: клонування маркетплейсу скілів у контекст SDK. Stage 3: змішане детерміністичне/агентне виконання. Stage 4: Structured Output для рішень + код для сайд-ефектів. Ключова теза: детермінізм на межах, агентність всередині.',
};
