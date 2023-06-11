// This file serves as the entry point for all functions that load on startup.
// It uses non-standard glob import, a feature of Vite: https://vitejs.dev/guide/features.html#glob-import
import.meta.glob('./*.ts', { eager: true })