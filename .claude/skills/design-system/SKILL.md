---
name: design-system
description: Apply the DOU Days 2026 deck design system when editing slides, changing colors or typography, updating palette or font tokens, adjusting chrome (logo, Kyiv badge, sonar backdrop), or matching the DOU template look. Use whenever touching src/slides/, src/styles/, or any component that renders slide chrome.
allowed-tools: Read, Grep, Glob, Edit
---

# DOU Days 2026 Design System

The design language for this deck: DOU magenta/mint/violet palette, IBM Plex Sans typography, fixed 1920×1080 stage, cohesive top chrome (logo + Kyiv badge) + randomised sonar backdrop on every slide except the title. Every visual rule lives here or in the referenced files.

## Invariants

- **Palette**: only `--dou-*` tokens (`--dou-magenta`, `--dou-mint`, `--dou-violet`, `--dou-deep-purple`, `--dou-cyan`). Legacy `--terminal-*` tokens alias these and are kept for backwards compatibility — do not introduce new rules that use them.
- **Typography**: IBM Plex Sans (self-hosted via `@fontsource/ibm-plex-sans`, 400/600/700, latin + cyrillic). JetBrains Mono only inside `<code>` / `CodeBlock`.
- **Font sizes live only in `src/styles/theme.css`.** Tokens: `--slide-text-h2`, `--slide-text-body`, `--slide-text-code`, `--slide-text-caption`, `--slide-text-svg-sm|md|lg` for body slides; `--hero-*` for the title slide. Every other file reads these via `var(...)`. Editing a token in `theme.css` resizes every usage in the deck.
- **2–3 font sizes per slide.** Body slides: heading (`--slide-text-h2`) + body (`--slide-text-body`). Code slides add `--slide-text-code`. Data-viz slides add SVG tokens. Title slide uses the `--hero-*` tokens. Never introduce a new size to fix one slide.
- **Chrome on every slide except `title`**: DOU logo top-right + "Київ, 2026" top-left (from `SlideChrome`) + randomised sonar backdrop (from `SonarPattern variant="body"`). The title slide uses its own calibrated chrome + sonar.

## Forbidden

- Inline `fontSize`/`style={{fontSize: …}}` in TSX (including SVG text). Always go through a CSS variable.
- Hardcoded hex colors in JSX `style={}`. Exception: SVG `fill`/`stroke` JS constants.
- New CSS classes without first checking `src/styles/slides.css` / `terminal.css` for an existing one.
- Glow, scanline, phosphor, or flicker effects. Legacy variables resolve to `none` / `transparent` on purpose.
- Changing the hero tokens (`--hero-*`) during a typography retune — title slide pixel-perfect calibration depends on them.

## Checklist before shipping any UI change

1. `rg "fontSize" src/slides src/components | rg -v "var\("` returns **zero** hits.
2. `rg "font-size\s*:" src/styles/slides.css src/index.css | rg -v "var\("` returns **zero** hits.
3. `rg "#[0-9a-fA-F]{6}" src/slides` returns only SVG fill/stroke constants.
4. `bun run build` passes with no TypeScript errors.
5. Visual parity verified via Chrome extension on `bun run dev` — screenshot at 1920×1080 and 1440×900, check no overflow against the bottom panel or top chrome.

## Adding or editing a slide

- Compose `SectionHeader`, `SlideItem`, `Code`, `Emphasis`, `Quote`, `SlideLink` from `src/components/SlideElements.tsx`. Do not use raw HTML headings or lists.
- Use `CodeBlock` from `src/components/CodeBlock.tsx` for code panels. Do not set `fontSize` on it — it already reads `var(--font-size-code)`.
- If content overflows, split into two slides in `src/slides/index.ts` or trim copy. Never introduce a new font size.
- Register new slides in `src/slides/index.ts` (the `slides` array). `src/App.tsx` just renders `<Presentation slides={slides} />`.

## Deep reference

- [references/full-spec.md](references/full-spec.md) — complete palette, typography, layout patterns, chrome rules, do/don'ts
- [references/blurred-background-pattern.md](references/blurred-background-pattern.md) — full-screen image + blurred content box pattern
- [references/side-images-pattern.md](references/side-images-pattern.md) — full-height side-image layout pattern
- [references/cohesive-chrome.md](references/cohesive-chrome.md) — body-slide chrome composition, sonar pool picker (`bodySonarFor`), badge placement tokens
