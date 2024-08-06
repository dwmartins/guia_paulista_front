<template>
    <section id="profileInfoView" class="container-fluid show">
        <div class="container my-5">
            <h3 class="custom_dark fw-bolder">{{ showText('PERSONAL_INFO') }}</h3>
            <p class="text-secondary">{{ showText('MANAGE_PERSONAL_HERE') }}</p>

        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';

</script>

<style scoped>

</style>