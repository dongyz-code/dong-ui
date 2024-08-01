import { setupTypeAcquisition } from '@typescript/ata';
import typescript from 'typescript';

export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'playground',
    typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log('Received file:', path);
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}
