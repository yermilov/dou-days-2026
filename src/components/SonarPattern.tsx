import sonarHero from '/dou-sonar-hero.png?url';
import ringsSpeaker from '/dou-rings-speaker.png?url';
import type { HeroVariant } from '../types/slides';

/**
 * Concentric-ring background extracted from the DOU Days 2026 dark template.
 *
 * - `title` variant (default): slide 1 — `dou-sonar-hero.png` (1774×1774),
 *   cropped+stretched per `<a:srcRect l=3.508% r=5.126% t=22.464% b=26.143%/>`.
 * - `speaker` variant: slide 6 — `dou-rings-speaker.png`, pre-rotated 90° CCW
 *   and cropped from `image19.png` (2014×2048) to match the template's
 *   `rot=5400000` + `<a:srcRect l=15.542% r=50.005% t=19.222% b=19.068%/>`.
 *   Result is a 1263×694 landscape slice with ring center at top-middle.
 */
export function SonarPattern({ variant = 'title' }: { variant?: HeroVariant }) {
  if (variant === 'speaker') {
    return (
      <div className="sonar-pattern sonar-pattern--speaker" aria-hidden="true">
        <img className="sonar-pattern__image" src={ringsSpeaker} alt="" />
      </div>
    );
  }
  return (
    <div className="sonar-pattern sonar-pattern--hero" aria-hidden="true">
      <img className="sonar-pattern__image" src={sonarHero} alt="" />
    </div>
  );
}
