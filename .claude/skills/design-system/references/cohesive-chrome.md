# Cohesive body-slide chrome

Every slide in the deck except the title goes through the same visual
envelope: randomised sonar backdrop + DOU logo (top-right) + "Київ, 2026"
badge (top-left), all sitting on the same fixed 1920×1080 stage as the
title slide. This document describes how those pieces fit together and
where to edit each of them.

## Why one stage for all slides

The title slide was already a pixel-perfect replica of template slide 1
(calibrated 1920×1080 stage, chrome at exact template coordinates). Body
slides were separate — responsive flex layouts with no chrome at all.

Convergence put body slides on the *same* scaled stage. Three wins:

1. Chrome is one component (`SlideChrome`) positioned in stage pixels; it
   renders identically on title and body slides without duplication.
2. Sonar background lives in the same component (`SonarPattern`) with a
   `variant` prop; body slides pick from a pool, title slide uses the
   calibrated hero asset.
3. Every slide scales uniformly at any viewport size via
   `transform: scale(min(w/1920, h/1080))`. No more per-slide responsive
   tweaks needed.

The bottom panel (Timer, TerminalInput, SlideProgress) is **outside** the
stage and unchanged. Slides never overlap the bottom bar.

## Chrome composition

`src/components/Slide.tsx` renders this tree for every staged slide:

```
<div.stage-viewport>
  <SonarPattern variant={'title' | 'body'} slideIndex slideId />
  <div.stage style={transform: scale(...)} width=1920 height=1080>
    <SlideChrome showCityBadge={chrome !== 'hero'} />
    <div.slide.slide--{hero|body}>
      {slide content}
    </div>
  </div>
</div>
```

- `SonarPattern` sits *outside* the scaled stage so its full-bleed backdrop
  fills the viewport regardless of stage aspect ratio.
- `SlideChrome` sits *inside* the stage so its logo + Kyiv badge scale
  uniformly with the rest of the slide.
- The `slide` element holds the actual content — `.slide--hero` for the
  title slide's calibrated absolute-positioned block, `.slide--body` for
  body slides' flex-centred layout.

## Sonar pool picker

`src/components/SonarPattern.tsx` picks one of three backgrounds **and**
a random translate + scale when the `body` variant mounts, so the
concentric rings land off-centre the way they do on the DOU template:

```ts
const [body] = useState(pickBodyComposition);
// body = { src, dx, dy, scale }
```

The pool is the three backgrounds under `public/sonar/` (extracted from
the DOU template — see `public/ASSET_PROVENANCE.md`). The composition
object flows out as three inline CSS custom properties on the wrapper:
`--sonar-dx`, `--sonar-dy`, `--sonar-scale`. `src/styles/slides.css`
applies them as `transform: translate(var(--sonar-dx), var(--sonar-dy))
scale(var(--sonar-scale))`.

**Range.** `scale ∈ [1.0, 1.55]` and `dx, dy ∈ [-60%, 60%]` of viewport
width/height. That lets the ring center land anywhere in roughly
`[-10%, 110%]` of each axis — mid-frame, at an edge, or fully off-canvas
— so the pattern can recreate every template composition, from the
edge-to-edge fill on template slide 7 to the bottom-left corner arcs
on slides 9, 11, 12 whose ring centers sit past the slide boundary.

Blank regions where the scaled sonar image doesn't reach are **intentional**.
`.stage-viewport` paints `var(--dou-bg-gradient)` underneath (slides.css),
which is the same dark purple the DOU template uses as its base. So
uncovered areas read as deliberate negative space, not a broken layer.

`Presentation.tsx` keys the slide container by `activeSlide.id`, so every
navigation remounts the slide tree and reshuffles both the image and the
composition. **That `key` is load-bearing — don't remove it or the
sonar will freeze on whatever it first picked.** Re-renders within the
same slide (reveal stages, keystrokes in the terminal input) reuse the
stored pick, so the background doesn't flicker while you type.

Sonar composition is decorative, not semantic — revisiting a slide will
show a different image and a different framing, and that's intentional.

## Chrome tokens

All chrome positioning lives in `src/styles/slides.css` using stage-px
coordinates. To retune positions globally:

| Element | Rule | Key props |
| --- | --- | --- |
| Logo | `.slide-chrome__logo` | `top: 27px; left: 1501px; width: 364px; height: 84px` (from template srcRect calibration) |
| Kyiv badge | `.slide-chrome__city-badge` | `top: 27px; left: 55px; height: 84px; font-size: 34px` |
| Body sonar | `.sonar-pattern--body` | `opacity: var(--sonar-body-opacity, 0.35)` — lower if text contrast suffers on busy backgrounds |

The title slide's own inline "Київ, 2026" tag lives at stage (368, 390)
as part of the calibrated hero block. That tag is separate from the
chrome badge — if both rendered, the title slide would show two badges.
`SlideChrome` receives `showCityBadge={chrome !== 'hero'}` to suppress
the chrome badge on the title slide only.

## Adding a new slide

Default: no action needed. A new `SlideDefinition` without a `chrome`
field defaults to `'global'`, which automatically gets logo + Kyiv badge
+ a sonar picked from the pool. Content should be composed of
`SlideElements` (`SectionHeader`, `SlideItem`, `Code`, `Emphasis`,
`Quote`, `SlideLink`) and sit inside a flex container that doesn't try to
position itself absolutely — the `.slide--body` wrapper handles vertical
centring and padding.

## Adding a new template-matched hero slide

Set `chrome: 'hero'` on the `SlideDefinition`. Then calibrate:

1. Extract the slide's background asset from the template per
   `../../pixel-perfect-translation/references/calibration-methodology.md`.
2. Add a variant to `SonarPattern` (currently only `'title'` and `'body'`
   exist) if the template asset differs from what's already in the pool.
3. Author a per-slide CSS class with absolute stage-px positions for
   every element. Follow `.title-hero__*` as the template.

This should be rare — the title slide is the only hero today, and the
rest of the deck intentionally uses the body pattern for cohesion.
