export const resolveUrl = (path: string | URL, base?: string | URL) => new URL(path, base);

// export const createSearchParameters = (parameters: Record<string, string>): URLSearchParams => {
//   const paramsInstance = new URLSearchParams(parameters);
// }
