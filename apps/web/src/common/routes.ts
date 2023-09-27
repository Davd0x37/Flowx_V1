import { RouteRecordNormalized } from 'vue-router';

export const castVueRoutesToNestedObject = (routes: RouteRecordNormalized[]) => {
  // console.log(routes);

  const routesMap = new Map();
  routes.forEach((route) => {
    if (routesMap.has(route.name)) {
      routesMap.set(route.name, { ...routesMap.get(route.name), ...route });
    } else {
      routesMap.set(route.name, route);
    }

    route.children.forEach(({ name }) => routesMap.delete(name));
  });

  return routesMap;
};
