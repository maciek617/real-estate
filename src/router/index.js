import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/find',
    name: 'find-house',
    component: () => import('../views/OurOfficesView')
  },
  {
    path: '/our-consultants',
    name: 'our-consultants',
    component: () => import('../views/OurConsultantsView')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/OpenOfficeView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
