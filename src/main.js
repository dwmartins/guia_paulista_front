import { createApp } from 'vue'
import App from '@/App.vue'
import loadApp from '@/loadApp'
import { initializeRoutes } from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'element-plus/dist/index.css';
import '@/assets/css/global.css';
import '@/assets/css/animations.css';
import ElementPlus from 'element-plus'
import MetaManager from '@/helpers/MetaManager';
import { settingsStore } from '@/store/SettingsStore';
import en from 'element-plus/es/locale/lang/en';
import ptBr from 'element-plus/es/locale/lang/pt-br';
import AppLoadingPage from '@/components/shared/AppLoadingPage.vue';
import { loadingPageStore } from './store/loadingPageStore';
import { showText } from './translation';

const LoadingPage = createApp(AppLoadingPage);
LoadingPage.mount('#loading');
loadingPageStore.show();

function getElementPlusLocale() {
    const lang = settingsStore.getSetting('language') || 'pt-br';
    let locale;

    switch (lang) {
        case 'pt-br':
            locale = ptBr;
            break;
        case 'en-us':
            locale = en;
            break;
        default:
            locale = ptBr;
            break;
    }
    
    return locale;
}

async function startApp() {
    try {
        await loadApp();
        const router = initializeRoutes();
        
        const app = createApp(App);

        app.use(router);
        app.use(ElementPlus, { locale: getElementPlusLocale() });
        app.mount('#app');

        MetaManager.setAllMeta();

        loadingPageStore.hide();
        LoadingPage.unmount('#loading');
        console.log(settingsStore.getSetting('maintenance'));

        if(settingsStore.getSetting('maintenance') == "on") {
            router.push(showText('PATH_MAINTENANCE'));
        }

    } catch (error) {
        loadingPageStore.hide();
        LoadingPage.unmount('#loading');
        console.error("Error during app startup:", error);
    } 
}

startApp();
