<template>
    <section id="pageNotFoundView" class="container d-flex flex-column justify-content-center align-items-center vh-100">
        <img src="@/assets/svg/pageNotFound.svg" :alt="showText('ALT_PAGE_NOT_FOUND')">
        <p class="text-secondary fs-4 text-center">{{ showText('PAGE_NOT_FOUND') }}</p>
        <router-link to="/" class="btn btn-outline-primary">
            {{ showText('BACK_TO_HOME_PAGE') }}
        </router-link>
    </section>
</template>

<script setup>
import { showText } from '@/translation';

</script>

<style scoped>
img, p {
    max-width: 500px;
}
</style>