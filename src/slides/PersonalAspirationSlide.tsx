import React from 'react';
import { DiagramCanvas, StageNode, HumanActor, FlowArrow } from '../components/diagram';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { SlideDefinition, SlideContentProps } from '../types/slides';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: ORANGE, fontStyle: 'italic', fontSize: '0.85em' }}>
      '{children}'
    </span>
  );
}

const HIGHLIGHT_BY_STAGE: Record<number, string> = {
  0: 'CODING',
  1: 'CODING',
  2: 'COMMIT',
  3: 'LOCAL DEV',
  4: 'QA',
  5: 'MONITOR',
};

const PULSE_STYLES = `
  @keyframes node-pulse {
    0%   { transform: scale(1);   opacity: 0.75; }
    60%  { transform: scale(1.35); opacity: 0; }
    100% { transform: scale(1.35); opacity: 0; }
  }
  .node-pulse-ring {
    animation: node-pulse 1.6s ease-out infinite;
  }
`;

function PulseRing({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={ORANGE}
      strokeWidth={2.5}
      className="node-pulse-ring"
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

export function EngineerAspireDiagram({ highlightedNode }: { highlightedNode: string }) {
  const nc = (name: string) => name === highlightedNode ? ORANGE : '#f0ece8';
  const isHighlighted = (name: string) => name === highlightedNode;

  return (
    <DiagramCanvas viewBox="0 0 700 580">
      <style>{PULSE_STYLES}</style>

      {/* ── ORANGE: actor → IDEA → CODING → QA → COMMIT ── */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 97 50 C 140 100, 150 230, 160 265" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 270 265 C 295 250, 310 190, 325 130" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 425 130 C 445 130, 450 200, 460 255" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />

      {/* ── GREEN: actor → IDEA → LOCAL DEV → MONITOR ── */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 97 155 C 130 180, 150 245, 160 265" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 215 320 C 220 350, 290 375, 335 395" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 425 395 C 500 398, 555 400, 593 395" />

      {/* ── BLUE: actor → IDEA → CODING → QA ── */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 97 260 C 130 262, 145 263, 160 265" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 215 210 C 235 170, 290 150, 325 130" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 425 130 C 448 130, 452 200, 460 255" />

      {/* ── YELLOW: actor → IDEA → LOCAL DEV → QA ── */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 97 365 C 150 355, 180 340, 215 320" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 215 320 C 240 360, 300 385, 335 395" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 425 395 C 465 395, 475 340, 510 305" />

      {/* ── CYAN: actor → LOCAL DEV → MONITOR ── */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 97 445 C 180 440, 260 425, 335 395" />
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
        d="M 425 395 C 500 392, 555 390, 593 395" />

      {/* ── SDLC nodes ── */}
      <StageNode cx={215} cy={265} r={55} label="IDEA"        color="#f0ece8"    strokeWidth={2.5} fontSize={13} />
      <StageNode cx={375} cy={130} r={50} label="CODING"      color={nc('CODING')}    strokeWidth={2.2} fontSize={12} />
      <StageNode cx={380} cy={395} r={45} label={"LOCAL\nDEV"} color={nc('LOCAL DEV')} strokeWidth={2.2} fontSize={11} />
      <StageNode cx={510} cy={255} r={50} label="QA"          color={nc('QA')}        strokeWidth={2.2} fontSize={13} />
      <StageNode cx={620} cy={130} r={45} label="COMMIT"      color={nc('COMMIT')}    strokeWidth={2.2} fontSize={11} />
      <StageNode cx={635} cy={395} r={42} label="MONITOR"     color={nc('MONITOR')}   strokeWidth={2.2} fontSize={10} />

      {/* ── Pulse rings on highlighted node ── */}
      {isHighlighted('CODING')    && <PulseRing cx={375} cy={130} r={50} />}
      {isHighlighted('LOCAL DEV') && <PulseRing cx={380} cy={395} r={45} />}
      {isHighlighted('QA')        && <PulseRing cx={510} cy={255} r={50} />}
      {isHighlighted('COMMIT')    && <PulseRing cx={620} cy={130} r={45} />}
      {isHighlighted('MONITOR')   && <PulseRing cx={635} cy={395} r={42} />}

      {/* ── Actors ── */}
      <HumanActor x={65} y={50}  size={62} color={ORANGE} />
      <HumanActor x={65} y={155} size={62} color={GREEN}  />
      <HumanActor x={65} y={260} size={62} color={BLUE}   />
      <HumanActor x={65} y={365} size={62} color={YELLOW} />
      <HumanActor x={65} y={445} size={62} color={CYAN}   />
    </DiagramCanvas>
  );
}

export const PersonalAspirationSlide: SlideDefinition = {
  id: 'personal-aspiration',
  maxRevealStages: 5,
  content: ({ revealStage }: SlideContentProps) => {
    const highlightedNode = HIGHLIGHT_BY_STAGE[revealStage] ?? 'CODING';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>

        {/* Full-width heading */}
        <h2>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">engineer</span>{' '}
          <span className="text-orange">--aspire</span>
        </h2>

        {/* Two-column body */}
        <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

          {/* Left: 40% — progressive text reveals */}
          <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

            <SlideItem delay={0.05}>
              coding is the obvious starting point — but that's just very smart, costly{' '}
              <Emphasis color="orange">autocomplete</Emphasis>
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                set yourself a goal: do{' '}
                <Emphasis color="green">everything</Emphasis> from inside Claude Code
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                <Prompt>hey claude, please commit my changes</Prompt>
              </SlideItem>
            )}

            {revealStage >= 3 && (
              <SlideItem delay={0}>
                <Prompt>hey claude, configure dev environment for me</Prompt>
              </SlideItem>
            )}

            {revealStage >= 4 && (
              <SlideItem delay={0}>
                <Prompt>hey claude, here is a bug report I've received: ...</Prompt>
              </SlideItem>
            )}

            {revealStage >= 5 && (
              <SlideItem delay={0}>
                <Prompt>
                  hey claude, take a look at the logs / metrics / AB test results / perf report: ...
                </Prompt>
              </SlideItem>
            )}
          </div>

          {/* Right: 60% — diagram with highlighted node */}
          <div style={{ flex: 1, height: '100%' }}>
            <EngineerAspireDiagram highlightedNode={highlightedNode} />
          </div>
        </div>
      </div>
    );
  },
  notes:
    'Stage 0: coding is just autocomplete, CODING node glows. Stage 1: goal is everything from Claude Code. Stages 2–5: each prompt reveals with matching node lighting up (COMMIT → LOCAL DEV → QA → MONITOR).',
};
