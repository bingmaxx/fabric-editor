import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'index', component: () => import('@/views/editor/index.vue') }]
})

export default router
