import { Editor, type OnMount } from '@monaco-editor/react';
import { createATA } from './ata';
import { usePlayground } from '../Playground/PlaygroundContext';
import { useDebounceFn } from '@reactuses/core';

const CodeEditor = () => {
  const { files, selectedFileName, setFiles } = usePlayground();

  const file = files[selectedFileName];

  const { run: onEditorChange } = useDebounceFn((value?: string) => {
    files[selectedFileName].value = value || '';
    setFiles({ ...files });
  }, 300);

  const handleEditorMont: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  return (
    <Editor
      height="100%"
      language="typescript"
      value={file.value}
      path={'APP.tsx'}
      onMount={handleEditorMont}
      onChange={onEditorChange}
      options={{
        fontSize: 14,
        /** 关闭最后一页空白 */
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        scrollbar: {
          verticalScrollbarSize: 14,
          horizontalScrollbarSize: 14,
        },
      }}
    />
  );
};

export default CodeEditor;
