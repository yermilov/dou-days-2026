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

// Stages 1–4: incremental events applied to live state
export const stageEvents: StageEvent[] = [
  // Stage 1: "Give it a task and switch" — spawn clawd from person
  { spawnClawds: [{ col: -1, row: -1, speed: 0.7 }] }, // col/row -1 = spawn at person's position
  // Stage 2: Domain knowledge bullets — text only, no maze change
  {},
  // Stage 3: "Don't stare, launch clawds" — spawn more + enable auto-spawn
  { spawnClawds: [{ col: -1, row: -1, speed: 0.9 }, { col: -1, row: -1, speed: 0.6 }], enableAutoSpawn: true },
  // Stage 4: "Launch clawds and go eat / rest" — person sleeps
  { personState: 'sleeping' },
];
