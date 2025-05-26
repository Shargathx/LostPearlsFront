import {createRouter, createWebHistory} from 'vue-router'
import RegistrationView from "@/views/RegistrationView.vue";
import LoginView from "@/views/LoginView.vue";
import LandingPageView from "@/views/LandingPageView.vue";
import GamesView from "@/views/GamesView.vue";
import ErrorView from "@/views/ErrorView.vue";
import LocationView from "@/views/LocationView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: LandingPageView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationView
    },
    {
        path: '/games',
        name: 'gamesRoute',
        component: GamesView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },

    {
        path: '/location',
        name: 'locationRoute',
        component: LocationView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
