<template>
    <section id="dashboardView">
        <h1>Dashboard</h1>
    </section>
</template>

<script setup>
import SEOManager from '@/helpers/SEOManager';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { onMounted, onUnmounted  } from 'vue';

onMounted(() => {
    SEOManager.setTitle(`${showText('DASHBOARD_PAGE')} | ${siteInfoStore.constants.webSiteName}`)
});

onUnmounted(() => {
    SEOManager.setTitle();
});

</script>

<style scoped>
</style>