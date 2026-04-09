import { DiagramCanvas, StageNode, HumanActor, FlowArrow, SparkTrail } from '../components/diagram';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { ClaudeIcon, PulseRing, PULSE_STYLES } from '../components/diagram/ClaudeIcon';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

const NODE_BY_STAGE: Record<number, string> = {
  1: 'CODING',
  2: 'LOCAL DEV',
  3: 'QA',
  4: 'COMMIT',
};

// Icons placed at top-inner area of each circle (cy - r + 14) to avoid overlapping node text
const CLAUDE_POS: Record<string, { cx: number; cy: number }> = {
  'CODING':    { cx: 375, cy: 94  },   // center 130, r=50 → 130-50+14=94
  'LOCAL DEV': { cx: 380, cy: 364 },   // center 395, r=45 → 395-45+14=364
  'QA':        { cx: 510, cy: 219 },   // center 255, r=50 → 255-50+14=219
  'COMMIT':    { cx: 620, cy: 99  },   // center 130, r=45 → 130-45+14=99
  'MONITOR':   { cx: 635, cy: 367 },   // center 395, r=42 → 395-42+14=367
};

const PULSE_R: Record<string, number> = {
  'CODING':    50,
  'LOCAL DEV': 45,
  'QA':        50,
  'COMMIT':    45,
  'MONITOR':   42,
};

const PULSE_CENTER: Record<string, { cx: number; cy: number }> = {
  'CODING':    { cx: 375, cy: 130 },
  'LOCAL DEV': { cx: 380, cy: 395 },
  'QA':        { cx: 510, cy: 255 },
  'COMMIT':    { cx: 620, cy: 130 },
  'MONITOR':   { cx: 635, cy: 395 },
};

function SkillFlywheelDiagram({ revealStage }: { revealStage: number }) {
  // All nodes activated so far (stages 1–revealStage)
  const activeNodes = new Set(
    Object.entries(NODE_BY_STAGE)
      .filter(([stage]) => parseInt(stage) <= revealStage)
      .map(([, node]) => node)
  );
  // Only the latest node gets the pulse ring
  const latestNode = NODE_BY_STAGE[revealStage];

  const sparkDur = (baseDur: number, toNode: string) =>
    activeNodes.has(toNode) ? baseDur / 8 : baseDur;

  return (
    <DiagramCanvas viewBox="0 0 700 580">
      <style>{PULSE_STYLES}</style>

      {/* ── ORANGE: actor → IDEA → CODING → QA → COMMIT ── */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <SparkTrail color={ORANGE} dur={sparkDur(2.5, 'CODING')} glowId="glow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <SparkTrail color={ORANGE} dur={sparkDur(2.5, 'QA')} glowId="glow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />
      <SparkTrail color={ORANGE} dur={sparkDur(2.5, 'COMMIT')} glowId="glow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />

      {/* ── GREEN: actor → IDEA → LOCAL DEV → MONITOR ── */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 97 155 C 130 168, 148 232, 160 248" />
      <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
        d="M 97 155 C 130 168, 148 232, 160 248" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 215 320 C 228 358, 320 352, 365 352" />
      <SparkTrail color={GREEN} dur={sparkDur(5.5, 'LOCAL DEV')} glowId="glow-green"
        d="M 215 320 C 228 358, 320 352, 365 352" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 393 350 C 490 335, 555 348, 605 366" />
      <SparkTrail color={GREEN} dur={sparkDur(5.5, 'MONITOR')} glowId="glow-green"
        d="M 393 350 C 490 335, 555 348, 605 366" />

      {/* ── BLUE: actor → IDEA → CODING → QA ── */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      <SparkTrail color={BLUE} dur={sparkDur(4.0, 'CODING')} glowId="glow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />
      <SparkTrail color={BLUE} dur={sparkDur(4.0, 'QA')} glowId="glow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />

      {/* ── YELLOW: actor → IDEA → LOCAL DEV → QA ── */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 97 365 C 148 360, 178 340, 195 316" />
      <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
        d="M 97 365 C 148 360, 178 340, 195 316" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 250 310 C 268 360, 305 390, 335 395" />
      <SparkTrail color={YELLOW} dur={sparkDur(3.0, 'LOCAL DEV')} glowId="glow-yellow"
        d="M 250 310 C 268 360, 305 390, 335 395" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 425 378 C 465 358, 498 322, 510 307" />
      <SparkTrail color={YELLOW} dur={sparkDur(3.0, 'QA')} glowId="glow-yellow"
        d="M 425 378 C 465 358, 498 322, 510 307" />

      {/* ── CYAN: actor → LOCAL DEV → MONITOR ── */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 97 445 C 198 448, 288 442, 347 437" />
      <SparkTrail color={CYAN} dur={sparkDur(7.0, 'LOCAL DEV')} glowId="glow-cyan"
        d="M 97 445 C 198 448, 288 442, 347 437" />
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
        d="M 415 437 C 486 448, 556 432, 597 415" />
      <SparkTrail color={CYAN} dur={sparkDur(7.0, 'MONITOR')} glowId="glow-cyan"
        d="M 415 437 C 486 448, 556 432, 597 415" />

      {/* ── SDLC nodes (no highlights — all neutral) ── */}
      <StageNode cx={215} cy={265} r={55} label="IDEA"         color="#f0ece8" strokeWidth={2.5} fontSize={13} />
      <StageNode cx={375} cy={130} r={50} label="CODING"       color="#f0ece8" strokeWidth={2.2} fontSize={12} />
      <StageNode cx={380} cy={395} r={45} label={"LOCAL\nDEV"} color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode cx={510} cy={255} r={50} label="QA"           color="#f0ece8" strokeWidth={2.2} fontSize={13} />
      <StageNode cx={620} cy={130} r={45} label="COMMIT"       color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode cx={635} cy={395} r={42} label="MONITOR"      color="#f0ece8" strokeWidth={2.2} fontSize={10} />

      {/* ── Pulse ring on latest (most recently activated) node only ── */}
      {latestNode && PULSE_CENTER[latestNode] && (
        <PulseRing
          cx={PULSE_CENTER[latestNode].cx}
          cy={PULSE_CENTER[latestNode].cy}
          r={PULSE_R[latestNode]}
        />
      )}

      {/* ── Claude icons accumulate — one per activated node ── */}
      {Array.from(activeNodes).map(node => {
        const pos = CLAUDE_POS[node];
        return pos ? <ClaudeIcon key={node} cx={pos.cx} cy={pos.cy} size={18} /> : null;
      })}

      {/* ── Actors ── */}
      <HumanActor x={65} y={50}  size={62} color={ORANGE} />
      <HumanActor x={65} y={155} size={62} color={GREEN}  />
      <HumanActor x={65} y={260} size={62} color={BLUE}   />
      <HumanActor x={65} y={365} size={62} color={YELLOW} />
      <HumanActor x={65} y={445} size={62} color={CYAN}   />
    </DiagramCanvas>
  );
}

export const SkillFlywheelSlide: SlideDefinition = {
  id: 'skill-flywheel',
  maxRevealStages: 4,
  content: ({ revealStage }: SlideContentProps) => {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>

        {/* Full-width heading */}
        <h2>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--skills-flywheel</span>
        </h2>

        {/* Two-column body */}
        <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

          {/* Left: 40% — progressive text reveals */}
          <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

            <SlideItem delay={0.05}>
              once you start sharing skills across your team,{' '}
              <Emphasis color="green">magic</Emphasis> starts to happen
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                skills are small yet powerful building blocks — share them, build unique workflows on top
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                humans don't like to read or write documentation — agents{' '}
                <Emphasis color="green">love</Emphasis> to do both; convert all docs to skills
              </SlideItem>
            )}

            {revealStage >= 3 && (
              <SlideItem delay={0}>
                every engineer using a skill contributes improvements — making everyone{' '}
                <Emphasis color="orange">instantly more productive</Emphasis>
              </SlideItem>
            )}

            {revealStage >= 4 && (
              <SlideItem delay={0}>
                migrations are easy — migrated X to Y? just rewrite all corresponding skills
              </SlideItem>
            )}
          </div>

          {/* Right: 60% — flywheel diagram */}
          <div style={{ flex: 1, height: '100%' }}>
            <SkillFlywheelDiagram revealStage={revealStage} />
          </div>
        </div>
      </div>
    );
  },
  notes:
    'Stage 0: all nodes neutral, arrows at normal speed. Stages 1–5: each reveal adds a Claude icon to the matching SDLC node, pulses it, and speeds up all arrows flowing into that node 4×.',
};
