import { createBrowserRouter } from 'react-router-dom';

import App from '@/app';
import { Authorize } from '@/views/authorize/main';
import { R404 } from '@/views/redirects/R404';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'authorize/:service',
        element: <Authorize />,
      },
    ],
  },
  {
    path: '*',
    element: <R404 />,
  },
]);
