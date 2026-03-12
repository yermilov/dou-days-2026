import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const STYLES = `
  #agent-workflow-right .code-block {
    margin: 0;
  }
  @keyframes revealPanel {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .code-reveal {
    animation: revealPanel 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

const SDK_CODE = `import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review the PR and post comments on issues found",
  options: { allowedTools: ["Bash", "Read", "Glob"] },
})) {
  // handle streaming messages
}`;

const PLUGINS_CODE = `for (const marketplace of marketplaces) {
  const dir = \`/tmp/agent-runner/\${marketplace.owner}-\${marketplace.repo}\`;
  await apiClient.cloneRepo(marketplace.owner, marketplace.repo, {
    targetDir: dir, depth: 1,
  });
  for (const pluginsDir of marketplace.pluginsDirs) {
    const found = discoverPluginsInDir(
      \`\${dir}/\${pluginsDir}\`,
      marketplace.enabledPlugins,  // allowlist filter
    );
    pluginPaths.push(...found);
  }
}`;

const EXECUTION_CODE = `// agentic: Claude produces structured ReviewResult
const { result } = await claudeClient.executeWithSkills<ReviewResult>(
  steps, reviewResultSchema, plugins, ["cicd:github"],
);
// deterministic: traditional code processes result and drives side effects
const valid = sanitizeReviewResult(result, minConfidence, minSeverity);
for (const comment of valid.review.comments) {
  await cicdClient.postInlineComment(prNumber, comment);
}
if (valid.review.approve) { await cicdClient.approvePR(prNumber); }`;

const SCHEMA_CODE = `const reviewResultSchema = z.object({
  approve: z.boolean(),
  comments: z.array(z.object({
    file:         z.string().optional(),
    comment_body: z.string(),
    severity:     z.enum(["critical", "high", "medium", "low"]),
    confidence:   z.number().int().min(0).max(100),
  })),
});
export type ReviewResult = z.infer<typeof reviewResultSchema>;`;

function AgentWorkflowContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}</style>

      <h2 style={{ marginBottom: '1.2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">agents</span>{' '}
        <span className="text-orange">--workflow</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* ── Left column: bullets ── */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            you need an <Emphasis color="green">environment</Emphasis> for agent execution — start locally with human-controlled proof of concepts, then graduate to CI or a dedicated Kubernetes cluster
          </SlideItem>

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              use <Emphasis color="orange">claude agents sdk</Emphasis> — essentially a TypeScript wrapper around the Claude Code CLI — as your agent runtime
            </SlideItem>
          )}
          {revealStage === 2 && (
            <SlideItem delay={0} reveal>
              always clone your <Emphasis color="green">skills marketplace</Emphasis> and inject it into the SDK execution context; enable needed plugins and skill activation hooks
            </SlideItem>
          )}
          {revealStage === 3 && (
            <SlideItem delay={0} reveal>
              embrace <Emphasis color="orange">mixed deterministic/agentic execution</Emphasis>: write traditional scripts with loops and conditionals that invoke the Claude SDK only for the complex, non-deterministic work
            </SlideItem>
          )}
          {revealStage === 4 && (
            <SlideItem delay={0} reveal>
              use <Emphasis color="green">claude structured output</Emphasis> for decisions and deterministic code for all side effects — keeps agents predictable and auditable
            </SlideItem>
          )}
        </div>

        {/* ── Right column: code panels ── */}
        <div
          id="agent-workflow-right"
          style={{
            flex: 1,
            '--font-size-code': '0.82rem',
          } as React.CSSProperties}
        >
          {revealStage === 1 && (
            <div key="1" className="code-reveal">
              <CodeBlock language="typescript" filename="agent.ts" code={SDK_CODE} />
            </div>
          )}
          {revealStage === 2 && (
            <div key="2" className="code-reveal">
              <CodeBlock language="typescript" filename="plugins.ts" code={PLUGINS_CODE} />
            </div>
          )}
          {revealStage === 3 && (
            <div key="3" className="code-reveal">
              <CodeBlock language="typescript" filename="federated-orchestrator.ts" code={EXECUTION_CODE} />
            </div>
          )}
          {revealStage === 4 && (
            <div key="4" className="code-reveal">
              <CodeBlock language="typescript" filename="types.ts" code={SCHEMA_CODE} />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export const AgentWorkflowSlide: SlideDefinition = {
  id: 'agent-workflow',
  maxRevealStages: 4,
  content: ({ revealStage }: SlideContentProps) => <AgentWorkflowContent revealStage={revealStage} />,
  notes:
    'The key insight: agents should be deterministic at the boundaries. Claude handles ambiguity in the middle; traditional code handles I/O, retries, and side effects.',
};
