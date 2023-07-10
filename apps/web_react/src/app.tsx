import { DefaultLayout } from 'app/layouts';
import { AuthenticateView } from './views/authenticate';

/**
 * Handle internalGuard here and display appropriate modal
 * it doesn't make sense to try/catch internalGuard exceptions everywhere
 * catch it only in specific locations where you are certain that
 * desired functionality is not crucial for app
 */
export default function App() {
  return (
    <DefaultLayout>
      <main>
        <AuthenticateView />
      </main>
    </DefaultLayout>
  );
}
