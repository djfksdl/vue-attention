import { createRouter, createWebHistory } from 'vue-router'
import OrderCoffeeView from '@/views/main/OrderCoffeeView.vue'

const routes = [
  {
    path: '/ordercoffeeview',
    name: 'OrderCoffeeView',
    component: OrderView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
