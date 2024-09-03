<template>
    <section v-if="allowedRoles.includes(user.role)" id="adminBar" class="container-fluid position-sticky top-0 bg-dark z-3">
        <div class="container py-2 d-flex align-items-center justify-content-between">
            <router-link :to="`/app/${showText('PATH_DASHBOARD')}`" class="text-white-50 outline_none hover_primary">
                <i class="fa-solid fa-house me-2"></i>
                <span class="d-none d-sm-inline-block">Dashboard</span>
            </router-link>

            <div v-if="settingsStore.maintenance == 'on'" class="item_center gap-2 publish">
                <p class="m-0 text-white-50 fs-7">{{ showText('MAINTENANCE_ALERT') }}</p>
                <router-link :to="`/app/${showText('PATH_ADM_SETTINGS')}`" class="btn btn-sm btn-outline-primary">
                    {{ showText('PUBLISH') }}
                </router-link>
            </div>

            <button class="btn text-white-50 hover_primary p-0" @click="AuthService.logout(true)">
                <span class="d-none d-sm-inline-block">{{ showText('LOGOUT_PAGE') }}</span>
                <i class="fa-solid fa-right-from-bracket ms-1"></i>
            </button>
        </div>
    </section>
</template>
<script setup>
import { showText } from '@/translation';
import { settingsStore } from '@/store/SettingsStore';
import { computed } from 'vue';
import { userStore } from '@/store/userStore';
import AuthService from '@/services/AuthService';

const allowedRoles = ["support", "admin", "mod", "test"];
const user = computed(() => userStore.user);

</script>
<style scoped>

@media screen and (max-width: 360px) {
    .publish p {
        display: none;
    }
}
</style>