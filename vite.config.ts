import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@animations': path.resolve(__dirname, './src/animations'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@app-types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          if (id.includes('node_modules')) {
            if (['react', 'react-dom', 'react-router-dom'].some(mod => id.includes(mod))) {
              return 'vendor';
            }
            if (['framer-motion', 'gsap'].some(mod => id.includes(mod))) {
              return 'animations';
            }
            if (['three', '@react-three/fiber', '@react-three/drei'].some(mod => id.includes(mod))) {
              return 'three';
            }
          }
          return undefined;
        },
      },
    },
  },
});
