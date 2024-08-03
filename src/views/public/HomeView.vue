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
                        <el-input size="large" :placeholder="showText('PLACEHOLDER_SEARCH_LOCATIONS')" />
                    </div>
                    <div class="col-12 col-sm-2 px-3 p-sm-0">
                        <el-button class="w-100" type="primary" size="large">{{ showText('SEARCH') }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import defaultCoverImage from '@/assets/img/default/defaultCoverImage.jpg';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';

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

</style>