import { MutableRefObject, useEffect, useState } from 'react';

import { internalGuard } from '../helpers';

export default (elementRef: MutableRefObject<HTMLElement>, defaultState = false) => {
  const wnd = internalGuard('IntersectionObserver');

  const [isOnScreen, setIsOnScreen] = useState(defaultState);

  useEffect(() => {
    if (!elementRef?.current) {
      return;
    }

    const observer = new wnd.IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnScreen(entry.intersectionRatio > 0);
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return isOnScreen;
};
