import { ScenarioConfig, StageEvent } from './types';

const TILE = 16;

// Shared maze for all stages — 20x15 tile grid (each tile = 16px), 320x240 canvas
// 0=path, 1=wall
const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,0,0,1],
  [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,1,1,0,1,0,0,0,0,1,1,0,0,0,0,1,1],
  [1,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1],
  [1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,1],
  [1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1],
  [1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,1],
  [1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
  [1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const NO_LANES: ScenarioConfig['lanes'] = [
  { active: false, dotsVisible: false },
  { active: false, dotsVisible: false },
  { active: false, dotsVisible: false },
  { active: false, dotsVisible: false },
  { active: false, dotsVisible: false },
];

// Stage 0: full initial state — person alone in maze
export const initialScenario: ScenarioConfig = {
  entities: [
    { x: 9 * TILE, y: 7 * TILE, targetX: 10 * TILE, targetY: 7 * TILE, speed: 1.2, sprite: 'person', direction: 1, state: 'moving', lane: 0 },
  ],
  lanes: NO_LANES,
  description: 'Person alone in maze',
  labyrinth: true,
  maze: MAZE,
};

// Stages 1–4: incremental events applied to live state.
// Each stage mirrors the matching left-column bullet.
export const stageEvents: StageEvent[] = [
  // Stage 1: "самостійно ви напишете код як мінімум або краще або швидше"
  //   No scenario change — person continues working alone, reinforcing the "solo is fine" thesis.
  {},
  // Stage 2: "просто дивитися в термінал як клод працює — втрата продуктивності"
  //   First clawd appears and takes over; person freezes to "watch" (idle).
  { spawnClawds: [{ col: -1, row: -1, speed: 0.7 }], personState: 'idle' },
  // Stage 3: "знайдіть 2-3 задачі для клода, переключіться на одну ту саму задачу"
  //   2 more clawds spawn (3 total — the "2–3 tasks"); person resumes their own task.
  { spawnClawds: [{ col: -1, row: -1, speed: 0.6 }, { col: -1, row: -1, speed: 0.9 }], personState: 'moving' },
  // Stage 4: "запустіть клода і сходіть відпочити"
  //   Person sleeps; clawds keep going.
  { personState: 'sleeping' },
];
