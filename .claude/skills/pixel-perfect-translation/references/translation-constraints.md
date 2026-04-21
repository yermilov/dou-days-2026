# Slide Translation Process

How to translate slide copy into Ukrainian (or any other language) without
breaking a fixed-stage hero layout. Applies to every `chrome: 'hero'` slide —
currently `TitleSlide` is the only one; any future hero composition added
for another template-matched slide goes through the same process.

## Why this needs a process

Hero slides (`src/components/Slide.tsx`) render their children inside a
**1920×1080 fixed stage** that is uniformly scaled to the viewport via
`transform: scale(min(w/1920, h/1080))`. Text inside the stage does not
reflow with the browser — a line is either within its fixed container width
or it overflows / wraps. When you change a string, you are changing a
fixed-width typographic composition, not a responsive web layout.

Body slides (`chrome: 'global'`) also sit on the 1920×1080 stage but use
flex layout inside it, so translation is usually drop-in — edit the
strings and let the flex engine handle line breaks. This doc focuses on
hero slides where translation interacts with calibrated pixel coordinates.

## The constraints that bound translation

For each translatable element, three numbers govern what fits:

1. **Container width** — the absolute px width of the element's wrapper on
   the 1920×1080 stage (authored in `src/styles/slides.css`).
2. **Font size** — px (not rem) on hero slides, so it scales uniformly.
3. **Letter-spacing / tracking** — especially for uppercase subtitles.

If the translated string at the current font size + tracking exceeds the
container width, it will either overflow (clipped to the stage's
`overflow: hidden`) or wrap to a second line and collide with whatever sits
below it.

## Translation checklist

For each string you change:

1. **Translate for meaning, not just words.** Ukrainian is often a few
   characters longer than English when mapping 1:1, but a natural
   translation is typically similar in glyph count.
2. **Count the glyphs.** Compare against the container's "max glyphs"
   budget (derived from container width / average glyph width at the
   configured font size).
3. **Preserve the terminal idiom** in code-flavoured strings. Keep `>>`,
   `>`, `--` prefixes, `$` sigils, ASCII arrows (`0 -> 1`). These read the
   same in Ukrainian and reinforce the aesthetic. Do not translate
   `whoami`, `bash`, `git`, etc. — they are command names, not English
   words.
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
2. **Tighten tracking.** Reduce `letter-spacing` by `-0.01em` increments.
   Any lower than `0.04em` on uppercase text starts to feel cramped.
3. **Drop font size one notch.** Keep sizes divisible by 2 and don't drop
   below roughly 28px on hero slides — the talk is presented in a
   conference hall; sub-28px text becomes unreadable from the back rows.
4. **Widen the block** in `slides.css`, but never past the calibrated
   maximum documented on the selector — pushing further overlaps adjacent
   stage elements.
5. **Accept a two-line wrap** as a last resort.

## When adding a new hero slide

Record the same three numbers (container width, font size, tracking) for
each translatable element in a brief comment in `slides.css`, right next
to the selector. Future translators (including future-you) will then be
able to run the checklist above without reverse-engineering the
constraints from the CSS.
