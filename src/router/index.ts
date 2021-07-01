import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/times'
  },
  {
    path: '/times',
    component: () => import ('../views/Times.vue')
  },
  {
    path: '/evaluation',
    component: () => import('../views/Evaluation.vue')
  },
  {
    path: '/settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
