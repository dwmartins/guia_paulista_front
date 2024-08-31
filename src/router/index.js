import { createRouter, createWebHistory } from 'vue-router';
import { showText } from '@/translation';
import PublicLayout from "@/layouts/PublicLayout.vue";
import HomeView from "@/views/public/HomeView.vue";
import LoginView from '@/views/public/LoginView.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import RegisterView from '@/views/public/RegisterView.vue';
import PanelView from '@/views/public/user/PanelView.vue';
import AuthService from '@/services/AuthService';
import { loadingPageStore } from '@/store/loadingPageStore';
import ProfileView from '@/views/public/user/ProfileView.vue';
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
                    path: showText('PATH_USER_PANEL'),
                    component: PanelView,
                    meta: { requiresAuth: true }
                },
                {
                    path: showText('PATH_PROFILE'),
                    component: ProfileView,
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
                },
                {
                    path: showText('PATH_DASHBOARD'),
                    component: () => import('@/views/admin/DashboardView.vue')
                },
                {
                    path: 'usuarios',
                    component: () => import('@/views/admin/UsersView.vue')
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
            redirect: `/app`
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
        const allowedRoles = ["support", "admin", "mod", "test"];
        
        // Function that handles authentication and displays the loading screen
        const handleAuth = () => {
            loadingPageStore.show();
            return AuthService.auth()
                .finally(() => loadingPageStore.hide());
        };
    
        // Redirects to the maintenance page
        const redirectToMaintenance = () => {
            return next({ path: showText('PATH_MAINTENANCE') });
        };
    
        // Redirects to the home page
        const redirectToHome = () => {
            return next({ path: '/' });
        };
    
        // Redirects to the admin login page
        const redirectToLoginAdmin = () => {
            return next({ path: showText('PATH_ADM_LOGIN') });
        };
    
        // Checks if maintenance mode is enabled
        // Returns false if the user should be redirected to the maintenance page, interrupting navigation
        const checkMaintenanceMode = () => {
            const userLogged = AuthService.getUserLogged();
    
            // If the user is logged in and is a superuser, it does not enter maintenance mode
            if(userLogged && allowedRoles.includes(userLogged.role)) {
                return true;
            }
            
            // If maintenance mode is enabled and the user is not on allowed routes, redirect
            if (maintenanceMode && to.path !== showText('PATH_MAINTENANCE') && !to.path.startsWith('/app') && to.path !== showText('PATH_ADM_LOGIN')) {
                redirectToMaintenance();
                return false;
            }
    
            return true;
        };
    
        // Checks if the user has the appropriate permission to access the route
        // Returns false and redirects to the home page if the user does not have permission
        const checkUserRole = (role) => {
            if (allowedRoles.includes(role)) {
                return true;
            } else {
                showAlert('error', '', showText('NOT_HAVE_PERMISSION_ACCESS_AREA'));
                redirectToHome();
                return false;
            }
        };
    
        // Check maintenance mode before anything else
        if (!checkMaintenanceMode()) return;
    
        // Check if the route requires authentication
        if (requiresAuth) {
            handleAuth()
                .then(() => next())
                .catch(redirectToHome);
        } else if (requiresAuthAdmin && isEnteringApp) {
            // Checks if the user is trying to enter the admin area and is authenticated
            handleAuth()
                .then(response => {
                    if (checkUserRole(response.data.role)) {
                        next();
                    }
                })
                .catch(redirectToLoginAdmin);
        } else {
            next();
        }
    });

    return router;
}

export { router }; 