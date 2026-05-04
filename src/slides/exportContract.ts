/**
 * Export-mode allow-lists for the build-time async-slide check.
 *
 * The check (`scripts/check-async-slides.ts`) runs as part of `bun run build`.
 * It greps every slide for fetch/await/.then patterns. Some hits are real
 * runtime async work (we must wait for them); others are template-string
 * code examples that *contain* await/fetch but never actually run.
 *
 * Every slide that grep matches MUST be classified into exactly one set,
 * or the build fails with a hint to come here and classify it.
 *
 * If you're adding a new slide that does runtime async work:
 *   - Mark it `asyncSettle: true` in `src/slides/index.ts` (via SlideDefinition).
 *   - Add it to KNOWN_RUNTIME_ASYNC_SLIDES below.
 *   - Have it call `exportRegistry.markSlideSettled(slideId)` once loaded.
 *
 * If you're adding a new slide whose code-example string includes await/fetch:
 *   - Add it to ASYNC_LITERAL_FALSE_POSITIVES below.
 *   - Do NOT mark it asyncSettle.
 */
export const KNOWN_RUNTIME_ASYNC_SLIDES = new Set<string>([
  'IndustryPatternsSlide',
  'MetaSkillsSlide',
]);

/**
 * Slides that contain await/fetch only inside displayed code-example strings.
 * The literal text triggers the audit grep but is not actual runtime work.
 */
export const ASYNC_LITERAL_FALSE_POSITIVES = new Set<string>([
  'AgentTracesSlide',
  'AgentWorkflowSlide',
]);
