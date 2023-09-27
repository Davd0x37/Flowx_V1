import router from 'app/routes';
import { Authenticate, UserDefault, UserDetails, UserSettings } from './views';

router.addRoute({
  path: '/user',
  name: 'user',
  component: UserDefault,
  children: [
    { path: 'authenticate', name: 'user-authenticate', component: Authenticate },
    { path: 'user-details', name: 'user-details', component: UserDetails },
    { path: 'settings', name: 'user-settings', component: UserSettings },
  ],
});

export default {};
