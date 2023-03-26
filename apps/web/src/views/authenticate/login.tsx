import { Warning } from '@/assets/icons';
import { Button } from '@/components';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation(['common']);
  const [hasError, setHasError] = useState(true);

  return (
    <>
      <form>
        <div className="relative">
          <div className="flex flex-col space-y-6">
            <div>
              <label htmlFor="email" className="ml-1 block text-sm font-medium leading-normal">
                {t('Email')}
              </label>
              <div className="mt-1.5">
                <input
                  type="email"
                  placeholder="email@example.com"
                  id="email"
                  autoComplete="email"
                  className={`block w-full rounded-md border py-1.5 px-2 placeholder:text-gray-400 sm:text-sm ${
                    hasError ? 'border-red-400' : ''
                  }`}
                />
              </div>
              {hasError ? (
                <div className="error mt-1 ml-0.5 w-full text-sm text-red-400">
                  <span className="flex items-center">
                    <Icon icon={Warning} fontSize="1rem" className="mr-1 inline-block" />
                    User already exists
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>

            <div>
              <label htmlFor="password" className="ml-1 block text-sm font-medium leading-normal">
                {t('Password')}
              </label>
              <div className="mt-1.5">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  autoComplete="password"
                  className={`block w-full rounded-md border py-1.5 px-2 placeholder:text-gray-400 sm:text-sm ${
                    hasError ? 'border-red-400' : ''
                  }`}
                />
              </div>
              {hasError ? (
                <div className="error mt-1 ml-0.5 w-full text-sm text-red-400">
                  <span className="flex items-center">
                    <Icon icon={Warning} fontSize="1rem" className="mr-1 inline-block" />
                    Incorrect password
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>

            <Button type="submit">Login</Button>
          </div>
        </div>
      </form>
    </>
  );
};
