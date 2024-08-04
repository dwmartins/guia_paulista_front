import { createRouter, createWebHistory } from 'vue-router';
import { showText } from '@/translation';
import PublicLayout from "@/layouts/PublicLayout.vue";
import HomeView from "@/views/public/HomeView.vue";
import LoginView from '@/views/public/LoginView.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import RegisterView from '@/views/public/RegisterView.vue';
import ProfileView from '@/views/public/ProfileView.vue';

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
                },
                {
                    path: showText('PATH_NEW_ACCOUNT'),
                    component: RegisterView
                },
                {
                    path: showText('PATH_PROFILE'),
                    component: ProfileView
                }
            ]
        },
        {
            path: '/app',
            component: AdminLayout,
            meta: { requiresAuthAdmin: true },
            children: [
                {
                    path: showText('PATH_DASHBOARD'),
                    component: () => import('@/views/admin/DashboardView.vue'),
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },
        {
            path: '/app/:pathMatch(.*)*',
            redirect:`app/${showText('PATH_DASHBOARD')}`
        }
    ];

    router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
              return savedPosition;
            } else {
              return { top: 0 };
            }
          }
    });

    return router;
}

export { router }; 