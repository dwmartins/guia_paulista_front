import axios from '@/http';
import { userStore } from '@/store/userStore';
import { showAlert } from '@/helpers/showAlert';
import { router } from '@/router';
import { showError } from '@/helpers/showError';
import { showText } from '@/translation';

class AuthService {
    getUserLogged() {
        let user = sessionStorage.getItem('userData');

        if(!user) {
            user = localStorage.getItem('userData');
        }

        return user ? JSON.parse(user) : null;
    }

    validateLoggedUser() {
        const user = this.getUserLogged();

        if (!user) {
            showAlert("error", showText('TITLE_ERROR_MESSAGE'), showText('NOT_LOGGED'))
            this.logout();
            router.push('/login');
            return null;
        }

        return user;
    }

    getBearer() {
        const user = this.getUserLogged();
        return `Bearer token:${user.token}`
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

        if(sessionStorage.getItem('userData')) {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem('userData');
            return;
        } 

        if(localStorage.getItem('userData')) {
            localStorage.removeItem('userData');
            localStorage.setItem('userData');
            return;
        } 
    }

    auth() {
        const user = this.getUserLogged();

        if(!user) {
            const error = new Error(showText('NOT_LOGGED'));
            error.statusCode = 401;
            return Promise.reject(error);
        }

        return axios.get('/auth/auth', {
            headers: {
                'Authorization': this.getBearer(),
                'userId': user.id
            }
        });
    }

    async login(credentials) {
        try {
            return await axios.post('/auth/login', credentials);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');
        userStore.clean();
    }
}

export default new AuthService();
