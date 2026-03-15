import { Sprite } from './types';

// Person sprite - pac-man style, 8x8
// 0=transparent, 1=white, 2=green, 3=dark-green
const personOpen: Sprite = {
  width: 8,
  height: 8,
  palette: ['', '#e2e8f0', '#7ee787', '#2ea043', '#1a1e24'],
  pixels: [
    [0, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 3, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 0, 0, 0],
    [0, 2, 3, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0],
  ],
};

const personClosed: Sprite = {
  width: 8,
  height: 8,
  palette: ['', '#e2e8f0', '#7ee787', '#2ea043', '#1a1e24'],
  pixels: [
    [0, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 3, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2, 0, 0],
    [0, 2, 3, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0],
  ],
};

// Clawd sprite - ghost shape, orange/sunset palette
// 0=transparent, 1=orange, 2=dark-orange, 3=light-orange, 4=white (eye)
const clawdFrame1: Sprite = {
  width: 8,
  height: 8,
  palette: ['', '#f0883e', '#c66a2e', '#f5a623', '#e2e8f0', '#1a1e24'],
  pixels: [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 3, 1, 3, 1, 0, 0],
    [1, 4, 5, 1, 4, 5, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 1, 2, 1, 2, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

const clawdFrame2: Sprite = {
  width: 8,
  height: 8,
  palette: ['', '#f0883e', '#c66a2e', '#f5a623', '#e2e8f0', '#1a1e24'],
  pixels: [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 3, 1, 3, 1, 0, 0],
    [1, 4, 5, 1, 4, 5, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 1, 2, 1, 2, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

// Zzz sprite for sleeping
const zzzSprite: Sprite = {
  width: 8,
  height: 6,
  palette: ['', '#79c0ff', '#4a90d9'],
  pixels: [
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
  ],
};

// Wall block sprite
const wallSprite: Sprite = {
  width: 6,
  height: 8,
  palette: ['', '#4a5568', '#2d3748', '#1a202c'],
  pixels: [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 2, 1],
    [1, 2, 3, 3, 2, 1],
    [1, 2, 3, 3, 2, 1],
    [1, 2, 3, 3, 2, 1],
    [1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ],
};

export const sprites = {
  personOpen,
  personClosed,
  clawdFrame1,
  clawdFrame2,
  zzz: zzzSprite,
  wall: wallSprite,
};
