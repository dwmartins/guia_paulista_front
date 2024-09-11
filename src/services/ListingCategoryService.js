import axios from '@/http';
import { showError } from '@/helpers/showError';
import AuthService from './AuthService';

class ListingCategoryService {
    async fetch() {
        try {
            return await axios.get('/listing/category');
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async create(category) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        const formData = new FormData();

        for (let key in category) {
            if(category[key]) {
                formData.append(key, category[key]);
            }
        }

        try {
            const response = await axios.post('/listing/category', formData, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });

            return response;
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async delete(categoryId) {
        const user = AuthService.checkAuth();
        if (!user) return false;

        try {
            const response = await axios.delete(`/listing/category/${categoryId}`, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });

            return response;
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async deleteMultiples(ids) {
        const user = AuthService.checkAuth();
        if (!user) return false;
        
        try {
            return await axios.post('/listing/category/delete-multiples', ids, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new ListingCategoryService();