<template>
    <section id="profileView" class="container-fluid">
        <div class="container my-5">
            <div class="row">
                <div class="col-12 col-sm-3 p-2">
                    <!-- user info -->
                    <div class="bg-gray-200 d-flex flex-column align-items-center user_img p-3 shadow rounded rounded-2">
                        <img :src="userImg" :alt="showText('ALT_USER_IMG')">
                        <p class="custom_dark fw-semibold mt-2">{{ user.name }} {{ user.lastName }}</p>
                    </div> 
                </div>
                <div class="col-12 col-sm-9 p-2">
                    <!-- contents -->
                    <div class="p-3">
                        <h5 class="custom_dark">{{ setGreeting() }} {{ user.name }}</h5>
                        <p class="text-secondary">{{ showText('WELCOME_TO_YOU_AREA') }}</p>
                        <!-- <p class="text-secondary">{{ showText('WELCOME_TO_YOU_AREA_INFO') }}</p> -->
                    </div>

                    <hr class="text-secondary">

                    <div class="d-flex flex-column align-items-center">
                        <img src="@/assets/svg/empty.svg" class="img_no_ads" :alt="showText('NO_ADS')">
                        <p class="text-secondary text-center">{{ showText('DONT_HAVE_ADS') }}</p>
                        <router-link :to="showText('PATH_PLANS')">
                            <button class="btn btn-outline-primary">{{ showText('ADVERTISE_NOW') }}<i class="fa-solid fa-arrow-up-right-from-square ms-2"></i></button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';
import { userStore } from '@/store/userStore';
import defaultImg from '@/assets/img/default/user.jpg'

const userImg = userStore.user.photo ? `${this.$API_URL}/uploads/users/${userStore.user.photo}` : defaultImg
const user = userStore.user;

const setGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
        return showText('GOOD_MORNING');
    } else if (hour >= 12 && hour < 18) {
        return showText('GOOD_AFTERNOON');
    } else {
        return showText('GOODNIGHT');
    }
}
</script>

<style scoped>
.user_img img{
    width: 160px;
    border-radius: 50%;
    border: 8px solid #ffff;
}

.img_no_ads {
    width: 60%;
}

@media screen and (max-width: 768px){
    .img_no_ads {
        width: 90%;
    } 
}
</style>