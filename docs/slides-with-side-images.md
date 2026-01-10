# Creating Slides with Side Images

This document describes how to create slides with images on both sides of the text content, like the MCP slide.

## Overview

The layout uses a three-column flexbox:
- **Left**: Image (fills available width)
- **Center**: Text content (fixed width)
- **Right**: Image (fills available width)

Images are CSS-cropped using `object-fit: cover` to fill full vertical space regardless of screen size.

## Example: McpSlide

**File:** `src/slides/McpSlide.tsx`

```tsx
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';
import mcpToolCallFlow from '/mcp-tool-call-flow.png?url';
import mcpContextPollution from '/mcp-context-pollution.png?url';

export const McpSlide: SlideDefinition = {
  id: 'mcp',
  content: (
    <div className="mcp-slide">
      <img
        src={mcpToolCallFlow}
        alt="LLM tool call token flow"
        className="mcp-slide-image-left"
      />

      <div className="mcp-slide-content">
        <h2>Title here</h2>
        <SlideItem delay={0.05}>Content item 1</SlideItem>
        <SlideItem delay={0.1}>Content item 2</SlideItem>
        {/* ... more items */}
      </div>

      <img
        src={mcpContextPollution}
        alt="MCP context pollution"
        className="mcp-slide-image-right"
      />
    </div>
  ),
  notes: 'Speaker notes here',
};
```

## CSS Classes

**File:** `src/styles/terminal.css`

```css
/* === SLIDE WITH SIDE IMAGES === */
/* Three-column layout with images on sides */

.mcp-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  width: 100%;
  padding: 0 var(--space-md);
  height: calc(100vh - 180px);
}

.mcp-slide-image-left,
.mcp-slide-image-right {
  flex: 1;                              /* Fill available width */
  min-width: 0;                         /* Allow shrinking below content size */
  height: calc(100vh - 200px);          /* Fill vertical space */
  object-fit: cover;                    /* Crop to fill container */
  object-position: center;              /* Center the crop */
  border-radius: var(--input-border-radius);
  border: 1px solid var(--terminal-border);
  opacity: 0.85;
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}

.mcp-slide-image-left:hover,
.mcp-slide-image-right:hover {
  opacity: 1;
  transform: scale(1.02);
}

/* Slide-in animations */
.mcp-slide-image-left {
  animation: slideInFromLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.mcp-slide-image-right {
  animation: slideInFromRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.mcp-slide-content {
  flex-shrink: 0;                       /* Don't shrink content */
  width: 900px;                         /* Fixed width for text */
  max-width: 900px;
  text-align: left;
}

/* Hide side images on smaller screens */
@media (max-width: 1400px) {
  .mcp-slide-image-left,
  .mcp-slide-image-right {
    display: none;
  }

  .mcp-slide {
    padding: 0;
  }
}
```

## Image Generation

### Style: Messy Drawingboard/Whiteboard

Generate square (1:1) images with hand-drawn aesthetic, then let CSS crop them.

**Prompt template:**
```
Messy whiteboard/drawingboard visualization on dark background (#0a0e14).
Hand-drawn sketchy style showing [CONCEPT].
[DETAILED DESCRIPTION OF ELEMENTS]
Whiteboard marker aesthetic, imperfect lines, like someone explaining on a blackboard.
Colors: orange (#f0883e), green (#7ee787), blue (#79c0ff) on dark background.
```

### Example Prompts

**Left image (LLM Tool Call Flow):**
```bash
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "Messy whiteboard/drawingboard visualization on dark background (#0a0e14). Hand-drawn sketchy style showing LLM tool calling flow. Sketchy box labeled 'LLM' at top with glowing orange border, messy hand-drawn arrows pointing down with scribbled text 'tool_call | Edit | app.ts | const value = ...' in green. Middle sketchy box labeled 'Agent Runtime' in blue. More arrows pointing to a file icon 'app.ts'. Return arrow going back up with 'tool_result | success' scribbled along it. Informal annotations, circles, underlines scattered around. Whiteboard marker aesthetic, imperfect lines, like someone explaining on a blackboard. Colors: orange (#f0883e), green (#7ee787), blue (#79c0ff) on dark background." \
  --ratio "1:1" \
  --output "mcp-tool-call-flow.png"
```

**Right image (Context Pollution):**
```bash
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "Chaotic messy drawingboard/whiteboard visualization on dark background (#0a0e14). Hand-drawn sketchy style showing 'Context Window Pollution' from MCP tools. A large sketchy container labeled 'CONTEXT WINDOW' with blue border. Inside, many overlapping tool definition blocks crammed together chaotically: GitHub octocat logo with JSON schema scribbles, Jira logo with messy JSON, Figma logo with parameters, Context7 text, and more generic blocks. Red warning signs, 'OVERFLOW!' scribbled in red, arrows pointing everywhere. JSON snippets like '{\"name\": \"tool\"...}' scattered and overlapping. Overwhelming cluttered feel like a messy whiteboard. Marker/chalk aesthetic, imperfect lines. Colors: orange (#f0883e), green (#7ee787), blue (#79c0ff), red warnings on dark background." \
  --ratio "1:1" \
  --output "mcp-context-pollution.png"
```

### Key Points

1. **Use 1:1 ratio** - Square images work best for CSS cropping
2. **Dark background (#0a0e14)** - Matches terminal theme
3. **Terminal colors** - orange, green, blue from theme
4. **Messy/sketchy style** - Hand-drawn feel, imperfect lines
5. **CSS does the cropping** - `object-fit: cover` handles vertical strip

## Creating a New Slide with Side Images

1. **Generate images** at 1:1 ratio with messy drawingboard style
2. **Save to `public/`** folder
3. **Create slide component** following McpSlide pattern
4. **Import images** with `?url` suffix for GitHub Pages compatibility
5. **Use CSS classes** `.mcp-slide`, `.mcp-slide-image-left`, `.mcp-slide-image-right`, `.mcp-slide-content`
6. **Or create new CSS classes** following the same pattern if you want different styling

## File Locations

- **Slide:** `src/slides/McpSlide.tsx`
- **CSS:** `src/styles/terminal.css` (search for "MCP SLIDE")
- **Images:** `public/mcp-tool-call-flow.png`, `public/mcp-context-pollution.png`
- **Prompts:** `src/prompts/mcp-tool-call-flow.json`, `src/prompts/mcp-context-pollution.json`
