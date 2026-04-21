import douLogo from '/dou-logo.png?url';

/**
 * Chrome layer rendered inside the 1920×1080 stage on every staged slide.
 * Includes the DOU logo top-right and (optionally) the "Київ, 2026" badge
 * top-left.
 *
 * The title slide has its own calibrated "Київ, 2026" tag inside the hero
 * block at stage coord (368, 390), so the chrome badge is suppressed there
 * via `showCityBadge={false}` to avoid duplication. Body slides render the
 * top-left badge for deck cohesion.
 *
 * Logo calibration: source PNG is 2048×571; the template crops via
 * `<a:srcRect l=10.42% r=6.751% t=15.672% b=15.679%/>` and stretches the
 * crop to 364×84 at stage (1501, 27). Reproduced via an inner <img> sized
 * to the scaled source (440×122) and offset by the scaled crop origin
 * (−46, −19).
 */
export function SlideChrome({ showCityBadge = true }: { showCityBadge?: boolean }) {
  return (
    <div className="slide-chrome" aria-hidden="true">
      {showCityBadge && <span className="slide-chrome__city-badge">Київ, 2026</span>}
      <div className="slide-chrome__logo">
        <img className="slide-chrome__logo-image" src={douLogo} alt="" />
      </div>
    </div>
  );
}
