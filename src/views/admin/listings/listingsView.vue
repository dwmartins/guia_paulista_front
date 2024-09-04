<template>
    <section id="listingView" class="p-2 show">
        <div class="listings p-3 bg-white">
            <div class="d-flex justify-content-between">
                <h5 class="custom_dark m-0">{{ showText('LISTINGS_TITLE') }}</h5>

                <router-link :to="showText('PATH_ADM_LISTINGS_CATEGORY')" class="btn btn-sm btn-primary">
                    {{ showText('CATEGORY_TITLE') }}
                    <i class="fa-solid fa-list ms-1"></i>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import SEOManager from '@/helpers/SEOManager';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    SEOManager.setTitle(`${showText('ADVERTISERS_PAGE')} | ${siteInfoStore.constants.webSiteName}`);
});

onUnmounted(() => {
    SEOManager.setTitle();
});

</script>

<style scoped>

.listings {
    border-radius: 5px;
    box-shadow:  var(--box-shadow-cards);
}

</style>