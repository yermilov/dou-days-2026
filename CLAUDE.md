# CLAUDE.md

## Project Overview

A custom terminal-themed presentation site built with React and TypeScript. Features a Claude Code-inspired aesthetic with command-based navigation. Hosted on GitHub Pages at https://yermilov.github.io/pragmatic-vibe-clauding-ua

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Syntax Highlighting**: react-syntax-highlighter
- **Hosting**: GitHub Pages (auto-deployed via GitHub Actions)

## Commands

```bash
bun install      # Install dependencies
bun run dev      # Start dev server (http://localhost:5173)
bun run build    # Build for production
bun run preview  # Preview production build
bun run deploy   # Manual deploy to GitHub Pages
```

## Project Structure

```
src/
├── App.tsx                    # Slide definitions
├── main.tsx                   # React entry point
├── index.css                  # Global styles & font import
├── vite-env.d.ts              # Vite type declarations
├── types/
│   └── slides.ts              # TypeScript interfaces
├── hooks/
│   └── useSlideNavigation.ts  # Navigation state & command parsing
├── components/
│   ├── Presentation.tsx       # Main container component
│   ├── Slide.tsx              # Fullscreen slide wrapper
│   ├── TerminalInput.tsx      # Command input box
│   ├── CodeBlock.tsx          # Syntax-highlighted code
│   └── SlideProgress.tsx      # Slide counter
└── styles/
    ├── theme.css              # CSS design tokens
    └── terminal.css           # Component styles
```

## Adding Slides

Edit `src/App.tsx` and add to the `slides` array:

```tsx
const slides: SlideDefinition[] = [
  {
    id: 'unique-id',
    content: (
      <>
        <h2>Slide Title</h2>
        <p>Slide content here</p>
        <ul>
          <li>List items with terminal-style bullets</li>
        </ul>
      </>
    ),
    notes: 'Optional speaker notes',
    background: '#custom-color', // Optional
  },
  // Add more slides...
];
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

### Slide Content Classes

- `h1.hero` - Extra large hero heading
- `.text-orange`, `.text-green`, `.text-blue` - Accent colors
- `.text-dim`, `.text-muted` - Dimmed text
- `.glow-orange`, `.glow-green` - Text glow effects

## Navigation Commands

Type in the input box:
- Any text + Enter → Next slide
- `prev`, `back`, `p`, `b` → Previous slide
- Number (e.g., `3`) → Go to slide 3
- `first`, `home` → First slide
- `last`, `end` → Last slide

Keyboard (when not typing):
- Arrow keys, Space, PageDown/Up → Navigate
- Home/End → First/last slide

## Terminal Theme Principles

### Colors (CSS Custom Properties)

```css
--terminal-bg: #0a0e14          /* Deep black background */
--terminal-white: #e2e8f0       /* Primary text */
--terminal-orange: #f0883e      /* Headings, accents (h1) */
--terminal-green: #7ee787       /* Subheadings (h2), success */
--terminal-blue: #79c0ff        /* Links, tertiary headings */
--terminal-purple: #d2a8ff      /* Functions in code */
--terminal-cyan: #76e4f7        /* Inline code */
```

### Typography

- **Font**: JetBrains Mono (monospace)
- **h1**: 4rem (5rem for `.hero`)
- **h2**: 3rem
- **h3**: 2.25rem
- **Body**: 1.5rem

### Visual Effects

- CRT scan lines overlay
- Subtle noise texture
- Phosphor text glow on headings
- Orange focus glow on input
- Fade-in slide transitions

## Development Guidelines

### IMPORTANT: Use Frontend Design Skill

**For ANY UI edits to this project, always use the `frontend-design` skill.**

This ensures:
- Consistent terminal aesthetic
- High-quality, production-grade code
- Proper use of design tokens
- Distinctive, non-generic styling

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

Generated images are saved to `src/assets/generated/`.

## Git Conventions

- Commit messages: `Add/Update/Fix/Remove [description]`
- Include co-author footer for AI-assisted commits
