import axios from '@/http';
import { userStore } from '@/store/userStore';
import { showAlert } from '@/helpers/showAlert';
import { router } from '@/router';

class AuthService {
    teste() {
        router.push("/")
        console.log("teste")
    }
    getUserLogged() {
        const user = localStorage.getItem('userData');
        return user ? JSON.parse(user) : null;
    }

    validateLoggedUser() {
        const user = this.getUserLogged();
        if (!user) {
            showAlert("error", "Erro", "Token não fornecido, realize o login novamente.")
            this.logout();
            router.push('/login');
            return null;
        }

        return user;
    }

    getBearer() {
        const user = this.getUserLogged();
        return `Bearer userId:${user.id} token:${user.token}`
    }

    setUserLogged(userData) {
        userStore.updateUserLogged(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    getPermissions() {
        const userData = localStorage.getItem('userData');

        if(userData) {
            const user = JSON.parse(userData);
            return user.permissions
        }
    }

    setUserStore() {
        const user = this.getUserLogged();
        if(user) {
            userStore.updateUserLogged(user);
        }
    }

    updateUserLogged(userData) {
        localStorage.removeItem('userData');
        userStore.updateUserLogged(userData);
        this.setUserLogged(userData);
    }

    auth() {
        const user = this.getUserLogged();

        if(!user) {
            const error = new Error('Token não fornecido, realize o login novamente.');
            error.statusCode = 401;
            return Promise.reject(error);
        }

        return axios.get('/auth/auth', {
            headers: {
                'Authorization': `Bearer userId:${user.id} token:${user.token}`,
            }
        });
    }

    login(credentials) {
        return axios.post('/auth/login', credentials);
    }

    logout() {
        localStorage.removeItem('userData');
        userStore.clean();
    }
}

export default new AuthService();
