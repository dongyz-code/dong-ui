import React, { createContext, useState } from 'react';
import { defaultFiles } from './files';
import { fileName2Language } from './utils';

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContext {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (name: string) => void;
  addFile: (filename: string) => void;
  setFiles: (files: Files) => void;
  removeFile: (filename: string) => void;
  updateFileName: (oldName: string, newName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext);

export const PlaygroundProvider = ({ children }: React.PropsWithChildren) => {
  const [files, setFiles] = useState<Files>(defaultFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx');

  const addFile = (filename: string) => {
    setFiles({
      ...files,
      [filename]: {
        name: filename,
        language: fileName2Language(filename),
        value: '',
      },
    });
  };

  const removeFile = (filename: string) => {
    delete files[filename];
    setFiles({ ...files });
  };

  const updateFileName = (oldName: string, newName: string) => {
    if (!files[oldName] || !newName) return;

    const value = files[oldName].value;
    delete files[oldName];
    setFiles({
      ...files,
      [newName]: {
        name: newName,
        language: fileName2Language(newName),
        value,
      },
    });
  };

  const provideValue = {
    files,
    selectedFileName,
    setSelectedFileName,
    addFile,
    setFiles,
    removeFile,
    updateFileName,
  };

  return <PlaygroundContext.Provider value={provideValue}>{children}</PlaygroundContext.Provider>;
};

export const usePlayground = () => {
  const context = React.useContext(PlaygroundContext);
  return { ...context };
};
