import douLogo from '/dou-logo.png?url';

/**
 * Chrome layer rendered inside the 1920×1080 stage on hero slides.
 * Currently only the `DOU|))` logo in the top-right.
 *
 * The source logo PNG is 2048×571; the template crops it via
 * `<a:srcRect l=10.42% r=6.751% t=15.672% b=15.679%/>` and stretches the
 * crop to 364×84. We replicate that with an inner <img> sized to the scaled
 * source and positioned by the crop origin so the logo renders at its
 * intended proportions.
 */
export function SlideChrome() {
  return (
    <div className="slide-chrome" aria-hidden="true">
      <div className="slide-chrome__logo">
        <img className="slide-chrome__logo-image" src={douLogo} alt="" />
      </div>
    </div>
  );
}
