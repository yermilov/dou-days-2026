# Animation Feelings

Effect-to-feeling reference table — adapted from `zarazhangrui/frontend-slides`
(MIT). Use this when picking new motion or visual treatments to make sure the
mood matches what we want the audience to feel.

**This deck mostly hits the Techy/Futuristic row** (terminal command prompts,
mono accents, magenta/violet glows, sonar grid backdrop, `> ` bullet prefix,
`$ pattern --foo` h2 idiom). When in doubt, lean into that lane and resist
borrowing patterns from other rows.

| Mood / Aim | Effects that create it | Where it shows up here |
| --- | --- | --- |
| **Techy / Futuristic** | Mono accents, grid/sonar backdrops, magenta+mint+violet on near-black, sharp edges, `> ` chevrons, instant transitions, `cubic-bezier` ease-outs | Default for this deck |
| **Editorial / Calm** | Generous whitespace, serif headings, low-saturation palette, slow fades, `ease-in-out` timing | Avoid — clashes with terminal aesthetic |
| **Playful / Friendly** | Rounded shapes, bouncy springs, hue-rotate hover, scale-up on press | Use only inside dedicated "fun" slides (sticker, warcraft, pacman) |
| **Bold / Confident** | Big sans display type, hard contrast, no-fade entrances, immediate reveals | Hero / title slide |
| **Cinematic** | Long blurred fade-ins, depth/layering, parallax | Avoid — defeats reveal-stage clarity |
| **Minimal / Clinical** | Single accent, ultra-thin strokes, no motion | Avoid — too cold for the talk's tone |

## Effects we deliberately do not use

These show up in zarazhangrui's catalogue but are **anti-recommendations**
for this deck:

- Halftone, grain, or noise overlays — `--noise-opacity: 0` is intentional.
- Scanlines — `--scanline-opacity: 0` is intentional.
- Phosphor glow / text-shadow — `--glow-orange: none` is intentional.
- 3D tilt-on-hover — hostile to a flat terminal aesthetic; presenters don't
  hover during talks.
- Inline edit + localStorage flow — we are a viewer, not an editor.

## Reveal-stage motion conventions

- **Bullet reveals** (`SlideItem` with `delay`): 250–350ms, `cubic-bezier(0.19, 1, 0.22, 1)`
  ease-out-expo, slide-in-from-left of ~12px.
- **Code panel** (`.code-reveal`): keep current keyframe; do not nest a second
  reveal inside it.
- **Stagger**: 60–80ms between adjacent `SlideItem`s feels right at our type
  scale. Avoid >120ms — the audience reads ahead and the cascade looks
  laboured.
- **Reduced motion**: snap every animation to its final keyframe via the
  global `@media (prefers-reduced-motion: reduce)` block in `theme.css`.

## When borrowing from external decks

- Lift the *rule*, not the CSS. Our staged 1920×1080 transform invariant
  means `clamp()` and viewport-relative units work very differently than in
  fluid decks.
- If a borrowed pattern uses raw `rgba()` / hex, rewrite to use `--dou-*`
  tokens and `color-mix(...)`.
- If a borrowed pattern relies on Intersection Observer, prefer our
  authoritative `revealStage` state instead.
