import { useState } from 'react';

import { Button, Tab, Tabs } from '@flowx/ui';
import '@flowx/ui/style';

import { ThemeContext } from './context/theme-context';

import './App.css';

export default function App() {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="App" className={theme}>
        <Tabs
          onTabChange={(e) => {
            console.log(e);
          }}
        >
          <Tab title="tab1">
            <Button onClick={() => changeTheme()}>Click me!</Button>
          </Tab>
          <Tab title="tab2">
            <span>testing tab</span>
          </Tab>
        </Tabs>
      </div>
    </ThemeContext.Provider>
  );
}
