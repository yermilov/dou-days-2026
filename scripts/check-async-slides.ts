#!/usr/bin/env bun
/**
 * Build-time async-slide classification check.
 *
 * Greps every slide file for `fetch(`, `.then(`, or `await ` patterns and
 * cross-references the result against two allow-lists in
 * `src/slides/exportContract.ts`:
 *   - KNOWN_RUNTIME_ASYNC_SLIDES — must be `asyncSettle: true`
 *   - ASYNC_LITERAL_FALSE_POSITIVES — code-example strings only, must NOT be async
 *
 * A slide that grep matches but is in NEITHER set fails the build with a
 * hint pointing to exportContract.ts. This forces a human review gate when
 * adding any new async-looking slide.
 *
 * Runs via `bun run check:async-slides`, chained into `bun run build`.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  KNOWN_RUNTIME_ASYNC_SLIDES,
  ASYNC_LITERAL_FALSE_POSITIVES,
} from '../src/slides/exportContract';

const SLIDES_DIR = join(import.meta.dir, '..', 'src', 'slides');
const ASYNC_PATTERN = /\bfetch\(|\.then\(|\bawait\s/;

function listSlideFiles(): string[] {
  return readdirSync(SLIDES_DIR)
    .filter(f => f.endsWith('.tsx') && f !== 'exportContract.ts')
    .map(f => join(SLIDES_DIR, f));
}

function slideName(file: string): string {
  // src/slides/IndustryPatternsSlide.tsx → IndustryPatternsSlide
  return file.split('/').pop()!.replace(/\.tsx$/, '');
}

function hasAsyncSettleFlag(source: string): boolean {
  return /\basyncSettle:\s*true\b/.test(source);
}

function callsMarkSlideSettled(source: string): boolean {
  return /markSlideSettled\(/.test(source);
}

const errors: string[] = [];
const matchedAsyncSlides: string[] = [];

for (const file of listSlideFiles()) {
  const source = readFileSync(file, 'utf8');
  if (!ASYNC_PATTERN.test(source)) continue;

  const name = slideName(file);
  matchedAsyncSlides.push(name);

  const inRuntime = KNOWN_RUNTIME_ASYNC_SLIDES.has(name);
  const inFalsePositive = ASYNC_LITERAL_FALSE_POSITIVES.has(name);

  if (inRuntime && inFalsePositive) {
    errors.push(`${name}: in BOTH KNOWN_RUNTIME_ASYNC_SLIDES and ASYNC_LITERAL_FALSE_POSITIVES — pick one in src/slides/exportContract.ts`);
    continue;
  }

  if (!inRuntime && !inFalsePositive) {
    errors.push(
      `${name}: contains async-looking code (fetch/await/.then) but is not classified.\n` +
      `  → If this is real runtime async work, add it to KNOWN_RUNTIME_ASYNC_SLIDES in src/slides/exportContract.ts,\n` +
      `    set \`asyncSettle: true\` on the slide, and have it call exportRegistry.markSlideSettled.\n` +
      `  → If it's only a displayed code-example string, add it to ASYNC_LITERAL_FALSE_POSITIVES.`
    );
    continue;
  }

  if (inRuntime) {
    if (!hasAsyncSettleFlag(source)) {
      errors.push(`${name}: in KNOWN_RUNTIME_ASYNC_SLIDES but missing \`asyncSettle: true\` — add it to the slide definition`);
    }
    if (!callsMarkSlideSettled(source)) {
      errors.push(`${name}: in KNOWN_RUNTIME_ASYNC_SLIDES but does not call exportRegistry.markSlideSettled — wire it from your async path`);
    }
  } else if (inFalsePositive) {
    if (hasAsyncSettleFlag(source)) {
      errors.push(`${name}: in ASYNC_LITERAL_FALSE_POSITIVES but has \`asyncSettle: true\` — pick one`);
    }
  }
}

// Also: every slide listed in KNOWN_RUNTIME_ASYNC_SLIDES must actually exist and match.
for (const name of KNOWN_RUNTIME_ASYNC_SLIDES) {
  if (!matchedAsyncSlides.includes(name)) {
    errors.push(`KNOWN_RUNTIME_ASYNC_SLIDES lists ${name} but no matching slide file with async patterns was found`);
  }
}

if (errors.length > 0) {
  console.error('check:async-slides failed:\n');
  for (const err of errors) console.error(`  • ${relative(process.cwd(), SLIDES_DIR)}/${err}\n`);
  process.exit(1);
}

console.log(`check:async-slides ok (${matchedAsyncSlides.length} async-classified slides)`);
