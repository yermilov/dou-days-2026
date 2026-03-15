import { ScenarioConfig, LANE_Y, DOT_START_X } from './types';

// Helper to create entity defaults
function person(lane: number, x: number, state: ScenarioConfig['entities'][0]['state'] = 'moving', speed = 1.5, direction: 1 | -1 = 1): ScenarioConfig['entities'][0] {
  return { x, y: LANE_Y[lane], targetX: x, targetY: LANE_Y[lane], speed, sprite: 'person', direction, state, lane };
}

function clawd(lane: number, x: number, state: ScenarioConfig['entities'][0]['state'] = 'moving', speed = 0.8, direction: 1 | -1 = 1): ScenarioConfig['entities'][0] {
  return { x, y: LANE_Y[lane], targetX: x, targetY: LANE_Y[lane], speed, sprite: 'clawd', direction, state, lane };
}

export const scenarios: ScenarioConfig[] = [
  // Stage 0: "Give task, switch" - person delegates to clawd, works on lane 2
  {
    entities: [
      clawd(0, DOT_START_X, 'moving', 0.8),
      person(2, DOT_START_X, 'moving', 2),
    ],
    lanes: [
      { active: true, dotsVisible: true },
      { active: false, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: false, dotsVisible: true },
      { active: false, dotsVisible: true },
    ],
    description: 'Delegate and switch',
  },

  // Stage 1: "Give task, switch" - person spawns clawd on lane 0, moves down to lane 2
  {
    entities: [
      { x: DOT_START_X, y: LANE_Y[0], targetX: DOT_START_X, targetY: LANE_Y[0], speed: 0.8, sprite: 'clawd' as const, direction: 1 as const, state: 'spawning' as const, lane: 0 },
      { x: DOT_START_X + 16, y: LANE_Y[0], targetX: DOT_START_X + 16, targetY: LANE_Y[2], speed: 2, sprite: 'person' as const, direction: 1 as const, state: 'moving' as const, lane: 2 },
    ],
    lanes: [
      { active: true, dotsVisible: true },
      { active: false, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: false, dotsVisible: true },
      { active: false, dotsVisible: true },
    ],
    description: 'Delegate and switch',
  },

  // Stage 2: "Two Claudes in parallel" - 2 clawds + person on lane 2
  {
    entities: [
      clawd(0, DOT_START_X, 'moving', 0.8),
      clawd(1, DOT_START_X + 20, 'moving', 0.9),
      person(2, DOT_START_X, 'moving', 2),
    ],
    lanes: [
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: false, dotsVisible: true },
      { active: false, dotsVisible: true },
    ],
    description: 'Two clawds parallel',
  },

  // Stage 2: "Four tasks, go sleep" - 4 clawds, person sleeping
  {
    entities: [
      clawd(0, DOT_START_X, 'moving', 0.8),
      clawd(1, DOT_START_X + 10, 'moving', 0.9),
      clawd(2, DOT_START_X + 20, 'moving', 0.7),
      clawd(3, DOT_START_X + 5, 'moving', 1.0),
      person(4, DOT_START_X + 20, 'sleeping', 0),
    ],
    lanes: [
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
      { active: true, dotsVisible: true },
    ],
    description: 'Four clawds, person sleeps',
  },

  // Stage 4: "Volume + don't stare" - 2D labyrinth, person spawns clawds
  {
    entities: [
      // Person starts at tile (9,7) — center of maze, tile-aligned
      { x: 9 * 16, y: 7 * 16, targetX: 10 * 16, targetY: 7 * 16, speed: 1.2, sprite: 'person' as const, direction: 1 as const, state: 'moving' as const, lane: 0 },
    ],
    lanes: [
      { active: false, dotsVisible: false },
      { active: false, dotsVisible: false },
      { active: false, dotsVisible: false },
      { active: false, dotsVisible: false },
      { active: false, dotsVisible: false },
    ],
    description: 'Labyrinth: person spawns clawds while moving',
    labyrinth: true,
    // 20x15 tile grid (each tile = 16px), 320x240 canvas
    // 0=path, 1=wall
    maze: [
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
    ],
  },

];
