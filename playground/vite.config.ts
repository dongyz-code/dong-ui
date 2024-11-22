import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9008,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },
});
