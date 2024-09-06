<template>
    <div class="d-flex align-items-center gap-2">
        <div class="loader" :class="[spinnerColor, width]"></div>
        <p class="m-0 fs-6" :class="textColor">{{ message }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    message: {
        type: String,
        required: false
    },
    spinnerColor: {
        type: String,
        required: false,
        default: 'bg-primary'
    },
    textColor: {
        type: String,
        required: false,
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
    width: 20px;
    padding: 5px;
}

.big {
    width: 30px;
    padding: 5px;
}

.loader {
    aspect-ratio: 1;
    border-radius: 50%;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 0.7s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}
</style>