<template>
    <div id="contactView" class="container show py-4">
        <div class="row my-5">
            <div class="col-12 col-lg-6">
                <h2 class="custom_dark fw-semibold ps-2">{{ showText('CONTACT_PAGE') }}</h2>

                <div class="container-fluid">
                    <el-form ref="formRefContact" @submit.prevent="sendMessage" :model="formContact" class="row py-3">
                        <el-form-item class="col-12 col-lg-6" :label="showText('NAME_LABEL')" label-position="top" prop="name" :rules="formRules.name">
                            <el-input v-model="formContact.name" type="text" name="name" size="large"/>
                        </el-form-item>

                        <el-form-item class="col-12 col-lg-6" :label="showText('LAST_NAME_LABEL')" label-position="top" prop="lastName" :rules="formRules.lastName">
                            <el-input v-model="formContact.lastName" type="text" name="lastName" size="large"/>
                        </el-form-item>

                        <el-form-item class="col-12 col-lg-6" :label="showText('EMAIL_LABEL')" label-position="top" prop="email" :rules="formRules.email">
                            <el-input v-model="formContact.email" type="text" name="email" size="large"/>
                        </el-form-item>

                        <el-form-item class="col-12 col-lg-6" :label="showText('COMPANY_LABEL')" label-position="top" prop="company">
                            <el-input v-model="formContact.company" type="text" name="company" size="large"/>
                        </el-form-item>

                        <el-form-item class="col-12" :label="showText('MESSAGE_LABEL')" label-position="top" prop="message" :rules="formRules.message">
                            <el-input
                                v-model="formContact.message"
                                maxlength="600"
                                show-word-limit
                                type="textarea"
                                name="description"
                                :rows="5"
                            />
                        </el-form-item>

                        <el-form-item class="mt-3">
                            <div class="w-100 d-flex justify-content-end">
                                <btnPrimaryOutline 
                                    :loading="isLoading" 
                                    :text="showText('SEND_MESSAGE')" 
                                    :textLoading="showText('SENDING')"
                                    type="submit"
                                    class="btn_send"
                                    icon="fa-regular fa-paper-plane"
                                />
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="col-12 col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
                <img src="@/assets/svg/contact.svg" :alt="showText('ALT_CONTACT')">
            </div>
        </div>
    </div>
</template>

<script setup>
import { showText } from '@/translation';
import { showAlert } from '@/helpers/showAlert';
import { ref, reactive } from 'vue';
import EmailService from '@/services/EmailService';
import btnPrimaryOutline from '@/components/shared/buttons/btnPrimaryOutline.vue';

let isLoading = ref(false);

const formRefContact = ref(null);

const formContact = reactive({
    name: "",
    lastName: "",
    company: "",
    email: "",
    message: ""
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
    message: [
        { required: true, message: showText('MESSAGE_REQUIRED') }
    ]
}

const sendMessage = async () => {
    const isValid = await validForm(formRefContact);

    if(isValid) {
        isLoading.value = true;
        try {
            const response = await EmailService.sendMessageContact(formContact);
            showAlert('success' , '', response.data.message);

            formRefContact.value.resetFields();
            isLoading.value = false;
        } catch (error) {
            console.error('error forwarding message', error);
            isLoading.value = false;
        }
    } else {
        showAlert('error' , '', showText('ALL_REQUIRED'));
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

</script>

<style scoped>
.btn_send {
    width: auto;
}

@media screen and (max-width: 576px) {
    .btn_send {
        width: 100%;
    }
}
</style>