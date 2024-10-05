import axios from '@/http';
import AuthService from './AuthService';
import { showError } from '@/helpers/showError';

class SiteInfoService {
    async getSiteInfo() {
        return  await axios.get('/siteinfo');
    }

    async updateImages(images) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        const formData = new FormData();

        for (let key in images) {
            if (images[key] !== null) {
                formData.append(key, images[key]);
            }
        }

        try {
            return await axios.post('/siteinfo/updateimages', formData, {
                headers: {
                  'Authorization': AuthService.getBearer(),
                  'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async update(infos) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        try {
            return await axios.post('/siteinfo', infos, {
                headers: {
                    'Authorization': AuthService.getBearer(),
                }
            });

        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new SiteInfoService();
