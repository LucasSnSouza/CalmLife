import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EnvironmentView from '../views/EnvironmentView.vue'
import MarketView from '../views/MarketView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: "Inicio" }
    },
    {
      path: '/environment',
      name: 'environment',
      component: EnvironmentView,
      meta: { title: "Ambientes" }
    },
    {
      path: '/market',
      name: 'market',
      component: MarketView,
      meta: { title: "Lista de Compras" }
    },
  ],
})

export default router
