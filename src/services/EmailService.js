import axios from '@/http';
import { showError } from '@/helpers/showError';

class EmailService {
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