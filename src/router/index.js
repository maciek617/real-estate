import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '@/firebase/config'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/app',
        name: 'find-house',
        component: () => import('../views/FindHouse')
    },
    {
        path: '/:title/:id',
        name: 'house',
        component: () => import('../views/HouseView')
    },
    {
        path: '/events',
        name: 'events',
        component: () => import('../views/EventsView')
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
        path: '/newsletter',
        name: 'newsletter',
        component: () => import('../views/NewsletterView')
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
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/SignupView')
    },
    {
        path: '/profile/:user',
        name: 'profile',
        component: () => import('../views/ProfileVIew')
    },
    {
        path: '/profile/edit',
        name: 'edit-profile',
        component: () => import('../views/ProfileViewEdit'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/app/create',
        name: 'create-post',
        component: () => import('../views/FindHouseAppCreatePost'),
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            auth,
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            next('/')
        }
    } else {
        next()
    }
})


export default router
