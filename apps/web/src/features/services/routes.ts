import router from 'app/routes';
import { ServiceList } from './views';

router.addRoute({
  path: '/services',
  name: 'services',
  component: ServiceList,
});

export default {};
