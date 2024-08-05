import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('VITE_SERVER_URL:', process.env.VITE_SERVER_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log('Original Path:', path);
          const newPath = path.replace(/^\/api/, '');
          console.log('Rewritten Path:', newPath);
          return newPath;
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@routers', replacement: resolve(__dirname, 'src/routers') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@zustands', replacement: resolve(__dirname, 'src/zustands') },
      { find: '@axios', replacement: resolve(__dirname, 'src/axios') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      {
        find: '@Header',
        replacement: resolve(__dirname, 'src/components/Header'),
      },
      { find: '@auth', replacement: resolve(__dirname, 'src/components/auth') },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
});
