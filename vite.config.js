import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@routers': resolve(__dirname, 'src/routers'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@zustands': resolve(__dirname, 'src/zustands'),
      '@axios': resolve(__dirname, 'src/axios'),
      '@assets': resolve(__dirname, 'src/assets'), // assets 별칭 추가
      '@': resolve(__dirname, 'src'),
    },
  },
});
