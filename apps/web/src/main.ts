import { createApp } from 'vue';
// Plugins
import plugins from 'app/plugins';
import App from './App.vue';
import routes from './routes';

const app = createApp(App);

app.use(routes);

plugins.forEach((plugin) => {
  plugin(app);
});

app.mount('#app');
