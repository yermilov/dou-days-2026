---
name: pixel-perfect-translation
description: Recreate a DOU Days 2026 template slide in React/CSS at pixel parity. Use when building or tuning a hero slide, extracting assets from the template deck, matching template positioning exactly, calibrating a fixed 1920×1080 stage, translating hero copy into Ukrainian without breaking layout, or working with EMU, srcRect, or stretch image cropping.
allowed-tools: Read, Grep, Glob, Edit, Bash(unzip:*), Bash(ffmpeg:*), Bash(magick:*), Bash(identify:*)
---

# Pixel-perfect translation from the DOU Days 2026 template

The title slide is a coordinate-for-coordinate replica of the DOU Days 2026 dark speaker template. This skill captures the methodology for keeping it that way and for adding any future template-matched slide.

## Fixed-stage model

- The stage is always `1920×1080`. Every hero coordinate in `src/styles/slides.css` is an absolute stage pixel.
- `src/components/Slide.tsx` (`computeScale` + ResizeObserver) scales the stage to fit the viewport via `transform: scale(min(w/1920, h/1080))`. Coordinates never change with viewport size — the transform does all the work.
- EMU → px: PPTX uses English Metric Units. Divide any EMU value in the template XML by **4762.5** to get stage px (derived from `914400 EMU / 192 px-per-slide-width`).

## srcRect + stretch image replication

PPTX shapes can crop+scale a source image via `<a:srcRect>` (percentage crop on each edge) + `<a:stretch>`. Replicate in CSS without a pre-cropped PNG:

1. Outer wrapper `div` — final stage box (e.g. `width: 364px; height: 84px; position: absolute; top: 27px; left: 1501px;`).
2. Inner `<img>` — original source scaled up so that the cropped region is exactly the wrapper size. If crop is `l=10.42% r=6.751% t=15.672% b=15.679%`, visible width is `100% - 10.42% - 6.751% = 82.829%` of source, so `inner-img-width = wrapper-width / 0.82829 ≈ 440px`.
3. Inner `<img>` offset — shift the image left/up by `crop-origin × scale`, i.e. `left: -(0.1042 × 440)px ≈ -46px`, `top: -(0.15672 × 522)px ≈ -82px`.
4. `overflow: hidden` on the wrapper clips the overflow.

Same technique used in `src/components/SonarPattern.tsx` and `src/components/SlideChrome.tsx`.

## Extraction workflow (adding a new sonar / ring asset from the template)

```bash
# 1. Export DOU Days 2026 dark speaker template as PPTX
#    (https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY)
# 2. Unzip into a temp folder
unzip template.pptx -d template-raw

# 3. Inspect ppt/slides/slideN.xml for <p:pic> elements — note the rId (image ref) and
#    <a:srcRect> + <a:xfrm> (position + size in EMU)

# 4. Find the image file
ls template-raw/ppt/media/image*.png
identify template-raw/ppt/media/imageN.png   # source dimensions

# 5. Copy into public/sonar/ with a descriptive name
cp template-raw/ppt/media/imageN.png public/sonar/dou-sonar-N.png

# 6. Document in public/ASSET_PROVENANCE.md:
#    - source slide, rId, srcRect (if applicable), target stage coords in px, role
#    - preserve the existing "DOU Days 2026 speaker rights" licensing note
```

## Font-size uplift for large halls

The template sizes read small in a 400+ seat hall. Bump hero font sizes by ~30–40% over the template value. Calibrated values live in `--hero-*` tokens in `src/styles/theme.css`:

- `--hero-title-size: 94px`
- `--hero-tagline-size: 56px`
- `--hero-speaker-size: 38px`
- `--hero-badge-size: 34px`

**Do not change these tokens** during a typography retune of body slides — hero parity depends on them.

## Ukrainian translation tuning order

Cyrillic glyphs are ~1–2% wider than Latin at the same font size. When copy overflows a calibrated container:

1. **Rephrase** shorter (first choice — no calibration risk)
2. **Tighten tracking** (`letter-spacing`) by `-0.01em` increments
3. **Drop the font size** by one step — but never below the calibrated minimum
4. **Widen the container** — but never past the calibrated maximum (documented per slide in `references/translation-constraints.md`)
5. **Accept wrap** as last resort

## Deep reference

- [references/calibration-methodology.md](references/calibration-methodology.md) — full EMU math, worked example for title slide, complete srcRect+stretch recipe
- [references/translation-constraints.md](references/translation-constraints.md) — hero slide translation rules, glyph-count checklist
