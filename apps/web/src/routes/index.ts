import { createRouter, createWebHashHistory } from 'vue-router';

// import { createBrowserRouter } from 'react-router-dom';

// import App from 'app/app';
// import { Login, Register } from 'app/views/authenticate';
// import { Authorize } from 'app/views/authorize/main';
// import { R404 } from 'app/views/redirects/R404';

// export default createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: 'authorize/:service',
//         element: <Authorize />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <R404 />,
//   },
// ]);

const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
