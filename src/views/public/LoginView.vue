<template>
    <section id="loginView">
        <h1>LOGIN</h1>
        <button type="button" @click="teste()">teste</button>
    </section>
</template>
<script>
import { showText } from '@/translation';
import AuthService from '@/services/AuthService';

export default {
    name: 'loginView',
    data() {
        return {
            showText
        }
    },
    methods: {
        teste() {
            AuthService.teste();
        }
    }
}
</script>
<style scoped>
</style>