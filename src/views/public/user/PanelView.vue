<template>
    <section id="profileView" class="container-fluid show">
        <div class="container my-5">
            <div class="row">
                <div class="col-12 col-lg-3 p-2">
                    <!-- user info -->
                    <div class="bg-gray-200 d-flex flex-column align-items-center p-3 shadow rounded rounded-2">
                        <div class="user_img">
                            <img :src="previewImg ? previewImg : userImg" :alt="showText('ALT_USER_IMG')">
                            
                            <button v-if="!isLoading.uploadImg" class="btn btn-primary edit_photo" type="button" @click="triggerFileInput()"><i class="fa-solid fa-pencil"></i></button>
                            <input type="file" id="img_user" class="d-none" :accept="imgExtensions" @change="handleFileChange($event)">

                            <div v-if="isLoading.uploadImg" class="loading-overlay">
                                <div class="spinner-border text-primary" role="status"></div>
                            </div>
                        </div>

                        <div v-if="previewImg" class="d-flex justify-content-center py-3 show">
                            <el-button type="primary" plain @click="submitImage()" :loading="isLoading.updateImg">
                                {{ isLoading.updateImg ? showText('LOADING') : showText('SAVE') }}
                            </el-button>
                            <el-button v-if="!isLoading.updateImg" type="danger" plain @click="cancelEditPhoto()">{{ showText('CANCEL') }}</el-button>
                        </div>

                        <div class="d-flex flex-column align-items-center">
                            <p class="custom_dark fw-semibold mt-2 mb-0">{{ user.name }} {{ user.lastName }}</p>
                            <p class="text-secondary fs-8 text-break">{{ user.email }}</p>
                            <p class="custom_dark fw-semibold fs-8 text-break mb-0">{{ showText('MEMBER_SINCE') }}:</p>
                            <p class="text-secondary fs-8 text-break">{{ getDateAsString(user.createdAt) }}</p>
                            <p v-if="user.city && user.state" class="text-secondary fs-8 text-break">{{ user.city }}, {{ user.state }}</p>

                            <router-link :to="showText('PATH_PROFILE')">
                                <button class="btn btn-sm btn-primary">{{ showText('EDIT_PROFILE') }}<i class="fa-solid fa-user-pen ms-2"></i></button>
                            </router-link>
                        </div>
                    </div> 
                </div>
                <div class="col-12 col-lg-9 p-2">
                    <!-- contents -->
                    <div class="p-3">
                        <h5 class="custom_dark fw-semibold">{{ setGreeting() }} {{ user.name }}</h5>
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
import { ref, computed } from 'vue';
import { showText } from '@/translation';
import { userStore } from '@/store/userStore';
import defaultImg from '@/assets/img/default/user.jpg'
import FileValidator from '@/validators/FileValidator';
import UserService from '@/services/UserService';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import { getDateAsString } from '@/helpers/dateHelper';
import { settingsStore } from '@/store/SettingsStore';
import { compressImage } from '@/helpers/imageHelper';

const imgExtensions = "image/jpeg, image/jpg, image/png";

const API_URL = process.env.VUE_APP_API_URL;
let userImg = ref(userStore.user.photo ? `${API_URL}/uploads/users/${userStore.user.photo}` : defaultImg)
const user = computed(() => userStore.user);
let previewImg = ref("");
let imgToUpdate = "";
let isLoading = ref({
    updateImg: false,
    uploadImg: false
});

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

const triggerFileInput = () => {
    const fileInput = document.getElementById('img_user');
    if (fileInput) {
        fileInput.click();
    }
};

const handleFileChange = async (event) => {
    try {
        const fileInput = event.target;
        const file = fileInput.files?.[0];

        if (!file) return;

        if (!FileValidator.img(file)) {
            fileInput.value = "";
            return;
        }

        isLoading.value.uploadImg = true;
        
        if(settingsStore.getSetting("compressImage") == "on") {
            imgToUpdate = await compressImage(file);
        } else {
            imgToUpdate = file;
        }

        const reader = new FileReader();

        reader.onload = () => {
            previewImg.value = reader.result.toString();
            isLoading.value.uploadImg = false;
        };

        reader.readAsDataURL(file);
        
    } catch (error) {
        isLoading.value.uploadImg = false;
        showAlert('error', '', showText('FATAL_ERROR'));
        console.error("Error loading image", error);
    }
}

const cancelEditPhoto = () => {
    const fileInput = document.getElementById('img_user');
    fileInput.value = "";
    previewImg.value = "";
}

const submitImage = async () => {
    try {
        isLoading.value.updateImg = true;
        const response = await UserService.setPhoto(imgToUpdate);

        AuthService.updateUserLogged(response.data.userData);
        showAlert('success', '', response.data.message);

        userImg = previewImg.value;
        previewImg.value = "";
        isLoading.value.updateImg = false;
    } catch (error) {
        isLoading.value.updateImg = false;
        console.error(error);
    }
}
</script>

<style scoped>
.user_img {
    position: relative;
}

.user_img img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #ffff;
    object-fit: cover;
}

.edit_photo {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    bottom: 20px;
    right: 0px;
    cursor: pointer;
}

.img_no_ads {
    width: 60%;
}

@media screen and (max-width: 768px){
    .img_no_ads {
        width: 90%;
    } 
}

.loading-overlay {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #ffff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000077;
}
</style>