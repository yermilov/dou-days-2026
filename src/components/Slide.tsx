import { ReactNode, useEffect, useState } from 'react';
import { SonarPattern, type SonarVariant } from './SonarPattern';
import { SlideChrome } from './SlideChrome';
import type { SlideChromeMode } from '../types/slides';

interface SlideProps {
  children: ReactNode;
  isActive?: boolean;
  notes?: string;
  background?: string;
  chrome?: SlideChromeMode;
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
  chrome = 'global',
}: SlideProps) {
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const isStaged = chrome !== 'none';

  useEffect(() => {
    if (!isStaged || !viewportEl) return;
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
  }, [isStaged, viewportEl]);

  if (!isActive) return null;

  if (!isStaged) {
    return (
      <div className="slide" style={background ? { background } : undefined}>
        {children}
      </div>
    );
  }

  const sonarVariant: SonarVariant = chrome === 'hero' ? 'title' : 'body';
  const slideClass = chrome === 'hero' ? 'slide slide--hero' : 'slide slide--body';

  return (
    <div className="stage-viewport" ref={setViewportEl}>
      <SonarPattern variant={sonarVariant} />
      <div
        className="stage"
        style={{
          width: `${STAGE_WIDTH}px`,
          height: `${STAGE_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <SlideChrome showCityBadge={chrome !== 'hero'} />
        <div className={slideClass} style={background ? { background } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
