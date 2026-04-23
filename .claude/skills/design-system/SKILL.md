---
name: design-system
description: Apply the DOU Days 2026 deck design system when editing slides, changing colors or typography, updating palette or font tokens, adjusting chrome (logo, Kyiv badge, sonar backdrop), or matching the DOU template look. Use whenever touching src/slides/, src/styles/, or any component that renders slide chrome.
allowed-tools: Read, Grep, Glob, Edit
---

# DOU Days 2026 Design System

The design language for this deck: DOU magenta/mint/violet palette, IBM Plex Sans typography, fixed 1920×1080 stage, cohesive top chrome (logo + Kyiv badge) + randomised sonar backdrop on every slide except the title. Every visual rule lives here or in the referenced files.

## Invariants

- **Palette**: only `--dou-*` tokens (`--dou-magenta`, `--dou-mint`, `--dou-violet`, `--dou-deep-purple`, `--dou-cyan`). Legacy `--terminal-*` tokens alias these and are kept for backwards compatibility — do not introduce new rules that use them.
- **Typography**: IBM Plex Sans (self-hosted via `@fontsource/ibm-plex-sans`, 400/600/700, latin + cyrillic). JetBrains Mono only inside `<code>` / `CodeBlock`. Exception: the timeline slide (`TimelineSlide.tsx` + `.timeline-*` rules) uses mono for its terminal aesthetic — this is existing tech debt; do not extend mono usage to prose in other slides.
- **Font sizes live only in `src/styles/theme.css`.** Tokens: `--slide-text-h2`, `--slide-text-body`, `--slide-text-code`, `--slide-text-caption`, `--slide-text-svg-sm|md|lg` for body slides; `--hero-*` for the title slide. Every other file reads these via `var(...)`. Editing a token in `theme.css` resizes every usage in the deck.
- **2–3 font sizes per slide.** Body slides: heading (`--slide-text-h2`) + body (`--slide-text-body`). Code slides add `--slide-text-code`. Data-viz slides add SVG tokens. Title slide uses the `--hero-*` tokens. Never introduce a new size to fix one slide.
- **No derived sizes.** `calc(var(--slide-text-body) * 0.75)` technically passes the grep check but smuggles in a new size. Use an existing token or accept the available size; if neither works, the slide needs a layout change, not a new size.
- **Color derivations use `color-mix()`, never raw `rgba()`.** For tints, rings, and translucent accents, compose from a palette token: `color-mix(in srgb, var(--dou-magenta) 22%, transparent)` — not `rgba(255, 22, 177, 0.22)`. Same applies to `box-shadow` tint values.
- **Chrome on every slide except `title`**: DOU logo top-right + "Київ, 2026" top-left (from `SlideChrome`) + randomised sonar backdrop (from `SonarPattern variant="body"`). The title slide uses its own calibrated chrome + sonar.

## Forbidden

- Inline `fontSize`/`style={{fontSize: …}}` in TSX (including SVG text). Always go through a CSS variable.
- Hardcoded hex colors in JSX `style={}` and in `src/styles/*.css` (outside `theme.css` token definitions). Exception: SVG `fill`/`stroke` JS constants.
- Raw `rgba(...)` / `rgb(...)` literals in CSS. Use `color-mix(in srgb, var(--dou-*) N%, transparent)` when you need a tint.
- `calc()` on font-size tokens (e.g. `calc(var(--slide-text-body) * 0.75)`) — derived sizes bypass the "2–3 sizes per slide" rule.
- New CSS classes without first checking `src/styles/slides.css` / `terminal.css` for an existing one.
- Glow, scanline, phosphor, or flicker effects. Legacy variables resolve to `none` / `transparent` on purpose.
- Changing the hero tokens (`--hero-*`) during a typography retune — title slide pixel-perfect calibration depends on them.

## Checklist before shipping any UI change

1. `rg "fontSize" src/slides src/components | rg -v "var\("` returns **zero** hits.
2. `rg "font-size\s*:" src/styles/slides.css src/index.css | rg -v "var\("` returns **zero** hits.
3. `rg "calc\(var\(--slide-text" src/styles` returns **zero** hits (no derived sizes).
4. `rg "#[0-9a-fA-F]{6}" src/slides` returns only SVG fill/stroke constants.
5. `rg "rgba?\(" src/styles/slides.css src/styles/terminal.css | rg -v "color-mix|var\("` returns **zero** hits (no raw color literals).
6. `bun run build` passes with no TypeScript errors.
7. Visual parity verified on `bun run dev`. **Known caveat**: the Chrome extension's JS eval context reports `window.innerWidth: 0`, which triggers the legacy `@media (max-width: 1200/900/600)` blocks at `slides.css:1517+` and breaks layout measurements. Prefer a real browser window (1920+ wide) for screenshots, or measure DOM directly via `javascript_tool` with the understanding that `@media` rules are firing. The legacy `@media` block is inert at real viewports but should eventually be cleaned up.

## Adding or editing a slide

- Compose `SectionHeader`, `SlideItem`, `Code`, `Emphasis`, `Quote`, `SlideLink` from `src/components/SlideElements.tsx`. Do not use raw HTML headings or lists.
- Use `CodeBlock` from `src/components/CodeBlock.tsx` for code panels. Do not set `fontSize` on it — it already reads `var(--font-size-code)`.
- If content overflows, split into two slides in `src/slides/index.ts` or trim copy. Never introduce a new font size.
- Register new slides in `src/slides/index.ts` (the `slides` array). `src/App.tsx` just renders `<Presentation slides={slides} />`.
- **Custom list markers**: if a slide can't use `SlideItem` (needs its own layout), match `SlideItem`'s convention — `>` chevron in `var(--dou-magenta)` as a `::before` pseudo-element. Do not use bullet dots (•) or emoji markers.

## Deep reference

- [references/full-spec.md](references/full-spec.md) — complete palette, typography, layout patterns, chrome rules, do/don'ts
- [references/blurred-background-pattern.md](references/blurred-background-pattern.md) — full-screen image + blurred content box pattern
- [references/side-images-pattern.md](references/side-images-pattern.md) — full-height side-image layout pattern
- [references/cohesive-chrome.md](references/cohesive-chrome.md) — body-slide chrome composition, random sonar pool + framing, badge placement tokens
