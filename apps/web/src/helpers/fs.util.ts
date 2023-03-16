import { FileReadHandlers } from '@/types';

export const readFile = (file: File, handlers: FileReadHandlers): void => {
  const reader = new FileReader();

  reader.onload = function onload(event) {
    handlers.onload(reader.result as string, event);
  };

  reader.onerror = handlers.onerror;
  reader.onprogress = handlers.onprogress;
  reader.onabort = handlers.onabort;

  reader.readAsText(file);
};

export const createDownloadURL = (data: string | ArrayBuffer): string => {
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  });

  const url = URL.createObjectURL(blob);
  return url;
};
