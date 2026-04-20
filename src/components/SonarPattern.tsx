import sonarHero from '/dou-sonar-hero.png?url';

/**
 * Concentric-ring "sonar" background extracted from the DOU Days 2026 dark
 * template. The source PNG is 1774×1774 (square). The template crops it to
 * a 16:9 slice via `<a:srcRect l=3.508% r=5.126% t=22.464% b=26.143%/>` and
 * stretches the crop to fill the slide — we replicate that exactly by
 * sizing the underlying image to the scaled-source dimensions and offsetting
 * it so the crop origin lines up with the wrapper's top-left.
 */
export function SonarPattern() {
  return (
    <div className="sonar-pattern sonar-pattern--hero" aria-hidden="true">
      <img className="sonar-pattern__image" src={sonarHero} alt="" />
    </div>
  );
}
