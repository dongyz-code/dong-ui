import { useEffect, useState } from 'react';
import { usePlayground } from '../Playground/PlaygroundContext';
import { Editor } from '@monaco-editor/react';
import { compile } from './compiler';
import iframeRaw from './iframe.html?raw';
import { FileNames } from '../Playground/files';

export default function Preview() {
  const { files, setSelectedFileName } = usePlayground();
  const [compiledCode, setCompiledCode] = useState('');
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  function getIframeUrl() {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[FileNames['import-map.json']].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }));
  }

  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files, setSelectedFileName]);

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [compiledCode, files[FileNames['import-map.json']].value]);

  return (
    <div style={{ height: '100%' }}>
      <iframe src={iframeUrl} className="w-full h-full p-0 border-none"></iframe>
    </div>
  );
}
