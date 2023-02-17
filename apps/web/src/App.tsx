import { useEffect, useMemo } from 'react';

import { Tab, Tabs } from '@flowx/ui';
import '@flowx/ui/style';

import { ThemeContext } from './context/ThemeContext';
import { debug } from './helpers';
import useDeviceColorScheme from './hooks/use-device-color-scheme';
import {
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
  const setTheme = () => {};

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

      // const serverConfig = await generateServerConfig({
      //   server: 'https://accounts.spotify.com',
      //   clientId: 'd25bc7a3d320492ab31175f5d881a6af',
      //   clientSecret: 'd590a7177f354dbc8b16837b07f23334'
      // })
      const serverConfig = await generateServerConfig({
        server: 'https://accounts.spotify.com',
        clientId: 'd25bc7a3d320492ab31175f5d881a6af',
        clientSecret: 'd590a7177f354dbc8b16837b07f23334',
        authorizationEndpoint: '/authorize',
        tokenEndpoint: '/api/token',
        discoveryEndpoint: '.well-known/openid-configuration',
      });

      // const codeVerifier = 'loY5DbB_ELxMzUOcwPxClxrJD7PATpqHm3yhJEPh2lw';
      // console.log('code', codeVerifier)

      //   const codeChallenge = await getCodeChallenge(codeVerifier);
      //   if (!codeChallenge) return;

      //   const optionsuri = {
      //     server: 'https://accounts.spotify.com/authorize',
      //     clientId: id,
      //     state: 'sdasdasdasd',
      //     responseType: '' as 'CODE',
      //     redirectUri: 'http://localhost:5173/authorize/spotify',
      //     scope: ['user-read-email'],
      //     codeChallenge: codeChallenge.codeChallenge,
      //     codeChallengeMethod: codeChallenge.codeChallengeMethod,
      //   };

      //   const url = generateAuthorizeUri(optionsuri);

      //   console.log(url);

      //   const urls = resolveUrl(window.location.href);

      //   if (validateAuthorizationResponse(urls, { state: 'sdasdasdasd' })) {
      //     const code = getCodeFromURL(url)!;
      //     console.log(code);

      //     const req = await requestTokens('https://accounts.spotify.com', '/api/token', {
      //       clientId: id,
      //       clientSecret: secret,
      //       code,
      //       grantType: 'AUTHORIZATION',
      //       redirectUri: 'http://localhost:5173/authorize/spotify',
      //       codeVerifier,
      //     });

      //     console.log(req);

      //     const req2 = await requestTokens('https://accounts.spotify.com', '/api/token', {
      //       clientId: id,
      //       clientSecret: secret,
      //       code,
      //       refreshToken: req.refreshToken,
      //       grantType: 'REFRESH_TOKEN',
      //       redirectUri: 'http://localhost:5173/authorize/spotify',
      //       codeVerifier,
      //     });

      //     console.log(req2);
      //   }
    })();

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
