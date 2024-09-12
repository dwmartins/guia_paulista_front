import axios from '@/http';
import { showError } from '@/helpers/showError';
import AuthService from './AuthService';

class EmailService {
    async getEmailSettings() {
        const user = AuthService.checkAuth();
        if (!user) return false;

        try {
            return await axios.get('/emailconfig', {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateSettings(settings) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        try {
            return await axios.post('/emailconfig', settings, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async sendMessageContact(data) {
        try {
            return await axios.post('/email/contact', data);
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new EmailService();