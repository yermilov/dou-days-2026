import { useRef, useEffect, useCallback } from 'react';
import { CANVAS_W, CANVAS_H, GameState } from './types';
import { createInitialState, applyScenario, update } from './engine';
import { render } from './renderer';

interface PacManCanvasProps {
  revealStage: number;
}

export function PacManCanvas({ revealStage }: PacManCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const stageRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Apply scenario when revealStage changes
  useEffect(() => {
    if (stageRef.current !== revealStage) {
      stageRef.current = revealStage;
      stateRef.current = applyScenario(stateRef.current, revealStage);
    }
  }, [revealStage]);

  // Animation loop
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    stateRef.current = update(stateRef.current, stageRef.current);
    render(ctx, stateRef.current);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    // Initialize with stage 0
    stateRef.current = applyScenario(stateRef.current, 0);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      style={{
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        borderRadius: 'var(--input-border-radius)',
        border: '1px solid var(--terminal-border)',
        background: '#0a0e14',
      }}
    />
  );
}
