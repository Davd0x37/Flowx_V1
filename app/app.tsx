import { useEffect, useMemo, useState } from 'react';

import { Tab, Tabs } from './components/atoms';
import { ThemeContext } from './context/theme-context';
import { debug, debugError } from './helpers';
import useDeviceColorScheme from './hooks/use-device-color-scheme';
import { Fetch } from './lib';
import {
  OAuthBaseAuthenticator,
  generateAuthorizeUri,
  generateCodeVerifier,
  generateServerConfig,
  getCodeChallenge,
  getCodeFromURL,
  requestTokens,
  validateAuthorizationResponse,
} from './services/oauth';
import { AppError } from './utils/error';
import { resolveUrl } from './utils/network.util';

import './App.css';

/**
 * Handle internalGuard here and display appropriate modal
 * it doesn't make sense to try/catch internalGuard exceptions everywhere
 * catch it only in specific locations where you are certain that
 * desired functionality is not crucial for app
 */
export default function App() {
  const { isDark, unsubscribeMedia } = useDeviceColorScheme();
  const theme = useMemo(() => (isDark ? 'dark' : 'light'), [isDark]);
  // const setTheme = () => {};
  const [link, setLink] = useState('');

  // const changeTheme = () => {
  //   setTheme(theme == 'dark' ? 'light' : 'dark');
  // };

  useEffect(() => {
    (async () => {
      // const codeVerifier = generateCodeVerifier();
      // if (!codeVerifier) {
      //   console.log(codeVerifier, 'error');
      //   return;
      // }
      try {
        // const options = {
        //   flow: 'authorization_code_pkce',
        //   server: 'https://accounts.spotify.com',
        //   clientId: 'd25bc7a3d320492ab31175f5d881a6af',
        //   clientSecret: 'd590a7177f354dbc8b16837b07f23334',
        //   authorizationEndpoint: '/authorize',
        //   tokenEndpoint: '/api/token',
        //   discoveryEndpoint: '/.well-known/openid-configuration',
        // };
        // const redirectUri = 'http://localhost:5173/authorize/spotify';
        // const state = auth.getRandomState();
        // const codeVerifier = auth.getCodeVerifier();
        // const { codeChallenge, codeChallengeMethod } = await auth.getCodeChallenge(codeVerifier);
        // const url = auth.getAuthenticationURL({
        //   state,
        //   redirectUri,
        //   codeChallenge,
        //   codeChallengeMethod,
        //   responseType: 'code',
        //   scope: ['user-read-email'],
        // });
        // setLink(url);
        // const urls = resolveUrl(window.location.href);
        // if (baseAuthenticator.validateResponse(urls, { state })) {
        //   const code = baseAuthenticator.getCodeFromURL(urls)!;
        //   const tokens = await baseAuthenticator.accessToken({
        //     code,
        //     codeVerifier,
        //     redirectUri,
        //   });
        //   console.log(tokens);
        //   // if (tokens) {
        //   //   const newTokens = await baseAuthenticator.refreshToken({
        //   //     refreshToken: tokens!.refreshToken,
        //   //   });
        //   //   console.log(newTokens);
        //   // }
        // }
      } catch (error) {
        debugError(error);
      }
    })();

    return () => {
      unsubscribeMedia();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="App" className={theme}>
        {link ? <a href={link}>AUTHORIZE</a> : ''}
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
