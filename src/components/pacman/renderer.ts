import { Sprite } from './types';
import type { GameState } from './types';
import { sprites } from './sprites';

const W = 320;
const H = 240;

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite,
  x: number,
  y: number,
  scale: number = 2,
  opacity: number = 1,
  flipH: boolean = false,
) {
  const prevAlpha = ctx.globalAlpha;
  ctx.globalAlpha = opacity;

  for (let row = 0; row < sprite.height; row++) {
    for (let col = 0; col < sprite.width; col++) {
      const colorIdx = sprite.pixels[row][col];
      if (colorIdx === 0) continue;
      ctx.fillStyle = sprite.palette[colorIdx];
      const drawCol = flipH ? sprite.width - 1 - col : col;
      ctx.fillRect(
        Math.floor(x + drawCol * scale),
        Math.floor(y + row * scale),
        scale,
        scale,
      );
    }
  }

  ctx.globalAlpha = prevAlpha;
}

function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, eaten: boolean, opacity: number) {
  if (eaten && opacity <= 0) return;
  ctx.globalAlpha = eaten ? opacity : 0.6;
  ctx.fillStyle = eaten ? '#7ee787' : '#4a5568';
  const size = eaten ? 1 : 2;
  ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  ctx.globalAlpha = 1;
}

function drawProgressBar(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, progress: number, color: string) {
  // Background
  ctx.fillStyle = '#1a202c';
  ctx.fillRect(x, y, width, 4);
  // Fill
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Math.floor(width * progress), 4);
  // Border
  ctx.strokeStyle = '#4a5568';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x, y, width, 4);
}

function drawWall(ctx: CanvasRenderingContext2D, x: number, y: number, broken: boolean, breakProgress: number) {
  if (broken && breakProgress >= 1) return;
  const opacity = broken ? 1 - breakProgress : 1;
  if (broken) {
    // Crumbling effect - scatter pieces
    const pieces = 4;
    for (let i = 0; i < pieces; i++) {
      const offsetX = (Math.sin(i * 2.1 + breakProgress * 5) * breakProgress * 10);
      const offsetY = breakProgress * 15 * (i % 2 === 0 ? 1 : -1);
      drawSprite(ctx, sprites.wall, x + offsetX, y + offsetY, 1, opacity * (1 - breakProgress * 0.5));
    }
  } else {
    drawSprite(ctx, sprites.wall, x, y, 2, opacity);
  }
}

const TILE = 16;

function drawMaze(ctx: CanvasRenderingContext2D, maze: number[][], eatenDots: Set<string>) {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        // Wall tile with slight 8-bit bevel
        const x = col * TILE;
        const y = row * TILE;
        ctx.fillStyle = '#1a2332';
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = '#243044';
        ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
        ctx.fillStyle = '#1a2332';
        ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
      } else if (!eatenDots.has(`${col},${row}`)) {
        // Path dot (small pellet in center)
        const cx = col * TILE + TILE / 2;
        const cy = row * TILE + TILE / 2;
        ctx.fillStyle = 'rgba(74, 85, 104, 0.5)';
        ctx.fillRect(cx - 1, cy - 1, 3, 3);
      }
    }
  }
}

export function render(ctx: CanvasRenderingContext2D, state: GameState) {
  // Clear
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 0, W, H);

  if (state.labyrinth && state.maze.length > 0) {
    // Draw 2D maze
    drawMaze(ctx, state.maze, state.eatenDots);
  } else {
    // Draw lane lines (subtle)
    ctx.strokeStyle = 'rgba(74, 85, 104, 0.15)';
    ctx.lineWidth = 0.5;
    for (const lane of state.lanes) {
      ctx.beginPath();
      ctx.moveTo(30, lane.y + 8);
      ctx.lineTo(310, lane.y + 8);
      ctx.stroke();
    }

    // Draw dots
    for (const lane of state.lanes) {
      for (const dot of lane.dots) {
        drawDot(ctx, dot.x, dot.y, dot.eaten, dot.eatenOpacity);
      }
    }

    // Draw walls
    for (const wall of state.walls) {
      drawWall(ctx, wall.x, wall.y, wall.broken, wall.breakProgress);
    }
  }

  // Draw entities
  for (const entity of state.entities) {
    if (entity.opacity <= 0) continue;

    const flipH = entity.direction === -1;
    let sprite: Sprite;

    if (entity.sprite === 'person') {
      sprite = entity.animFrame % 2 === 0 ? sprites.personOpen : sprites.personClosed;
    } else {
      sprite = entity.animFrame % 2 === 0 ? sprites.clawdFrame1 : sprites.clawdFrame2;
    }

    // Stuck jiggle effect
    let drawX = entity.x;
    let drawY = entity.y;
    if (entity.state === 'stuck') {
      drawX += Math.sin(state.tick * 0.3) * 1.5;
    }

    drawSprite(ctx, sprite, drawX, drawY, 2, entity.opacity, flipH);

    // Draw zzz for sleeping entities
    if (entity.state === 'sleeping') {
      const zzzOffset = Math.sin(state.tick * 0.05) * 2;
      drawSprite(ctx, sprites.zzz, entity.x + 14, entity.y - 10 + zzzOffset, 1, 0.5 + Math.sin(state.tick * 0.08) * 0.3);
    }
  }

  // Draw progress bars
  for (const bar of state.progressBars) {
    const laneY = state.lanes[bar.lane]?.y ?? 0;
    drawProgressBar(ctx, 30, laneY + 20, 280, bar.progress, bar.color);
  }

  // Draw subtle "THROUGHPUT" label when progress bars are showing
  if (state.progressBars.length > 2) {
    ctx.fillStyle = 'rgba(226, 232, 240, 0.3)';
    ctx.font = '6px monospace';
    ctx.fillText('THROUGHPUT', 130, H - 8);
  }
}
