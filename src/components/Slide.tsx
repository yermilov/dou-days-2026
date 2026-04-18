import { ReactNode, useEffect, useState } from 'react';

interface SlideProps {
  children: ReactNode;
  isActive?: boolean;
  notes?: string;
  background?: string;
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
        <div
          className="slide"
          style={background ? { background } : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
