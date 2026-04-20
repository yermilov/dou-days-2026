# Title-Slide Pixel-Perfect Calibration

How the title slide was calibrated against the DOU Days 2026 dark template, and
what worked / didn't work. Use this as the starting point for any future
adjustment of the title slide's layout or sonar-pattern background.

## Goal

Reproduce slide 1 of the
[DOU Days 2026 dark speaker template](https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY)
"pixel-perfect" on the title slide — sonar rings background, `Київ, 2026`
badge, uppercase-white title block, magenta description block, `DOU|))` logo
top-right — while the bottom timer + terminal-input bar stay unchanged.

Content slides (2+) are untouched; only the title slide opts into the hero
layout via `hero: true` on its `SlideDefinition`.

## Reference frame: 1920×1080 stage with transform: scale()

A title slide that's "pixel-perfect" at one window size and drifts at another
is not pixel-perfect. Solution: render the title slide's content inside a
fixed 1920×1080 stage (`.stage-viewport > .stage`), then uniformly scale that
stage to fit the browser viewport via `transform: scale(min(w/1920, h/1080))`.

Pixel coordinates in the hero CSS (`top: 458px`, `left: 370px`, …) are against
this 1920×1080 reference frame. At any window size the browser scales
uniformly, so relative positions never drift. Implemented in
`src/components/Slide.tsx` for slides where `hero === true` only — content
slides keep their original flex/padding layout.

## Methodology: extract exact coordinates from the template's PPTX

Eyeballing positions from a screenshot is not pixel-perfect. The template is a
Google Slides file, so download it as PPTX and read the XML directly:

```bash
curl -L -o template.pptx \
  "https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY/export/pptx"
unzip -q template.pptx -d template/
# Slide 1 is ppt/slides/slide1.xml; images live in ppt/media/
```

### Coordinate conversion

PPTX uses **EMU** (English Metric Units). On the 1920-wide stage we use:

- `914400 EMU = 1 inch = 96 px` (at 1×).
- Slide width in template: `9144000 EMU = 1920 px` → `1 px = 4762.5 EMU`.

For any `<a:xfrm>` element with `<a:off x=… y=…/>` and `<a:ext cx=… cy=…/>`,
divide EMU values by 4762.5 to get the stage-pixel position + size.

### Shape coordinates (extracted from slide1.xml)

| Shape | stage x / y | width × height |
| --- | --- | --- |
| `Київ, 2026` tag | 368, 390 | auto (inline padding) × 84 |
| Title block | 370, 458 | 1180 × auto |
| Description (magenta) block | 947, 775 | 860 × auto |
| DOU logo box | 1501, 27 | 364 × 84 |
| Sonar pattern | 0, 0 | 1920 × 1080 (full bleed) |

### Image transforms: `<a:srcRect>` + `<a:stretch>`

Two images on slide 1 use `srcRect` cropping before stretching:

**Logo** (`2048 × 571` source):

```xml
<a:srcRect l="10.42%"  r="6.751%" t="15.672%" b="15.679%"/>
<a:stretch><a:fillRect/></a:stretch>
```

Meaning: trim 10.42%/6.751%/15.672%/15.679% off L/R/T/B of the source, then
stretch the resulting slice to fill the 364×84 shape.

**Sonar** (`1774 × 1774` source):

```xml
<a:srcRect l="3.508%" r="5.126%" t="22.464%" b="26.143%"/>
<a:stretch><a:fillRect/></a:stretch>
```

Meaning: crop to the middle-ish 1621×911 slice (≈16:9), stretch to 1920×1080.
Horizontal stretch 1920/1621 = **1.184×**; vertical 1080/911 = **1.186×** —
nearly equal, so rings stay visually circular.

### Replicating srcRect+stretch in CSS

`object-fit: cover` cannot express an arbitrary srcRect. The pattern that
works is a wrapper sized to the shape + an absolutely-positioned inner `<img>`
sized to the **scaled source** and offset by the **negated scaled crop origin**:

```tsx
<div className="sonar-pattern sonar-pattern--hero">
  <img className="sonar-pattern__image" src={sonarHero} />
</div>
```

```css
.sonar-pattern--hero {
  width: 1920px; height: 1080px; overflow: hidden;  /* shape box */
}
.sonar-pattern__image {
  position: absolute;
  width: 2101px; height: 2104px;   /* 1774 × 1.184 / 1.186 */
  left: -73px; top: -473px;        /* −(62px × 1.184), −(399px × 1.186) */
}
```

Same pattern for the logo (scaled source 440×122 inside a 364×84 box,
offset −46/−19).

## Typography on the title slide

Template font sizes are small for a conference hall. We bump them ≈40% over
the template to improve back-of-room readability:

- Title (`.title-hero__title`): **78px**, weight 700, uppercase.
- Description / tagline (`.title-hero__tagline`): **56px**, weight 600.
- Speaker line (`.title-hero__speaker`): **38px**, weight 400.
- `Київ, 2026` tag (`.title-hero__tag`): **34px**, weight 600.

### CSS-specificity gotcha

The global `.slide p { font-size: var(--slide-text-normal); }` rule has
specificity (0,1,1). A flat class selector `.title-hero__tagline` is (0,1,0)
and **loses**, silently forcing the tagline back to the body-text size. Work
around this by selecting within the hero scope:

```css
.slide--hero p.title-hero__tagline  { font-size: 56px; }   /* 0,2,1 — wins */
.slide--hero h1.title-hero__title   { font-size: 78px; }   /* 0,2,1 — wins */
```

Same pattern for the speaker line.

## What didn't work — and why

### Sonar ring density on the left half

The source `dou-sonar-hero.png` (1774×1774) has **19 concentric rings** at
radii `32, 53, 75, 99, 122, 148, 177, 211, 251, 276, 333, 367, 417, 472, 531,
599, 677, 772, 876` (in source pixels — scan `y=887` from ring center
outward). Outer rings are increasingly spaced apart (~100 px between the
outermost pair), so the outer portion of any rendered frame is sparse by
design.

Attempts tried:

1. **Uniform square scale, circular rings, centered** — keep rings circular
   (1920×1920 square) and clip ±420 px off top/bottom.
   → Left edge shows only a couple of ring arcs because outer rings are
   sparse. Rejected by user.

2. **Scale 2× so outer rings reach corners** — `3548×3548` centered on slide
   center. 7 rings cross the left edge at mid-height vs 1 at baseline.
   → Visually busier on the edges but rings are now too coarse / spread-out
   overall, and upscaling a 1774px source 2× starts to look soft. Rejected.

3. **Template srcRect + stretch** (current) — replicate the PPTX's exact
   `l=3.508% r=5.126% t=22.464% b=26.143%` crop then 1.184×/1.186× stretch.
   → Ring center lands at slide (977, 579), horizontal scale 1.184 gives
   outermost ring radius 1037 (just past mid-height left edge at 960). This
   is the same look as the DOU template itself; it's the best achievable
   without authoring a denser source image.

**Remaining limitation:** the upper-left and lower-left quadrants are sparser
than the user would prefer. Fixing this properly requires a new source image
with more rings — out of scope for the speaker's build. Current state is the
same density the DOU template ships with; users perceiving it as "too sparse"
on the left are mostly reacting to the 16:9 aspect vs the square source.

## Current state (file map)

| File | Role |
| --- | --- |
| `src/slides/TitleSlide.tsx` | JSX structure + `hero: true` flag |
| `src/components/Slide.tsx` | Hero branch: 1920×1080 stage with `transform: scale()` |
| `src/components/SonarPattern.tsx` | Wrapper + inner img |
| `src/components/SlideChrome.tsx` | Logo wrapper + inner img |
| `src/styles/slides.css` | All hero CSS (search `.slide--hero`, `.title-hero`, `.sonar-pattern--hero`, `.slide-chrome__logo`) |
| `public/dou-sonar-hero.png` | 1774×1774 source, extracted from template |
| `public/dou-logo.png` | 2048×571 source, extracted from template |
| `public/ASSET_PROVENANCE.md` | Extraction provenance |

## If you need to re-calibrate

1. Redownload the PPTX: `curl -L -o /tmp/t.pptx "https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY/export/pptx" && unzip /tmp/t.pptx -d /tmp/t`.
2. Read `/tmp/t/ppt/slides/slide1.xml`; each `<p:sp>` / `<p:pic>` has
   `<a:xfrm>` with EMU coordinates — divide by 4762.5 for stage pixels.
3. For images, look for `<a:srcRect>` and record l/r/t/b percentages.
4. To replicate srcRect+stretch in CSS, compute:
   - `scaleX = 1 / (1 − l%/100 − r%/100)`
   - `scaleY = 1 / (1 − t%/100 − b%/100)`
   - `display_width  = source_w × scaleX`; `display_height = source_h × scaleY`
   - `offset_left = −(source_w × l%/100) × scaleX`
   - `offset_top  = −(source_h × t%/100) × scaleY`
5. Apply via wrapper(box size) + inner img(scaled source size, offset).
6. Verify side-by-side against image 2 at multiple window sizes — with
   `transform: scale()` the layout must be identical at every size.

Coordinates can be checked at runtime via
`getComputedStyle(el)` and `element.getBoundingClientRect()` in DevTools.
