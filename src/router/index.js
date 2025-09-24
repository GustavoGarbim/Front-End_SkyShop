import { createRouter, createWebHistory } from 'vue-router';

import Login from '../view/Login.vue';
import Register from '../view/Register.vue';
import Section from '../view/Section.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Section',
        component: Section
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;