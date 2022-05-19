import 'bulma';
import './assets/styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@oruga-ui/oruga-next/dist/oruga.css';

import { createApp } from 'vue';

import Oruga from '@oruga-ui/oruga-next';

import App from './App.vue';
import router from './router';

createApp(App).use(router).use(Oruga).mount('#app')
