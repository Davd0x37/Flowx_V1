export const GET_REDIRECT_URI = (name: string): string => `${window.location.origin}/authorize/${name}`;
