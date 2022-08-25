import { createApp } from 'vue';
import store from '@/store';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import 'normalize.css/normalize.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.config.globalProperties.$store = store;
app.mount('#app');