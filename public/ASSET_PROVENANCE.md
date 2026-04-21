# Asset Provenance

## DOU Days 2026 template logo

| File | Source | Role |
| --- | --- | --- |
| `dou-logo.png` | DOU Days 2026 dark speaker template — slide 1, top-right embedded image | Browser tab favicon + title-slide top-right logo |
| `dou-sonar-hero.png` | DOU Days 2026 dark speaker template — full-bleed title-slide background | Title-slide sonar background |
| `dou-rings-speaker.png` | DOU Days 2026 dark speaker template — slide 6 background (`ppt/media/image19.png`) | Bio/speaker-slide rings background |

### Source

- Template: **DOU Days 2026 — Dark speaker template** (Google Slides)
- URL: https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY
- Extracted: 2026-04-18
- Dimensions at capture: `dou-logo.png` 226×63 px (source file 2048×571); `dou-sonar-hero.png` 1080×1080 px

### Extraction method

`dou-logo.png` + `dou-sonar-hero.png` were embedded in the template as `<image>`
elements referencing an in-memory `blob:` URL. Captured by running a small
in-page script (via Chrome DevTools) that calls `fetch()` on the blob URL,
converts the response to a base64 data URL, and triggers a local PNG download.

`dou-rings-speaker.png` was extracted from `ppt/media/image19.png` inside the
downloaded PPTX. The template renders it with `rot="5400000"` (90° CW) plus a
srcRect crop (`l=15.542% r=50.005% t=19.222% b=19.068%`). To keep the runtime
CSS simple, the asset was pre-rotated (90° CCW, equivalent visually since rings
are rotationally symmetric) and pre-cropped via:

```bash
ffmpeg -i image19.png -vf "transpose=2,crop=1263:694:394:1007" dou-rings-speaker.png
```

Output is 1263×694. In CSS it is applied at 50% opacity (matching the template's
`alphaModFix amt="50000"`).

### Usage rights

This asset belongs to the DOU Days 2026 conference. It is bundled here for the
speaker (`yaroslav.yermilov@grammarly.com`) to use as the browser-tab favicon
on the web presentation — the same purpose as the official templates the
conference distributed to speakers.

If this repo is ever forked / redistributed for purposes beyond the original
conference talk, confirm with DOU organisers that redistribution is
permitted, or remove this file and replace it with a self-authored equivalent.
