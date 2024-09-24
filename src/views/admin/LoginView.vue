<template>
    <section id="loginAdminView" class="container d-flex align-items-center justify-content-center vh-100">
        <el-form
            @submit.prevent="submitForm"
            ref="formRef"    
            :model="formValidation"
            label-position="left"
            class="w-100">

            <h4 class="text-secondary text-center">{{ showText('PANEL_PAGE') }}</h4>

            <el-form-item label-position="top" :label="showText('EMAIL_LABEL')" prop="email" :rules="formRules.email">
                <el-input v-model="formValidation.email" type="text" name="email" size="large" autocomplete="true"/>
            </el-form-item>

            <el-form-item label-position="top" :label="showText('PASSWORD_LABEL')" prop="password" :rules="formRules.password">
                <el-input v-model="formValidation.password" type="password" size="large" show-password />
            </el-form-item>

            <div class="d-flex flex-wrap justify-content-between align-items-center rememberMe">
                <el-checkbox v-model="rememberMe" class="text-secondary pe-1" :label="showText('REMEMBER_ME')" size="large" id="rememberMe" name="rememberMe" />

                <router-link :to="showText('PATH_RECOVER_PASSWORD')">
                    <el-link type="primary">{{ showText('FORGOT_MY_PASSWORD') }}</el-link>
                </router-link>
            </div>

            <el-form-item class="mt-3">
                <btnPrimary 
                    :loading="isLoading"
                    :text="showText('LOGIN')"
                    type="submit"
                    icon="fa-solid fa-arrow-right-to-bracket"
                    class="w-100"
                />
            </el-form-item>
        </el-form>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted  } from 'vue';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { router } from '@/router';
import { showAlert } from '@/helpers/showAlert';
import AuthService from '@/services/AuthService';
import { reactive, ref } from 'vue';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';
import { allowedRoles } from '@/helpers/constants';

onMounted(() => {
    document.title = `${showText('PANEL_PAGE')} | ${showText('LOGIN_PAGE')}`;
    checkIfLogged();
});

onUnmounted(() => {
    document.title = siteInfoStore.constants.webSiteName;
});

const formRef = ref(null);
let isLoading = ref(false);
const rememberMe = ref(false);

const formRules = {
    email: [
        { required: true, message: showText('EMAIL_REQUIRED') },
        { type: 'email', message: showText('EMAIL_INVALID'), trigger: ['blur']},
    ],
    password: [
        { required: true, message: showText('PASSWORD_REQUIRED') }
    ]
}

const formValidation = reactive({
    email: "",
    password: "",
});

const checkIfLogged = () => {
    if(AuthService.getUserLogged()) {
        router.push(`/app/${showText('PATH_DASHBOARD')}`);
        showAlert('success', '', showText('USER_ALREADY_LOGGED'));
        return;
    }
}

const submitForm = async () => {
    const isValid  = await validForm();

    if(isValid) {
        isLoading.value = true;
        try {
            const response = await AuthService.login({ ...formValidation, rememberMe: rememberMe.value });
            isLoading.value = false;

            if(allowedRoles.includes(response.data.role)) {
                AuthService.setUserLogged(response.data, rememberMe.value);
                showAlert('success', '', showText('LOGIN_SUCCESSFUL'));
                router.push(`/app/${showText('PATH_DASHBOARD')}`);
                return;
            }

            showAlert('error', '', showText('NOT_HAVE_PERMISSION_ACCESS_AREA'));
            router.push('/');

        } catch (error) {
            isLoading.value = false;
            console.error('Error logging in', error);
        }
    }
}

const validForm = () => {
    return new Promise((resolve) => {
        if (!formRef.value) {
            resolve(false);
            return;
        }

        formRef.value.validate((valid) => {
            if(valid) {
                resolve(true);
            } else {
                resolve(false);
                showAlert('warning', '', showText('ALL_REQUIRED'));
            }
        });
    });
}

</script>

<style scoped>

form {
    max-width: 420px;
}

</style>