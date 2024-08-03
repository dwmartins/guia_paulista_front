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
</script>

<style>

</style>