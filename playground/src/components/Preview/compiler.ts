import { transform } from '@babel/standalone';
import { PluginObj } from '@babel/core';
import { FileNames } from '../Playground/files';
import { Files, File } from '../Playground/PlaygroundContext';

const json2js = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

/** 通过js代码将其加入head的stayle里 */
const css2js = (file: File) => {
  const randomId = new Date().getTime();
  const js = `
    (() => {
      const style = document.createElement('style');
      style.setAttribute('id', 'style_${randomId}_${file.name}');
      document.head.appendChild(style);

      style.innerHTML = \`${file.value}\`;
    })()
  `;
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

/** 根据文件名获取文件路径 */
export const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split('./').pop() || '';
  const extentions = ['.ts', '.tsx', '.js', '.jsx'];
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return extentions.some((ext) => key.endsWith(ext));
      })
      .find((key) => {
        return key.split('.').includes(moduleName);
      });

    if (realModuleName) {
      moduleName = realModuleName;
    }
  }

  return files[moduleName];
};

/** 替换导入路径 */
export const babelTransformPlugin = (files: Files): PluginObj => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;

        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath);

          if (!file) return;

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2js(file);
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2js(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], { type: 'application/javascript' })
            );
          }
        }
      },
    },
  };
};

/** 默认导入React */
const handleDefaultImport = (filename: string, code: string) => {
  let _code = code;
  const reg = /import\s+React/g;
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !reg.test(code)) {
    _code = `import React from'react';\n${code}`;
  }
  return _code;
};

export const babelTransform = (filename: string, code: string, files: Files) => {
  let transformedCode = '';
  code = handleDefaultImport(filename, code);

  try {
    const transformed = transform(code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [babelTransformPlugin(files)],
      retainLines: true,
    });

    transformedCode = transformed.code ?? '';
  } catch (error) {
    console.error(error);
  }

  return transformedCode;
};

export const compile = (files: Files, entry: string = FileNames['main.tsx']) => {
  const entryFile = files[entry];
  return babelTransform(entryFile.name, entryFile.value, files);
};
