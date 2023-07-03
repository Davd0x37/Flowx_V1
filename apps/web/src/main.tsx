import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Plugins
import 'app/plugins';
// Routes
import router from 'app/routes';

// Base styles - tailwind etc.
import 'app/assets/base.css';

const AppElement = document.querySelector('#app');

function MainWrapper() {
  return (
    <React.StrictMode>
      <div className="m-0 h-full min-h-screen w-screen bg-gray-200 p-0 font-sans text-base text-neutral-100 antialiased transition-colors">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(AppElement!).render(MainWrapper());
