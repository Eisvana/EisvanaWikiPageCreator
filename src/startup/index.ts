// This file serves as the entry point for all functions that load on startup.
// It uses non-standard glob import, a feature of Vite: https://vitejs.dev/guide/features.html#glob-import
// import './cssImports';
// import './theme';
// import './footer';
// import './elements';
// import './glyphs';
// import './inputs';

import { startUp } from "../common";



import.meta.glob('./**/*.ts', { eager: true })

startUp();