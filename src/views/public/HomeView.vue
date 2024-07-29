<template>
    <section id="homeView">
        <h1>{{ showText("HELLO_WORLD")}}</h1>
    </section>
</template>
<script>
import { showText } from '@/translation';

    export default {
        name: 'HomeView',
        data() {
            return {
                showText
            }
        }
    }
</script>
<style scoped>
</style>