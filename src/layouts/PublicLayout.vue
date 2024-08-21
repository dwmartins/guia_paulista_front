<template>
    <section id="publicLayout" class="position-relative m-0 p-0" >
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

onMounted( async () => {
    await getSiteInfo();
})

const getSiteInfo = async () => {

    setInterval(async () => {
        const response = await SiteInfoService.getSiteInfo();
        siteInfoStore.updateConstants(response.data.siteInfo);
        settingsStore.setSettings(response.data.settings);
        
        if(settingsStore.getSetting('maintenance') === 'on') {
            router.push(showText('PATH_MAINTENANCE'));
        }

    }, 120000); 

};

</script>

<style>

</style>