import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'Accueil',
            component: () => import('./components/Home.vue'),
        },
        {
            path: '/a-propos',
            name: 'A propos',
            component: () => import('./components/About.vue'),
        },
        {
            path: '/nous-soutenir',
            name: 'Nous soutenir',
            component: () => import('./components/SupportUs.vue'),
        },
        {
            path: '/ajouter-votre-profil',
            name: 'Ajouter votre profil',
            component: () => import('./components/AddProfile.vue'),
        },
        {
            path: '/contact',
            name: 'Contact',
            component: () => import('./components/Contact.vue'),
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});

export default router;
