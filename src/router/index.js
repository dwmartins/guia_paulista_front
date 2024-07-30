import { createRouter, createWebHistory } from 'vue-router';
import { showText } from '@/translation';
import PublicLayout from "@/layouts/PublicLayout.vue";
import HomeView from "@/views/public/HomeView.vue";
import LoginView from '@/views/public/LoginView.vue';

let router = null;

export function initializeRoutes() {
    const routes = [
        {
            path: "/",
            component: PublicLayout,
            children: [
                {
                    path: "",
                    component: HomeView
                },
                {
                    path: showText('PATH_LOGIN'),
                    component: LoginView
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },
    ];

    router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    });

    return router;
}

export { router }; 