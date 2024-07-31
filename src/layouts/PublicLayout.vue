<template>
    <section id="publicLayout" class="position-relative m-0 p-0" >
        <AppHeader />
        <main>
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
import AppHeader from '@/components/public/appHeader.vue';
import { showText } from '@/translation';

export default {
    name: 'PublicLayout',
    components: {
        AppHeader
    },
    data() {
        return {
            showText
        }
    }
}
</script>

<style>

</style>