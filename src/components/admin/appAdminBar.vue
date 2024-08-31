<template>
    <section id="adminBar" class="container-fluid position-sticky top-0 bg-dark z-3">
        <div class="container py-2 d-flex align-items-center justify-content-between">
            <router-link :to="PATH_ADM_DASHBOARD" class="text-white-50 outline_none hover_primary">
                <i class="fa-solid fa-house me-2"></i>
                <span class="d-none d-sm-inline-block">Dashboard</span>
            </router-link>

            <div v-if="settingsStore.maintenance == 'on'" class="item_center gap-2 publish">
                <p class="m-0 text-white-50 fs-7">{{ showText('MAINTENANCE_ALERT') }}</p>
                <router-link :to="'/app' + showText('PATH_ADM_SETTINGS')" class="btn btn-sm btn-outline-primary">
                    {{ showText('PUBLISH') }}
                </router-link>
            </div>

            <router-link to="" class="text-white-50 outline_none hover_primary">
                <span class="d-none d-sm-inline-block">{{ showText('LOGOUT_PAGE') }}</span>
                <i class="fa-solid fa-right-from-bracket ms-1"></i>
            </router-link>
        </div>
    </section>
</template>
<script setup>
import { showText } from '@/translation';
import { settingsStore } from '@/store/SettingsStore';

</script>
<style scoped>

@media screen and (max-width: 360px) {
    .publish p {
        display: none;
    }
}
</style>