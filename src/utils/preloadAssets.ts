// Auto-discovers every media asset under src/assets/ so navigating to a later
// slide never races the network. Vite resolves these globs at build time and
// hashes each URL, so adding a new image to src/assets/ is enough — no manual
// registry to maintain.
const imageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const audioModules = import.meta.glob('../assets/**/*.{wav,mp3}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function preloadSlideAssets(): void {
  for (const url of Object.values(imageModules)) {
    const img = new Image();
    img.src = url;
  }
  for (const url of Object.values(audioModules)) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;
  }
}
