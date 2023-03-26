export interface FileReadHandlers {
  onload: (result: string, event: ProgressEvent<FileReader>) => void;
  onerror: (event: ProgressEvent<FileReader>) => void;
  onprogress: (event: ProgressEvent<FileReader>) => void;
  onabort: (event: ProgressEvent<FileReader>) => void;
}

export interface URLDownload {
  name: string;
  url: string;
}

export interface IOnClick {
  onClick: (...args: unknown[]) => unknown;
}
