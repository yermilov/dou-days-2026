import douLogo from '/dou-logo.png?url';

/**
 * Persistent chrome layer rendered once per slide inside the 1920x1080 stage:
 * - "Київ, 2026" tag top-left
 * - DOU logo top-right
 *
 * Matches the exact positions measured on the DOU Days 2026 dark template
 * (see docs/DESIGN_SYSTEM.md — Chrome section).
 */
export function SlideChrome() {
  return (
    <div className="slide-chrome" aria-hidden="true">
      <span className="slide-chrome__tag">Київ, 2026</span>
      <img
        className="slide-chrome__logo"
        src={douLogo}
        alt=""
        width={226}
        height={63}
      />
    </div>
  );
}
