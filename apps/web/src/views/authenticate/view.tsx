import { Button, Tab, Tabs } from '@/components';
import { useCallback, useMemo, useState } from 'react';
import { Login } from './login';
import { Register } from './register';

// @TODO: use tabs
export const AuthenticateView = () => {
  return (
    <div className="relative">
      <div className="m-auto max-w-md rounded-md bg-white text-gray-900 drop-shadow-md">
        <Tabs centered stretched>
          <Tab title="login">
            <Login />
          </Tab>
          <Tab title="register">
            <Register />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
