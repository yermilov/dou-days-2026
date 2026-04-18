import sonarHero from '/dou-sonar-hero.png?url';
import sonarSubtle from '/dou-sonar-subtle.png?url';

type Variant = 'hero' | 'subtle';

interface Props {
  variant?: Variant;
}

/**
 * Concentric-ring "sonar" background lifted from the DOU Days 2026 template.
 *
 * - `hero` — full-bleed multi-color pattern used on title / section / final slides.
 * - `subtle` — dimmed magenta-toned pattern used on content slides.
 */
export function SonarPattern({ variant = 'subtle' }: Props) {
  const src = variant === 'hero' ? sonarHero : sonarSubtle;
  return (
    <img
      className={`sonar-pattern sonar-pattern--${variant}`}
      src={src}
      alt=""
      aria-hidden="true"
    />
  );
}
