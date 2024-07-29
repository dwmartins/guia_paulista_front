import SiteInfoService from "@/services/SiteInfoService";
import { siteInfoStore } from "@/store/siteInfoStore";
import AuthService from "@/services/AuthService";
import { setLanguage } from "./translation";

export default async function loadApp() {
    try {
        const response = await SiteInfoService.getSiteInfo();
        const data = response.data;
        siteInfoStore.updateConstants(data.siteinfo);
        AuthService.setUserStore();

        const [language] = data.settings.filter(item => item.name === "language");

        if (language) {
            setLanguage(language.value);
        } else {
            setLanguage('pt-br');
        }

        return Promise.resolve();
    } catch (error) {
        console.error("Failed to load constants", error);
        return Promise.reject(error);
    }
}