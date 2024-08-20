<template>
    <section id="registerView" class="container d-flex align-items-center show">
        <div class="row w-100 m-0">
            <div class="col-sm-12 col-md-5 col-xl-5 d-flex flex-column justify-content-center align-items-center">
                <h4 class="text-secondary">{{ showText('NEW_ACCOUNT') }}</h4>

                <el-form @submit.prevent="submitForm" ref="formRef" :model="formValidation" class="w-100 p-0 p-sm-3 form_register">
                    <el-form-item :label="showText('NAME_LABEL')" label-position="top" prop="name" :rules="formRules.name">
                        <el-input v-model="formValidation.name" type="text" name="name" size="large"/>
                    </el-form-item>

                    <el-form-item :label="showText('LAST_NAME_LABEL')" label-position="top" prop="lastName" :rules="formRules.lastName">
                        <el-input v-model="formValidation.lastName" type="text" name="lastName" size="large"/>
                    </el-form-item>

                    <el-form-item :label="showText('EMAIL_LABEL')" label-position="top" prop="email" :rules="formRules.email">
                        <el-input v-model="formValidation.email" type="text" name="email" size="large"/>
                    </el-form-item>

                    <el-form-item :label="showText('PASSWORD_LABEL')" label-position="top" prop="password" :rules="formRules.password">
                        <el-input v-model="formValidation.password" type="password" size="large" show-password/>
                    </el-form-item>

                    <div class="fs-8 text-secondary text-center">
                        {{ showText('PRIVACY') }}
                        <router-link :to="showText('PATH_PRIVACY')">
                            <el-link type="primary" class="fs-8">{{ showText('PRIVACY_PAGE') }}.</el-link>
                        </router-link>
                    </div>

                    <el-form-item class="mt-3">
                        <btnPrimary 
                            :loading="isLoading"
                            :text="showText('NEW_ACCOUNT')"
                            type="submit"
                            class="w-100"
                        />
                    </el-form-item>

                    <hr class="text-secondary">

                    <p class="text-secondary new_account">
                        {{ showText('HAVE_ACCOUNT') }}
                        <router-link :to="showText('PATH_LOGIN')"><el-link type="primary">{{ showText('LOGIN_PAGE') }}</el-link></router-link>
                    </p>
                </el-form>
            </div>
            <div class="col-md-7 col-xl-7 d-none d-md-flex justify-content-center align-items-center">
                <img class="img_register" src="@/assets/svg/signUp.svg" :alt="showText('ALT_REGISTER_IMG')">
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { showText } from '@/translation';
import { onMounted, onUnmounted  } from 'vue';
import { siteInfoStore } from '@/store/siteInfoStore';
import UserService from '@/services/UserService';
import { showAlert } from '@/helpers/showAlert';
import { router } from '@/router';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';

onMounted(() => {
    document.title = `${showText('REGISTER_PAGE')} | ${siteInfoStore.constants.webSiteName}`;
});

onUnmounted(() => {
    document.title = siteInfoStore.constants.webSiteName;
});

const formRef = ref(null);
let isLoading = ref(false);

const formValidation = reactive({
    name: "",
    lastName: "",
    email: "",
    password: "",
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

const submitForm = async () => {
    const isValid  = await validForm();

    if(isValid) {
        isLoading.value = true;
        try {
            const response = await UserService.create(formValidation);
            isLoading.value = false;
            showAlert('success', '', response.data.message);
            router.push({
                path: showText('PATH_LOGIN'),
                query: {userEmail: formValidation.email}
            });

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
            valid ? resolve(true) : resolve(false)
        });
    });
}

</script>

<style scoped>
#registerView {
    height: calc(100vh - 130px);
}

.form_register {
    max-width: 400px;
}

.img_register {
    width: 100%;
}
    
</style>