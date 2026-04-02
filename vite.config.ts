import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      optipng: { optimizationLevel: 7 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      mozjpeg: { quality: 75 },
      gifsicle: { optimizationLevel: 3 },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
  ],
  base: '/ai-first-transformation-from-within-en/',
})
