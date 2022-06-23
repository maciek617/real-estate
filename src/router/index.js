import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/our-offices',
    name: 'our-offices',
    component: () => import('../views/OurOfficesView')
  },
  {
    path: '/our-consultants',
    name: 'our-consultants',
    component: () => import('../views/OurConsultantsView')
  },
  {
    path: '/open-office',
    name: 'open-office',
    component: () => import('../views/OpenOfficeView')
  },
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
