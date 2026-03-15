export interface Sprite {
  width: number;
  height: number;
  pixels: number[][]; // 2D array, each value is a color index
  palette: string[];  // color strings indexed by pixel values (0 = transparent)
}

export interface Entity {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  sprite: 'person' | 'clawd';
  animFrame: number;
  direction: 1 | -1;
  state: 'moving' | 'idle' | 'stuck' | 'sleeping' | 'spawning' | 'fading';
  opacity: number;
  stuckTimer: number;
  lane: number;
}

export interface Dot {
  x: number;
  y: number;
  eaten: boolean;
  eatenOpacity: number;
}

export interface Lane {
  y: number;
  dots: Dot[];
  active: boolean;
}

export interface ProgressBar {
  lane: number;
  progress: number;
  targetProgress: number;
  color: string;
}

export interface Wall {
  x: number;
  y: number;
  broken: boolean;
  breakProgress: number;
}

export interface ScenarioConfig {
  entities: Omit<Entity, 'animFrame' | 'opacity' | 'stuckTimer'>[];
  lanes: { active: boolean; dotsVisible: boolean }[];
  progressBars?: ProgressBar[];
  walls?: Wall[];
  description: string;
  labyrinth?: boolean;
  maze?: number[][]; // 0=path, 1=wall - tile grid for 2D maze
}

export interface GameState {
  entities: Entity[];
  lanes: Lane[];
  progressBars: ProgressBar[];
  walls: Wall[];
  tick: number;
  transitioning: boolean;
  transitionProgress: number;
  labyrinth: boolean;
  lastSpawnTick: number;
  maze: number[][];
  eatenDots: Set<string>; // "col,row" keys
}

export const CANVAS_W = 320;
export const CANVAS_H = 240;
export const LANE_COUNT = 5;
export const LANE_Y = [30, 70, 110, 150, 190] as const;
export const DOT_SPACING = 12;
export const DOT_START_X = 40;
export const DOT_END_X = 300;
