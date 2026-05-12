import { useEffect, useRef, useState } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import yakImage from '../assets/yak.jpg?url';

// "25th frame" subliminal gag — Bos mutus (wild yak) flashes for ~120ms on the
// 0→1 reveal transition. The Ukrainian "як?" / English "yak" homophone is the
// joke. Skipped on first mount and on backwards navigation so the flash only
// fires the intended forward step.
const YAK_FLASH_MS = 120;

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

  // Track the previous revealStage so we only fire the yak flash on the
  // forward 0→1 step. On mount the ref is seeded to the current stage, which
  // means landing directly on stage 1 (e.g. via URL hash) doesn't trigger.
  const prevStageRef = useRef(revealStage);
  const [yakVisible, setYakVisible] = useState(false);

  useEffect(() => {
    const isForwardTransition =
      prevStageRef.current === 0 && revealStage === 1;
    prevStageRef.current = revealStage;
    if (!isForwardTransition) return;
    setYakVisible(true);
    const t = window.setTimeout(() => setYakVisible(false), YAK_FLASH_MS);
    return () => window.clearTimeout(t);
  }, [revealStage]);

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">як?</span>
      </h2>

      <div className="agent-workflow-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="agent-workflow-bullets">
          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              <Emphasis color="orange">Claude Agent SDK</Emphasis>
              {' '}- TypeScript-обгортка над Claude Code CLI
            </SlideItem>
          )}
          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              клонуйте свій <Emphasis color="green">маркетплейс скілів</Emphasis>
              {' '}у контекст SDK - рев'ювер отримує вічно актуальні знання як має бути
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
              <Emphasis color="green">structured output</Emphasis> для комунікації
              {' '}між детермінованим кодом і ллм-кою
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

      {/* 25th-frame yak — always mounted so the image is painted to its own
          layer ahead of time; we just toggle opacity for the flash. Mounting
          the div conditionally was racing the browser paint cycle inside the
          120 ms window. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: yakVisible ? 1 : 0,
        }}
      >
        <img
          src={yakImage}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
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
