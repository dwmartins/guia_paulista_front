<template>
    <section id="maintenanceView" class="container-fluid d-flex flex-column justify-content-center align-items-center py-5">
        <img src="@/assets/svg/maintenance.svg" :alt="showText('ALT_MAINTENANCE')">
        <p class="text-secondary text-center fs-5">{{ showText('MAINTENANCE_TEXT') }}</p>
    </section>
</template>

<script setup>
import { showText } from '@/translation';

</script>

<style scoped>
img {
    width: 70%;
}

</style>