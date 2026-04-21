import { CSSProperties, useState } from 'react';
import sonarHero from '/dou-sonar-hero.png?url';
import sonarBody01 from '/sonar/dou-sonar-01.png?url';
import sonarBody02 from '/sonar/dou-sonar-02.png?url';
import sonarBody03 from '/sonar/dou-sonar-03.png?url';

export type SonarVariant = 'title' | 'body';

const BODY_SONAR_POOL = [sonarBody01, sonarBody02, sonarBody03];

interface BodyComposition {
  src: string;
  dx: number;
  dy: number;
  scale: number;
}

/*
 * The DOU template drops ring centers anywhere on the slide — mid-frame,
 * at an edge, or fully off-canvas (template slides 9, 11, 12 are corner
 * arcs with their centers past the slide boundary). To reproduce that
 * variety we let the transform translate the center freely across and
 * beyond the viewport. Where the scaled image doesn't cover, the stage
 * viewport's `--dou-bg-gradient` shows through (see slides.css:703),
 * which is the same dark purple the template leans on.
 *
 * dx/dy ∈ [-60%, 60%] of container width/height puts the ring center
 * anywhere in [-10%, 110%] of each axis (50% + dx). scale ∈ [1.0, 1.55]
 * varies how tightly the rings fill — low scale + big shift = corner arcs,
 * high scale + small shift = rings fill the frame.
 */
function pickBodyComposition(): BodyComposition {
  const scale = 1.0 + Math.random() * 0.55;
  const dx = (Math.random() * 2 - 1) * 60;
  const dy = (Math.random() * 2 - 1) * 60;
  const src = BODY_SONAR_POOL[Math.floor(Math.random() * BODY_SONAR_POOL.length)];
  return { src, dx, dy, scale };
}

/**
 * Concentric-ring background extracted from the DOU Days 2026 dark template.
 *
 * - `title` (default): title slide — `dou-sonar-hero.png` (1774×1774),
 *   cropped+stretched per `<a:srcRect l=3.508% r=5.126% t=22.464% b=26.143%/>`.
 * - `body`: content slides — picks one of three full-bleed template
 *   patterns at random on mount and applies a random translate + scale so
 *   the rings sit off-centre like on the DOU template. Presentation.tsx
 *   keys the slide container by slide id, so every navigation remounts
 *   this and reshuffles; re-renders within the same slide (reveal stages,
 *   keystrokes) keep the composition stable.
 */
export function SonarPattern({ variant = 'title' }: { variant?: SonarVariant }) {
  const [body] = useState(pickBodyComposition);
  if (variant === 'body') {
    const style = {
      '--sonar-dx': `${body.dx}%`,
      '--sonar-dy': `${body.dy}%`,
      '--sonar-scale': String(body.scale),
    } as CSSProperties;
    return (
      <div className="sonar-pattern sonar-pattern--body" style={style} aria-hidden="true">
        <img className="sonar-pattern__image" src={body.src} alt="" />
      </div>
    );
  }
  return (
    <div className="sonar-pattern sonar-pattern--hero" aria-hidden="true">
      <img className="sonar-pattern__image" src={sonarHero} alt="" />
    </div>
  );
}
