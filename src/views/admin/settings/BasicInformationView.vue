<template>
    <section id="basicInfoView" class="p-2 show">
        <div class="bg-white container px-4 pb-4 basicInfoView">
            <div class="py-3 mb-2">
                <h6 class="custom_dar m-0">{{ showText('BASIC_INFO_TITLE') }}</h6>
            </div>

            <div v-if="isLoading.searchingBasicInfo" class="alert alert-info fadeIn p-2 mb-5 show" role="alert">
                <AppSearchSpinner :message="showText('SEARCHING_BASIC_INFO')" width="big"/>
            </div>

            <!-- Contents -->
            <div class="container-flued w-100 my-4">
                <!-- Logo image -->
                <div class="row">
                    <div class="col-sm-12 col-lg-4 mb-4 item_center">
                        <AppSearchSpinner v-if="isLoading.uploadLogo" width="big"/>
                        <img v-if="!isLoading.uploadLogo" :src="previewImages.logo ? previewImages.logo : defaultImages.logo" class="previewImg" :alt="showText('ALT_LOGO')">
                    </div>
                    <div class="col-sm-12 col-lg-8">
                        <p class="custom_dark">{{ showText('CHOOSE_YOUR_LOGO_IMAGE') }}</p>
                        <p class="custom_dark opacity-75 fs-8">{{ showText('FORMAT_LOGO_IMAGE') }}</p>

                        <div v-if="previewImages.logo" class="d-flex justify-content-between align-items-center gap-2 mt-4">
                            <p class="text-secondary m-0 fileName">{{ imagesToSave.logo.name }}</p>
                            <button @click="cancelSetImg('logo')" type="button" class="btn btn-sm btn-danger">{{ showText('CANCEL') }}</button>
                        </div>
                        
                        <div v-else class="d-flex justify-content-center justify-content-lg-start mt-4">
                            <label for="logo" class="btn btn-sm btn-primary">
                                {{ showText('CHOOSE_FILE') }} <i class="fa-regular fa-file-image ms-1"></i>
                                <input @change="setImage($event, 'logo')" id="logo" class="d-none" type="file" :accept="acceptImg"> 
                            </label>
                        </div>
                        
                    </div>

                    <hr class="text-secondary my-5">
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import SEOManager from '@/helpers/SEOManager';
import { showText } from '@/translation';
import AppSearchSpinner from '@/components/admin/AppSearchSpinner.vue';
import { defaultLogo, defaultCover, defaultIcon, defaultImg } from '@/helpers/constants';
import FileValidator from '@/validators/FileValidator';

const acceptImg = "image/jpeg, image/jpg, image/png";

const isLoading = ref({
    searchingBasicInfo: false,
    uploadLogo: false
});

const defaultImages = {
    logo: defaultLogo,
    cover: defaultCover,
    icon: defaultIcon,
    default: defaultImg
}

const previewImages = ref({
    logo: "",
    cover: "",
    icon: "",
    default: ""
});

const imagesToSave = {
    logo: null,
    cover: null,
    icon: null,
    default: null
}

onMounted(() => {
    SEOManager.setTitle(showText('BASIC_INFORMATION_PAGE'));
    console.log(defaultImages.logo)
});

onUnmounted(() => {
    SEOManager.setTitle();
});

const setImage = (event, image) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if(!file) return;

    if(!FileValidator.img(file)) {
        fileInput.value = "";
        return;
    }

    isLoading.value.uploadLogo = true;
    const reader = new FileReader();

    reader.onload = () => {
        imagesToSave[image] = file;
        previewImages.value[image] = reader.result.toString();
        isLoading.value.uploadLogo = false;
    }

    reader.readAsDataURL(file);
}

const cancelSetImg = (image) => {
    previewImages.value[image] = "";
    imagesToSave[image] = null;
}

</script>

<style scoped>
.basicInfoView {
    min-width: 300px;
    border-radius: 5px;
    box-shadow: var(--box-shadow-cards);
}

.previewImg {
    max-width: 180px;
    max-height: 180px;
    object-fit: cover;
}

.fileName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>