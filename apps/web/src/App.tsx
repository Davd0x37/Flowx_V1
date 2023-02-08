import { useEffect, useMemo, useState } from 'react';

import { Button, Tab, Tabs } from '@flowx/ui';
import '@flowx/ui/style';

import { ThemeContext } from './context/ThemeContext';
import useDeviceColorScheme from './hooks/use-device-color-scheme';

import './App.css';

export default function App() {
  const { isDark, unsubscribeMedia } = useDeviceColorScheme();
  const theme = useMemo(() => (isDark ? 'dark' : 'light'), [isDark]);
  const setTheme = () => {};

  // const changeTheme = () => {
  //   setTheme(theme == 'dark' ? 'light' : 'dark');
  // };

  useEffect(() => {
    return () => {
      unsubscribeMedia();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="App" className={theme}>
        <Tabs
          onTabChange={(e) => {
            console.log(e);
          }}
        >
          <Tab title="tab1">{/* <Button onClick={() => changeTheme()}>Click me!</Button> */}</Tab>
          <Tab title="tab2">
            <span>testing tab</span>
          </Tab>
        </Tabs>
      </div>
    </ThemeContext.Provider>
  );
}
