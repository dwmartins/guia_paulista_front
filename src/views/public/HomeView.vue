<template>
    <section id="homeView">
        <div class="cover-image container-fluid" :style="{backgroundImage: `url(${coverImage})`}">
            <div class="container-fluid d-flex align-items-center justify-content-center">
                <div class="row justify-content-center gap-2">
                    <div class="col-12 mb-4">
                        <h1 class="text-light text-center fw-bolder">{{ showText('SEARCH_HERE') }}</h1>
                        <h3 class="text-light text-center">{{ showText('WHAT_LOOKING') }}</h3>
                    </div>
                    <div class="col-12 col-sm-5 mb-2 p-0 px-3 p-sm-0">
                        <input type="text" name="search" id="search" class="form-control custom_focus rounded-1 custom_placeholder" :placeholder="showText('PLACEHOLDER_SEARCH_LOCATIONS')">
                    </div>
                    <div class="col-12 col-sm-2 px-3 p-sm-0">
                        <button type="button" class="btn btn-primary w-100">{{ showText('SEARCH') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <appStartToday />

        <div class="my-5 py-3 container">
            <p class="text-primary fw-bolder letter-spacing mb-0">{{ showText('UNIQUE_DIRECTORY') }}</p>
            <h2 class="custom_dark mb-4 fw-semibold">{{ showText('FIND_THE_BEST_LOCAL') }}</h2>
            <div class="row">
                <div class="p-2 col-12 col-sm-6 col-lg-4 text-center">
                    <el-card shadow="hover" class="h-100">
                        <div class="icons_search">
                            <i class="fa-solid fa-icons"></i>
                        </div>
                        <h5 class="custom_dark">{{ showText('CHOSE_CATEGORY') }}</h5>
                        <p class="text-secondary">{{ showText('CHOSE_CATEGORY_TEXT') }}</p>
                        <router-link :to="showText('PATH_ADVERTISES')">
                            <el-link type="primary">{{ showText('SEE_MORE') }}</el-link>
                        </router-link>
                    </el-card>
                </div>
                <div class="p-2 col-12 col-sm-6 col-lg-4 text-center">
                    <el-card shadow="hover" class="h-100">
                        <div class="icons_search">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </div>
                        <h5 class="custom_dark">{{ showText('FIND_LOCATIONS') }}</h5>
                        <p class="text-secondary fs-6">{{ showText('FIND_LOCATIONS_TEXT') }}</p>
                        <router-link :to="showText('PATH_ADVERTISES')">
                            <el-link type="primary">{{ showText('SEE_MORE') }}</el-link>
                        </router-link>
                    </el-card>
                </div>
                <div class="p-2 col-12 col-sm-12 col-lg-4 text-center">
                    <el-card shadow="hover" class="h-100">
                        <div class="icons_search">
                            <i class="fa-solid fa-magnifying-glass-plus"></i>
                        </div>
                        <h5 class="custom_dark">{{ showText('MOST_WANTED') }}</h5>
                        <p class="text-secondary">{{ showText('MOST_WANTED_TEXT') }}</p>
                        <router-link :to="showText('PATH_ADVERTISES')">
                            <el-link type="primary">{{ showText('SEE_MORE') }}</el-link>
                        </router-link>
                    </el-card>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import defaultCoverImage from '@/assets/img/default/defaultCoverImage.jpg';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import appStartToday from '@/components/public/appStartToday.vue';

const coverImage = siteInfoStore.constants.coverImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.coverImage}` : defaultCoverImage

</script>
<style scoped>
.cover-image {
    position: relative;
    height: calc(100vh - 78px);
    background-size: cover;
}

.cover-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - 78px);
    background-color: #00000085;
}

.cover-image > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.cover-image h1 {
    font-size: clamp(40px, 8vw, 65px);
}

.icons_search {
    margin-bottom: 14px;
}

.icons_search i {
    color: var(--bs-primary);
    font-size: 22px;
    padding: 25px;
    background-color: #cce5ff;
    border-radius: 50%;
}

</style>