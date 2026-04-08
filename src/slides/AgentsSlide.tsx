import { DiagramCanvas, StageNode, HumanActor, AgentActor, FlowArrow, SparkTrail } from '../components/diagram';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { ClaudeIcon, PULSE_STYLES } from '../components/diagram/ClaudeIcon';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

const CLAUDE_POS: Record<string, { cx: number; cy: number }> = {
  'CODING':    { cx: 375, cy: 94  },
  'LOCAL DEV': { cx: 380, cy: 364 },
  'QA':        { cx: 510, cy: 219 },
  'COMMIT':    { cx: 620, cy: 99  },
  'MONITOR':   { cx: 635, cy: 367 },
};

function FlywheelWithAgentsDiagram({ withAgents }: { withAgents: boolean }) {
  return (
    <DiagramCanvas viewBox="0 0 700 520">
      <style>{PULSE_STYLES}</style>

      {/* ── ORANGE: actor → IDEA → CODING → QA → COMMIT ── */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      <SparkTrail color={ORANGE} dur={2.5 / 8} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <SparkTrail color={ORANGE} dur={2.5 / 8} glowId="glow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <SparkTrail color={ORANGE} dur={2.5 / 8} glowId="glow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />
      <SparkTrail color={ORANGE} dur={2.5 / 8} glowId="glow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />

      {/* ── GREEN: agent skips IDEA → LOCAL DEV → MONITOR ── */}
      {withAgents && <>
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 461 51 C 455 80, 445 110, 425 130" />
        <SparkTrail color={GREEN} dur={3.0 / 8} glowId="glow-green"
          d="M 461 51 C 455 80, 445 110, 425 130" />
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 340 155 C 335 240, 345 315, 358 352" />
        <SparkTrail color={GREEN} dur={5.5 / 8} glowId="glow-green"
          d="M 340 155 C 335 240, 345 315, 358 352" />
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 393 350 C 490 335, 555 348, 605 366" />
        <SparkTrail color={GREEN} dur={5.5 / 8} glowId="glow-green"
          d="M 393 350 C 490 335, 555 348, 605 366" />
      </>}

      {/* ── BLUE: actor → IDEA → CODING → QA ── */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <SparkTrail color={BLUE} dur={4.0 / 8} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      <SparkTrail color={BLUE} dur={4.0 / 8} glowId="glow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />
      <SparkTrail color={BLUE} dur={4.0 / 8} glowId="glow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />

      {/* ── YELLOW: agent skips IDEA → LOCAL DEV → QA ── */}
      {withAgents && <>
        <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
          d="M 301 340 C 318 365, 335 380, 342 388" />
        <SparkTrail color={YELLOW} dur={3.0 / 8} glowId="glow-yellow"
          d="M 301 340 C 318 365, 335 380, 342 388" />
        <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
          d="M 425 378 C 465 358, 498 322, 510 307" />
        <SparkTrail color={YELLOW} dur={3.0 / 8} glowId="glow-yellow"
          d="M 425 378 C 465 358, 498 322, 510 307" />
      </>}

      {/* ── CYAN: actor → LOCAL DEV → MONITOR ── */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 97 420 C 198 423, 288 417, 347 415" />
      <SparkTrail color={CYAN} dur={7.0 / 8} glowId="glow-cyan"
        d="M 97 420 C 198 423, 288 417, 347 415" />
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
        d="M 415 415 C 486 425, 556 415, 597 405" />
      <SparkTrail color={CYAN} dur={7.0 / 8} glowId="glow-cyan"
        d="M 415 415 C 486 425, 556 415, 597 405" />

      {/* ── SDLC nodes ── */}
      <StageNode cx={215} cy={265} r={55} label="IDEA"         color="#f0ece8" strokeWidth={2.5} fontSize={13} />
      <StageNode cx={375} cy={130} r={50} label="CODING"       color="#f0ece8" strokeWidth={2.2} fontSize={12} />
      <StageNode cx={380} cy={395} r={45} label={"LOCAL\nDEV"} color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode cx={510} cy={255} r={50} label="QA"           color="#f0ece8" strokeWidth={2.2} fontSize={13} />
      <StageNode cx={620} cy={130} r={45} label="COMMIT"       color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode cx={635} cy={395} r={42} label="MONITOR"      color="#f0ece8" strokeWidth={2.2} fontSize={10} />

      {/* ── Claude icons on all nodes (always active) ── */}
      {Object.entries(CLAUDE_POS).map(([node, pos]) => (
        <ClaudeIcon key={node} cx={pos.cx} cy={pos.cy} size={18} />
      ))}

      {/* ── Actors: human-only slots always shown; agent slots hidden until agents are introduced ── */}
      <HumanActor x={65} y={50}  size={62} color={ORANGE} label="eng"   />
      {withAgents && <AgentActor x={430} y={20}  size={62} color={GREEN}  label="agent" />}
      <HumanActor x={65} y={260} size={62} color={BLUE}   label="eng"   />
      {withAgents && <AgentActor x={270} y={310} size={62} color={YELLOW} label="agent" />}
      <HumanActor x={65} y={420} size={62} color={CYAN}   label="eng"   />
    </DiagramCanvas>
  );
}

export const AgentsSlide: SlideDefinition = {
  id: 'agents',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>

      {/* Full-width heading */}
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">skills</span>{' '}
        <span className="text-orange">--agents</span>
      </h2>

      {/* Two-column body */}
      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left 40%: progressive text reveals */}
        <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

          <SlideItem delay={0.05}>
            you become a true <Emphasis color="green">ai-first team</Emphasis> when your skills are
            used not only by humans, but also by autonomous or semi-autonomous agents
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              I don't believe in autonomous agents that receive a task description and go all the
              way to pushing code to production
            </SlideItem>
          )}

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              humans are critical in steering the agent into the right direction, avoiding fatal
              disasters, and enabling <Emphasis color="orange">self-learning loops</Emphasis>
            </SlideItem>
          )}

          {revealStage === 2 && (
            <SlideItem delay={0}>
              however, I do believe in agents that do <Emphasis color="green">specific tasks</Emphasis>{' '}
              autonomously: issue triager, oncall bot, knowledge bot, code reviewer — and specifically
              effective are <Emphasis color="orange">migrators</Emphasis>: new framework, new library,
              new infrastructure, etc.
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              here skills are critical to give agents all necessary knowledge — and the fact that
              they are shared between humans and agents keeps them{' '}
              <Emphasis color="green">always actual</Emphasis>
            </SlideItem>
          )}
        </div>

        {/* Right 60%: diagram always visible; agents appear at stage 2 */}
        <div style={{ flex: 1, height: '100%' }}>
          <FlywheelWithAgentsDiagram withAgents={revealStage >= 2} />
        </div>
      </div>
    </div>
  ),
  notes:
    'Stage 0: ai-first team intro. Stage 1: skepticism about full-auto agents + humans steering. Stage 2: belief in specific-task agents + flywheel diagram with mixed eng/agent actors. Stage 3: skills keep humans and agents in sync.',
};
