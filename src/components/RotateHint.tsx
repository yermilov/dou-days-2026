/**
 * Portrait-orientation hint shown only on small screens.
 * The deck is calibrated for a 1920×1080 stage; in portrait on a phone
 * the long axis of the device is wasted. We don't try to remap touch
 * zones for a rotated stage — the chrome (.input-bar, useTouchNavigation
 * zone math) lives outside the stage transform and assumes portrait
 * means thin vertical strip. Cheaper and more reliable: ask the user
 * to rotate, then get out of the way.
 */
export function RotateHint() {
  return (
    <div className="rotate-hint" aria-hidden="true">
      <div className="rotate-hint__icon">⤺</div>
      <div className="rotate-hint__text">Rotate your phone for the full view</div>
    </div>
  );
}
