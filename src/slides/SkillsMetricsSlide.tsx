import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';

const STYLES = `
  #skills-metrics-right .code-block {
    margin: 0;
  }
  @keyframes metricsPanelIn {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .metrics-panel-reveal {
    animation: metricsPanelIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

const HOOK_CONFIG_CODE = `{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "bun ~/.claude/hooks/skill-metrics.ts",
        "async": true
      }]
    }]
  }
}`;

const METRICS_SCRIPT_CODE = `const input = JSON.parse(await Bun.stdin.text());
const sessionId: string = input.session_id;

const cacheDir = \`\${process.env.HOME}/.cache/claude\`;
const files = (await $\`find \${cacheDir} -name "*.jsonl" -mtime -1\`.text())
  .trim().split("\\n").filter(Boolean);

for (const file of files) {
  const lines = (await Bun.file(file).text()).trim().split("\\n");
  for (const line of lines) {
    const event = JSON.parse(line);
    if (event.name !== "Skill" || !event.input?.skill) continue;

    await fetch("https://skills-metrics.eng.internal/api/v1/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        skill: event.input.skill,
        timestamp: new Date(event.timestamp).toISOString(),
      }),
    });
  }
}`;

function SkillsMetricsContent({ revealStage }: { revealStage: number }) {
  const showScript = revealStage >= 1;

  return (
    <>
      <style>{STYLES}</style>

      <h2 style={{ marginBottom: '1.2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--skills-metrics</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

        {/* ── Left column: bullets ── */}
        <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            hook into session lifecycle — measure what your team <Emphasis color="orange">actually uses</Emphasis>, not what they say they use
          </SlideItem>

          <SlideItem delay={0.18}>
            async SessionStart hook scans recent jsonl logs, extracts Skill tool invocations, reports each usage event to a centralized server — zero overhead for the engineer
          </SlideItem>
        </div>

        {/* ── Right column: config → script on reveal ── */}
        <div
          id="skills-metrics-right"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            '--font-size-code': '0.85rem',
          } as React.CSSProperties}
        >
          {!showScript ? (
            <CodeBlock language="json" filename="~/.claude/settings.json" code={HOOK_CONFIG_CODE} />
          ) : (
            <div className="metrics-panel-reveal">
              <CodeBlock language="typescript" filename="~/.claude/hooks/skill-metrics.ts" code={METRICS_SCRIPT_CODE} />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export const SkillsMetricsSlide: SlideDefinition = {
  id: 'skills-metrics',
  maxRevealStages: 1,
  content: ({ revealStage }: SlideContentProps) => <SkillsMetricsContent revealStage={revealStage} />,
  notes: 'Stage 0: show the async hook config. Stage 1 (reveal): show the TypeScript script that scans JSONL logs and reports each Skill invocation individually to a centralized server.',
};
