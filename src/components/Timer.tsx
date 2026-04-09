const TOTAL_TIME = 25 * 60;

interface TimerProps {
  elapsedSeconds: number;
  currentSlide: number;
  totalSlides: number;
}

function getPaceColor(elapsedSeconds: number, currentSlide: number, totalSlides: number): string {
  const remaining = Math.max(0, TOTAL_TIME - elapsedSeconds);

  if (remaining === 0 && currentSlide < totalSlides - 1) {
    return 'var(--terminal-red)';
  }

  const expectedSlide = (elapsedSeconds / TOTAL_TIME) * (totalSlides - 1);
  const slidesBehind = expectedSlide - currentSlide;

  if (slidesBehind < 1) return 'var(--terminal-green)';
  if (slidesBehind < 2) return 'var(--terminal-yellow)';
  return 'var(--terminal-red)';
}

export function Timer({ elapsedSeconds, currentSlide, totalSlides }: TimerProps) {
  const remaining = Math.max(0, TOTAL_TIME - elapsedSeconds);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const color = getPaceColor(elapsedSeconds, currentSlide, totalSlides);

  return (
    <span className="timer-countdown" style={{ color }}>
      {display}
    </span>
  );
}
