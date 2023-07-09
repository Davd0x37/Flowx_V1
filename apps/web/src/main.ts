import { createApp } from 'vue';

import { createPinia } from 'pinia';

// Plugins
import 'app/plugins';

import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.mount('#app');
