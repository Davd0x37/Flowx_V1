import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes';

const AppElement = document.querySelector('#app');

function MainWrapper() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(AppElement!).render(MainWrapper());
