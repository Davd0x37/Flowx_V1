export interface FileSchema {
  encryption: {
    salt: string;
  };
  data: string;
}
