# CLAUDE.md

## Project Overview

A custom presentation site for the Ukrainian-language talk "Невигадані історії AI-first трансформації в інженерних командах (про які неможливо мовчати)". Built with React and TypeScript, it uses the original Claude-Code-inspired terminal layouts (`$ pattern --foo` headings, `> ` bullets, command-based navigation) skinned in the DOU Days 2026 visual style — IBM Plex Sans font and the DOU magenta / mint / violet palette. Hosted on GitHub Pages at https://yermilov.github.io/dou-days-2026

See [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for the design spec (colours, typography, layout patterns).

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Syntax Highlighting**: react-syntax-highlighter
- **Hosting**: GitHub Pages (auto-deployed via GitHub Actions)

## Commands

```bash
bun install      # Install dependencies (REQUIRED before first `bun run dev`)
bun run dev      # Start dev server (http://localhost:5173/dou-days-2026/)
bun run build    # Build for production
bun run preview  # Preview production build
bun run deploy   # Manual deploy to GitHub Pages
```

## Project Structure

```
src/
├── App.tsx                    # Slide array — imports and orders all slides
├── main.tsx                   # React entry point
├── index.css                  # Global styles & font import
├── vite-env.d.ts              # Vite type declarations
├── types/
│   └── slides.ts              # TypeScript interfaces
├── slides/
│   ├── index.ts               # Re-exports all slide components
│   ├── TitleSlide.tsx         # Individual slide components (27 total)
│   └── ...
├── hooks/
│   ├── useSlideNavigation.ts  # Navigation state & command parsing
│   └── useTouchNavigation.ts  # Swipe gesture support
├── components/
│   ├── Presentation.tsx       # Main container — timer, tool activation, routing
│   ├── Slide.tsx              # Fullscreen slide wrapper
│   ├── TerminalInput.tsx      # Command input box
│   ├── CodeBlock.tsx          # Syntax-highlighted code
│   ├── SlideProgress.tsx      # Slide counter
│   ├── OnboardingTooltip.tsx  # Navigation help tooltip
│   ├── PointerTooltip.tsx     # Contextual pointer hints
│   ├── SlideElements.tsx      # Reusable slide building blocks (SlideItem, SectionHeader, Code, Emphasis, Quote, SlideLink)
│   ├── Timer.tsx              # Presentation timer component
│   └── diagram/              # SVG diagram components (DiagramCanvas, StageNode, FlowArrow, etc.)
└── styles/
    ├── theme.css              # CSS design tokens
    └── terminal.css           # Component styles
```

## Adding Slides

Each slide lives in its own file under `src/slides/`. To add a new slide:

1. Create `src/slides/MySlide.tsx`
2. Export it from `src/slides/index.ts`
3. Import and add to the `slides` array in `src/App.tsx`

Slide definition shape:

```tsx
// src/slides/MySlide.tsx
export function MySlide() {
  return (
    <>
      <h2>Slide Title</h2>
      <p>Slide content here</p>
      <ul>
        <li>List items with terminal-style bullets</li>
      </ul>
    </>
  );
}

// src/App.tsx — register it:
{
  id: 'unique-id',
  content: <MySlide />,
  notes: 'Optional speaker notes',
}
```

For interactive slides (reveal stages, live input, tool activation), pass a render function instead of JSX:

```tsx
{
  id: 'interactive-id',
  content: ({ revealStage, inputText, activatedTools }) => <MySlide revealStage={revealStage} />,
  maxRevealStages: 3,
}
```

### Using Code Blocks

```tsx
<CodeBlock
  language="typescript"
  filename="example.ts"
  showLineNumbers
  code={`const hello = "world";`}
/>
```

### Using Images

Images in `public/` must be imported with `?url` suffix for GitHub Pages compatibility:

```tsx
import myImage from '/my-image.png?url';

// In slide content (add loading="lazy" for non-first slides):
<img src={myImage} alt="Description" loading="lazy" />
```

**Important:** Do NOT use direct paths like `src="/image.png"` — they break on GitHub Pages due to the base URL (`/dou-days-2026`).

**Build-time compression:** `vite-plugin-imagemin` is configured in `vite.config.ts` and automatically compresses PNGs/JPEGs at build time (71–86% size reduction). No manual compression needed.

### Animated Content — Use MP4, Not GIF

Large GIFs dramatically inflate bundle size. Convert to MP4:

```bash
ffmpeg -i input.gif -vf "fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -c:v libx264 -pix_fmt yuv420p -crf 28 output.mp4
```

Use `<video>` instead of `<img>` for the result:

```tsx
import myVideo from '/my-video.mp4?url';

<video autoPlay loop muted playsInline src={myVideo} />
```

### Full-Screen Image Slides

For slides that display a single image filling the available space:

```tsx
import myImage from '/my-image.png?url';

{
  id: 'image-slide-id',
  content: (
    <div className="image-slide">
      <img src={myImage} alt="Description" />
    </div>
  ),
}
```

The `.image-slide` class automatically:
- Constrains image to viewport (accounts for timer/input bar)
- Centers the image
- Applies terminal-themed border and shadow
- Uses `object-fit: contain` to preserve aspect ratio

### Slide Height & Overflow

The `.slide` container has `max-height: 100%; overflow: hidden` as a hard CSS guard. If content overflows the viewport:

- **Do NOT add custom font sizes** — reduce content or split into multiple slides instead
- Use `calc(var(--vh-full) - 220px)` for image/media containers to leave room for timer and input bar
- The `.image-slide` pattern already handles height constraints

### Slide Layout Patterns (7 canonical types)

When adding a slide, use one of these patterns:

1. **Hero Title** (TitleSlide, FinalSlide) — centered `h1.hero`, tagline, subtitle
2. **Header-Only** (SoftwareFactorySlide, AutoApproveHookSlide) — just `<h2>`, minimal/no body content
3. **Bullet List + Reveals** (6 slides) — `<h2>` + `SlideItem` components with `revealStage >= N` guards
4. **Two-Column: Text + Code** (3 slides) — flex layout, left `SlideItem`s, right `CodeBlock` with `.code-reveal`
5. **Two-Column: Text + Visual** (5 slides) — flex layout, left text, right image/SVG/`DiagramCanvas`
6. **Full Image** (5 slides) — `.image-slide` wrapper
7. **Data Visualization** (3 slides) — custom SVG with computed/fetched data
8. **Timeline** (1 slide) — git-log layout with reveal stages

### Slide Content Classes

- `h1.hero` - Extra large hero heading (title slide only)
- `.text-orange`, `.text-green`, `.text-blue` - Accent colors
- `.text-dim`, `.text-muted` - Dimmed text
- `.glow-orange`, `.glow-green` - Text glow effects
- `.image-slide` - Full-screen image wrapper
- `.code-reveal` - Animated code panel entrance

## Navigation Commands

Type in the input box:
- `next` or `n` → Next slide
- `prev`, `back`, `p`, `b` → Previous slide
- Number (e.g., `3`) → Go to slide 3
- `first`, `home` → First slide (`start` activates the timer, not navigation)
- `last`, `end` → Last slide
- `reveal` or `r` → Reveal next content stage

Timer commands:
- `start` or `go` → Start timer
- `pause` or `stop` → Pause timer
- `reset` → Reset timer and clear IntroSlide tool selections

Keyboard (when not typing):
- Arrow keys, Space, PageDown/Up → Navigate
- Home/End → First/last slide

## Design System

Full spec: **[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** — read this before touching UI.

Quick rules:
- **Layout**: original Claude-Code-inspired terminal layouts. H2s follow the `$ pattern --foo` idiom; bullets use `> ` prefix; `TerminalInput` shows a `>` prompt; `SlideProgress` shows "context left until auto-compact N%".
- **Font**: IBM Plex Sans (self-hosted, weights 400/600/700, latin + cyrillic). JetBrains Mono stays only inside `CodeBlock` / inline `<code>`.
- **Palette**: use `--dou-*` tokens (`--dou-magenta`, `--dou-mint`, `--dou-violet`, `--dou-deep-purple`, …). Legacy `--terminal-*` tokens still exist but alias DOU values — don't introduce new rules that use them.
- **Background**: `--dou-bg-gradient` on the presentation container. No sonar pattern, no persistent chrome overlay.
- **2-sizes-per-slide rule** still applies: `--font-size-h2` heading + `--slide-text-normal` body. Title slide may add `--font-size-hero`.
- **No glow, scanline, phosphor, or flicker.** The legacy variables exist but resolve to `none` / `transparent`.
- **No hardcoded hex in slide JSX `style={}`.** Exception: SVG `fill` / `stroke` JS constants.

## Development Guidelines

### IMPORTANT: Use Frontend Design Skill

**For ANY UI edits to this project, always use the `frontend-design` skill.**

This ensures:
- Consistent terminal aesthetic
- High-quality, production-grade code
- Proper use of design tokens
- Distinctive, non-generic styling

### IMPORTANT: Verify Changes in Browser

**After ANY change to slides, styles, config, or URLs — verify visually using the Chrome extension.**

Workflow:
1. Make the change
2. Confirm dev server is running (`bun run dev`)
3. Use Chrome extension to navigate to `http://localhost:5173/dou-days-2026/`
4. Take a screenshot and confirm the change looks correct before declaring done

### Design System Rules

- **2 font sizes per slide** (except title): heading (`--font-size-h2`) and text (`--slide-text-normal`). No inline `fontSize`.
- **All colors via CSS variables** — never hardcode hex values in JSX `style={}`. Exception: SVG attributes use JS constants.
- **Use `SlideElements.tsx` components** — `SlideItem`, `SectionHeader`, `Code`, `Emphasis`, `Quote`, `SlideLink` — instead of raw HTML.
- **No new CSS classes** without checking `terminal.css` for existing ones first.
- **If content doesn't fit**, reduce content or split slides — do NOT introduce new font sizes.

### Code Style

- TypeScript strict mode
- Functional React components
- CSS custom properties for theming
- Semantic HTML in slides

## Deployment

Automatic deployment on push to `main` via GitHub Actions. The site deploys to the `gh-pages` branch.

## Image Generation

Use the `generate-image` skill for creating slide visuals with Google Gemini 3 Pro.

### Setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Gemini API key (get one at https://ai.google.dev/)
3. Run `bun install` to get `@google/genai`

### Usage

Ask Claude to generate images for slides:
- "Generate an image of a futuristic terminal interface"
- "Create a minimalist diagram showing code compilation"
- "Design an abstract background for the intro slide"

### Manual Usage

```bash
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "description" \
  --ratio "16:9" \
  --output "filename.png"
```

**Options:**
- `--ratio`: 16:9 (default), 4:3, 1:1, 4:5
- `--output`: custom filename (auto-generated if omitted)

Generated images are saved to `public/`.

## Troubleshooting

### `bun install` hangs at "Resolving..."

**Symptom:** `bun install` hangs indefinitely at "Resolving..." or "Resolved, downloaded and extracted [N]"

**Root cause:** The `bun.lock` file may contain URLs to a private registry (e.g., Artifactory) that's unreachable from your network.

**Fix:**
```bash
rm -rf bun.lock bun.lockb node_modules package-lock.json && bun install
```

This regenerates the lockfile using the public npm registry.

**How to diagnose:** Check if `bun.lock` contains private registry URLs:
```bash
grep -n "artifactory\|private\|internal" bun.lock
```

## Git Conventions

- Commit messages: `Add/Update/Fix/Remove [description]`
- Include co-author footer for AI-assisted commits

### Workflow

Never commit directly to `main`. Always use a short-lived feature branch:

```bash
git checkout -b my-feature        # 1. Create feature branch
# ... make changes ...
git add <files>
git commit -m "Add/Fix/Update X"  # 2. Commit
git push -u origin my-feature     # 3. Push
git checkout main
git merge my-feature              # 4. Merge to main
git push origin main              # 5. Push main
git branch -d my-feature          # 6. Delete local branch
git push origin --delete my-feature  # 7. Delete remote branch
```

Use the `/cicd:commit-and-push` skill to automate steps 1–3.

## Session Tracking (entire.io)

This project uses [entire.io](https://entire.io/) for Claude Code session tracking. Session data is stored in a dedicated orphan branch:

**Branch**: `entire/checkpoints/v1`

The branch contains no source code — only session checkpoint metadata and transcripts:

```
<checkpoint-id>/
├── metadata.json      # branch, files touched, token usage, CLI version
├── <n>/
│   ├── metadata.json  # session-level metadata
│   ├── full.jsonl     # full session transcript
│   ├── prompt.txt     # initial prompt
│   └── content_hash.txt
```

Each checkpoint corresponds to a Claude Code session commit (strategy: `manual-commit`) and records which files were touched, token usage, and the full conversation transcript. Do not manually edit or delete this branch.

**Current status: enabled.** `.claude/settings.local.json` is gitignored to keep local tool permissions out of the repo.

To disable: `entire disable`
To re-enable: `entire enable --agent claude-code`

Documentation: `gh api repos/entireio/cli/contents/README.md --jq '.content' | base64 -d`
