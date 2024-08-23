<template>
    <section id="publicLayout" class="position-relative m-0 p-0" >
        <div v-if="settingsStore.maintenance == 'on'" id="adminBar" class="container-fluid bg-dark">
            <div class="container d-flex justify-content-center align-items-center gap-2 py-1">
                <p class="m-0 text-white-50">Site em manutenção</p>
                <button class="btn btn-sm btn-outline-primary">Publicar</button>
            </div>
        </div>

        <AppHeader />
        <main>
            <router-view></router-view>
        </main>
        <appFooter />
    </section>
</template>

<script setup>
import AppHeader from '@/components/public/appHeader.vue';
import appFooter from '@/components/public/appFooter.vue';
import SiteInfoService from "@/services/SiteInfoService";
import { settingsStore } from "@/store/SettingsStore";
import { siteInfoStore } from "@/store/siteInfoStore";
import { onMounted } from 'vue';
import { router } from '@/router';
import { showText } from '@/translation';
import AuthService from '@/services/AuthService';

const allowedRoles = ["support", "admin", "mod", "test"];

onMounted( async () => {
    await getSiteInfo();
})

const getSiteInfo = async () => {

    setInterval(async () => {
        const response = await SiteInfoService.getSiteInfo();
        siteInfoStore.updateConstants(response.data.siteInfo);
        settingsStore.setSettings(response.data.settings);
        
        if(settingsStore.getSetting('maintenance') === 'on') {
            const userLogged = AuthService.getUserLogged();

            if(userLogged && !allowedRoles.includes(userLogged.role)) {
                router.push(showText('PATH_MAINTENANCE'));
            }
        }

    }, 120000); 

};

</script>

<style>

</style>