import {createRouter, createWebHistory} from 'vue-router'
import RegistrationView from "@/views/RegistrationView.vue";
import LoginView from "@/views/LoginView.vue";
import LandingPageView from "@/views/LandingPageView.vue";
import GamesView from "@/views/GamesView.vue";
import ErrorView from "@/views/ErrorView.vue";
import LocationView from "@/views/LocationView.vue";
import GameView from "@/views/GameView.vue";
import LocationsView from "@/views/LocationsView.vue";
import AboutView from "@/views/AboutView.vue";

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
        path: '/game',
        name: 'gameRoute',
        component: GameView
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
        path: '/location/{locationId}',
        name: 'locationIdRoute',
        component: LocationView
    },
    {
        path: '/locations',
        name: 'locationsRoute',
        component: LocationsView
    },
    {
        path: '/about',
        name: 'aboutRoute',
        component: AboutView
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
