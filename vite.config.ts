/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/EisvanaWikiPageCreator/',
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      name: 'chromium',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        about: fileURLToPath(new URL('about.html', import.meta.url)),
        base: fileURLToPath(new URL('base.html', import.meta.url)),
        biofrig: fileURLToPath(new URL('biofrig.html', import.meta.url)),
        derelict: fileURLToPath(new URL('derelict.html', import.meta.url)),
        fauna: fileURLToPath(new URL('fauna.html', import.meta.url)),
        flora: fileURLToPath(new URL('flora.html', import.meta.url)),
        mineral: fileURLToPath(new URL('mineral.html', import.meta.url)),
        moon: fileURLToPath(new URL('moon.html', import.meta.url)),
        multitool: fileURLToPath(new URL('multitool.html', import.meta.url)),
        planet: fileURLToPath(new URL('planet.html', import.meta.url)),
        racetrack: fileURLToPath(new URL('racetrack.html', import.meta.url)),
        sandworm: fileURLToPath(new URL('sandworm.html', import.meta.url)),
        settlement: fileURLToPath(new URL('settlement.html', import.meta.url)),
        starship: fileURLToPath(new URL('starship.html', import.meta.url)),
        system: fileURLToPath(new URL('system.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
