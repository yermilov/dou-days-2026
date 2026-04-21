import sonarHero from '/dou-sonar-hero.png?url';
import sonarBody01 from '/sonar/dou-sonar-01.png?url';
import sonarBody02 from '/sonar/dou-sonar-02.png?url';
import sonarBody03 from '/sonar/dou-sonar-03.png?url';

export type SonarVariant = 'title' | 'body';

/**
 * Body-slide sonar pool — 3 distinct full-bleed backgrounds extracted from
 * the DOU Days 2026 template (see public/ASSET_PROVENANCE.md for provenance).
 */
const BODY_SONAR_POOL = [sonarBody01, sonarBody02, sonarBody03];

/**
 * Deterministic picker. Mixes slideId into the index so reordering slides
 * only changes the moved slide's sonar, not every slide's. Stable across
 * navigation: back-and-forth to the same slide always shows the same sonar.
 */
function hashSlideId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function bodySonarFor(slideIndex: number, slideId: string): string {
  const mix = slideIndex + hashSlideId(slideId);
  return BODY_SONAR_POOL[mix % BODY_SONAR_POOL.length];
}

interface SonarPatternProps {
  variant?: SonarVariant;
  slideIndex?: number;
  slideId?: string;
}

/**
 * Concentric-ring background extracted from the DOU Days 2026 dark template.
 *
 * - `title` (default): title slide — `dou-sonar-hero.png` (1774×1774),
 *   cropped+stretched per `<a:srcRect l=3.508% r=5.126% t=22.464% b=26.143%/>`.
 * - `body`: content slides — picks from a 3-image template pool deterministically
 *   via `bodySonarFor(slideIndex, slideId)`. Rendered full-bleed at reduced
 *   opacity so slide text stays legible.
 */
export function SonarPattern({ variant = 'title', slideIndex = 0, slideId = '' }: SonarPatternProps) {
  if (variant === 'body') {
    const src = bodySonarFor(slideIndex, slideId);
    return (
      <div className="sonar-pattern sonar-pattern--body" aria-hidden="true">
        <img className="sonar-pattern__image" src={src} alt="" />
      </div>
    );
  }
  return (
    <div className="sonar-pattern sonar-pattern--hero" aria-hidden="true">
      <img className="sonar-pattern__image" src={sonarHero} alt="" />
    </div>
  );
}
