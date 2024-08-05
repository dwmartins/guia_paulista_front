import AuthService from "@/services/AuthService";
import { router } from "@/router";
import { showAlert } from "./showAlert";
import { showText } from "@/translation";

export function showError(error) {
    console.error('ERROR', error);

    if(error.response.status && error.response.status === 401) {
        if(error.response.data.invalidToken) {
            showAlert('error', '', error.response.data.invalidToken);

            AuthService.logout();
            if(router) {
                router.push('/login');
            }
            
            return;
        }

        if(error.response.data.expiredToken) {
            showAlert('error', '', error.response.data.expiredToken);

            AuthService.logout();
            if(router) {
                router.push('/login');
            }

            return;
        }

        if(error.response.data.invalidPermission) {
            showAlert('error', '', error.response.data.invalidPermission);

            AuthService.logout();
            if(router) {
                router.push('/login');
            }

            return;
        }

        showAlert('error', '', error.response.data.message);

        return;
    }

    if(error.response.status && error.response.status === 400) {
        showAlert('error', '', error.response.data.message);
        return;
    }

    if(error.response.status && error.response.status === 409) {
        showAlert('error', '', error.response.data.message);
        return;
    }

    if(error.response.status && error.response.status === 403) {
        if(error.response.data.invalidPermission) {
            showAlert('error', '', error.response.data.invalidPermission);
            
            AuthService.logout();
            router.push('/login');
            return;
        }
    }

    if(error.response.status === 500) {
        showAlert('error', '', error.response.data.message);
        return;
    }

    showAlert('error', '', showText('FATAL_ERROR'));
}