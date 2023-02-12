import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';

function MainBoilerplate() {
  return (
    // <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="authorize/:serviceName" element={<App />} />
            {/* <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route> */}
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There is nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    // {/* </React.StrictMode> */}
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(MainBoilerplate());
