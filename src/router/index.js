import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '@/views/main/OrderView.vue'

const routes = [
  {
    path: '/orderview',
    name: 'OrderView',
    component: OrderView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
