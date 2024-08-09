<template>
    <section id="profileInfoView" class="container-fluid show">
        <div class="container my-5">
            <h2 class="custom_dark fw-bolder">{{ showText('PERSONAL_INFO') }}</h2>
            <p class="text-secondary">{{ showText('MANAGE_PERSONAL_HERE') }}</p>

            <div class="row mt-5">
                <div class="col-12 col-lg-7 col-xxl-6">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-4 custom_dark fw-semibold mb-0">{{ showText('BASIC_INFORMATION') }}</p>
                        <el-button @click="toggleCollapse()" type="primary" class="fs-7 fw-semibold letter-spacing text-uppercase" link>{{ showText('UPDATE') }}</el-button>
                    </div>

                    <div class="basic_info">
                        <p class="text-secondary fs-7 mb-0">
                            <i class="fa-regular fa-address-card me-2"></i>
                            {{ user.name }} {{ user.lastName }}
                        </p>
                        <p v-if="user.dateOfBirth" class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-cake-candles me-2"></i>
                            {{ simpleDate(user.dateOfBirth) }}
                        </p>
                        <p class="text-secondary fs-7 mb-0">
                            <i class="fa-regular fa-envelope me-2"></i>
                            {{ user.email }}
                        </p>
                        <p v-if="user.phone" class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-phone me-2"></i>
                            {{ user.phone }}
                        </p>
                    </div>
                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.basic_info" @submit.prevent="submitFormBasicInfo" id="info_basic_form" class="container-fluid px-0 mt-2">
                            <el-form ref="formRefBasicInfo" :model="formBasicInfo" class="row py-3">
                                <el-form-item class="col-12 col-lg-4" :label="showText('NAME_LABEL')" label-position="top" prop="name" :rules="formRules.name">
                                    <el-input v-model="formBasicInfo.name" type="text" name="name"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-4" :label="showText('LAST_NAME_LABEL')" label-position="top" prop="lastName" :rules="formRules.lastName">
                                    <el-input v-model="formBasicInfo.lastName" type="text" name="lastName"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-4" :label="showText('DATE_OF_BIRTH_LABEL')" label-position="top" prop="dateOfBirth">
                                    <el-date-picker v-model="formBasicInfo.dateOfBirth" type="date" class="w-100" :format="settingsStore.getSetting('dateFormat').replace(/-/g, '/')" />
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-6" :label="showText('EMAIL_LABEL')" label-position="top" prop="email" :rules="formRules.email">
                                    <el-input v-model="formBasicInfo.email" type="text" name="email"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-6" :label="showText('PHONE_LABEL')" label-position="top" prop="phone">
                                    <el-input v-model="formBasicInfo.phone" type="number" name="phone"/>
                                </el-form-item>

                                <el-form-item class="col-12" :label="showText('DESCRIPTION_LABEL')" label-position="top" prop="description">
                                    <el-input
                                        v-model="formBasicInfo.description"
                                        maxlength="200"
                                        show-word-limit
                                        type="textarea"
                                        name="description"
                                    />
                                </el-form-item>

                                <el-form-item class="mt-3">
                                    <div class="w-100 d-flex justify-content-end">
                                        <el-button type="primary" plain native-type="submit" class="btn_save" :loading="isLoading.basic_info">
                                            {{ isLoading.basic_info ? showText('LOADING') : showText('SAVE') }}
                                        </el-button>
                                    </div>
                                </el-form-item>

                            </el-form>
                        </div>
                    </transition>

                    <hr class="text-secondary">
                </div>
                <div class="col-12 col-lg-5 col-xxl-6 p-3 d-none d-lg-flex justify-content-center">
                    <img class="w-100" src="@/assets/svg/account.svg" :alt="showText('ALT_ACCOUNT')">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import { showText } from '@/translation';
import { userStore } from '@/store/userStore';
import { simpleDate } from '@/helpers/dateHelper';
import UserService from '@/services/UserService';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import { settingsStore } from '@/store/SettingsStore';

const user = computed(() => userStore.user);
const formRefBasicInfo = ref(null);

let isLoading = ref({
    basic_info: false
})

const isCollapsed = ref({
    basic_info: true
});

const formBasicInfo = reactive({
    name: user.value.name,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
    description: user.value.description,
    dateOfBirth: user.value.dateOfBirth,
});

const formRules = {
    name: [
        { required: true, message: showText('NAME_REQUIRED') }
    ],
    lastName: [
        { required: true, message: showText('LAST_NAME_REQUIRED') }
    ],
    email: [
        { required: true, message: showText('EMAIL_REQUIRED') },
        { type: 'email', message: showText('EMAIL_INVALID'), trigger: ['blur']},
    ],
    password: [
        { required: true, message: showText('PASSWORD_REQUIRED') }
    ]
}

const submitFormBasicInfo = async () => {
    const isValid = await validForm(formRefBasicInfo);

    if(isValid) {
        isLoading.value.basic_info = true;

        try {
            const response = await UserService.update(formBasicInfo);
            isLoading.value.basic_info = false;

            AuthService.updateUserLogged(response.data.userData);

            showAlert('success', '', response.data.message);
        } catch (error) {
            isLoading.value.basic_info = false;
            console.error('error updating user', error);
        }
    } else {
        showAlert('error' , '', showText('ALL_REQUIRED'))
    }
}

const validForm = (form) => {
    return new Promise((resolve) => {
        form.value.validate((valid) => {
                    if(valid) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
    })
}

const toggleCollapse = () => {
    isCollapsed.value.basic_info = !isCollapsed.value.basic_info;
}


const beforeEnter = (el) => {
    el.style.maxHeight = '0';
    el.style.opacity = '0';
    el.style.overflow = 'hidden';
}

const enter = (el) => {
    el.offsetHeight;
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
}

const leave = (el) =>  {
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = '0';
    el.style.opacity = '0';
}

</script>

<style scoped>
.el-collapse-item__header {
    font-size: 45px !important;
}

.basic_info i {
    width: 20px;
    text-align: center;
}

#info_basic_form {
    overflow: hidden;
}

.collapse-enter-active, .collapse-leave-active {
    transition: height 0.2s ease, opacity 0.2s ease;
}

.collapse-enter, .collapse-leave-to {
    height: 0;
    opacity: 0;
}

.btn_save {
    width: 180px;
}

@media screen and (max-width: 576px) {
    .btn_save {
        width: 100%;
    }
}

</style>