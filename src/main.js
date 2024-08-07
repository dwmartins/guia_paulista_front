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
import ptBr from 'element-plus/es/locale/lang/pt-br';
import MetaManager from '@/helpers/MetaManager';

async function startApp() {
    try {
        await loadApp();
        const router = initializeRoutes();
        
        const app = createApp(App);

        app.use(router);
        app.use(ElementPlus, { locale: ptBr });
        app.mount('#app');

        MetaManager.setAllMeta();
    } catch (error) {
        console.error("Error during app startup:", error);
    } 
}

startApp();
