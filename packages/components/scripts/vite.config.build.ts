import { defineConfig, mergeConfig } from 'vite';
import pkg from '../package.json';
import path from 'node:path';
import fs from 'node:fs';
import devConfig from './vite.config.dev';

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
  'Carousel',
  'Transition',
  'DatePicker',
  'Header',
  'SelectOption',
  'SkeletonItem',
  'TabItem',
  'Upload',
  'Checkbox',
  'Badge',
  'Button',
  'Tooltip',
  'Page',
  'Scroll',
  'Radio',
  'Empty',
  'DropdownMenu',
  'DropdownMenuItem',
  'Tag',
  'TagInput',
  'Footer',
  'Tree',
  'Utils',
  'SelectOptionGroup',
  'Select',
];

export default mergeConfig(
  devConfig,
  defineConfig({
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
  })
);
