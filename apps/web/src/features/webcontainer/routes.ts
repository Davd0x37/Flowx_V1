import router from 'app/routes';
import { WebContainer } from './views';

router.addRoute({
  path: '/webcontainer',
  name: 'webcontainer',
  component: WebContainer,
});

export default {};
