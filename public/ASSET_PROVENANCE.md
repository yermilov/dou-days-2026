# Asset Provenance

This document records the source, extraction method, and intended usage of third-party design assets bundled in this repo.

## DOU Days 2026 template assets

The following files were extracted from the official DOU Days 2026 speaker slide templates so the web presentation can render with the same visual identity as the conference deck (dark variant).

| File | Source | Role |
| --- | --- | --- |
| `dou-logo.png` | DOU Days 2026 dark template — slide 1 top-right embedded image | Persistent brand logo rendered by `SlideChrome` on every slide |
| `dou-sonar-hero.png` | DOU Days 2026 dark template — slide 1 full-bleed background image | Hero background for title / section / thank-you slides |
| `dou-sonar-subtle.png` | DOU Days 2026 dark template — slide 2 content-slide background image | Dimmed background for content slides |

### Source

- Template: **DOU Days 2026 — Dark speaker template** (Google Slides)
- URL: https://docs.google.com/presentation/d/1--lbLSvxQ-V4aFgJfHkOyrzO_QbAF6Sp4RtoGwGZQhY
- Extracted: 2026-04-18

### Extraction method

Assets are embedded in the template as `<image>` elements referencing in-memory `blob:` URLs.
They were captured by running a small in-page script (via Chrome DevTools) that calls
`fetch()` on each blob URL, converts the response to a base64 data URL, and triggers a
local download of the PNG. See `src/styles/terminal.css` and `docs/DESIGN_SYSTEM.md`
(added in a later commit) for how each asset is consumed.

Recorded dimensions at capture time:

- `dou-logo.png` — 226×63 px (true asset larger; display-rect here)
- `dou-sonar-hero.png` — 1080×1080 px
- `dou-sonar-subtle.png` — 1435×1370 px

### Usage rights

These assets belong to the DOU Days 2026 conference. They are bundled here to let the
speaker (`yaroslav.yermilov@grammarly.com`) deliver the conference talk with a web
presentation that matches the official deck — i.e., for the same purpose as the official
PowerPoint/Google Slides templates the conference distributed to speakers.

If this repo is ever forked / redistributed for purposes beyond the original conference
talk, confirm with DOU organisers that redistribution is permitted, or remove these
files and replace them with self-authored equivalents.
