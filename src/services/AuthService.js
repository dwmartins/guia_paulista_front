import axios from '@/http';
import { userStore } from '@/store/userStore';
import { showAlert } from '@/helpers/showAlert';
import { router } from '@/router';
import { showError } from '@/helpers/showError';
import { showText } from '@/translation';
import { allowedRoles } from '@/helpers/constants';

class AuthService {
    isAdmin() {
        const user = this.getUserLogged();

        if(user) {
            return allowedRoles.includes(user.role);
        }

        return false;
    }

    getUserLogged() {
        let user = sessionStorage.getItem('userData');

        if(!user) {
            user = localStorage.getItem('userData');
        }

        return user ? JSON.parse(user) : null;
    }

    checkAuth() {
        const user = this.getUserLogged();

        if (!user) {
            showAlert("error", '', showText('NOT_LOGGED'))
            this.logout();
            router.push('/login');
            return null;
        }

        return user;
    }

    getBearer() {
        const user = this.getUserLogged();
        return `Bearer ${user.token}`
    }

    setUserLogged(userData, rememberMe) {
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');

        userStore.updateUserLogged(userData);

        if(rememberMe) {
            localStorage.setItem('userData', JSON.stringify(userData));
            return;
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
    }

    // getPermissions() {
    //     const userData = localStorage.getItem('userData');

    //     if(userData) {
    //         const user = JSON.parse(userData);
    //         return user.permissions
    //     }
    // }

    setUserStore() {
        const user = this.getUserLogged();
        if(user) {
            userStore.updateUserLogged(user);
        }
    }

    updateUserLogged(userData) {
        userStore.updateUserLogged(userData);
        let user = this.getUserLogged();
        user = {...user, ...userData};

        if(sessionStorage.getItem('userData')) {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem('userData', JSON.stringify(user));
            return;
        } 

        if(localStorage.getItem('userData')) {
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(user));
            return;
        } 
    }

    async auth() {
        const user = this.getUserLogged();

        if(!user) {
            showAlert('error', '', showText('NOT_LOGGED'));
            const error = new Error(showText('NOT_LOGGED'));
            error.statusCode = 401;
            return Promise.reject(error);
        }

        try {
            return await axios.get('/auth/auth', {
                headers: {
                    'Authorization': this.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async login(credentials) {
        try {
            return await axios.post('/auth/login', credentials);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    logout(showMessage = false) {
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');
        userStore.clean();

        router.push('/');

        if(showMessage) {
            showAlert('success', '', showText('LOGOUT_MESSAGE'));
        }
    }
}

export default new AuthService();
