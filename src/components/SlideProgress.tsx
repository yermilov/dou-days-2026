import { SlideProgressProps } from '../types/slides';

export function SlideProgress({ current, total, isFirst }: SlideProgressProps & { isFirst?: boolean }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="slide-progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className={isFirst ? 'progress-text--glow' : 'progress-text'}>
        {current} / {total}
      </span>
    </div>
  );
}
