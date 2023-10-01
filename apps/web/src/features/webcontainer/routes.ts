import { Code } from 'app/assets/icons';
import router from 'app/routes';
import { WebContainer } from './views';

router.addRoute({
  path: '/webcontainer',
  name: 'webcontainer',
  component: WebContainer,
  meta: {
    title: 'webcontainer.title',
    icon: Code,
  },
});

export default {};
