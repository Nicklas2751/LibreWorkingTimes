import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: () => import ('../views/Times.vue')
  },
  {
    path: '/evaluation',
    component: () => import('../views/Evaluation.vue')
  },
  {
    path: '/settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/help',
    component: () => import('../views/Help.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
