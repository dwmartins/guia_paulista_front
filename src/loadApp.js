import SiteInfoService from "@/services/SiteInfoService";
import { siteInfoStore } from "@/store/siteInfoStore";
import AuthService from "@/services/AuthService";
import { setLanguage } from "./translation";
import { settingsStore } from "./store/SettingsStore";

export default async function loadApp() {
    try {
        const response = await SiteInfoService.getSiteInfo();
        const data = response.data;

        siteInfoStore.updateConstants(data.siteInfo);
        settingsStore.setSettings(data.settings);

        AuthService.setUserStore();

        const [language] = data.settings.filter(item => item.name === "language");

        if (language) {
            await setLanguage(language.value);
        } else {
            await setLanguage('pt-br');
        }

        return Promise.resolve();
    } catch (error) {
        console.error("Failed to load constants", error);
        return Promise.reject(error);
    }
}