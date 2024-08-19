<template>
    <section id="maintenanceView" class="container-fluid">
        <div class="d-flex flex-column align-items-center">
            <img src="@/assets/svg/maintenance.svg" :alt="showText('ALT_MAINTENANCE')">
            <p class="text-secondary text-center fs-5">{{ showText('MAINTENANCE_TEXT') }}</p>
        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';
import { onMounted, onUnmounted  } from 'vue';
import { siteInfoStore } from '@/store/siteInfoStore';
import { settingsStore } from '@/store/SettingsStore';
import { router } from '@/router';

onMounted(() => {
    if(settingsStore.getSetting('maintenance') == 'off') {
        router.push('/');
        return;
    }

    document.title = `${showText('MAINTENANCE_PAGE')} | ${siteInfoStore.constants.webSiteName}`;
});

onUnmounted(() => {
    document.title = siteInfoStore.constants.webSiteName;
});

</script>

<style scoped>
#maintenanceView {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 70%;
    max-width: 500px;
}

</style>