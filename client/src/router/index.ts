import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Add from '../pages/Add.vue';
import Login from '../pages/Login.vue';
import Tasks from '../pages/Tasks.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Login },
  { path: '/tasks', component: Tasks },
  { path: '/add', component: Add },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'is-active',
})

export default router;