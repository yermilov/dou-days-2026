import { ReactNode, useEffect, useState } from 'react';
import { SonarPattern } from './SonarPattern';
import { SlideChrome } from './SlideChrome';

interface SlideProps {
  children: ReactNode;
  isActive?: boolean;
  notes?: string;
  background?: string;
  hero?: boolean;
}

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;

function computeScale(container: HTMLElement | null): number {
  if (!container) return 1;
  const sx = container.clientWidth / STAGE_WIDTH;
  const sy = container.clientHeight / STAGE_HEIGHT;
  return Math.min(sx, sy);
}

export function Slide({
  children,
  isActive = true,
  background,
  hero = false,
}: SlideProps) {
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!hero || !viewportEl) return;
    const update = () => setScale(computeScale(viewportEl));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewportEl);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [hero, viewportEl]);

  if (!isActive) return null;

  if (hero) {
    return (
      <div className="stage-viewport" ref={setViewportEl}>
        <SonarPattern />
        <div
          className="stage"
          style={{
            width: `${STAGE_WIDTH}px`,
            height: `${STAGE_HEIGHT}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <SlideChrome />
          <div className="slide slide--hero" style={background ? { background } : undefined}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="slide"
      style={background ? { background } : undefined}
    >
      {children}
    </div>
  );
}
