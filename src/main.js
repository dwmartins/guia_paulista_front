import { createApp } from 'vue'
import App from '@/App.vue'
import loadApp from '@/loadApp'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'element-plus/dist/index.css';
import '@/assets/css/global.css';
import '@/assets/css/animations.css';

import ElementPlus from 'element-plus'
import MetaManager from '@/helpers/MetaManager';

loadApp().then(() => {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
    app.use(ElementPlus);

    app.config.globalProperties.$API_URL = process.env.VUE_APP_API_URL;
    
    MetaManager.setAllMeta();
});