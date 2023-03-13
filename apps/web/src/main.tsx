import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes';
import '@/assets/base.css';

const AppElement = document.querySelector('#app');

function MainWrapper() {
  return (
    <React.StrictMode>
      <div className="text-color-default dark:text-color-dark bg-shade-light dark:bg-shade-dark m-0 h-screen w-screen p-0 font-sans text-base antialiased transition-colors">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(AppElement!).render(MainWrapper());
