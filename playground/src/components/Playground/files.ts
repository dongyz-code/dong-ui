import type { Files } from './PlaygroundContext';
import { fileName2Language } from './utils';

import AppRaw from './template/App.tsx?raw';
import MainRaw from './template/main.tsx?raw';
import AppCssRaw from './template/App.css?raw';
import ImportMapRaw from './template/import-map.json?raw';

const helper = <T extends string>(names: T[]) => {
  const result = {} as Record<T, string>;

  names.forEach((name) => {
    result[name] = name;
  });
  return result;
};

const FileNames = helper(['App.tsx', 'main.tsx', 'App.css', 'import-map.json']);

export const defaultFiles: Files = {
  [FileNames['main.tsx']]: {
    name: FileNames['main.tsx'],
    language: fileName2Language(FileNames['main.tsx']),
    value: MainRaw,
  },
  [FileNames['App.tsx']]: {
    name: FileNames['App.tsx'],
    language: fileName2Language(FileNames['App.tsx']),
    value: AppRaw,
  },
  [FileNames['App.css']]: {
    name: FileNames['App.css'],
    language: fileName2Language(FileNames['App.css']),
    value: AppCssRaw,
  },
  [FileNames['import-map.json']]: {
    name: FileNames['import-map.json'],
    language: fileName2Language(FileNames['import-map.json']),
    value: ImportMapRaw,
  },
};
