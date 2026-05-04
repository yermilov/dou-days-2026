/**
 * Module-level export registry for PDF capture mode (?export=1).
 *
 * Slides do async work in `useEffect` (e.g. `IndustryPatternsSlide` fetches
 * status data, `MetaSkillsSlide` fetches GitHub content). The Playwright
 * exporter must wait for those to finish before screenshotting, otherwise
 * it captures a "fetching..." or empty state.
 *
 * Why a module-level singleton instead of React state: a `useState`
 * Set/Map would be replaced on each render, dropping pending waiters.
 * The lifecycle here outlives any component, so we keep the maps in
 * module scope. `reset()` is called between captures so re-export starts
 * clean.
 */

const settled = new Set<string>();
const waiters = new Map<
  string,
  {
    resolve: () => void;
    reject: (e: Error) => void;
    timer: ReturnType<typeof setTimeout>;
  }
>();

export interface DeckExportApi {
  markSlideSettled: (slideId: string) => void;
  markSlideError: (slideId: string, msg: string) => void;
  waitForSettled: (slideId: string, timeoutMs?: number) => Promise<void>;
  reset: () => void;
}

export const exportRegistry: DeckExportApi = {
  markSlideSettled(slideId: string) {
    settled.add(slideId);
    const w = waiters.get(slideId);
    if (w) {
      clearTimeout(w.timer);
      w.resolve();
      waiters.delete(slideId);
    }
  },
  markSlideError(slideId: string, msg: string) {
    const err = new Error(`Slide ${slideId} failed during export: ${msg}`);
    const w = waiters.get(slideId);
    if (w) {
      clearTimeout(w.timer);
      w.reject(err);
      waiters.delete(slideId);
    }
    throw err;
  },
  waitForSettled(slideId: string, timeoutMs = 5000): Promise<void> {
    if (settled.has(slideId)) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        waiters.delete(slideId);
        reject(new Error(`Slide ${slideId} not settled in ${timeoutMs}ms`));
      }, timeoutMs);
      waiters.set(slideId, { resolve, reject, timer });
    });
  },
  reset() {
    settled.clear();
    waiters.forEach(w => clearTimeout(w.timer));
    waiters.clear();
  },
};
