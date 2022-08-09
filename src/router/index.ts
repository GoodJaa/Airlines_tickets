import { createRouter, createWebHistory } from 'vue-router'
import TicketsFilterView from '../views/TicketsFilterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TicketsFilterView
    },
  ]
})

export default router
