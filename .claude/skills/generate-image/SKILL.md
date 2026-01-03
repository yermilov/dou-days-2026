---
name: generate-image
description: Generates images using Google Gemini 3 Pro API. Use when asked to create, generate, or design images for slides, presentations, or visual content.
allowed-tools: Bash(bun:*), Read, Write
---

# Image Generation with Gemini 3 Pro

Generate images for slides and presentations using Google's Gemini 3 Pro image generation API.

## Prerequisites

Ensure `.env.local` exists with your Gemini API key:
```
GEMINI_API_KEY=your-api-key-here
```

## Usage

Run the generation script:
```bash
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts --prompt "your image description" --ratio "16:9" --output "output.png"
```

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--prompt` | Yes | - | Image description |
| `--ratio` | No | 16:9 | Aspect ratio: 16:9, 4:3, 1:1, 4:5 |
| `--output` | No | Auto-generated | Output filename |

### Examples

```bash
# Widescreen slide background
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "Abstract dark terminal with glowing code, cyberpunk aesthetic" \
  --ratio "16:9"

# Square icon
bun --env-file=.env.local .claude/skills/generate-image/scripts/generate.ts \
  --prompt "Minimalist code icon, orange and green on dark background" \
  --ratio "1:1" \
  --output "code-icon.png"
```

## Output

Images are saved to `src/assets/generated/` with auto-generated timestamps if no filename specified.

## Troubleshooting

- **API key not found**: Ensure `.env.local` exists with `GEMINI_API_KEY`
- **Generation failed**: Check API key validity and quota
- **Model error**: The script uses `gemini-3-pro-image-preview` model
