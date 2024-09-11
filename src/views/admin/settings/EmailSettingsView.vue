<template>
    <section id="emailSettingsView" class="p-2 show">
        <div class="bg-white container email_settings pb-4">
            <div class="p-2 py-3 d-flex justify-content-between">
                <h6 class="custom_dark m-0">{{ showText('EMAIL_SETTINGS_TITLE') }}</h6>

                <div class="d-flex justify-content-end align-items-center gap-2">
                    <template v-if="emailSettings.activated">
                            <span class="text-secondary">{{ showText('STATUS_CATEGORY_ACTIVE') }}</span>
                    </template>
                    <template v-if="!emailSettings.activated">
                        <span class="text-secondary">{{ showText('STATUS_CATEGORY_INACTIVE') }}</span>
                    </template>
                    <el-switch v-model="emailSettings.activated" />
                </div>
            </div>

            <form @submit.prevent="submitConfigsEmail()">
                <div class="container-fluid">
                    <fieldset :disabled="!emailSettings.activated" class="row">
                        <div class="mb-4 col-sm-6" :class="{'opacity-75': !emailSettings.activated}">
                            <label for="server" class="form-label text-secondary text-secondary">Servidor:</label>
                            <input v-model="emailSettings.server" type="text" class="form-control form-control-sm custom_focus text-secondary" id="server">
                        </div>

                        <div class="mb-4 col-sm-3" :class="{'opacity-75': !emailSettings.activated}">
                            <label for="port" class="form-label text-secondary">Porta:</label>
                            <input v-model="emailSettings.port" type="number" class="form-control form-control-sm custom_focus text-secondary" id="port">
                        </div>

                        <div class="mb-4 col-sm-3" :class="{'opacity-75': !emailSettings.activated}">
                            <label class="form-label text-secondary fs-7">Autenticação:</label>
                            <el-select :disabled="!emailSettings.activated" v-model="emailSettings.authentication" placeholder="Status">
                                <el-option :selected="emailSettings.authentication === 'SSL'" value="SSL" />
                                <el-option :selected="emailSettings.authentication === 'TLS'" value="TLS" />
                            </el-select>
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettings.activated}">
                            <label for="emailAddress" class="form-label text-secondary">Endereço de e-mail:</label>
                            <input v-model="emailSettings.emailAddress" type="text" class="form-control form-control-sm custom_focus text-secondary" id="emailAddress">
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettings.activated}">
                            <label for="username" class="form-label text-secondary">Usuário/E-mail:</label>
                            <input v-model="emailSettings.username" type="text" class="form-control form-control-sm custom_focus text-secondary" id="username">
                        </div>

                        <div class="mb-4 col-sm-4" :class="{'opacity-75': !emailSettings.activated}">
                            <label for="password" class="form-label text-secondary">Senha:</label>
                            <input v-model="emailSettings.password" type="password" class="form-control form-control-sm custom_focus text-secondary" id="password">
                        </div>

                        <div class="mb-2 d-flex justify-content-end" :class="{'opacity-75': !emailSettings.activated}">
                            <btnPrimary 
                                :loading="isLoading"
                                :text="showText('SAVE')"
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
import { ref } from 'vue';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';

const isLoading = ref(false);

const emailSettings = ref({
    id: 0,
    server: "",
    emailAddress: "",
    username: "",
    password: "",
    port: 465,
    authentication: "TLS",
    activated: false,
    createdAt: "",
    updatedAt: ""
});

</script>

<style scoped>
.email_settings {
    border-radius: 5px;
    box-shadow: var(--box-shadow-cards);
}
</style>