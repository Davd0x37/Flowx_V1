import { createRouter, createWebHistory } from 'vue-router';
import { Authenticate, Home, NotFound } from 'app/views';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
