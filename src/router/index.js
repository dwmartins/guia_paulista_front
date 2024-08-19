import { createRouter, createWebHistory } from 'vue-router';
import { showText } from '@/translation';
import PublicLayout from "@/layouts/PublicLayout.vue";
import HomeView from "@/views/public/HomeView.vue";
import LoginView from '@/views/public/LoginView.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import RegisterView from '@/views/public/RegisterView.vue';
import ProfileView from '@/views/public/ProfileView.vue';
import AuthService from '@/services/AuthService';
import { loadingPageStore } from '@/store/loadingPageStore';
import ProfileInfoView from '@/views/public/ProfileInfoView.vue';
import ContactView from '@/views/public/ContactView.vue';

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
                    component: ProfileView,
                    meta: { requiresAuth: true }
                },
                {
                    path: showText('PATH_PROFILE_INFO'),
                    component: ProfileInfoView,
                    meta: { requiresAuth: true }
                },
                {
                    path: showText('PATH_CONTACT'),
                    component: ContactView
                },
                {
                    path: showText('PATH_MAINTENANCE'),
                    component: () => import('@/views/public/MaintenanceView.vue'),
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

    router.beforeEach((to, from, next) => {
        const { requiresAuth } = to.meta;
    
        if(requiresAuth) {
            loadingPageStore.show();
            AuthService.auth()
                .then(() => {
                    loadingPageStore.hide();
                    next();
                })
                .catch(() => {
                    loadingPageStore.hide();
                    next({ path: '/' });
                })
        } else {
            next();
        }
    });

    return router;
}

export { router }; 