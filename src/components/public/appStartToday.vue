<template>
    <section id="startToday" class="container-fluid bg-body-tertiary py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 text-center text-sm-start">
                    <p class="text-uppercase letter-spacing  fw-semibold text-primary mb-0">{{ showText('START_DIRECTORY') }}</p>
                    <p class="custom_dark fs-5">{{ showText('START_DIRECTORY_TEXT') }}</p>
                </div>
                <div class="col-12 col-md-4 item_center">
                    <router-link :to="showText('PATH_NEW_ACCOUNT')">
                        <button class="btn btn-lg btn-outline-primary text-uppercase letter-spacing ">{{ showText('CREATE_MY_ACCOUNT') }}</button>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';
</script>

<style scoped>
</style>