import { RouteRecordRaw } from 'vue-router';

import ServiceList from './views/ServiceList.vue';

export default {
  path: '/services',
  name: 'services',
  component: ServiceList,
} as RouteRecordRaw;
