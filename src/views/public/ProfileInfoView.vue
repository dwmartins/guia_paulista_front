<template>
    <section id="profileInfoView" class="container-fluid show">
        <div class="container my-5">
            <h2 class="custom_dark fw-bolder">{{ showText('PERSONAL_INFO') }}</h2>
            <p class="text-secondary">{{ showText('MANAGE_PERSONAL_HERE') }}</p>

            <div class="row mt-5">
                <div class="col-12 col-lg-7 col-xxl-6">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-4 custom_dark mb-0">{{ showText('BASIC_INFORMATION') }}</p>
                        <el-button @click="toggleCollapse('basic_info')" type="primary" class="fs-7 fw-semibold letter-spacing text-uppercase" link>{{ showText('UPDATE') }}</el-button>
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
                            <el-form ref="formRefBasicInfo" :model="form" class="row py-3">
                                <el-form-item class="col-12 col-lg-4" :label="showText('NAME_LABEL')" label-position="top" prop="name" :rules="formRules.name">
                                    <el-input v-model="form.name" type="text" name="name"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-4" :label="showText('LAST_NAME_LABEL')" label-position="top" prop="lastName" :rules="formRules.lastName">
                                    <el-input v-model="form.lastName" type="text" name="lastName"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-4" :label="showText('DATE_OF_BIRTH_LABEL')" label-position="top" prop="dateOfBirth">
                                    <el-date-picker v-model="form.dateOfBirth" type="date" class="w-100" :format="settingsStore.getSetting('dateFormat').replace(/-/g, '/')" />
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-6" :label="showText('EMAIL_LABEL')" label-position="top" prop="email" :rules="formRules.email">
                                    <el-input v-model="form.email" type="text" name="email"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-lg-6" :label="showText('PHONE_LABEL')" label-position="top" prop="phone">
                                    <el-input v-model="form.phone" type="number" name="phone"/>
                                </el-form-item>

                                <el-form-item class="col-12" :label="showText('DESCRIPTION_LABEL')" label-position="top" prop="description">
                                    <el-input
                                        v-model="form.description"
                                        maxlength="600"
                                        show-word-limit
                                        type="textarea"
                                        name="description"
                                        :rows="5"
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

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-4 custom_dark mb-0">{{ showText('ADDRESS') }}</p>
                        <el-button @click="toggleCollapse('address')" type="primary" class="fs-7 fw-semibold letter-spacing text-uppercase" link>{{ showText('UPDATE') }}</el-button>
                    </div>

                    <div class="address">
                        <p class="text-secondary fs-7 mb-0">
                            <i class="fa-solid fa-location-dot me-2"></i>
                            {{ user.address }}
                        </p>
                        <p class="text-secondary fs-7 mb-0">
                            {{ user.city }}, {{ user.state }}, {{ user.zipCode }}
                        </p>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.address" id="address_form" class="container-fluid px-0 mt-2">
                            <el-form @submit.prevent="submitFormAddress" :model="formAddress" class="row py-3">
                                <el-form-item class="col-12 col-sm-6" :label="showText('ADDRESS_LABEL')" label-position="top" prop="address">
                                    <el-input v-model="formAddress.address" type="text" name="address"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-sm-3" :label="showText('CITY_LABEL')" label-position="top" prop="city">
                                    <el-input v-model="formAddress.city" type="text" name="city"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-sm-3" :label="showText('ZIP_CODE_LABEL')" label-position="top" prop="zipCode">
                                    <el-input v-model="formAddress.zipCode" type="number" name="zipCode"/>
                                </el-form-item>

                                <el-form-item class="col-12 col-sm-4" :label="showText('STATE_LABEL')" label-position="top" prop="state">
                                    <el-input v-model="formAddress.state" type="text" name="state"/>
                                </el-form-item>

                                <el-form-item class="mt-3">
                                    <div class="w-100 d-flex justify-content-end">
                                        <el-button type="primary" plain native-type="submit" class="btn_save" :loading="isLoading.address">
                                            {{ isLoading.address ? showText('LOADING') : showText('SAVE') }}
                                        </el-button>
                                    </div>
                                </el-form-item>

                            </el-form>
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-5 custom_dark mb-0">{{ showText('PASSWORD_LABEL') }}</p>
                        <el-button @click="toggleCollapse('password')" type="primary" class="fs-7 fw-semibold letter-spacing text-uppercase" link>{{ showText('UPDATE') }}</el-button>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.password" id="password_form" class="container-fluid px-0 mt-2">
                            <el-form ref="formRefPassword" @submit.prevent="submitPassword" :model="formPassword" class="row py-3">
                                <el-form-item class="col-12" label-position="top" :label="showText('CURRENT_PASSWORD_LABEL')" prop="currentPassword" :rules="formRules.currentPassword">
                                    <el-input v-model="formPassword.currentPassword" type="password" show-password />
                                </el-form-item>

                                <el-form-item class="col-12 col-sm-6" label-position="top" :label="showText('NEW_PASSWORD_LABEL')" prop="newPassword" :rules="formRules.newPassword">
                                    <el-input v-model="formPassword.newPassword" type="password" show-password />
                                </el-form-item>

                                <el-form-item class="col-12 col-sm-6" label-position="top" :label="showText('CONFIRM_PASSWORD_LABEL')" prop="confirmPassword" :rules="formRules.password">
                                    <el-input v-model="formPassword.confirmPassword" type="password" show-password />
                                </el-form-item>

                                <div class="w-100 d-flex justify-content-end mt-3">
                                    <el-button type="primary" plain native-type="submit" class="btn_save" :loading="isLoading.password">
                                        {{ isLoading.password ? showText('LOADING') : showText('SAVE') }}
                                    </el-button>
                                </div>
                            </el-form>
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="fs-5 custom_dark mb-0">{{ showText('SETTINGS') }}</p>
                        <el-button @click="toggleCollapse('settings')" type="primary" class="fs-7 fw-semibold letter-spacing text-uppercase" link>{{ showText('UPDATE') }}</el-button>
                    </div>

                    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div v-show="!isCollapsed.settings" id="settings_form" class="container-fluid px-0 mt-2">
                            <el-form @submit.prevent="submitFormSettings" :model="formSettings" class="row py-3">
                                <el-checkbox class="text-secondary" v-model="formSettings.acceptsEmails" :label="showText('AGREE_RECEIVE_MAIL')" name="acceptsEmails" size="large" />
                                <el-checkbox class="text-secondary" v-model="formSettings.publishContactInfo" :label="showText('CONTACT_PUBLIC')" name="publishContactInfo" size="large" />

                                <div class="w-100 d-flex justify-content-end mt-3">
                                    <el-button type="primary" plain native-type="submit" class="btn_save" :loading="isLoading.settings">
                                        {{ isLoading.settings ? showText('LOADING') : showText('SAVE') }}
                                    </el-button>
                                </div>
                            </el-form>
                        </div>
                    </transition>

                    <hr class="text-secondary">

                    <div class="mt-5">
                        <p class="fs-5 custom_dark mb-3">{{ showText('DELETE_ACCOUNT') }}</p>

                        <div class="alert-danger alert border-0 d-flex flex-nowrap gap-2">
                            <div>
                                <i class="fa-solid fa-triangle-exclamation text-danger fs-1"></i>
                            </div>
                            <div>
                                <p class="text-danger fw-semibold mb-0 fs-7">{{ showText('DELETE_ACCOUNT_TEXT') }}</p>
                                <p class="text-danger mb-0 fs-7">{{ showText('ACTION_CANNOT_UNDONE') }}</p>
                            </div>
                        </div>

                        <el-checkbox class="text-secondary" v-model="confirmAccountDeletion" :label="showText('CONFIRM_DELETE_ACCOUNT')" name="confirmAccountDeletion" size="large" />

                        <div class="w-100 d-flex justify-content-end mt-3">
                            <el-button @click="deleteAccount" type="danger" native-type="submit" class="btn_save" :loading="isLoading.delete_account">
                                {{ isLoading.delete_account ? showText('LOADING') : showText('DELETE') }}
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-5 col-xxl-6 p-3 pt-0 d-none d-lg-flex justify-content-center align-items-baseline">
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
const formRefPassword = ref(null);

let isLoading = ref({
    basic_info: false,
    address: false,
    settings: false,
    password: false,
    delete_account: false
})

const isCollapsed = ref({
    basic_info: true,
    address: true,
    password: true,
    settings: true
});

const form = reactive({
    name: user.value.name,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
    description: user.value.description,
    dateOfBirth: user.value.dateOfBirth
});

const formAddress = reactive({
    address: user.value.address,
    city: user.value.city,
    zipCode: user.value.zipCode,
    state: user.value.state,
});

const formSettings = reactive({
    acceptsEmails: user.value.acceptsEmails === "Y" ? true : false,
    publishContactInfo: user.value.publishContactInfo === "Y" ? true : false,
});

const formPassword = reactive({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
})

const confirmAccountDeletion = ref(false);

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
    ],
    currentPassword: [
        { required: true, message: showText('CURRENT_PASSWORD_REQUIRED')}
    ],
    newPassword: [
        { required: true, message: showText('NEW_PASSWORD_REQUIRED')}
    ]
}

const submitFormBasicInfo = async () => {
    const isValid = await validForm(formRefBasicInfo);

    if(isValid) {
        try {
            isLoading.value.basic_info = true;
            const response = await UserService.update(form);

            AuthService.updateUserLogged(response.data.userData);

            showAlert('success', '', response.data.message);
            isLoading.value.basic_info = false;
        } catch (error) {
            isLoading.value.basic_info = false;
            console.error('error updating user', error);
        }
    } else {
        showAlert('error' , '', showText('ALL_REQUIRED'))
    }
}

const submitFormAddress = async () => {
    try {
        isLoading.value.address = true;
        const response = await UserService.updateAddress(formAddress);
        AuthService.updateUserLogged(response.data.userData);

        showAlert('success', '', response.data.message);
        isLoading.value.address = false;
    } catch (error) {
        console.error('error updating user address', error);
        isLoading.value.address = false;
    }
}

const submitFormSettings = async () => {
    isLoading.value.settings = true;
    try {
        let settings = {...formSettings};
        settings.acceptsEmails = settings.acceptsEmails ? "Y" : "N";
        settings.publishContactInfo = settings.publishContactInfo ? "Y" : "N";

        const response = await UserService.updateSettings(settings);
        AuthService.updateUserLogged(response.data.userData);
        showAlert('success', '', response.data.message);

        isLoading.value.settings = false;
    } catch (error) {
        console.error('error updating user settings', error);
        isLoading.value.settings = false;
    }
}

const submitPassword = async () => {
    const isValid = await validForm(formRefPassword);

    if(isValid) {
        if(formPassword.newPassword != formPassword.confirmPassword) {
            showAlert('error', '', showText('PASSWORD_NOT_MATCH'));
            return;
        }

        isLoading.value.password = true;

        try {
            const response = await UserService.updatePassword(formPassword);

            showAlert('success', '', response.data.message);
            isLoading.value.password = false;

            formRefPassword.value.resetFields();
            
        } catch (error) {
            console.error('error updating user password', error);
            isLoading.value.password = false;
        }
    } else {
        showAlert('error' , '', showText('ALL_REQUIRED'))
    }
}

const deleteAccount = async () => {
    if(!confirmAccountDeletion.value) {
        showAlert('warning', '', showText('ALERT_DELETE_ACCOUNT'));
        return;
    }

    isLoading.value.delete_account = true;

    try {
        const response = await UserService.delete(user.value.id);

        showAlert('success', '', response.data.message);

        AuthService.logout();
        isLoading.value.delete_account = false;
    } catch (error) {
        console.error('error deleting user account', error);
        isLoading.value.delete_account = false;
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

const toggleCollapse = (section) => {
    isCollapsed.value[section] = !isCollapsed.value[section];
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