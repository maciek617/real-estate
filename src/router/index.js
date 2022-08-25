import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'
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
        component: () => import('../views/pages/FindHouse')
    },
    {
        path: '/:title/:id',
        name: 'house',
        component: () => import('../views/pages/HouseView')
    },
    {
        path: '/events',
        name: 'events',
        component: () => import('../views/pages/EventsView')
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('../views/pages/PricingView')
    },
    {
        path: '/future',
        name: 'future',
        component: () => import('../views/pages/FutureView')
    },
    {
        path: '/newsletter',
        name: 'newsletter',
        component: () => import('../views/pages/NewsletterView')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/pages/ContactView')
    },
    {
        path: '/founders',
        name: 'founders',
        component: () => import('../views/pages/FoundersView')
    },
    {
        path: '/developers',
        name: 'developers',
        component: () => import('../views/pages/DevelopersView')
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('../views/pages/TermsView')
    },
    {
        path: '/news',
        name: 'news',
        component: () => import('../views/pages/NewsView')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth_pages/LoginView')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/auth_pages/SignupView')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../views/auth_pages/ForgotPassword')
    },
    {
        path: '/profile/:user',
        name: 'profile',
        component: () => import('../views/profile_pages/ProfileVIew')
    },
    {
        path: '/profile/edit',
        name: 'edit-profile',
        component: () => import('../views/profile_pages/ProfileViewEdit'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/posts/:id',
        name: 'posts-list',
        component: () => import('../views/PostsLists'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/post/:id',
        name: 'edit-post',
        component: () => import('../views/EditPost'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/app/create/:id',
        name: 'create-post',
        component: () => import('../views/FindHouseAppCreatePost'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: "not-found",
        component: () => import('../views/pages/PageNotFound'),
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
