import AuthService from "@/services/AuthService";
import { router } from "@/router";
import { showAlert } from "./showAlert";
import { showText } from "@/translation";

export function showError(error) {
    console.error('ERROR', error);

    const message = error.response?.data?.message;
    const shouldLogout = error.response?.data?.logout;
    const redirect = error.response?.data?.redirect;

    if (message) {
        showAlert('error', '', message);
    } else {
        showAlert('error', '', showText('FATAL_ERROR'));
    }

    if (shouldLogout) {
        AuthService.logout();
    } else if (redirect) {
        router.push('/');
    }
}