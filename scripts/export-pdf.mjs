#!/usr/bin/env node
/**
 * Playwright runner for `bun run pdf`.
 *
 * Captures one PNG per slide at 1920×1080 in final-state (max revealStage),
 * then assembles them into a single multi-page PDF via a tiny concat HTML.
 *
 * Adapted from zarazhangrui/frontend-slides (MIT).
 */

import { chromium } from 'playwright';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const baseUrl = process.argv[2];
const outputPath = process.argv[3];
if (!baseUrl || !outputPath) {
  console.error('Usage: export-pdf.mjs <base-url> <output-pdf>');
  process.exit(1);
}

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const PER_SLIDE_TIMEOUT_MS = 5000;

const tmp = mkdtempSync(join(tmpdir(), 'dou-pdf-'));
process.on('exit', () => {
  try { rmSync(tmp, { recursive: true, force: true }); } catch { /* ignore */ }
});

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: STAGE_WIDTH, height: STAGE_HEIGHT },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
page.on('pageerror', err => console.error('[page error]', err.message));
page.on('console', msg => {
  if (msg.type() === 'error') console.error('[page console error]', msg.text());
});

console.log('==> Loading deck in export mode:', `${baseUrl}?export=1`);
await page.goto(`${baseUrl}?export=1`, { waitUntil: 'load' });

// Wait for __deckExport to come up.
await page.waitForFunction(() => Boolean(window.__deckExport), null, { timeout: 10000 });
await page.evaluate(() => window.__deckExport.reset());

const slideCount = await page.evaluate(() => window.__deckExport.slideCount);
console.log(`==> Capturing ${slideCount} slides at ${STAGE_WIDTH}×${STAGE_HEIGHT}...`);

const screenshots = [];
for (let i = 0; i < slideCount; i++) {
  const { id, maxReveal } = await page.evaluate(i => ({
    id: window.__deckExport.slideIdAt(i),
    maxReveal: window.__deckExport.maxRevealStagesAt(i),
  }), i);

  await page.evaluate(({ i, r }) => window.__deckExport.goTo(i, r), { i, r: maxReveal });

  // Wait for slide-level settle (async slides) or auto-settle (everything else).
  try {
    await page.evaluate(
      ({ id, ms }) => window.__deckExport.waitForSettled(id, ms),
      { id, ms: PER_SLIDE_TIMEOUT_MS }
    );
  } catch (err) {
    console.error(`Slide ${i + 1}/${slideCount} (${id}) failed to settle:`, err.message);
    await browser.close();
    process.exit(1);
  }

  // Two animation frames + fonts ready, so the stage transform reflects the new state.
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.evaluate(() => document.fonts.ready);

  // Wait for visible images and CSS background-images to finish loading.
  await page.evaluate((slideId) => Promise.all([
    ...Array.from(document.images)
      .filter(img => img.getBoundingClientRect().width > 0)
      .map(img =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((res, rej) => {
              img.addEventListener('load', () => res(), { once: true });
              img.addEventListener('error', () => rej(new Error(`img load failed in slide ${slideId}: ${img.src}`)), { once: true });
            })
      ),
    ...Array.from(document.querySelectorAll('*'))
      .filter(el => el.offsetParent !== null)
      .flatMap(el => {
        const bg = getComputedStyle(el).backgroundImage;
        const matches = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
        return matches.map(([, url]) => new Promise((res, rej) => {
          const probe = new Image();
          probe.addEventListener('load', () => res(), { once: true });
          probe.addEventListener('error', () => rej(new Error(`background-image failed in slide ${slideId}: ${url}`)), { once: true });
          probe.src = url;
        }));
      }),
    ...document.getAnimations().map(a => a.finished.catch(() => undefined)),
  ]), id);

  // Sanity check: stage transform scale must equal 1 with our 1920×1080 viewport.
  const scale = await page.evaluate(() => {
    const stage = document.querySelector('.stage');
    if (!stage) return null;
    const tr = getComputedStyle(stage).transform;
    if (!tr || tr === 'none') return 1;
    const m = tr.match(/matrix\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(',').map(s => parseFloat(s.trim()));
    return parts[0]; // a in matrix(a, b, c, d, e, f)
  });
  if (scale !== null && Math.abs(scale - 1) > 0.001) {
    console.error(`Slide ${i + 1}/${slideCount} (${id}): stage scale ${scale} ≠ 1. Aborting.`);
    await browser.close();
    process.exit(1);
  }

  const png = join(tmp, `slide-${String(i + 1).padStart(3, '0')}.png`);
  await page.screenshot({ path: png, fullPage: false, omitBackground: false });
  screenshots.push(png);
  process.stdout.write(`  ${i + 1}/${slideCount} ${id}\n`);
}

// Assemble screenshots into a single multi-page PDF via a small HTML doc
// using @page sizing. data: URIs avoid filesystem races.
console.log('==> Assembling PDF...');
const pages = screenshots
  .map(p => `<img src="data:image/png;base64,${readFileSync(p).toString('base64')}" />`)
  .join('\n');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: ${STAGE_WIDTH}px ${STAGE_HEIGHT}px; margin: 0; }
html, body { margin: 0; padding: 0; background: black; }
img { display: block; width: ${STAGE_WIDTH}px; height: ${STAGE_HEIGHT}px; page-break-after: always; }
img:last-child { page-break-after: auto; }
</style></head><body>${pages}</body></html>`;

const htmlPath = join(tmp, 'deck.html');
writeFileSync(htmlPath, html);

const pdfPage = await context.newPage();
await pdfPage.goto(`file://${htmlPath}`, { waitUntil: 'load' });
await pdfPage.evaluate(() => document.fonts.ready);
await pdfPage.pdf({
  path: outputPath,
  width: `${STAGE_WIDTH}px`,
  height: `${STAGE_HEIGHT}px`,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log(`==> Wrote ${outputPath} (${screenshots.length} pages).`);
