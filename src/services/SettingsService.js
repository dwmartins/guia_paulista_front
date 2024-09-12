import { showError } from "@/helpers/showError";
import axios from "axios";
import AuthService from "./AuthService";

class SettingsService {
    async update(setting) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        try {
            return await axios.post('/settings', setting, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async getAll() {
        try {
            return axios.get('/settings');
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new SettingsService();