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
import { settingsStore } from '@/store/SettingsStore';
import { showAlert } from '@/helpers/showAlert';

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
                }
            ]
        },
        {
            path: '/app',
            component: AdminLayout,
            meta: { requiresAuthAdmin: true },
            children: [
                {
                    path: '',
                    component: () => import('@/views/admin/DashboardView.vue')
                }
            ]
        },
        {
            path: showText('PATH_ADM_LOGIN'),
            component: () => import('@/views/admin/LoginView.vue')
        },
        {
            path: showText('PATH_MAINTENANCE'),
            component: () => import('@/views/public/MaintenanceView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },
        {
            path: '/app/:pathMatch(.*)*',
            redirect: `/app${showText('PATH_DASHBOARD')}`
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
        const { requiresAuth, requiresAuthAdmin } = to.meta;
        const isEnteringApp = to.path.startsWith('/app') && !from.path.startsWith('/app');
        const maintenanceMode = settingsStore.getSetting('maintenance') === "on";
        
        const handleAuth = () => {
            loadingPageStore.show();
            return AuthService.auth()
                .finally(() => loadingPageStore.hide());
        };
    
        const redirectToMaintenance = () => {
            next({ path: showText('PATH_MAINTENANCE') });
        };
    
        const redirectToHome = () => {
            next({ path: '/' });
        };
    
        const checkMaintenanceMode = () => {
            if (maintenanceMode && to.path !== showText('PATH_MAINTENANCE') && !to.path.startsWith('/app')) {
                return redirectToMaintenance();
            }
        };
    
        const checkUserRole = (role) => {
            const allowedRoles = ["support", "admin", "mod", "test"];
            if (allowedRoles.includes(role)) {
                next();
            } else {
                showAlert('error', '', showText('NOT_HAVE_PERMISSION_ACCESS_AREA'));
                redirectToHome();
            }
        };
    
        // Check maintenance mode
        checkMaintenanceMode();
    
        // Check authentication
        if (requiresAuth) {
            handleAuth()
                .then(() => next())
                .catch(redirectToHome);
        } else if (requiresAuthAdmin && isEnteringApp) {
            handleAuth()
                .then(response => checkUserRole(response.data.role))
                .catch(redirectToHome);
        } else {
            next();
        }
    });

    return router;
}

export { router }; 