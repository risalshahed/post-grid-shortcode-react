import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  base: './',
  build: {
    manifest: true,
    outDir: '../ghl-wizard/build',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html'
    },
  },
});