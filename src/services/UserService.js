import axios from '@/http';
import AuthService from './AuthService';
import { showError } from '@/helpers/showError';

class UserService {
    // async getUsers() {
    //     const user = AuthService.validateLoggedUser();
    //     if(!user) return false;

    //     try {
    //         return await axios.get('/user', {
    //             headers: {
    //                 'Authorization': AuthService.getBearer()
    //             }
    //         });
    //     } catch (error) {
    //         showError(error);
    //         throw error;
    //     }
    // }

    async create(userData) {
        try {
            return await axios.post('/user', userData);
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async update(userData) {
        const user = AuthService.checkAuth();
        if(!user) return false;

        try {
            return await axios.put(`/user/`, userData,{
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            }) 
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateAddress(userData) {
        const user = AuthService.checkAuth();
        if(!user) return false;

        try {
            return await axios.put(`/user/address`, userData,{
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            }) 
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updateSettings(settings) {
        const user = AuthService.checkAuth();
        if(!user) return false;

        try {
            return await axios.put(`/user/settings`, settings,{
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            }) 
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async updatePassword(data) {
        const user = AuthService.checkAuth();
        if(!user) return false;

        try {
            return await axios.put(`/user/password`, data,{
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            }) 
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    async setPhoto(photo) {
        try {
            const user = AuthService.checkAuth();
            if(!user) return false;

            const formData = new FormData();
            formData.append('photo', photo);

            return await axios.post('/user/update-image', formData, {
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

    async delete(userId) {
        const user = AuthService.checkAuth();
        if(!user) return false;

        try {
            return await axios.delete(`/user/${userId}`, {
                headers: {
                    'Authorization': AuthService.getBearer()
                }
            });
        } catch (error) {
            showError(error);
            throw error;
        }
    }

    // async deleteMultiples(ids) {
    //     const user = AuthService.validateLoggedUser();
    //     if(!user) return false;

    //     try {
    //         return await axios.post(`/user/delete-multiples`, ids,{
    //             headers: {
    //                 'Authorization': AuthService.getBearer()
    //             }
    //         })
    //     } catch (error) {
    //         showError(error);
    //         throw error;
    //     }
    // }
}

export default new UserService();
