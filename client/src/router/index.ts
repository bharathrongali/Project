import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from '../pages/Login.vue';
import Tasks from '../pages/Tasks.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Login },
  { path: '/tasks', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'is-active',
})

export default router;