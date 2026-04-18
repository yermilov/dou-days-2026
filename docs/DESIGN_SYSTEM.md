# DOU Days 2026 — Design System

Authoring reference for the web presentation. Every slide must look
indistinguishable from a DOU Days 2026 speaker template slide so the deck
does not need to be re-authored in PowerPoint.

All values below were measured from the official DOU Days 2026 dark template
(Google Slides, 25 slides) via live DOM inspection with `getComputedStyle`.
They are exact, not approximations.

---

## 1. Canvas model

- **Logical slide canvas:** `1920 × 1080` px (16:9).
- **Scaling:** `Slide.tsx` computes a uniform scale factor
  `min(window.innerWidth / 1920, window.innerHeight / 1080)` on mount and
  on every `resize` / `orientationchange`. The `.stage` element sets
  `transform: translate(-50%, -50%) scale(var(--stage-scale))` with
  `transform-origin: center center`, letterboxed inside `.stage-viewport`.
- **Safe areas** (inside the 1920×1080 canvas, enforced by `.stage > .slide`
  padding):
  - top: 80px (reserved for chrome)
  - sides: 80px
  - bottom: 40px
- **Z-order inside the stage** (low to high):
  1. `.stage-viewport` background (DOU gradient)
  2. `.sonar-pattern` ring PNG
  3. `.slide` content
  4. `.slide-chrome` (Київ,2026 tag + DOU logo)
- **Outside the stage** (rendered 1:1 by `Presentation.tsx`, not part of
  pixel-diff):
  - `TerminalInput` — bottom bar
  - `Timer`, `SlideProgress` — top-right / bottom chrome
  - Tooltips (`OnboardingTooltip`, `ContextTooltip`)

---

## 2. Color tokens

Defined in `src/styles/theme.css`. Always reference via CSS custom property
in HTML/CSS. SVG `fill` / `stroke` attributes can use the hex directly
because SVG does not evaluate `var()`.

### Structure

| Token | Hex | Role |
| --- | --- | --- |
| `--dou-white` | `#FFFFFF` | Primary text on dark, logo, chrome |
| `--dou-deep-purple` | `#270950` | Top-left slide gradient, dark UI |
| `--dou-near-black` | `#0D021B` | Bottom-right slide gradient, deepest surface |
| `--dou-navy` | `#002A42` | Secondary dark accent |
| `--dou-bg-solid` | `#0F0820` | Solid dark panel (CodeBlock, TerminalInput) |
| `--dou-bg-gradient` | `linear-gradient(135deg, #270950 0%, #0D021B 100%)` | Default slide background |

### Brand accents

| Token | Hex | Primary use |
| --- | --- | --- |
| `--dou-magenta` | `#FF16B1` | Primary accent — H2 magenta variant, bullets, section numbers, THANK YOU |
| `--dou-magenta-bright` | `#FF4EC3` | Hover / highlight variant |
| `--dou-mint` | `#02FEB9` | Default H2, "Hello!", link underline |
| `--dou-mint-dim` | `#6EDAB0` | Softer mint, secondary tint |
| `--dou-violet` | `#7626FF` | Tertiary — violet flow pills, "Київ, 2026" pill on light template |
| `--dou-violet-light` | `#8D88FA` | Violet hover |
| `--dou-teal` | `#0097A7` | Decorative ring inner tone |
| `--dou-cyan` | `#02D6FE` | Inline technical callouts |

### Gradients

| Token | Value | Use |
| --- | --- | --- |
| `--dou-bg-gradient` | `linear-gradient(135deg, #270950 0%, #0D021B 100%)` | Slide background |
| `--dou-gradient-badge` | `linear-gradient(180deg, #E252B8 0%, #B05CD1 100%)` | Number-badge fill (agenda slide) |

### Tonal utilities

| Token | Value | Role |
| --- | --- | --- |
| `--dou-white-dim` | `rgba(255,255,255,0.78)` | Secondary body text on dark |
| `--dou-white-muted` | `rgba(255,255,255,0.56)` | Tertiary / meta text |

### Legacy aliases (backwards compatibility)

The original terminal-theme tokens (`--terminal-orange`, `--terminal-green`,
…) are still defined but **point at DOU values**:

- `--terminal-orange` → `#FF16B1` (magenta)
- `--terminal-green` → `#02FEB9` (mint)
- `--terminal-blue` → `#7626FF` (violet)
- `--terminal-purple` → `#8D88FA` (violet-light)
- `--terminal-cyan` → `#02D6FE` (cyan)
- `--terminal-bg*` → DOU surfaces
- `--terminal-white*` → DOU white / white-dim / white-muted
- `--glow-*`, `--glow-text-*`, `--scanline-opacity`, `--noise-opacity`,
  `--flicker-intensity` → all zeroed / `none`

Existing slide CSS that references these will render in DOU colors
automatically. Do **not** introduce new rules that use `--terminal-*` —
use `--dou-*` directly.

---

## 3. Typography

- **Single family: IBM Plex Sans** (Google/OFL, self-hosted via
  `@fontsource/ibm-plex-sans` — weights 400, 600, 700 in both `latin` and
  `cyrillic` subsets; `font-display: swap`).
- **Exception:** `CodeBlock` and inline `<code>` keep JetBrains Mono.
- Token: `--font-sans: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;`

### Weight rules

| Weight | Use |
| --- | --- |
| 400 | body paragraphs, captions, `Київ, 2026` tag number |
| 600 | sub-headings, button / input text, `Київ, 2026` label |
| 700 | H1, H2, hero title, THANK YOU |

### Size scale (absolute px on 1920×1080 stage)

| Role | Px | Weight | Color token |
| --- | --- | --- | --- |
| Hero title (H1.hero) | 96 | 700 uppercase | `--dou-white` |
| Big section title (h2.h2--magenta) | 80 | 700 uppercase | `--dou-magenta` |
| Default H2 | 56 | 700 | `--dou-mint` |
| Bold caps inline | 36 | 700 | `--dou-white` |
| Number-badge digit | 52 | 600 | `--dou-white` |
| Body (slide text) | 22 (1.35rem) | 400 | `--dou-white` |
| Small / chrome | 19–24 | 400 / 600 | `--dou-white` |

Keep the **2-sizes-per-slide rule**: every non-hero slide uses
`--font-size-h2` for its heading and `--slide-text-normal` for everything
else. Hero slides may add `--font-size-hero`.

Uppercasing applies only to: hero H1, `.h2--magenta`, THANK YOU,
section-number digits.

---

## 4. Chrome (every slide)

Rendered by `SlideChrome.tsx` inside the stage.

- **`Київ, 2026` tag** — top-left. IBM Plex Sans 600, 22 px, `--dou-white`.
  Position: `top: 48px; left: 58px` (≈3% from left, ≈4.5% from top).
- **DOU logo** (`public/dou-logo.png`) — top-right. Width 440 px on the
  1920-canvas (~23% of slide), positioned `top: 8px; right: 58px` (flush
  to top-right corner).
- Chrome is always `pointer-events: none` (non-interactive decoration).

To suppress the chrome on a specific slide, set `hideChrome: true` on the
`SlideDefinition`.

---

## 5. Background

- Slide background = `--dou-bg-gradient` (diagonal deep-purple → near-black).
- On top of it, `SonarPattern` renders one of two extracted PNGs:
  - `hero` variant (`public/dou-sonar-hero.png`, 1080×1080, multi-color
    rings) — full-bleed, `opacity: 1`. Used on title / section / thank-you
    slides via `SlideDefinition.hero = true`.
  - `subtle` variant (`public/dou-sonar-subtle.png`, 1435×1370, magenta-
    toned dim rings) — clipped to the right edge, `opacity: 0.35`. Default
    for all content slides.

Asset provenance: `public/ASSET_PROVENANCE.md`.

---

## 6. Primitives

All under `src/components/`:

### `SlideChrome`

Persistent chrome layer (Київ tag + DOU logo). Mounted once per slide by
`Slide.tsx`. No props.

### `SonarPattern`

Thin wrapper around the extracted ring PNGs. Props: `{ variant?: 'hero' | 'subtle' }`.

### `SectionNumber`

Magenta donut with a centered bold digit — template slide 4 divider.
Props: `{ n: string }` (zero-padded, e.g. `"01"`).

Implementation: SVG with `fillRule: evenodd` so the inner disk is
punched out. Outer diameter scales at 260 px on the 1920-canvas
(~13.5% slide width). Stroke ratio = 0.22 of outer radius.

### `NumberBadge`

Sharp-cornered rectangle with the pink→violet vertical gradient
(`--dou-gradient-badge`), centered zero-padded digit in IBM Plex Sans 600.
Props: `{ n: string }`. Size: 113×83 px.

### `FlowPill`

Rounded pill (full border-radius) used in flow-diagram slides.
Props: `{ children; variant?: 'mint' | 'violet' | 'magenta' }`.
- `mint` — mint fill, deep-purple text.
- `violet` / `magenta` — colored fill, white text.

---

## 7. Spacing

- Base grid: 8 px.
- Vertical guides (measured from template): H2 at ~200 px from stage top,
  body at ~300 px from stage top, inter-bullet spacing ~56 px.
- Horizontal guides: 80 / 540 / 960 / 1380 / 1840 px from left.

---

## 8. Layout patterns

Any new slide should fall into one of these:

1. **Hero title** — `h1.hero` centered on hero sonar background.
2. **Header-only** — single H2 on subtle sonar background.
3. **Section divider** — `SectionNumber` + H2 on subtle background.
4. **Bullet list** — H2 mint, bullets prefixed by magenta `•`.
5. **Two-col: text + code** — left `SlideItem`s, right `CodeBlock`.
6. **Two-col: text + visual** — left bullets, right image / SVG / diagram.
7. **Agenda (numbered)** — grid of `NumberBadge` + short label pairs.
8. **Flow diagram** — `FlowPill`s connected by SVG arrows.
9. **Full image** — `.image-slide` wrapper, bordered photo frame.
10. **Timeline** — numbered circles linked by curved arcs (not git-log).
11. **Before / After** — two columns, pink "Before" / "After" labels.
12. **Quote** — magenta left border, dim body text.
13. **Data-viz** — custom SVG using JS color constants mirroring DOU tokens.
14. **Thank-you final** — big magenta uppercase `THANK YOU`.

---

## 9. Photo frames

- Sharp corners (`border-radius: 0`) — the template never rounds photos.
- Thin 1 px white inner border.
- Subtle drop-shadow (e.g. `0 8px 32px rgba(0,0,0,0.35)`), no glow.

---

## 10. Do / Don't

- ✅ IBM Plex Sans everywhere. CodeBlock keeps JetBrains Mono.
- ✅ Default to sharp corners. Round only true "pills" (`flow-pill`).
- ✅ Always render SlideChrome (unless `hideChrome: true`).
- ✅ Use `--dou-*` tokens in new CSS. SVG may use hex constants in JS.
- ❌ No glow, text-shadow, scanline, or phosphor effects.
- ❌ No extra font families. Don't introduce Manrope/Inter/Roboto as
  display faces.
- ❌ No hardcoded hex in slide JSX `style={}`. Exception: SVG attributes.
- ❌ Don't exceed the 2-sizes-per-slide rule. If content overflows, split
  the slide — don't shrink the font.

---

## 11. Adding a new slide

1. Pick a layout pattern from §8.
2. Create `src/slides/MySlide.tsx` exporting a `SlideDefinition`.
3. Pass `hero: true` if it uses the full-bleed sonar; otherwise default.
4. Compose content from `SlideElements` primitives (`SlideItem`,
   `SectionHeader`, `Code`, `Emphasis`, `Quote`, `SlideLink`) plus
   `SectionNumber`, `NumberBadge`, `FlowPill` when needed.
5. Register in `src/slides/index.ts` and `src/App.tsx` slides array.
6. Map it in `tests/reference-map.ts` to a template PNG (or mark `MANUAL`)
   when pixel-diffing is added in Commit 6.

---

## 12. Asset registry

| File | Size | Source |
| --- | --- | --- |
| `public/dou-logo.png` | 134 KB | DOU dark template, slide 1, top-right |
| `public/dou-sonar-hero.png` | 668 KB | DOU dark template, slide 1, background |
| `public/dou-sonar-subtle.png` | 384 KB | DOU dark template, slide 2, background |

See `public/ASSET_PROVENANCE.md` for full provenance, extraction method,
and usage rights.

---

## 13. Font-loading & rendering

- Self-hosted via `@fontsource/ibm-plex-sans` imported from `src/index.css`
  (subsets `latin` + `cyrillic`, weights 400 / 600 / 700).
- `font-display: swap` (set by `@fontsource` default) — the fallback system
  stack is IBM-Plex-Sans-compatible enough to avoid visible layout shift.
- `text-rendering: optimizeLegibility` + `-webkit-font-smoothing: antialiased`
  on `html` (already set in `src/index.css`).
