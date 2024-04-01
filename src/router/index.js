import { createRouter, createWebHistory } from 'vue-router'
import OrderCofeeView from '@/views/main/OrderCofeeView.vue'

const routes = [
  {
    path: '/ordercoffeeview',
    name: 'OrderCoffeeView',
    component: OrderCofeeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
