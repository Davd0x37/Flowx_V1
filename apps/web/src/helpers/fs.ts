import { FileReadHandlers } from '@/types/fs';

export const readFile = (file: File, handlers: FileReadHandlers): void => {
  const reader = new FileReader();

  reader.onload = function onload(event) {
    // Because of readAsText - line 15
    handlers.onload(reader.result as string, event);
  };

  reader.onerror = handlers.onerror;
  reader.onprogress = handlers.onprogress;
  reader.onabort = handlers.onabort;

  reader.readAsText(file);
};

export const generateDownloadUrl = (data: string | ArrayBuffer): string => {
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  });

  const url = URL.createObjectURL(blob);
  return url;
};
