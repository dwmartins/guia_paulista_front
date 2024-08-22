<template>
    <section id="dashboardView">
        <h1>Dashboard</h1>
    </section>
</template>

<script setup>
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { onMounted, onUnmounted  } from 'vue';

onMounted(() => {
    document.title = `${showText('DASHBOARD_PAGE')} | ${siteInfoStore.constants.webSiteName}`;
});

onUnmounted(() => {
    document.title = siteInfoStore.constants.webSiteName;
});

</script>

<style scoped>
</style>