import { Editor } from '@monaco-editor/react';

const defaultCode = `
  function add(a: number, b: number): number {
    return a + b;
  }
`;

const CodeEditor = () => {
  return (
    <Editor
      height="100%"
      language="typescript"
      value={defaultCode}
      path={'APP.ts'}
      options={{
        minimap: {
          enabled: false,
        },
        wordWrap: 'on',
      }}
    />
  );
};

export default CodeEditor;
