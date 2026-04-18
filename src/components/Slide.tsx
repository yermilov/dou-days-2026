import { ReactNode, useEffect, useState } from 'react';
import { SlideChrome } from './SlideChrome';
import { SonarPattern } from './SonarPattern';

interface SlideProps {
  children: ReactNode;
  isActive?: boolean;
  notes?: string;
  background?: string;
  /** Use the full-bleed hero sonar pattern (title / section / thank-you slides). */
  hero?: boolean;
  /** Hide the Київ,2026 + DOU logo chrome (e.g. final slide takeover). */
  hideChrome?: boolean;
}

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;

function computeScale(): number {
  if (typeof window === 'undefined') return 1;
  const sx = window.innerWidth / STAGE_WIDTH;
  const sy = window.innerHeight / STAGE_HEIGHT;
  return Math.min(sx, sy);
}

export function Slide({
  children,
  isActive = true,
  background,
  hero = false,
  hideChrome = false,
}: SlideProps) {
  const [scale, setScale] = useState(computeScale);

  useEffect(() => {
    const onResize = () => setScale(computeScale());
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="stage-viewport">
      <div
        className="stage"
        style={{
          width: `${STAGE_WIDTH}px`,
          height: `${STAGE_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <SonarPattern variant={hero ? 'hero' : 'subtle'} />
        <div
          className="slide"
          style={background ? { background } : undefined}
        >
          {children}
        </div>
        {!hideChrome && <SlideChrome />}
      </div>
    </div>
  );
}
