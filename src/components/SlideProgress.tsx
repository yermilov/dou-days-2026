import { SlideProgressProps } from '../types/slides';

export function SlideProgress({ current, total }: SlideProgressProps) {
  const percentage = Math.round((current / total) * 100);
  const remaining = 100 - percentage;

  return (
    <div className="slide-progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="progress-text">
        context left until auto-compact {remaining}%
      </span>
    </div>
  );
}
