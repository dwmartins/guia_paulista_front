<template>
    <footer class="bg-gray-200">
        <div class="container py-5">
            <div class="row">
                <div class="col-12 col-sm-4 logo_footer py-2">
                    <div class="h-100 w-100 d-flex flex-column justify-content-center text-center">
                        <a class="navbar-brand" href="#">
                            <div class="logo_image d-flex align-items-center justify-content-center">
                                <router-link to="/" class="navbar-brand">
                                    <div class="d-flex align-items-center logo_image">
                                        <img :src="logoImage" :alt="showText('WEBSITE_LOGO')">
                                    </div>
                                </router-link>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-12" :class="showSocialMedia() ? 'col-sm-4' : 'col-sm-8'">
                    <div class="p-2">
                        <h4 class="custom_dark fs-5">{{ showText('NAVIGATION') }}</h4>

                        <div class="row align">
                            <ul class="navbar-nav col px-3">
                                <li class="nav-item">
                                    <router-link to="/" class="nav-link">
                                        {{ showText('HOME_PAGE') }}
                                    </router-link>
                                    <router-link :to="showText('PATH_ADVERTISES')" class="nav-link">
                                        {{ showText('ADVERTISERS_PAGE') }}
                                    </router-link>
                                    <router-link :to="showText('PATH_EVENTS')" class="nav-link">
                                        {{ showText('EVENTS_PAGE') }}
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="navbar-nav col px-3">
                                <li class="nav-item">
                                    <router-link :to="showText('PATH_BLOG')" class="nav-link">
                                        {{ showText('BLOG_PAGE') }}
                                    </router-link>
                                    <router-link :to="showText('PATH_CONTACT')" class="nav-link">
                                        {{ showText('CONTACT_PAGE') }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="text-secondary d-sm-none">
                <div class="col-12 col-sm-4" v-if="showSocialMedia()">
                    <div class="p-2">
                        <h4 class="custom_dark text-center fs-5">{{ showText('SOCIAL_MEDIA') }}</h4>
                        <div class="d-flex gap-3 justify-content-center p-2">
                            <a v-if="urls.twitter" :href="urls.twitter" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-x-twitter custom_dark fs-4"></i>
                            </a>
                            <a v-if="urls.facebook" :href="urls.facebook" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-facebook custom_dark fs-4"></i>
                            </a>
                            <a v-if="urls.instagram" :href="urls.instagram" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-instagram custom_dark fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid gap-3 bg-gray-800 p-3">
            <div class="container">
                <div class="row">
                    <p class="col-12 col-sm-6 text-light m-0 fs-7 text-center mb-2 mb-sm-0">{{ showText('DEVELOPED_BY') }}:
                        <a href="https://br.linkedin.com/in/douglas-martins-a36a45185" target="_blank" rel="noopener noreferrer" class="text-white link-offset-2 link-underline link-underline-opacity-0 opacity-75">Douglas Wellington
                            Martins
                        </a>
                    </p>
                    <p class="col-12 col-sm-6 text-light m-0 fs-7 text-center">
                        {{ showText('STORYSET_TEXT') }}
                        <a href="https://storyset.com" target="_blank" rel="noopener noreferrer" class="text-white link-offset-2 link-underline link-underline-opacity-0 opacity-75">{{ showText('STORYSET') }}</a> 
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import defaultLogo from '@/assets/img/default/defaultLogo.png';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';

const logoImage = siteInfoStore.constants.logoImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.logoImage}` : defaultLogo;

const urls = {
    twitter: siteInfoStore.constants.twitter,
    facebook: siteInfoStore.constants.facebook,
    instagram: siteInfoStore.constants.instagram
}

const showSocialMedia = () => {
    const siteInfo = siteInfoStore.constants;

    if(siteInfo.facebook || siteInfo.instagram || siteInfo.twitter) {
        return true;
    }
}

</script>

<style scoped>
.logo_image img{
    width: 100%;
}

@media screen and (max-width: 390px) {
    .logo_footer {
        min-width: 200px;
        width: 100%;
    }
}

</style>