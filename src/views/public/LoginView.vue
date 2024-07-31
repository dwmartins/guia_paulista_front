<template>
    <section id="loginView" class="container d-flex align-items-center">
        <div class="row w-100 m-0">
            <div class="col-sm-12 col-md-6 col-xl-7 d-flex flex-column justify-content-center align-items-center">
                <h4 class="text-secondary">{{ showText('LOGIN') }}</h4>
                <el-form
                    @submit.prevent="submitForm"
                    class="w-100 p-0 p-sm-3 form_login"
                    ref="formRef"
                    :model="formValidation"
                    label-width="auto"
                    label-position="left"
                    hide-required-asterisk >

                    <el-form-item label-position="top" :label="showText('EMAIL_LABEL')" prop="email" :rules="formRules.email">
                        <el-input v-model="formValidation.email" type="text" />
                    </el-form-item>

                    <el-form-item label-position="top" :label="showText('PASSWORD_LABEL')" prop="password" :rules="formRules.password">
                        <el-input v-model="formValidation.password" type="password" show-password />
                    </el-form-item>

                    <div class="d-flex flex-wrap justify-content-between align-items-center rememberMe">
                        <el-checkbox v-model="rememberMe" class="text-secondary pe-1" :label="showText('REMEMBER_ME')" size="large" />

                        <router-link :to="showText('PATH_RECOVER_PASSWORD')">
                        <el-link type="primary">Esqueci minha senha</el-link>
                    </router-link>
                    </div>

                    <el-form-item class="mt-3">
                        <el-button type="primary" native-type="submit" class="w-100" :loading="isLoading">
                            {{ isLoading ? showText('LOADING') : showText('LOGIN') }}
                        </el-button>
                    </el-form-item>

                    <hr class="text-secondary">

                    <p class="text-secondary new_account">
                        {{ showText('NOT_HAVE_ACCOUNT') }}
                        <router-link :to="showText('PATH_NEW_ACCOUNT')"><el-link type="primary">{{ showText('CREATE_ACCOUNT') }}</el-link></router-link>
                    </p>
                </el-form>
            </div>
            
            <div class="col-md-6 col-xl-5 d-none d-md-flex justify-content-center align-items-center">
                <img class="img_login" src="@/assets/svg/login.svg" alt="Imagem de login">
            </div>
        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { onMounted, onUnmounted  } from 'vue';
import { siteInfoStore } from '@/store/siteInfoStore';
import AuthService from '@/services/AuthService';
import { showAlert } from '@/helpers/showAlert';
import { router } from '@/router';

onMounted(() => {
    document.title = `${showText('LOGIN_PAGE')} | ${siteInfoStore.constants.webSiteName}`;
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

const submitForm = async () => {
    const isValid  = await validForm();

    if(isValid) {
        isLoading.value = true;
        try {
            const response = await AuthService.login({ ...formValidation, rememberMe: rememberMe.value });
            console.log(response);
            isLoading.value = false;

            AuthService.setUserLogged(response.data, rememberMe.value);
            showAlert('success', '', showText('LOGIN_SUCCESSFUL'));
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

        formRef.value.validate((valid, invalidFields) => {
            if (valid) {
                resolve(true);
            } else {
                if (invalidFields.email) {
                    const emailErrors = invalidFields.email.map(err => err.message);
                    ElMessage.error(emailErrors.join(', '));
                }

                if (invalidFields.password) {
                    const passwordErrors = invalidFields.password.map(err => err.message);
                    ElMessage.error(passwordErrors.join(', '));
                }
                resolve(false);
            }
        });
    });
}

</script>

<style scoped>
#loginView {
    height: calc(100vh - 130px);
}

.form_login {
    max-width: 400px;
}

.img_login {
    width: 100%;
}

@media screen and (max-width: 342px) {
    .rememberMe {
        justify-content: center !important;
    }

    .new_account, a {
        text-align: center;
        font-size: 0.8rem;
    }
}
</style>