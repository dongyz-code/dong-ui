import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pkg from '../package.json';
import path from 'node:path';
import fs from 'node:fs';

const resolvePath = (dir: string) => path.resolve(__dirname, dir);

const inputDir = resolvePath('../src');

const inputs = (() => {
  const subInputDirs = fs.readdirSync(inputDir).filter((dir_name) => {
    const componentDir = path.resolve(inputDir, dir_name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
  });

  const inputs: Record<string, string> = {
    index: resolvePath('../src/index.ts'),
  };

  subInputDirs.forEach((dir_name) => {
    const componentDir = path.resolve(inputDir, dir_name);
    inputs[dir_name] = path.resolve(path.join(componentDir, 'index.ts'));
  });

  return inputs;
})();

const matchModule: string[] = [
  'Input',
  'Dropdown',
  'carousel',
  'transition',
  'datePicker',
  'header',
  'selectOption',
  'skeletonItem',
  'tabItem',
  'upload',
  'checkbox',
  'badge',
  'Button',
  'tooltip',
  'page',
  'scroll',
  'radio',
  'empty',
  'dropdownMenu',
  'dropdownMenuItem',
  'tag',
  'tagInput',
  'footer',
  'tree',
  'utils',
  'selectOptionGroup',
  'select',
];

export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/variables.scss" as *;`,
      },
    },
  },

  build: {
    target: 'es2015',
    cssCodeSplit: true,
    emptyOutDir: true,

    lib: {
      entry: resolvePath('../src/index.ts'),
      name: pkg.name,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: inputs,
      output: {
        dir: resolvePath('../dist/es'),
        chunkFileNames: ({ name }) => {
          return name === 'index' ? 'index.js' : '[name]/index.js';
        },
        entryFileNames: ({ name }) => {
          return name === 'index' ? 'index.js' : '[name]/index.js';
        },
        assetFileNames: '[name]/index.css',
        manualChunks(id) {
          console.log(id);
          const arr = id.toString().split('/');
          if (arr.includes('node_modules')) {
            return 'chunks';
          }

          if (arr.length > 2) {
            const entryPoint = arr[arr.length - 2].toString();
            if (matchModule.includes(entryPoint)) {
              return entryPoint;
            }
          }
        },
      },
    },
  },
});
