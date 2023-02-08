import { MutableRefObject, useCallback, useEffect, useState } from 'react';

import { internalGuard } from '../helpers';
import { Fetch } from '../lib/Fetch';

export interface IRequestProps {
  url: string;
  token?: string;
}

export default (props: IRequestProps) => {
  const wnd = internalGuard('URL');

  const [url, setUrl] = useState(new wnd.URL(props.url));
  const [options, setOptions] = useState({});

  const changeURL = (newUrl: URL) => {
    setUrl(new wnd.URL(newUrl));
  };

  const parsePathName = (pathName: string) => (pathName[0] === '/' ? pathName : '/' + pathName);

  const addPath = (pathName: string): boolean => {
    if (url.pathname.includes(pathName)) {
      return false;
    }

    const copyURL = url;
    const path = parsePathName(pathName);
    copyURL.pathname += path;

    changeURL(copyURL);

    return true;
  };

  const removePath = (pathName: string): boolean => {
    const parsedPath = parsePathName(pathName);

    if (!url.pathname.includes(parsedPath)) {
      return false;
    }

    const copyURL = url;
    const _path = copyURL.pathname.replace(parsedPath, '');

    changeURL(copyURL);

    return true;
  };

  const addQuery = ([key, val]: [string, string]): void => {
    // const prefix = url.indexOf('?') !== -1 ? '&' : '?';
    // setUrl(new wnd.URL(url + `${prefix}${key}=${val}`));
  };
};
