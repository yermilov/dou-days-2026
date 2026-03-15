import { Entity, GameState, Lane, LANE_Y, DOT_SPACING, DOT_START_X, DOT_END_X } from './types';
import { scenarios } from './scenarios';

function createDots() {
  const dots: Lane['dots'] = [];
  for (let x = DOT_START_X; x < DOT_END_X; x += DOT_SPACING) {
    dots.push({ x, y: 0, eaten: false, eatenOpacity: 0 });
  }
  return dots;
}

function createLanes(): Lane[] {
  return LANE_Y.map((y) => ({
    y,
    dots: createDots().map((d) => ({ ...d, y: y + 6 })),
    active: false,
  }));
}

export function createInitialState(): GameState {
  return {
    entities: [],
    lanes: createLanes(),
    progressBars: [],
    walls: [],
    tick: 0,
    transitioning: false,
    transitionProgress: 0,
    labyrinth: false,
    lastSpawnTick: 0,
    maze: [],
    eatenDots: new Set(),
  };
}

export function applyScenario(state: GameState, stage: number): GameState {
  const config = scenarios[stage];
  if (!config) return state;

  // Reset lanes with fresh dots
  const lanes = createLanes();
  config.lanes.forEach((cfg: { active: boolean; dotsVisible: boolean }, i: number) => {
    lanes[i].active = cfg.active;
  });

  // Create entities from config
  const entities: Entity[] = config.entities.map((e) => ({
    ...e,
    animFrame: 0,
    opacity: e.state === 'spawning' ? 0 : 1,
    stuckTimer: 0,
  }));

  return {
    entities,
    lanes,
    progressBars: config.progressBars ? config.progressBars.map((p) => ({ ...p })) : [],
    walls: config.walls ? config.walls.map((w) => ({ ...w })) : [],
    tick: 0,
    transitioning: true,
    transitionProgress: 0,
    labyrinth: config.labyrinth ?? false,
    lastSpawnTick: 0,
    maze: config.maze ?? [],
    eatenDots: new Set(),
  };
}

function eatDots(entity: Entity, lane: Lane) {
  if (entity.state !== 'moving') return;
  for (const dot of lane.dots) {
    if (dot.eaten) continue;
    const dx = Math.abs(entity.x + 8 - dot.x);
    if (dx < 6) {
      dot.eaten = true;
      dot.eatenOpacity = 1;
    }
  }
}

function updateEntity(entity: Entity, state: GameState, _stageIdx: number) {
  // Animation frame cycling
  if (state.tick % 8 === 0) {
    entity.animFrame++;
  }

  const lane = state.lanes[entity.lane];

  // Vertical lerp toward targetY (used for lane switching)
  // Wait until all spawning entities are done before moving
  if (entity.y !== entity.targetY) {
    const hasSpawning = state.entities.some((e) => e !== entity && e.state === 'spawning');
    if (!hasSpawning) {
      const dy = entity.targetY - entity.y;
      const step = Math.sign(dy) * Math.min(Math.abs(dy), 1.5);
      entity.y += step;
      if (Math.abs(entity.y - entity.targetY) < 1.5) {
        entity.y = entity.targetY;
      }
    }
  }

  switch (entity.state) {
    case 'moving': {
      // Don't move horizontally while transitioning between lanes
      if (entity.y === entity.targetY) {
        entity.x += entity.speed * entity.direction;
      }

      // Clawd quirks: random direction switches and getting stuck
      if (entity.sprite === 'clawd') {
        // Random reversals
        if (state.tick % 60 === 0 && Math.random() < 0.3) {
          entity.direction *= -1 as (1 | -1);
          entity.stuckTimer = 25;
        }
        // Random brief freeze
        if (state.tick % 90 === 0 && Math.random() < 0.2) {
          entity.stuckTimer = 35;
        }
        // Get stuck briefly
        if (entity.stuckTimer > 0) {
          entity.stuckTimer--;
          entity.x -= entity.speed * entity.direction * 0.7;
        }
      }

      // Eat dots
      if (lane) eatDots(entity, lane);

      // Wall collision
      for (const wall of state.walls) {
        if (!wall.broken && Math.abs(entity.x + 8 - wall.x) < 10 && Math.abs(entity.y - wall.y) < 16) {
          if (entity.sprite === 'clawd') {
            // Clawd breaks through walls
            wall.broken = true;
          } else {
            // Person gets stuck at wall
            entity.state = 'stuck';
            entity.x = wall.x - 16;
          }
        }
      }

      // Wrap around
      if (entity.x > DOT_END_X + 10) {
        entity.x = DOT_START_X - 16;
      }
      if (entity.x < DOT_START_X - 20) {
        entity.x = DOT_END_X;
      }
      break;
    }
    case 'idle':
      // Idle bob
      break;
    case 'stuck':
      // Jiggle handled in renderer
      break;
    case 'sleeping':
      // Handled in renderer (zzz)
      break;
    case 'spawning':
      // ~5 seconds at 60fps = ~300 frames
      entity.opacity = Math.min(1, entity.opacity + 0.0033);
      if (entity.opacity >= 1) entity.state = 'moving';
      break;
    case 'fading':
      entity.opacity = Math.max(0, entity.opacity - 0.05);
      break;
  }
}

const TILE = 16;

// Check if a tile is walkable
function tileWalkable(maze: number[][], col: number, row: number): boolean {
  if (row < 0 || row >= maze.length || col < 0 || col >= maze[0].length) return false;
  return maze[row][col] === 0;
}

// Directions: right, down, left, up
const DIRS: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

// Get walkable neighbor tile directions from a tile position
function getWalkableDirs(maze: number[][], col: number, row: number): [number, number][] {
  return DIRS.filter(([dc, dr]) => tileWalkable(maze, col + dc, row + dr));
}

// Convert pixel position to tile col/row
function pixToTile(px: number): number {
  return Math.round(px / TILE);
}

// Convert tile col/row to pixel position (top-left of tile)
function tileToPixel(t: number): number {
  return t * TILE;
}

function eatMazeDot(state: GameState, col: number, row: number) {
  state.eatenDots.add(`${col},${row}`);
}

function updateLabyrinth(state: GameState) {
  const maze = state.maze;

  for (const entity of state.entities) {
    // Animate
    if (state.tick % 8 === 0) entity.animFrame++;

    if (entity.state === 'spawning') {
      entity.opacity = Math.min(1, entity.opacity + 0.0033);
      if (entity.opacity >= 1) entity.state = 'moving';
      continue;
    }

    if (entity.state !== 'moving') continue;

    // Entity moves toward targetX/targetY (next tile center)
    const dx = entity.targetX - entity.x;
    const dy = entity.targetY - entity.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > entity.speed) {
      // Move toward target
      entity.x += (dx / dist) * entity.speed;
      entity.y += (dy / dist) * entity.speed;
      // Set direction for sprite flipping
      if (Math.abs(dx) > Math.abs(dy)) {
        entity.direction = dx > 0 ? 1 : -1;
      }
    } else {
      // Arrived at target tile — snap and pick next direction
      entity.x = entity.targetX;
      entity.y = entity.targetY;

      const col = pixToTile(entity.x);
      const row = pixToTile(entity.y);

      // Eat the dot at this tile
      eatMazeDot(state, col, row);

      // Clawd quirk: occasionally pause
      if (entity.sprite === 'clawd' && Math.random() < 0.15) {
        entity.stuckTimer = 20 + Math.floor(Math.random() * 20);
      }

      if (entity.stuckTimer > 0) {
        entity.stuckTimer--;
        continue;
      }

      // Pick next direction
      const available = getWalkableDirs(maze, col, row);
      if (available.length > 0) {
        // Prefer not reversing unless it's the only option
        const nonReverse = available.filter(([dc, dr]) => {
          const prevDc = col - pixToTile(entity.x - (entity.targetX - entity.x || 0.01));
          const prevDr = row - pixToTile(entity.y - (entity.targetY - entity.y || 0.01));
          return !(dc === -Math.sign(prevDc) && dr === -Math.sign(prevDr));
        });
        const choices = nonReverse.length > 0 ? nonReverse : available;
        const [dc, dr] = choices[Math.floor(Math.random() * choices.length)];
        entity.targetX = tileToPixel(col + dc);
        entity.targetY = tileToPixel(row + dr);
      }
    }
  }

  // Person spawns clawds periodically (every ~3 seconds)
  if (state.tick - state.lastSpawnTick > 180 && state.entities.length < 12) {
    const personEntity = state.entities.find((e) => e.sprite === 'person');
    if (personEntity) {
      // Spawn at person's current tile, target a valid neighbor
      const col = pixToTile(personEntity.x);
      const row = pixToTile(personEntity.y);
      const dirs = getWalkableDirs(maze, col, row);
      const [dc, dr] = dirs.length > 0 ? dirs[Math.floor(Math.random() * dirs.length)] : [0, 0];
      state.entities.push({
        x: personEntity.x,
        y: personEntity.y,
        targetX: tileToPixel(col + dc),
        targetY: tileToPixel(row + dr),
        speed: 0.6 + Math.random() * 0.5,
        sprite: 'clawd',
        animFrame: 0,
        direction: dc >= 0 ? 1 : -1,
        state: 'spawning',
        opacity: 0,
        stuckTimer: 0,
        lane: 0,
      });
      state.lastSpawnTick = state.tick;
    }
  }
}

export function update(state: GameState, stageIdx: number): GameState {
  state.tick++;

  // Transition easing
  if (state.transitioning) {
    state.transitionProgress += 0.03;
    if (state.transitionProgress >= 1) {
      state.transitioning = false;
      state.transitionProgress = 1;
    }
  }

  // Labyrinth mode: 2D maze movement
  if (state.labyrinth && state.maze.length > 0) {
    updateLabyrinth(state);
  } else {
    // Normal lane-based update
    for (const entity of state.entities) {
      updateEntity(entity, state, stageIdx);
    }
  }

  // Fade eaten dot opacity
  for (const lane of state.lanes) {
    for (const dot of lane.dots) {
      if (dot.eaten && dot.eatenOpacity > 0) {
        dot.eatenOpacity -= 0.02;
      }
    }
  }

  // Update progress bars
  for (const bar of state.progressBars) {
    if (bar.progress < bar.targetProgress) {
      bar.progress += 0.003;
      if (bar.progress > bar.targetProgress) bar.progress = bar.targetProgress;
    }
  }

  // Update walls
  for (const wall of state.walls) {
    if (wall.broken && wall.breakProgress < 1) {
      wall.breakProgress += 0.02;
    }
  }

  return state;
}
