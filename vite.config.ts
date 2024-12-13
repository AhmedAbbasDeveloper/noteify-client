import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  build: { target: 'esnext' },
  plugins: [react(), topLevelAwait()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
