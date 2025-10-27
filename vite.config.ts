import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { webdriverio } from '@vitest/browser-webdriverio';
import vue from '@vitejs/plugin-vue';

const env = loadEnv('', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  base: env.VITE_BASE_PATH,
  // base: '/EisvanaWikiPageCreator/',
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    browser: {
      provider: webdriverio(),
      enabled: true,
      headless: true,
      instances: [{ browser: 'chrome' }, { browser: 'firefox' }],
    },
    coverage: {
      include: ['src/**.{ts,vue}', 'src/**/**.{ts,vue}'],
      exclude: ['src/api/**/**.ts', 'src/**/**.d.ts'],
      clean: true,
    },
  },
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'about.html',
        'base.html',
        'biofrig.html',
        'derelict.html',
        'fauna.html',
        'flora.html',
        'mineral.html',
        'moon.html',
        'multitool.html',
        'planet.html',
        'racetrack.html',
        'sandworm.html',
        'settlement.html',
        'starship.html',
        'system.html',
      ],
    },
  },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
