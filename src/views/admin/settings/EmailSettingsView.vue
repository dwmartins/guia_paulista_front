<template>
    <section id="emailSettingsView" class="p-2 show">
        <div class="bg-white container email_settings pb-4">
            <div class="p-2 py-3 d-flex justify-content-between">
                <h6 class="custom_dark m-0">{{ showText('EMAIL_SETTINGS_TITLE') }}</h6>

                <div class="d-flex justify-content-end align-items-center gap-2">
                    <template v-if="emailSettingsActive">
                            <span class="text-secondary">{{ showText('STATUS_CATEGORY_ACTIVE') }}</span>
                    </template>
                    <template v-if="!emailSettingsActive">
                        <span class="text-secondary">{{ showText('STATUS_CATEGORY_INACTIVE') }}</span>
                    </template>
                    <el-switch v-model="emailSettingsActive" @change="updateStatus()" :loading="isLoading.updateStatus"/>
                </div>
            </div>

            <form @submit.prevent="updateSettings()">
                <div class="container-fluid">
                    <fieldset :disabled="!emailSettingsActive" class="row">
                        <div class="mb-4 col-sm-6" :class="{'opacity-75': !emailSettingsActive}">
                            <label for="server" class="form-label text-secondary text-secondary">{{ showText('SERVER_LABEL') }}</label>
                            <input v-model="emailSettings.server" type="text" class="form-control form-control-sm custom_focus text-secondary" id="server">
                        </div>

                        <div class="mb-4 col-sm-3" :class="{'opacity-75': !emailSettingsActive}">
                            <label for="port" class="form-label text-secondary">{{ showText('PORT_LABEL') }}</label>
                            <input v-model="emailSettings.port" type="number" class="form-control form-control-sm custom_focus text-secondary" id="port">
                        </div>

                        <div class="mb-4 col-sm-3" :class="{'opacity-75': !emailSettingsActive}">
                            <label class="form-label text-secondary fs-7">{{ showText('AUTHENTICATION_LABEL') }}</label>
                            <el-select :disabled="!emailSettingsActive" v-model="emailSettings.authentication" placeholder="Status">
                                <el-option :selected="emailSettings.authentication === 'SSL'" value="SSL" />
                                <el-option :selected="emailSettings.authentication === 'TLS'" value="TLS" />
                            </el-select>
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettingsActive}">
                            <label for="emailAddress" class="form-label text-secondary">{{ showText('EMAIL_ADDRESS_LABEL') }}</label>
                            <input v-model="emailSettings.emailAddress" type="text" class="form-control form-control-sm custom_focus text-secondary" id="emailAddress">
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettingsActive}">
                            <label for="username" class="form-label text-secondary">{{ showText('USERNAME_EMAIL_LABEL') }}</label>
                            <input v-model="emailSettings.username" type="text" class="form-control form-control-sm custom_focus text-secondary" id="username">
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettingsActive}">
                            <label for="password" class="form-label text-secondary">{{ showText('PASSWORD_LABEL') }}</label>
                            <input v-model="emailSettings.password" type="password" class="form-control form-control-sm custom_focus text-secondary" id="password">
                        </div>

                        <div class="mb-2 d-flex justify-content-end" :class="{'opacity-75': !emailSettingsActive}">
                            <btnPrimary 
                                :loading="isLoading.updateSettings"
                                :text="showText('SAVE_CHANGES')"
                                type="submit"
                                width="sm"
                            />
                        </div>
                    </fieldset>
                </div>
            </form>  
        </div>
    </section>
</template>

<script setup>
import { showText } from '@/translation';
import { onMounted, onUnmounted, ref } from 'vue';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';
import SEOManager from '@/helpers/SEOManager';
import EmailService from '@/services/EmailService';
import { settingsStore } from '@/store/SettingsStore';
import SettingsService from '@/services/SettingsService';
import { showAlert } from '@/helpers/showAlert';

const isLoading = ref({
    updateSettings: false,
    updateStatus: false
});

const emailSettingsActive = ref(false);

const emailSettings = ref({
    id: 0,
    server: "",
    emailAddress: "",
    username: "",
    password: "",
    port: 465,
    authentication: "TLS",
    createdAt: "",
    updatedAt: ""
});

onMounted(() => {
    SEOManager.setTitle(showText('EMAIL_SETTINGS_PAGE'));
    getEmailSettings();
});

onUnmounted(() => {
    SEOManager.setTitle();
});

const getEmailSettings = async () => {
    try {
        const response = await EmailService.getEmailSettings();
        emailSettings.value = response.data;

        emailSettingsActive.value = settingsStore.getSetting('emailSending') == "on" ? true : false;

    } catch (error) {
        console.error('Error Fetching email settings', error);
    }
}

const updateSettings = async () => {
    try {
        isLoading.value.updateSettings = true;

        const response = await EmailService.updateSettings(emailSettings.value);
        showAlert('success', '', response.data.message);
        emailSettings.value.password = "";

        isLoading.value.updateSettings = false;

    } catch (error) {
        isLoading.value.updateSettings = false;
        console.error('Error updating email settings', error);
    }
}

const updateStatus = async () => {
    try {
        isLoading.value.updateStatus = true;

        const isActive = emailSettingsActive.value ? "on" : "off";

        const setting = {
            name: 'emailSending',
            value: isActive
        }

        const response = await SettingsService.update(setting);
        showAlert('success', '', response.data.message);

        settingsStore.updateSetting('emailSending', isActive);
        isLoading.value.updateStatus = false;

    } catch (error) {
        isLoading.value.updateStatus = false;
        console.error('Error updating email configuration status', error);
    }
}

</script>

<style scoped>
.email_settings {
    border-radius: 5px;
    box-shadow: var(--box-shadow-cards);
}
</style>