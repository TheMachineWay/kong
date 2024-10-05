import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/PageHome.vue'),
  },
  {
    path: '/organization',
    name: 'organization',
    component: () => import('../views/PageOrganization.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/PageSettings.vue'),
  },
  {
    path:'/:pathMatch(.*)',
    name: 'bad-not-found',
    component: () => import('../views/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
