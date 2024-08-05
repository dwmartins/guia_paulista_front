<template>
    <section id="publicLayout" class="position-relative m-0 p-0" >
        <AppHeader />
        <main>
            <router-view></router-view>
        </main>
        <appFooter />
        <AppLoadingPage />
    </section>
</template>

<script setup>
import AppHeader from '@/components/public/appHeader.vue';
import appFooter from '@/components/public/appFooter.vue';
import AppLoadingPage from '@/components/shared/AppLoadingPage.vue';
</script>

<style>

</style>