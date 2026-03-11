import { SlideDefinition } from '../types/slides';
import {
  DiagramCanvas,
  StageNode,
  HumanActor,
  AgentActor,
  FlowArrow,
} from '../components/diagram';

const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const BLUE   = '#79c0ff';
const YELLOW = '#ffd166';
const CYAN   = '#76e4f7';

// Stage nodes — shifted slightly right/up to leave space for actor left column
const S = {
  IDEA:    { cx: 215,  cy: 295, r: 68 },
  DESIGN:  { cx: 395,  cy: 158, r: 58 },
  DEV:     { cx: 510,  cy: 285, r: 52 },
  CODING:  { cx: 645,  cy: 155, r: 58 },
  LOCAL:   { cx: 595,  cy: 395, r: 52 },
  QA:      { cx: 748,  cy: 272, r: 58 },
  REVIEW:  { cx: 820,  cy: 402, r: 52 },
  COMMIT:  { cx: 878,  cy: 158, r: 52 },
  DEPLOY:  { cx: 950,  cy: 382, r: 52 },
  MONITOR: { cx: 972,  cy: 238, r: 52 },
};

// Actors: 6 rows, size 68, evenly spaced y=52..510 in a 610-tall viewBox.
// Right edge of each actor icon at x ≈ 44+34 = 78 → paths start at x=80.
const ACTORS = {
  ORANGE: { x: 44, y: 52  },
  GREEN1: { x: 44, y: 144 },
  BLUE:   { x: 44, y: 236 },
  GREEN2: { x: 44, y: 328 },
  YELLOW: { x: 44, y: 420 },
  CYAN:   { x: 44, y: 510 },
};
const ICON_SIZE = 68;
// right-edge x where each path begins
const AX = ACTORS.ORANGE.x + ICON_SIZE / 2;  // ≈ 78

function SdlcDiagram() {
  return (
    // viewBox intentionally taller than the nominal 610 to clip the top-arch cleanly.
    // The SVG itself has no overflow; clipping is handled by the container.
    <DiagramCanvas viewBox="0 0 1080 600">

      {/* ═══ LAYER 1: Flow arrows (drawn first → behind nodes) ═══ */}

      {/* ── ORANGE engineer ─────────────────────────────────────
          Path: actor → IDEA → (arch above) DESIGN → (arch above) CODING
                → QA → COMMIT → MONITOR
         ──────────────────────────────────────────────────────── */}
      {/* lead-in: actor right-edge → IDEA left */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d={`M ${AX} ${ACTORS.ORANGE.y} C 120 52, 148 200, 148 290`} />
      {/* IDEA → DESIGN: BIG arch above */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 248 252 C 235 40, 365 30, 338 152" markerId="arrow-orange" />
      {/* DESIGN → CODING */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 449 150 C 506 18, 584 18, 640 150" markerId="arrow-orange" />
      {/* CODING → QA */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 700 168 C 735 330, 742 282, 746 275" markerId="arrow-orange" />
      {/* QA → COMMIT */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 803 245 C 830 142, 854 145, 876 158" markerId="arrow-orange" />
      {/* COMMIT → MONITOR */}
      <FlowArrow color={ORANGE} strokeWidth={3} glowId="glow-orange"
        d="M 926 162 C 948 195, 965 215, 968 238" markerId="arrow-orange" />

      {/* ── GREEN agent #1 ───────────────────────────────────────
          Path: actor → IDEA → (down) DEV → CODING → LOCAL → QA → DEPLOY
         ──────────────────────────────────────────────────────── */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d={`M ${AX} ${ACTORS.GREEN1.y} C 120 160, 148 245, 148 290`} />
      {/* IDEA → DEV (sweeps down) */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 258 318 C 292 468, 425 452, 460 308" markerId="arrow-green" />
      {/* DEV → CODING */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 560 265 C 588 148, 616 142, 640 155" markerId="arrow-green" />
      {/* CODING → LOCAL */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 628 210 C 620 340, 610 375, 610 398" markerId="arrow-green" />
      {/* LOCAL → QA */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 645 395 C 688 395, 720 328, 744 302" markerId="arrow-green" />
      {/* QA → DEPLOY */}
      <FlowArrow color={GREEN} strokeWidth={3} glowId="glow-green"
        d="M 802 298 C 844 380, 902 382, 928 392" markerId="arrow-green" />

      {/* ── BLUE engineer ────────────────────────────────────────
          Path: actor → IDEA → DESIGN → DEV → LOCAL → REVIEW → COMMIT → DEPLOY
         ──────────────────────────────────────────────────────── */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d={`M ${AX} ${ACTORS.BLUE.y} C 120 250, 148 268, 148 292`} />
      {/* IDEA → DESIGN */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 252 272 C 288 218, 342 180, 338 168" markerId="arrow-blue" />
      {/* DESIGN → DEV */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 432 200 C 454 265, 468 278, 470 285" markerId="arrow-blue" />
      {/* DEV → LOCAL */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 525 334 C 540 378, 555 390, 562 398" markerId="arrow-blue" />
      {/* LOCAL → REVIEW */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 645 402 C 702 410, 756 410, 770 408" markerId="arrow-blue" />
      {/* REVIEW → COMMIT: big sweep up */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 862 375 C 870 268, 872 220, 876 210" markerId="arrow-blue" />
      {/* COMMIT → DEPLOY */}
      <FlowArrow color={BLUE} strokeWidth={3} glowId="glow-blue"
        d="M 904 182 C 945 292, 950 342, 948 382" markerId="arrow-blue" />

      {/* ── GREEN agent #2 (shortcut, dashed) ───────────────────
          Path: actor → IDEA bottom → LOCAL → QA → REVIEW
         ──────────────────────────────────────────────────────── */}
      <FlowArrow color={GREEN} strokeWidth={2.6} dashed glowId="glow-green"
        d={`M ${AX} ${ACTORS.GREEN2.y} C 120 335, 148 312, 148 298`} />
      {/* IDEA → LOCAL (deep bottom sweep, stays within y=540) */}
      <FlowArrow color={GREEN} strokeWidth={2.6} dashed glowId="glow-green"
        d="M 256 348 C 372 538, 506 530, 578 428" markerId="arrow-green" />
      {/* LOCAL → QA */}
      <FlowArrow color={GREEN} strokeWidth={2.6} dashed glowId="glow-green"
        d="M 645 388 C 690 358, 720 310, 736 304" markerId="arrow-green" />
      {/* QA → REVIEW */}
      <FlowArrow color={GREEN} strokeWidth={2.6} dashed glowId="glow-green"
        d="M 762 322 C 785 362, 798 388, 800 400" markerId="arrow-green" />

      {/* ── YELLOW engineer ──────────────────────────────────────
          Path: actor → IDEA → DEV → CODING → LOCAL → QA → MONITOR
         ──────────────────────────────────────────────────────── */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d={`M ${AX} ${ACTORS.YELLOW.y} C 120 395, 148 338, 148 300`} />
      {/* IDEA → DEV */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 258 312 C 335 375, 412 350, 460 304" markerId="arrow-yellow" />
      {/* DEV → CODING */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 558 260 C 589 188, 618 172, 640 165" markerId="arrow-yellow" />
      {/* CODING → LOCAL */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 615 210 C 605 298, 598 358, 598 395" markerId="arrow-yellow" />
      {/* LOCAL → QA */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 645 385 C 690 368, 718 318, 740 302" markerId="arrow-yellow" />
      {/* QA → MONITOR */}
      <FlowArrow color={YELLOW} strokeWidth={3} glowId="glow-yellow"
        d="M 804 256 C 844 244, 912 238, 938 240" markerId="arrow-yellow" />

      {/* ── CYAN agent ───────────────────────────────────────────
          Path: actor → [sweeps deep] LOCAL → REVIEW → DEPLOY → MONITOR
         ──────────────────────────────────────────────────────── */}
      {/* actor → deep sweep to LOCAL DEV (arc stays ≤ y=555) */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d={`M ${AX} ${ACTORS.CYAN.y} C 200 555, 450 555, 578 445`} markerId="arrow-cyan" />
      {/* LOCAL → REVIEW */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 645 420 C 708 432, 758 420, 772 422" markerId="arrow-cyan" />
      {/* REVIEW → DEPLOY */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 868 428 C 900 440, 928 420, 936 414" markerId="arrow-cyan" />
      {/* DEPLOY → MONITOR */}
      <FlowArrow color={CYAN} strokeWidth={3} glowId="glow-cyan"
        d="M 952 342 C 960 302, 968 268, 968 268" markerId="arrow-cyan" />

      {/* ═══ LAYER 2: Stage nodes (on top of arrows) ═══ */}
      <StageNode {...S.IDEA}    label="IDEA"             color="#f0ece8" strokeWidth={2.5} fontSize={13} />
      <StageNode {...S.DESIGN}  label="DESIGN"           color="#f0ece8" strokeWidth={2.2} fontSize={12} />
      <StageNode {...S.DEV}     label={"DEV ENV\nSETUP"} color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode {...S.CODING}  label="CODING"           color="#f0ece8" strokeWidth={2.2} fontSize={12} />
      <StageNode {...S.LOCAL}   label={"LOCAL\nDEV"}     color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode {...S.QA}      label="QA"               color="#f0ece8" strokeWidth={2.2} fontSize={13} />
      <StageNode {...S.REVIEW}  label={"CODE\nREVIEW"}   color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode {...S.COMMIT}  label="COMMIT"           color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode {...S.DEPLOY}  label="DEPLOY"           color="#f0ece8" strokeWidth={2.2} fontSize={11} />
      <StageNode {...S.MONITOR} label="MONITOR"          color="#f0ece8" strokeWidth={2.2} fontSize={11} />

      {/* ═══ LAYER 3: Actors ═══ */}
      <HumanActor {...ACTORS.ORANGE} size={ICON_SIZE} color={ORANGE} label="eng" />
      <AgentActor {...ACTORS.GREEN1} size={ICON_SIZE} color={GREEN}  label="agent" />
      <HumanActor {...ACTORS.BLUE}   size={ICON_SIZE} color={BLUE}   label="eng" />
      <AgentActor {...ACTORS.GREEN2} size={ICON_SIZE} color={GREEN}  label="agent" />
      <HumanActor {...ACTORS.YELLOW} size={ICON_SIZE} color={YELLOW} label="eng" />
      <AgentActor {...ACTORS.CYAN}   size={ICON_SIZE} color={CYAN}   label="agent" />
    </DiagramCanvas>
  );
}

export const SdlcTracesSlide: SlideDefinition = {
  id: 'sdlc-traces',
  content: (
    // image-slide gives an explicit height (100vh - 220px) so the SVG can use height="100%"
    // and be height-constrained, preventing bottom overflow.
    <div className="image-slide" style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
      <SdlcDiagram />
    </div>
  ),
  notes: 'Every engineer takes a unique path through the SDLC — some skip design, some loop back from QA, some shortcut to commit. Same stages, different traces. This is why workflows look different but share the same building blocks.',
};
