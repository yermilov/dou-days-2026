# Creating Slides with Blurred Background

This document describes how to create slides with a full-screen background image and a frosted glass content area.

## Overview

The layout uses:
- **Background**: Full-viewport image (position: fixed)
- **Content**: Centered frosted glass box with backdrop blur

The background image fills edge-to-edge, and the content box has a semi-transparent dark overlay with blur effect for readability.

## Example: ClaudeMdSlide

**File:** `src/slides/ClaudeMdSlide.tsx`

```tsx
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';
import claudeMdVsReadme from '/claude-md-vs-readme.png?url';

export const ClaudeMdSlide: SlideDefinition = {
  id: 'claude-md',
  content: (
    <div className="bg-image-slide">
      <img
        src={claudeMdVsReadme}
        alt="CLAUDE.md vs README.md"
        className="bg-image-slide__background"
      />

      <div className="bg-image-slide__content">
        <h2>Title here</h2>
        <SlideItem delay={0.05}>Content item 1</SlideItem>
        <SlideItem delay={0.1}>Content item 2</SlideItem>
        {/* ... more items */}
      </div>
    </div>
  ),
  notes: 'Speaker notes here',
};
```

## CSS Classes

**File:** `src/styles/terminal.css`

```css
/* === SLIDE WITH BLURRED BACKGROUND === */
.bg-image-slide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--space-xl);
  box-sizing: border-box;
  z-index: 0;
}

.bg-image-slide__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.7;
  z-index: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.bg-image-slide__content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  max-height: calc(100vh - 220px);   /* Stay above bottom UI */
  overflow-y: auto;
  padding: var(--space-xl);
  background: rgba(10, 14, 20, 0.85); /* Semi-transparent dark */
  backdrop-filter: blur(24px);        /* Frosted glass effect */
  -webkit-backdrop-filter: blur(24px);
  border-radius: var(--input-border-radius);
  border: 1px solid var(--terminal-border);
  text-align: left;
}
```

## Key Design Decisions

### Background Image
- `position: fixed` with `100vw × 100vh` ensures edge-to-edge coverage
- `object-fit: cover` scales image to fill without distortion
- `opacity: 0.7` dims the image for better content contrast

### Content Box
- `align-items: flex-start` positions content at top (avoids bottom UI overlap)
- `max-height: calc(100vh - 220px)` reserves space for timer bar + input box
- `backdrop-filter: blur(24px)` creates frosted glass effect
- `background: rgba(10, 14, 20, 0.85)` adds dark tint for readability

### Bottom UI Space
The 220px bottom reservation accounts for:
- Timer bar (~30px)
- Context progress bar (~30px)
- Terminal input (~90px)
- Padding/margins (~70px)

## Image Generation

### Style: Messy Drawingboard/Whiteboard

Generate square (1:1) images with hand-drawn aesthetic. CSS `object-fit: cover` handles cropping.

**Prompt template:**
```
Messy whiteboard/drawingboard visualization on dark background (#0a0e14).
Hand-drawn sketchy style showing [CONCEPT].
[DETAILED DESCRIPTION OF ELEMENTS]
Whiteboard marker aesthetic, imperfect lines, like someone explaining on a blackboard.
Colors: orange (#f0883e), green (#7ee787), blue (#79c0ff) on dark background.
```

### Example Prompt

```bash
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "Messy whiteboard/drawingboard visualization on dark background (#0a0e14). Hand-drawn sketchy style showing CLAUDE.md vs README.md comparison. Two file icons side by side: left one labeled 'README.md' in blue with sketchy human stick figure below it and text 'for humans' scribbled underneath. Right one labeled 'CLAUDE.md' in orange with sketchy robot/AI icon below it and text 'for Claude' scribbled underneath. A big 'VS' in the middle. Whiteboard marker aesthetic, imperfect lines. Colors: orange (#f0883e), green (#7ee787), blue (#79c0ff) on dark background." \
  --ratio "1:1" \
  --output "claude-md-vs-readme.png"
```

## Creating a New Slide with Blurred Background

1. **Generate image** at 1:1 ratio with messy drawingboard style
2. **Save to `public/`** folder
3. **Create slide component** following ClaudeMdSlide pattern
4. **Import image** with `?url` suffix for GitHub Pages compatibility
5. **Use CSS classes** `.bg-image-slide`, `.bg-image-slide__background`, `.bg-image-slide__content`

## When to Use This Layout

**Good for:**
- Slides with moderate amount of text (5-8 bullet points)
- Conceptual/explanatory slides where the background reinforces the message
- Slides where you want visual impact without side-by-side images

**Consider alternatives when:**
- You have two distinct concepts to show (use side-images layout instead)
- Content is very long (may require scrolling)
- Background image would distract from complex content

## File Locations

- **Slide:** `src/slides/ClaudeMdSlide.tsx`
- **CSS:** `src/styles/terminal.css` (search for "BLURRED BACKGROUND")
- **Image:** `public/claude-md-vs-readme.png`
- **Prompt:** `src/prompts/claude-md-vs-readme.json`

## Comparison with Side-Images Layout

| Aspect | Blurred Background | Side Images |
|--------|-------------------|-------------|
| Image position | Full screen behind content | Left and right of content |
| Content width | 900px max, centered | 900px fixed, centered |
| Visual focus | Background supports content | Images are co-equal with text |
| Best for | Single concept explanation | Comparing/contrasting concepts |
| Responsive | Works on all screens | Images hide below 1400px |
