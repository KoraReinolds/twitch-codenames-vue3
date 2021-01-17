import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/video_overlay.html',
    name: 'VideoOverlay',
    component: () => import('../views/VideoOverlay.vue')
  },
  {
    path: '/panel.html',
    name: 'Panel',
    component: () => import('../views/Panel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
