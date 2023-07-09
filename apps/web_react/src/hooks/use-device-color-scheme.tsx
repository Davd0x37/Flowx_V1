import { useState } from 'react';

import { internalGuard } from 'app/helpers';

export default () => {
  const wnd = internalGuard('matchMedia');

  const deviceColorScheme = wnd.matchMedia('(prefers-color-scheme: dark)');

  // Reactive value
  const [isDark, setIsDark] = useState(deviceColorScheme.matches);

  // Handler for listening on device color scheme change
  const mediaQueryHandler = (ev: MediaQueryListEvent) => {
    setIsDark(ev.matches);
  };

  deviceColorScheme.addEventListener('change', mediaQueryHandler);

  const unsubscribeMedia = () => deviceColorScheme.removeEventListener('change', mediaQueryHandler);

  return {
    isDark,
    unsubscribeMedia,
  };
};
