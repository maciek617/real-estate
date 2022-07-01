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
  {
    path: '/download',
    name: 'download',
    component: () => import('../views/DownloadView')
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('../views/LocationView')
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView')
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('../views/PricingView')
  },
  {
    path: '/future',
    name: 'future',
    component: () => import('../views/FutureView')
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import('../views/GiftView')
  },
  {
    path: '/guest',
    name: 'guest',
    component: () => import('../views/GuestView')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView')
  },
  {
    path: '/investors',
    name: 'investors',
    component: () => import('../views/InvestorsView')
  },
  {
    path: '/carriers',
    name: 'carriers',
    component: () => import('../views/CarriersView')
  },
  {
    path: '/founders',
    name: 'founders',
    component: () => import('../views/FoundersView')
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('../views/WorkView')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
