<template>
    <button :class="['btn', `btn-primary`, `btn-${width}`, 'd-flex', 'justify-content-center']" :type="type" :disabled="loading">
        <template v-if="loading">
            <AppSpinner :message="textLoading" color="text-white" />
        </template>
        <template v-else>
            <div class="d-flex align-items-center">
                {{ text }}
                <i v-if="icon" :class="[icon, 'ms-1']"></i>
            </div>
        </template>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';
import AppSpinner from '@/components/shared/AppSpinner.vue';
import { showText } from '@/translation';

defineProps({
    text: {
        type: String,
        required: false,
        default: () => showText('SAVE')
    },
    textLoading: {
        type: String,
        required: false,
        default: () => showText('LOADING')
    },
    width: {
        type: String,
        require: false,
    },
    loading: {
        type: Boolean,
        require: true,
        default: true
    },
    type: {
        type: String,
        require: false,
        default: "button"
    },
    icon: {
        type: String,
        require: false,
    }
});

</script>

<style scoped>
button {
    width: auto;
}
</style>