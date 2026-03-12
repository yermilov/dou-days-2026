import React from 'react';
import { DiagramCanvas, StageNode, HumanActor, FlowArrow, SparkTrail } from '../components/diagram';
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

export const PULSE_STYLES = `
  @keyframes node-pulse {
    0%   { transform: scale(1);   opacity: 0.75; }
    60%  { transform: scale(1.35); opacity: 0; }
    100% { transform: scale(1.35); opacity: 0; }
  }
  .node-pulse-ring {
    animation: node-pulse 1.6s ease-out infinite;
  }
  @keyframes claude-icon-pop {
    0%   { opacity: 0; transform: scale(0.4); }
    60%  { opacity: 1; transform: scale(1.15); }
    100% { opacity: 1; transform: scale(1); }
  }
  .claude-icon-appear {
    animation: claude-icon-pop 0.4s ease-out forwards;
    transform-box: fill-box;
    transform-origin: center;
  }
`;

export function PulseRing({ cx, cy, r }: { cx: number; cy: number; r: number }) {
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

// Inline Claude/Anthropic logo as SVG path — no external asset needed
export function ClaudeIcon({ cx, cy, size = 16 }: { cx: number; cy: number; size?: number }) {
  const s = size / 24;
  // Outer <g> handles positioning only (no CSS animation, so SVG transform is not overridden).
  // Inner <g> handles the pop animation with transform-box: fill-box so scale() works correctly.
  return (
    <g transform={`translate(${cx}, ${cy})`} style={{ filter: 'drop-shadow(0 0 4px #f0883e)' }}>
      <g className="claude-icon-appear">
        <g transform={`translate(${-size / 2}, ${-size / 2}) scale(${s})`}>
          <circle cx={12} cy={12} r={13} fill="#1a1f26" stroke={ORANGE} strokeWidth={1.2} />
          <path
            d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
            fill={ORANGE}
          />
        </g>
      </g>
    </g>
  );
}

export function EngineerAspireDiagram({
  highlightedNode,
  aiAccelerated = false,
}: {
  highlightedNode: string;
  aiAccelerated?: boolean;
}) {
  const nc = (name: string) => name === highlightedNode ? ORANGE : '#f0ece8';
  const isHighlighted = (name: string) => name === highlightedNode;

  // ~33% of inter-circle arrows are AI-accelerated (3 out of 10):
  //   1. ORANGE IDEA→CODING  midpoint (283, 164)
  //   2. BLUE   CODING→QA    midpoint (405, 234)
  //   3. CYAN   LDEV→MONITOR midpoint (517, 437)
  const fast = (dur: number) => aiAccelerated ? dur / 8 : dur;

  return (
    <DiagramCanvas viewBox="0 0 700 580">
      <style>{PULSE_STYLES}</style>

      {/* ── ORANGE: actor → IDEA (upper-left) → CODING (left) → QA (top, wide arc) → COMMIT ── */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
        d="M 97 50 C 145 85, 162 180, 172 225" />
      {/* AI-ACCELERATED #1 */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <SparkTrail color={ORANGE} dur={fast(2.5)} glowId="glow-orange"
        d="M 230 213 C 270 175, 300 148, 325 130" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
        d="M 425 130 C 478 105, 528 150, 510 207" />
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />
      <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
        d="M 560 255 C 568 220, 570 180, 575 130" />

      {/* ── GREEN: actor → IDEA (left-upper) → LOCAL DEV (top) → MONITOR (upper-left) ── */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 97 155 C 130 168, 148 232, 160 248" />
      <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
        d="M 97 155 C 130 168, 148 232, 160 248" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 215 320 C 228 358, 320 352, 365 352" />
      <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
        d="M 215 320 C 228 358, 320 352, 365 352" />
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
        d="M 393 350 C 490 335, 555 348, 605 366" />
      <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
        d="M 393 350 C 490 335, 555 348, 605 366" />

      {/* ── BLUE: actor → IDEA (left-lower) → CODING (bottom) → QA (left, lower arc) ── */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
        d="M 97 260 C 128 262, 148 270, 160 275" />
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
        d="M 270 265 C 312 255, 360 228, 375 182" />
      {/* AI-ACCELERATED #2 */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />
      <SparkTrail color={BLUE} dur={fast(4.0)} glowId="glow-blue"
        d="M 375 182 C 382 228, 420 250, 460 255" />

      {/* ── YELLOW: actor → IDEA (lower-left) → LOCAL DEV (left) → QA (bottom, upper-right exit) ── */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 97 365 C 148 360, 178 340, 195 316" />
      <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
        d="M 97 365 C 148 360, 178 340, 195 316" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 250 310 C 268 360, 305 390, 335 395" />
      <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
        d="M 250 310 C 268 360, 305 390, 335 395" />
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
        d="M 425 378 C 465 358, 498 322, 510 307" />
      <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
        d="M 425 378 C 465 358, 498 322, 510 307" />

      {/* ── CYAN: actor → LOCAL DEV (lower-left) → MONITOR (lower-left) ── */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 97 445 C 198 448, 288 442, 347 437" />
      <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
        d="M 97 445 C 198 448, 288 442, 347 437" />
      {/* AI-ACCELERATED #3 */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
        d="M 415 437 C 486 448, 556 432, 597 415" />
      <SparkTrail color={CYAN} dur={fast(7.0)} glowId="glow-cyan"
        d="M 415 437 C 486 448, 556 432, 597 415" />

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

      {/* ── Claude icons on AI-accelerated arrows ── */}
      {aiAccelerated && (
        <>
          <ClaudeIcon cx={283} cy={164} size={18} />
          <ClaudeIcon cx={405} cy={234} size={18} />
          <ClaudeIcon cx={517} cy={437} size={18} />
        </>
      )}

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
            <EngineerAspireDiagram highlightedNode={highlightedNode} aiAccelerated={revealStage >= 1} />
          </div>
        </div>
      </div>
    );
  },
  notes:
    'Stage 0: coding is just autocomplete, CODING node glows. Stage 1: goal is everything from Claude Code — 3 arrows go 2x faster with Claude icons. Stages 2–5: each prompt reveals with matching node lighting up (COMMIT → LOCAL DEV → QA → MONITOR).',
};
