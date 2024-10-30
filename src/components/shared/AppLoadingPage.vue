<template>
    <div id="appLoadingPage" v-if="loadingPageStore.props.showAlert" class="spinner-overlay">
        <div class="d-flex flex-column align-items-center">
            <div class="loader"></div> 
            <p v-if="loadingPageStore.props.message" class="custom-dark fw-semibold fs-5 text-center">{{ loadingPageStore.props.message }}</p>
        </div>
    </div>
</template>

<script setup>
import { loadingPageStore } from '@/store/loadingPageStore';
</script>

<style scoped>
.loader {
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--bs-primary);
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}

.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>