import { DiagramCanvas, StageNode, HumanActor, FlowArrow, SparkTrail } from '../components/diagram';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { EngineerAspireDiagram } from './PersonalAspirationSlide';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

const CHAOS_STYLES = `
  @keyframes chaos-drift-1 {
    0%,100% { transform: translate(0,   0);    filter: blur(0px);   opacity: 1;    }
    20%     { transform: translate(4px, -6px); filter: blur(2px);   opacity: 0.85; }
    45%     { transform: translate(-3px, 5px); filter: blur(3.5px); opacity: 0.72; }
    70%     { transform: translate(5px,  2px); filter: blur(1.5px); opacity: 0.9;  }
  }
  @keyframes chaos-drift-2 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    15%     { transform: translate(-5px, 3px); filter: blur(2.5px); opacity: 0.8;  }
    40%     { transform: translate(4px, -5px); filter: blur(3px);   opacity: 0.7;  }
    72%     { transform: translate(-2px, 6px); filter: blur(1px);   opacity: 0.88; }
  }
  @keyframes chaos-drift-3 {
    0%,100% { transform: translate(0,   0);    filter: blur(0px);   opacity: 1;    }
    25%     { transform: translate(6px,  4px); filter: blur(3px);   opacity: 0.78; }
    55%     { transform: translate(-5px,-3px); filter: blur(2px);   opacity: 0.85; }
    80%     { transform: translate(3px, -5px); filter: blur(3.5px); opacity: 0.72; }
  }
  @keyframes chaos-drift-4 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    30%     { transform: translate(-4px, 5px); filter: blur(1.5px); opacity: 0.9;  }
    60%     { transform: translate(6px,  3px); filter: blur(3px);   opacity: 0.75; }
    85%     { transform: translate(-3px,-5px); filter: blur(2.5px); opacity: 0.82; }
  }
  @keyframes chaos-drift-5 {
    0%,100% { transform: translate(0,    0);   filter: blur(0px);   opacity: 1;    }
    20%     { transform: translate(5px, -4px); filter: blur(2px);   opacity: 0.83; }
    50%     { transform: translate(-4px, 6px); filter: blur(3.5px); opacity: 0.7;  }
    78%     { transform: translate(3px,  3px); filter: blur(1px);   opacity: 0.92; }
  }
  .chaos-d1 { animation: chaos-drift-1 3.1s ease-in-out infinite; }
  .chaos-d2 { animation: chaos-drift-2 3.8s ease-in-out infinite; }
  .chaos-d3 { animation: chaos-drift-3 4.2s ease-in-out infinite; }
  .chaos-d4 { animation: chaos-drift-4 3.5s ease-in-out infinite; }
  .chaos-d5 { animation: chaos-drift-5 4.7s ease-in-out infinite; }
`;

function TeamDiagram({ revealStage }: { revealStage: number }) {
  const showChaos      = revealStage >= 1 && revealStage < 3;
  const animateChaos   = revealStage === 2;
  const showStructured = revealStage >= 3;

  return (
    <DiagramCanvas viewBox="0 0 700 580">
      <style>{CHAOS_STYLES}</style>

      {/* ── Chaos paths (stages 1–2, animated at stage 2) ── */}
      <g style={{ opacity: showChaos ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <g className={animateChaos ? 'chaos-d1' : ''}>
          <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
            d="M 97 50 C 150 -20, 500 -30, 680 80" />
          <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
            d="M 97 50 C 150 -20, 500 -30, 680 80" />
        </g>
        <g className={animateChaos ? 'chaos-d2' : ''}>
          <FlowArrow color={GREEN}  strokeWidth={3} glowId="glow-green"  markerId="arrow-green"
            d="M 97 155 C 200 350, 400 450, 690 380" />
          <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
            d="M 97 155 C 200 350, 400 450, 690 380" />
        </g>
        <g className={animateChaos ? 'chaos-d3' : ''}>
          <FlowArrow color={BLUE}   strokeWidth={3} glowId="glow-blue"   markerId="arrow-blue"
            d="M 97 260 C 250 260, 300 100, 490 260 C 580 350, 640 200, 690 220" />
          <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
            d="M 97 260 C 250 260, 300 100, 490 260 C 580 350, 640 200, 690 220" />
        </g>
        <g className={animateChaos ? 'chaos-d4' : ''}>
          <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
            d="M 97 365 C 180 500, 350 520, 540 400 C 620 330, 650 120, 690 100" />
          <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
            d="M 97 365 C 180 500, 350 520, 540 400 C 620 330, 650 120, 690 100" />
        </g>
        <g className={animateChaos ? 'chaos-d5' : ''}>
          <FlowArrow color={CYAN}   strokeWidth={3} glowId="glow-cyan"   markerId="arrow-cyan"
            d="M 97 445 C 300 445, 200 290, 400 370 C 500 425, 600 480, 690 440" />
          <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
            d="M 97 445 C 300 445, 200 290, 400 370 C 500 425, 600 480, 690 440" />
        </g>
      </g>

      {/* ── Structured paths + nodes (stage 3) ── */}
      <g style={{ opacity: showStructured ? 1 : 0, transition: 'opacity 0.7s ease' }}>

        {/* Orange: actor → IDEA → CODING → QA → exit right */}
        <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
          d="M 97 50 C 160 80, 160 230, 185 265" />
        <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
          d="M 97 50 C 160 80, 160 230, 185 265" />
        <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
          d="M 295 265 C 340 265, 345 170, 370 145" />
        <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
          d="M 295 265 C 340 265, 345 170, 370 145" />
        <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
          d="M 470 145 C 510 145, 515 230, 530 265" />
        <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
          d="M 470 145 C 510 145, 515 230, 530 265" />
        <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange" markerId="arrow-orange"
          d="M 630 265 L 695 265" />
        <SparkTrail color={ORANGE} dur={2.5} glowId="glow-orange"
          d="M 630 265 L 695 265" />

        {/* Green: actor → IDEA → LOCAL DEV → QA → DEPLOY */}
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
          d="M 97 155 C 150 180, 160 250, 185 265" />
        <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
          d="M 97 155 C 150 180, 160 250, 185 265" />
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 240 320 C 240 360, 310 385, 385 385" />
        <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
          d="M 240 320 C 240 360, 310 385, 385 385" />
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 475 385 C 530 385, 550 360, 555 315" />
        <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
          d="M 475 385 C 530 385, 550 360, 555 315" />
        <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green" markerId="arrow-green"
          d="M 630 265 C 648 280, 648 340, 618 400" />
        <SparkTrail color={GREEN} dur={5.5} glowId="glow-green"
          d="M 630 265 C 648 280, 648 340, 618 400" />

        {/* Blue: actor → IDEA → CODING → QA → DEPLOY */}
        <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
          d="M 97 260 C 140 262, 160 264, 185 265" />
        <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
          d="M 97 260 C 140 262, 160 264, 185 265" />
        <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
          d="M 240 210 C 290 150, 360 160, 420 195" />
        <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
          d="M 240 210 C 290 150, 360 160, 420 195" />
        <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
          d="M 470 145 C 510 145, 515 230, 530 265" />
        <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
          d="M 470 145 C 510 145, 515 230, 530 265" />
        <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue" markerId="arrow-blue"
          d="M 630 265 C 648 280, 648 340, 618 400" />
        <SparkTrail color={BLUE} dur={4.0} glowId="glow-blue"
          d="M 630 265 C 648 280, 648 340, 618 400" />

        {/* Yellow: actor → LOCAL DEV → DEPLOY (bypasses IDEA) */}
        <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
          d="M 97 365 C 200 370, 300 380, 385 385" />
        <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
          d="M 97 365 C 200 370, 300 380, 385 385" />
        <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow" markerId="arrow-yellow"
          d="M 475 385 C 560 388, 600 395, 618 400" />
        <SparkTrail color={YELLOW} dur={3.0} glowId="glow-yellow"
          d="M 475 385 C 560 388, 600 395, 618 400" />

        {/* Cyan: actor → IDEA → LOCAL DEV → QA */}
        <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
          d="M 97 445 C 155 450, 200 415, 240 320" />
        <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
          d="M 97 445 C 155 450, 200 415, 240 320" />
        <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
          d="M 240 320 C 280 360, 330 385, 385 385" />
        <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
          d="M 240 320 C 280 360, 330 385, 385 385" />
        <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan" markerId="arrow-cyan"
          d="M 475 385 C 530 385, 550 350, 580 315" />
        <SparkTrail color={CYAN} dur={7.0} glowId="glow-cyan"
          d="M 475 385 C 530 385, 550 350, 580 315" />

        {/* SDLC nodes on top of paths */}
        <StageNode cx={240} cy={265} r={55} label="IDEA"        color="#f0ece8" strokeWidth={2.5} fontSize={13} />
        <StageNode cx={420} cy={145} r={50} label="CODING"      color="#f0ece8" strokeWidth={2.2} fontSize={12} />
        <StageNode cx={430} cy={385} r={45} label={"LOCAL\nDEV"} color="#f0ece8" strokeWidth={2.2} fontSize={11} />
        <StageNode cx={580} cy={265} r={50} label="QA"          color="#f0ece8" strokeWidth={2.2} fontSize={13} />
        <StageNode cx={660} cy={400} r={42} label="DEPLOY"      color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      </g>

      {/* ── Actors (always visible) ── */}
      <HumanActor x={65} y={50}  size={62} color={ORANGE} />
      <HumanActor x={65} y={155} size={62} color={GREEN}  />
      <HumanActor x={65} y={260} size={62} color={BLUE}   />
      <HumanActor x={65} y={365} size={62} color={YELLOW} />
      <HumanActor x={65} y={445} size={62} color={CYAN}   />
    </DiagramCanvas>
  );
}

export const WhatIsAiFirstTeamSlide: SlideDefinition = {
  id: 'what-is-ai-first-team',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>

      {/* Full-width heading */}
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">team</span>{' '}
        <span className="text-orange">--define</span>
      </h2>

      {/* Two-column body */}
      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left: 40% — progressive text reveals */}
        <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>

          <SlideItem delay={0.05}>
            <Emphasis color="orange">simplest definition:</Emphasis> a team of ai-first engineers
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              every engineer builds their own unique daily development workflow
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              ai coding is young — no proven patterns for mastering it yet
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0.12}>
              it demands deep changes to how you personally work
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              the key is: the workflows look different — but the{' '}
              <Emphasis color="green">building blocks are the same</Emphasis>
            </SlideItem>
          )}
        </div>

        {/* Right: 60% — evolving diagram */}
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <div style={{ opacity: revealStage < 3 ? 1 : 0, transition: 'opacity 0.7s ease', height: '100%' }}>
            <TeamDiagram revealStage={revealStage} />
          </div>
          <div style={{ opacity: revealStage >= 3 ? 1 : 0, transition: 'opacity 0.7s ease', position: 'absolute', inset: 0 }}>
            <EngineerAspireDiagram highlightedNode="" />
          </div>
        </div>
      </div>
    </div>
  ),
  notes:
    'Stage 0: simplest definition. Stage 1: everyone has their own workflow (chaos paths appear). Stage 2: why — AI coding young, no patterns, demands personal change (paths drift and blur). Stage 3: key insight — different workflows, same building blocks (paths stabilize on nodes).',
};
