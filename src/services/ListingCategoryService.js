import axios from '@/http';
import { showError } from '@/helpers/showError';

class ListingCategoryService {
    async fetch() {
        try {
            return await axios.get('/listing/category');
        } catch (error) {
            showError(error);
            throw error;
        }
    }
}

export default new ListingCategoryService();