<template>
    <section id="publicLayout" class="position-relative" >
        <router-link to="/">Home</router-link>
        <router-link :to="showText('PATH_LOGIN')">{{ showText('PAGE_LOGIN_NAME') }}</router-link>
        <main>
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
import { showText } from '@/translation';

export default {
    name: 'PublicLayout',
    data() {
        return {
            showText
        }
    }
}
</script>

<style>

</style>