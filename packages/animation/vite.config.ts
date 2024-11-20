import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'core/index.ts',
      name: 'dong-animation',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {},
  },
  plugins: [
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
  ],
});
