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
                        <AppSearchSpinner v-if="isLoading.logo" width="big"/>
                        <img v-if="!isLoading.logo" :src="previewImages.logo ? previewImages.logo : defaultImages.logo" class="previewImg" :alt="showText('ALT_LOGO')">
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

                <!-- Cover Image -->
                <div class="row">
                    <div class="col-sm-12 col-lg-4 mb-4 item_center">
                        <AppSearchSpinner v-if="isLoading.cover" width="big"/>
                        <img v-if="!isLoading.cover" :src="previewImages.cover ? previewImages.cover : defaultImages.cover" class="previewImg" :alt="showText('ALT_COVER')">
                    </div>

                    <div class="col-sm-12 col-lg-8">
                        <p class="custom_dark">{{ showText('CHOOSE_YOUR_COVER_IMAGE') }}</p>
                        <p class="custom_dark opacity-75 fs-8">{{ showText('FORMAT_IMAGE') }}</p>

                        <div v-if="previewImages.cover" class="d-flex justify-content-between align-items-center gap-2 mt-4">
                            <p class="text-secondary m-0 fileName">{{ imagesToSave.cover.name }}</p>
                            <button @click="cancelSetImg('cover')" type="button" class="btn btn-sm btn-danger">{{ showText('CANCEL') }}</button>
                        </div>
                        
                        <div v-else class="d-flex justify-content-center justify-content-lg-start mt-4">
                            <label for="cover" class="btn btn-sm btn-primary">
                                {{ showText('CHOOSE_FILE') }} <i class="fa-regular fa-file-image ms-1"></i>
                                <input @change="setImage($event, 'cover')" id="cover" class="d-none" type="file" :accept="acceptImg"> 
                            </label>
                        </div>
                    </div>

                    <hr class="text-secondary my-5">
                </div>

                <!-- icon -->
                <div class="row">
                    <div class="col-sm-12 col-lg-4 mb-4 item_center">
                        <AppSearchSpinner v-if="isLoading.icon" width="big"/>
                        <img v-if="!isLoading.icon" :src="previewImages.icon ? previewImages.icon : defaultImages.icon" class="previewIcon" :alt="showText('ALT_ICON')">
                    </div>

                    <div class="col-sm-12 col-lg-8">
                        <p class="custom_dark">{{ showText('CHOOSE_YOUR_ICON') }}</p>
                        <p class="custom_dark opacity-75 fs-8">{{ showText('FORMAT_ICON') }}</p>

                        <div v-if="previewImages.icon" class="d-flex justify-content-between align-items-center gap-2 mt-4">
                            <p class="text-secondary m-0 fileName">{{ imagesToSave.icon.name }}</p>
                            <button @click="cancelSetImg('icon')" type="button" class="btn btn-sm btn-danger">{{ showText('CANCEL') }}</button>
                        </div>
                        
                        <div v-else class="d-flex justify-content-center justify-content-lg-start mt-4">
                            <label for="icon" class="btn btn-sm btn-primary">
                                {{ showText('CHOOSE_FILE') }} <i class="fa-regular fa-file-image ms-1"></i>
                                <input @change="setImage($event, 'icon')" id="icon" class="d-none" type="file" :accept="acceptIcon"> 
                            </label>
                        </div>
                    </div>

                    <hr class="text-secondary my-5">
                </div>

                <!-- Default image -->
                <div class="row">
                    <div class="col-sm-12 col-lg-4 mb-4 item_center">
                        <AppSearchSpinner v-if="isLoading.default" width="big"/>
                        <img v-if="!isLoading.default" :src="previewImages.default ? previewImages.default : defaultImages.default" class="previewImg" :alt="showText('ALT_DEFAULT_IMG')">
                    </div>

                    <div class="col-sm-12 col-lg-8">
                        <p class="custom_dark">{{ showText('CHOOSE_YOUR_ICON') }}</p>
                        <p class="custom_dark opacity-75 fs-8">{{ showText('FORMAT_ICON') }}</p>

                        <div v-if="previewImages.default" class="d-flex justify-content-between align-items-center gap-2 mt-4">
                            <p class="text-secondary m-0 fileName">{{ imagesToSave.default.name }}</p>
                            <button @click="cancelSetImg('default')" type="button" class="btn btn-sm btn-danger">{{ showText('CANCEL') }}</button>
                        </div>
                        
                        <div v-else class="d-flex justify-content-center justify-content-lg-start mt-4">
                            <label for="default" class="btn btn-sm btn-primary">
                                {{ showText('CHOOSE_FILE') }} <i class="fa-regular fa-file-image ms-1"></i>
                                <input @change="setImage($event, 'default')" id="default" class="d-none" type="file" :accept="acceptImg"> 
                            </label>
                        </div>
                    </div>

                    <hr class="text-secondary my-5">
                </div>

                <div class="d-flex justify-content-end">
                    <btnPrimary @click="submitImages()" :loading="isLoading.images" width="sm" :text="showText('SAVE_CHANGES')"/>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import SEOManager from '@/helpers/SEOManager';
import { showText } from '@/translation';
import AppSearchSpinner from '@/components/admin/AppSearchSpinner.vue';
import { defaultLogo, defaultCover, defaultIcon, defaultImg, systemImagesUrl } from '@/helpers/constants';
import FileValidator from '@/validators/FileValidator';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';
import SiteInfoService from '@/services/SiteInfoService';
import { showAlert } from '@/helpers/showAlert';
import { siteInfoStore } from '@/store/siteInfoStore';

const acceptImg = "image/jpeg, image/jpg, image/png";
const acceptIcon = "image/vnd.microsoft.icon, image/x-icon, image/jpeg, image/jpg, image/png"

const isLoading = ref({
    searchingBasicInfo: false,
    images: false,
    logo: false,
    cover: false,
    icon: false,
    default: false
});

const defaultImages = computed(() => ({
    logo: siteInfoStore.constants.logoImage ? `${systemImagesUrl}/${siteInfoStore.constants.logoImage}` : defaultLogo,
    cover: siteInfoStore.constants.coverImage ? `${systemImagesUrl}/${siteInfoStore.constants.coverImage}` : defaultCover,
    icon: siteInfoStore.constants.ico ? `${systemImagesUrl}/${siteInfoStore.constants.ico}` : defaultIcon,
    default: siteInfoStore.constants.defaultImage ? `${systemImagesUrl}/${siteInfoStore.constants.defaultImage}` : defaultImg
}));

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
});

onUnmounted(() => {
    SEOManager.setTitle();
});

const setImage = (event, image) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if(!file) return;

    if(image == "icon") {
        if(!FileValidator.icon(file)) {
            fileInput.value = "";
            return;
        }
    } else if(!FileValidator.img(file)){
        fileInput.value = "";
        return;
    }

    isLoading.value[image] = true;
    const reader = new FileReader();

    reader.onload = () => {
        imagesToSave[image] = file;
        previewImages.value[image] = reader.result.toString();
        isLoading.value[image] = false;
    }

    reader.readAsDataURL(file);
}

const submitImages = async () => {
    let hasFile = false;

    for(const file in imagesToSave) {
        if(imagesToSave[file]) {
            hasFile = true;
        }
    }

    if(!hasFile) {
        showAlert('warning', '', showText('NO_FILES_SELECTED'));
        return;
    }

    try {
        isLoading.value.images = true;
        const response = await SiteInfoService.updateImages(imagesToSave);

        siteInfoStore.updateConstants(response.data.siteInfoData);
        
        SEOManager.setAllMeta();
        
        cleanPreviewImgs();
        showAlert('success', '', response.data.message);
        isLoading.value.images = false;
    } catch (error) {
        isLoading.value.images = false;
        console.error('There was an error updating the website images', error);
    }
}

const cancelSetImg = (image) => {
    previewImages.value[image] = "";
    imagesToSave[image] = null;
}

const cleanPreviewImgs = () => {
    for(const img in previewImages.value) {
        previewImages.value[img] = "";
        imagesToSave[img] = null;
    }
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

.previewIcon {
    max-width: 80px;
    max-height: 80px;
    object-fit: cover;
}

.fileName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>