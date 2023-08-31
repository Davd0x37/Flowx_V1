import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { Authenticate, Home, NotFound, User, UserDetails, UserSettings } from 'app/views';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      { path: 'user-details', name: 'user-details', component: UserDetails },
      { path: 'settings', name: 'user-settings', component: UserSettings },
    ],
  },
  {
    path: '/services',
    name: 'services',
    component: Authenticate,
  },
  {
    path: '/authenticate',
    name: 'authenticate',
    component: Authenticate,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
