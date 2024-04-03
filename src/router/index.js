import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '@/views/main/MainMenu.vue'

const routes = [
  {
    path: '/mainmenu',
    name: 'MainMenu',
    component: MainMenu
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
