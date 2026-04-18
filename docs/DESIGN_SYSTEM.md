# Design System

Hybrid aesthetic: **original Claude-Code-inspired layouts** (terminal command
prompts, `$ pattern --foo` headings, `> ` bullets, `> ` input prompt,
`context left until auto-compact` counter) rendered in the **DOU Days 2026
visual style** — IBM Plex Sans font and the DOU magenta / mint / violet
colour palette.

There is **no chrome overlay** (`Київ, 2026` / DOU logo) and **no sonar
background** on slides — those were reverted. The DOU logo appears only
as the browser tab favicon.

---

## 1. Colours

Defined in `src/styles/theme.css`. Always reference via CSS custom property
in HTML/CSS. SVG `fill` / `stroke` attributes can use the hex directly.

### Structure

| Token | Hex | Role |
| --- | --- | --- |
| `--dou-white` | `#FFFFFF` | Primary text |
| `--dou-deep-purple` | `#270950` | Slide gradient, top-left |
| `--dou-near-black` | `#0D021B` | Slide gradient, bottom-right |
| `--dou-bg-solid` | `#0F0820` | CodeBlock / TerminalInput panel |
| `--dou-bg-gradient` | `linear-gradient(135deg, #270950 0%, #0D021B 100%)` | Slide background |

### Accents

| Token | Hex | Role |
| --- | --- | --- |
| `--dou-magenta` | `#FF16B1` | Primary accent — h1, `--flag` args, bullet prefix, input prompt |
| `--dou-mint` | `#02FEB9` | Secondary accent — h2, `pattern` keyword, links |
| `--dou-violet` | `#7626FF` | Tertiary accent — h3, alt headings |
| `--dou-violet-light` | `#8D88FA` | Purple-ish token in syntax highlighting |
| `--dou-cyan` | `#02D6FE` | Inline code, technical callouts |

### Tonal utilities

| Token | Value | Role |
| --- | --- | --- |
| `--dou-white-dim` | `rgba(255,255,255,0.78)` | Secondary body text |
| `--dou-white-muted` | `rgba(255,255,255,0.56)` | Tertiary / meta text |

### Legacy aliases

The original `--terminal-*` tokens still exist in `theme.css`; they are
**remapped to DOU values** so existing slide CSS and utility classes continue
to render in the new palette:

- `--terminal-orange` → magenta (`#FF16B1`)
- `--terminal-green` → mint (`#02FEB9`)
- `--terminal-blue` → violet (`#7626FF`)
- `--terminal-cyan` → cyan (`#02D6FE`)
- `--terminal-purple` → violet-light (`#8D88FA`)
- `--terminal-bg*` → DOU surfaces
- `--terminal-white*` → DOU whites
- `--glow-*`, `--glow-text-*`, `--scanline-opacity`, `--noise-opacity`,
  `--flicker-intensity` → all zeroed / `none`

Existing rules like `color: var(--terminal-orange)` render magenta
automatically. Do **not** introduce new rules that reach for `--terminal-*` —
use `--dou-*` directly.

---

## 2. Typography

- **Single family: IBM Plex Sans** (self-hosted via
  `@fontsource/ibm-plex-sans`, weights 400 / 600 / 700 in both `latin` and
  `cyrillic` subsets; `font-display: swap`).
- **Exception:** `CodeBlock` and inline `<code>` keep **JetBrains Mono**.
- Token: `--font-sans: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;`

### 2-sizes-per-slide rule (unchanged from the original site)

Every non-title slide uses exactly two sizes:

- **Heading**: `--font-size-h2` (3.5rem) — the slide's `<h2>`
- **Text**: `--slide-text-normal` (1.35rem) — bullets, section headers,
  labels, everything else

Title slide gets three sizes (hero + tagline + subtitle).

---

## 3. Layouts (unchanged from pre-rebrand)

All original layout patterns from `CLAUDE.md` are preserved:

1. **Hero Title** (TitleSlide, FinalSlide)
2. **Header-Only** (SoftwareFactorySlide, AutoApproveHookSlide)
3. **Bullet List + Reveals** — `<h2>` with `$ pattern --foo` structure +
   `SlideItem` components with `revealStage >= N` guards
4. **Two-Column: Text + Code**
5. **Two-Column: Text + Visual**
6. **Full Image** (`.image-slide`)
7. **Data Visualisation** (custom SVG)
8. **Timeline** — git-log layout

Every slide h2 follows the `$ pattern --command` idiom:

```tsx
<h2>
  <span className="text-dim">$</span>{' '}
  <span className="text-green">pattern</span>{' '}
  <span className="text-orange">--explore-and-have-fun</span>
</h2>
```

With the DOU palette aliases, this renders as dim-white `$` + mint `pattern` +
magenta `--explore-and-have-fun` in IBM Plex Sans.

---

## 4. Chrome (interactive UI)

- **TerminalInput**: `>` prompt in magenta IBM Plex Sans, dark `#0F0820`
  background, magenta focus border (no glow).
- **SlideProgress**: `context left until auto-compact N%` copy, magenta
  progress-bar fill.
- **Timer**: IBM Plex Sans tabular-nums, dim-white text.

No persistent overlay (Київ,2026 / DOU logo) on slides. The DOU logo is
used only as the browser favicon (`index.html`).

---

## 5. Do / Don't

- ✅ IBM Plex Sans everywhere. CodeBlock keeps JetBrains Mono.
- ✅ Use `--dou-*` tokens in new CSS. SVG may use hex constants in JS.
- ✅ Keep the `$ pattern --foo` h2 idiom on content slides.
- ✅ Keep the `> ` bullet / input prompt / section-header `// ` prefix.
- ❌ No text-shadow / glow / phosphor / scanline effects.
- ❌ No persistent chrome (Київ,2026 + DOU logo) on slide body.
- ❌ No hero sonar background on title slides.
- ❌ No hardcoded hex in slide JSX `style={}`. Exception: SVG attributes.
- ❌ Don't exceed the 2-sizes-per-slide rule. Reduce content or split slides
  if they overflow.

---

## 6. Asset registry

| File | Role |
| --- | --- |
| `public/dou-logo.png` | Browser tab favicon (see `public/ASSET_PROVENANCE.md`) |
| `public/favicon.png` | (unused; may be removed) |
| `public/*.png|jpg|jpeg|mp4|wav` | Per-slide media |
