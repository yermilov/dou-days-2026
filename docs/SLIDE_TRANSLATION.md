# Slide Translation Process

How we translate slide copy into Ukrainian (or any other language) without
breaking a fixed-stage hero layout. Applies to every `hero: true` slide —
`TitleSlide`, `BioSlide`, and any future hero compositions.

## Why this needs a process

Hero slides (`src/components/Slide.tsx` lines 49–67) render their children
inside a **1920×1080 fixed stage** that is uniformly scaled to the viewport
via `transform: scale(min(w/1920, h/1080))`. Text inside the stage does not
reflow with the browser — a line is either within its fixed container width
or it overflows / wraps. When you change a string, you are changing a
fixed-width typographic composition, not a responsive web layout.

For non-hero (content) slides the layout is flex-based so translation is a
drop-in — just edit the strings. This doc focuses on hero slides where
translation interacts with calibrated pixel coordinates.

## The constraints that bound translation

For each translatable element, three numbers govern what fits:

1. **Container width** — the absolute px width of the element's wrapper on
   the 1920×1080 stage (authored in `src/styles/slides.css`).
2. **Font size** — px (not rem) on hero slides, so it scales uniformly.
3. **Letter-spacing / tracking** — especially for uppercase subtitles.

If the translated string at the current font size + tracking exceeds the
container width, it will either overflow (clipped to the stage's
`overflow: hidden`) or wrap to a second line and collide with whatever sits
below it (image, next block, timer bar).

## Known widths on the bio/speaker slide

| Element | Wrapper | Width | Font | Tracking | Max glyphs at one line |
| --- | --- | --- | --- | --- | --- |
| `Київ, 2026` tag | `.bio-hero__tag` | auto | 34px / 600 | 0 | n/a |
| `$ whoami` title | `.bio-hero__title` | 1050px (block) | 120px / 700 | -0.02em | ≤ 15 wide glyphs |
| Subtitle | `.bio-hero__subtitle` | 1050px (block) | 40px / 700 uppercase | 0.06em | ≈ 38 uppercase chars |
| Bullet label | `.bio-hero__item-label` | block − prefix − gap = **992px** | 38px / 400 | 0 | ≈ 50 mixed chars (longer wraps) |
| Bullet prefix | `.bio-hero__item-prefix` | 48px fixed | 38px / 700 | -0.02em | `>>`, `>`, `--` |

Block origin is `(114, 200)` on the stage; image occupies `(1165, 124)` to
`(1920, 990)` — do **not** widen the block past `x + width = 1165` (the
image's left edge) or the subtitle / bullets will collide with the photo.
The current `1050px` block sits 1 px shy of that boundary.

## Translation checklist

For each string you change:

1. **Translate for meaning, not just words.** Ukrainian is often a few
   characters longer than English when mapping 1:1, but a natural
   translation is typically similar in glyph count. Prefer `впроваджую` ≈
   `розгортаю` over a literal `розгортаю в усій компанії` if the shorter
   phrasing reads naturally.
2. **Count the glyphs.** Compare against the "max glyphs" column above. If
   the new string is longer than the current one, it may overflow even if
   the old one fit.
3. **Preserve the terminal idiom** in code-flavoured strings. Keep `>>`,
   `>`, `--` prefixes, `$` sigils, ASCII arrows (`0 -> 1`). These read the
   same in Ukrainian and reinforce the aesthetic. Do not translate `whoami`,
   `bash`, `git`, etc. — they are command names, not English words.
4. **Brand names stay Latin.** `Grammarly`, `Superhuman`, `Java`, `AI` —
   leave untouched. Use Ukrainian ligatures around them
   (`у Grammarly`, `Java backend-інженер`).
5. **Verify visually.** Run `bun run dev`, navigate to the slide, step
   through all reveal stages. Cyrillic tends to be marginally wider than
   Latin at the same font size, so lines that barely fit in English may
   wrap once translated.

## If the translated string overflows

Tune in this order (least invasive first):

1. **Rephrase shorter.** Drop an adverb, prefer a more compact verb. Text
   changes are cheaper than CSS changes.
2. **Tighten tracking.** For the subtitle, reduce `letter-spacing` from
   `0.06em` toward `0.04em`. Any lower starts to feel cramped in uppercase.
3. **Drop font size one notch.** Subtitle 40 → 38 → 36. Bullets 32 → 30.
   Keep sizes divisible by 2 and don't drop below roughly 28px on hero
   slides — the talk is presented in a conference hall; sub-28px text
   becomes unreadable from the back rows.
4. **Widen the block.** Increase `.bio-hero__block { width: … }` in
   `slides.css`, but **never past `1051px`** on this slide — that is the
   photo's left edge at `1165 − 114`. Pushing further overlaps the image.
5. **Accept a two-line wrap.** For bullet lines that must remain long,
   allowing a wrap is acceptable if the cascade still looks tidy. In that
   case, verify that later reveal stages don't push content past `y = 990`
   (the image's bottom edge).

## What was translated on `BioSlide`

| Original (English) | Translation (Ukrainian) | Δ chars |
| --- | --- | --- |
| `almost 9 years at Grammarly / Superhuman` (40) | `майже 9 років у Grammarly / Superhuman` (38) | −2 |
| `0 -> 1 projects` (15) | `0 -> 1 проєкти` (14) | −1 |
| `in 2025: rolling out AI coding agents across the company` (56) | `у 2025: розгортаю AI-агентів для кодування у компанії` (53) | −3 |
| `before that: tech lead of platform organization` (47) | `до того: техлід платформної організації` (39) | −8 |
| `before that: tech lead of feature frameworks` (44) | `до того: техлід feature-фреймворків` (35) | −9 |
| `before that: led product features` (33) | `до того: розробляв продуктові фічі` (34) | +1 |
| `started as Java backend engineer` (32) | `починав як Java backend-інженер` (31) | −1 |

All lines stayed within the 972 px label column at 32px — no CSS changes
were needed beyond what already existed for the English copy.

## When adding a new hero slide

Record the same three numbers (container width, font size, tracking) for
each translatable element in a brief comment in `slides.css`, right next to
the selector. Future translators (including future-you) will then be able
to run the checklist above without reverse-engineering the constraints from
the CSS.
