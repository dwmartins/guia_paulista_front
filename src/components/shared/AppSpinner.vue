<template>
    <div class="d-flex align-items-center gap-2">
        <div id="appSpinnerLoading" class="d-flex justify-content-center">
            <div class="spinner-border" :class="[color, width]" role="status"></div>
        </div>  
        <p class="m-0 fs-7" :class="color">{{ message }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    message: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false,
        default: 'text-primary'
    },
    width: {
        type: String,
        required: false,
        default: 'small'
    }
});

</script>

<style scoped>
.small {
    height: 20px;
    width: 20px;
}

.big {
    height: 30px;
    width: 30px; 
}
</style>