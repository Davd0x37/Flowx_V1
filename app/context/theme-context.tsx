import React, { createContext } from 'react';

interface IThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({
  theme: 'dark',
  setTheme: (theme) => {},
});
