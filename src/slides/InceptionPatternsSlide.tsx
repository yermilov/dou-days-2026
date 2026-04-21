import { useMemo, useRef } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

/* ── colour constants (SVG fill/stroke can't use CSS vars) ── */
const ORANGE = '#f0883e';
const GREEN  = '#7ee787';
const CYAN   = '#76e4f7';
const BLUE   = '#79c0ff';
const PURPLE = '#d2a8ff';

const DEPTH_COLORS = [ORANGE, ORANGE, GREEN, CYAN, BLUE, PURPLE, PURPLE];
const MAX_DEPTH_BY_STAGE = [2, 3, 4, 5, 6, 6];

/* ── seeded PRNG (mulberry32) ── */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── branch data ── */
interface Branch {
  id: string;
  x1: number; y1: number;
  cx: number; cy: number;   // quadratic bezier control point
  x2: number; y2: number;
  depth: number;
  thickness: number;
  length: number;
  color: string;
  isTerminal: boolean;
}

function generateBranches(
  x: number, y: number,
  angle: number,
  length: number,
  depth: number,
  maxDepth: number,
  thickness: number,
  parentId: string,
  rng: () => number,
): Branch[] {
  if (depth >= maxDepth) return [];

  const rad = (angle * Math.PI) / 180;
  const x2 = x + Math.cos(rad) * length;
  const y2 = y + Math.sin(rad) * length;

  // slight curve: offset control point perpendicular to branch direction
  const perpOffset = (rng() - 0.5) * length * 0.3;
  const mx = (x + x2) / 2 + Math.cos(rad + Math.PI / 2) * perpOffset;
  const my = (y + y2) / 2 + Math.sin(rad + Math.PI / 2) * perpOffset;

  const childCount = depth <= 1 && rng() > 0.4 ? 3 : 2;
  const isTerminal = depth + 1 >= maxDepth;

  const branch: Branch = {
    id: parentId + '-' + depth,
    x1: x, y1: y,
    cx: mx, cy: my,
    x2, y2,
    depth,
    thickness,
    length,
    color: DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)],
    isTerminal,
  };

  const children: Branch[] = [];
  const spreadBase = 28 + rng() * 12;

  for (let i = 0; i < childCount; i++) {
    const spread = childCount === 2
      ? (i === 0 ? -spreadBase : spreadBase)
      : (i - 1) * spreadBase + (rng() - 0.5) * 8;
    const childAngle = angle + spread;
    const childLen = length * (0.64 + rng() * 0.12);
    const childThick = thickness * 0.62;
    children.push(
      ...generateBranches(
        x2, y2,
        childAngle,
        childLen,
        depth + 1,
        maxDepth,
        childThick,
        parentId + '-' + depth + 'c' + i,
        rng,
      ),
    );
  }

  return [branch, ...children];
}

/* ── CSS keyframes ── */
const FRACTAL_STYLES = `
@keyframes inceptionGrow {
  from { stroke-dashoffset: var(--branch-len); opacity: 0.2; }
  to   { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes inceptionNodeAppear {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
}
@keyframes inceptionPulse {
  0%, 100% { opacity: 0.65; filter: drop-shadow(0 0 2px currentColor); }
  50%      { opacity: 1;    filter: drop-shadow(0 0 6px currentColor); }
}
`;

/* ── FractalTree component ── */
function FractalTree({ maxDepth, prevMaxDepth }: { maxDepth: number; prevMaxDepth: number }) {
  const branches = useMemo(() => {
    const rng = mulberry32(42);
    return generateBranches(300, 550, -90, 150, 0, maxDepth, 5.5, 'r', rng);
  }, [maxDepth]);

  // connection arcs between some leaf nodes (for network effect)
  const leafNodes = useMemo(
    () => branches.filter(b => b.isTerminal),
    [branches],
  );

  const connectionArcs = useMemo(() => {
    if (maxDepth < 5) return [];
    const arcs: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    const rng2 = mulberry32(99);
    for (let i = 0; i < leafNodes.length - 1; i++) {
      if (rng2() > 0.35) continue;
      const a = leafNodes[i];
      const b = leafNodes[i + 1];
      const dist = Math.hypot(a.x2 - b.x2, a.y2 - b.y2);
      if (dist < 120 && dist > 20) {
        arcs.push({ x1: a.x2, y1: a.y2, x2: b.x2, y2: b.y2, id: `arc-${i}` });
      }
    }
    return arcs;
  }, [leafNodes, maxDepth]);

  return (
    <svg
      viewBox="0 0 600 580"
      preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        {/* glow filters per colour */}
        {[
          { id: 'glow-orange', color: ORANGE },
          { id: 'glow-green',  color: GREEN },
          { id: 'glow-cyan',   color: CYAN },
          { id: 'glow-blue',   color: BLUE },
          { id: 'glow-purple', color: PURPLE },
        ].map(({ id, color }) => (
          <filter key={id} id={id} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={color} floodOpacity="0.6" />
          </filter>
        ))}
        <radialGradient id="fractal-bg" cx="50%" cy="90%" r="70%">
          <stop offset="0%" stopColor="#1a2233" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a0e14" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* subtle background glow at base */}
      <circle cx="300" cy="550" r="240" fill="url(#fractal-bg)" />

      {/* branches */}
      {branches.map(b => {
        const pathLen = b.length * 1.15; // approximate bezier arc length
        const isNewLevel = b.depth >= prevMaxDepth;
        const glowId = b.depth <= 1 ? 'glow-orange'
          : b.depth === 2 ? 'glow-green'
          : b.depth === 3 ? 'glow-cyan'
          : b.depth === 4 ? 'glow-blue'
          : 'glow-purple';

        return (
          <path
            key={b.id}
            d={`M${b.x1},${b.y1} Q${b.cx},${b.cy} ${b.x2},${b.y2}`}
            stroke={b.color}
            strokeWidth={b.thickness}
            strokeLinecap="round"
            fill="none"
            filter={`url(#${glowId})`}
            style={isNewLevel ? {
              strokeDasharray: pathLen,
              strokeDashoffset: pathLen,
              ['--branch-len' as string]: pathLen,
              animation: `inceptionGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${b.depth * 0.25}s forwards`,
            } : {
              opacity: 1,
            }}
          />
        );
      })}

      {/* connection arcs */}
      {connectionArcs.map(arc => {
        const midY = Math.min(arc.y1, arc.y2) - 15;
        return (
          <path
            key={arc.id}
            d={`M${arc.x1},${arc.y1} Q${(arc.x1 + arc.x2) / 2},${midY} ${arc.x2},${arc.y2}`}
            stroke={CYAN}
            strokeWidth={0.6}
            strokeDasharray="3,4"
            fill="none"
            opacity={0}
            style={{
              animation: `inceptionGrow 0.8s ease-out 1.5s forwards`,
              strokeDashoffset: 0,
            }}
          />
        );
      })}

      {/* tip nodes */}
      {branches.filter(b => b.isTerminal).map(b => {
        const isNew = b.depth >= prevMaxDepth;
        return (
          <circle
            key={b.id + '-node'}
            cx={b.x2}
            cy={b.y2}
            r={3.5}
            fill={b.color}
            filter={`url(#glow-${b.depth <= 1 ? 'orange' : b.depth === 2 ? 'green' : b.depth === 3 ? 'cyan' : b.depth === 4 ? 'blue' : 'purple'})`}
            style={isNew ? {
              transformOrigin: `${b.x2}px ${b.y2}px`,
              animation: `inceptionNodeAppear 0.4s ease-out ${b.depth * 0.25 + 0.4}s forwards, inceptionPulse 2.5s ease-in-out ${b.depth * 0.25 + 0.8}s infinite`,
              opacity: 0,
            } : {
              opacity: 0.85,
              animation: `inceptionPulse 2.5s ease-in-out ${b.depth * 0.15}s infinite`,
            }}
          />
        );
      })}

      {/* seed node at base */}
      <circle
        cx={300} cy={550} r={6}
        fill={ORANGE}
        filter="url(#glow-orange)"
        style={{
          animation: 'inceptionPulse 2s ease-in-out infinite',
        }}
      />
    </svg>
  );
}

/* ── main slide content ── */
function InceptionPatternsContent({ revealStage = 0 }: SlideContentProps) {
  const prevStageRef = useRef(0);
  const maxDepth = MAX_DEPTH_BY_STAGE[Math.min(revealStage, MAX_DEPTH_BY_STAGE.length - 1)];
  const prevMaxDepth = MAX_DEPTH_BY_STAGE[Math.min(prevStageRef.current, MAX_DEPTH_BY_STAGE.length - 1)];

  // update ref after render values are captured
  const prevDepth = prevMaxDepth;
  if (prevStageRef.current !== revealStage) {
    prevStageRef.current = revealStage;
  }

  return (
    <>
      <style>{FRACTAL_STYLES}{`
        .ip-bullets .slide-item { margin-bottom: 0; }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>
        <h2>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--inception</span>
        </h2>

        <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>
          {/* left column: bullets */}
          <div className="ip-bullets" style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <SlideItem delay={0.06}>
              you need at least 1-2 <Emphasis color="orange">ai multipliers</Emphasis> in your org
              and at least 1-2 <Emphasis color="green">ai-first engineers</Emphasis> in every team
              to start ai adoption
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                anti-pattern <Emphasis color="orange">"ai from above"</Emphasis> — mandating ai coding
                from leadership won't work
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                give <Emphasis color="green">space and time</Emphasis> for your best (or just curious)
                engineers to experiment
              </SlideItem>
            )}

            {revealStage >= 3 && (
              <SlideItem delay={0}>
                <Emphasis color="green">connect</Emphasis> ai-successful engineers — they might not
                know about each other
              </SlideItem>
            )}

            {revealStage >= 4 && (
              <SlideItem delay={0}>
                help them to <Emphasis color="green">popularize</Emphasis> their work on demos, fun days,
                shared slack channels
              </SlideItem>
            )}

            {revealStage >= 5 && (
              <SlideItem delay={0}>
                anti-pattern <Emphasis color="orange">"AI-enablement team"</Emphasis> working on AI coding
                blueprints - better to work on <Emphasis color="green">AI infrastructure</Emphasis> or <Emphasis color="green">infrastructure for AI</Emphasis>
              </SlideItem>
            )}
          </div>

          {/* right column: fractal tree */}
          <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FractalTree maxDepth={maxDepth} prevMaxDepth={prevDepth} />
          </div>
        </div>
      </div>
    </>
  );
}

export const InceptionPatternsSlide: SlideDefinition = {
  id: 'inception-patterns',
  maxRevealStages: 5,
  content: (props: SlideContentProps) => <InceptionPatternsContent {...props} />,
  notes:
    'Inception patterns for AI adoption. You need multipliers and ai-first engineers as seeds. Top-down mandates fail. Give engineers space to experiment, connect successful adopters, and help them share their wins.',
};
