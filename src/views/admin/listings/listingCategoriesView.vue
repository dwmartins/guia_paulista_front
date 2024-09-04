<template>
    <section id="listingCategoriesView" class="p-2 show">
        <div class="categories p-3 bg-white">
            <div class="d-flex justify-content-between">
                <h5 class="custom_dark m-0">{{ showText('CATEGORY_TITLE') }}</h5>

                <button class="btn btn-sm btn-primary">
                    {{ showText('ADD_NEW_CATEGORY') }}
                    <i class="fa-solid fa-plus ms-1"></i>
                </button>
            </div>

            <div class="list">
                <div>
                    <el-empty :description="showText('CATEGORY_NOT_FOUND')" :image-size="200" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SEOManager from '@/helpers/SEOManager';
import { showText } from '@/translation';
import { onMounted, onUnmounted  } from 'vue';

onMounted(() => {
    SEOManager.setTitle(showText('CATEGORIES_LISTING_PAGE'));
});

onUnmounted(() => {
    SEOManager.setTitle();
});
</script>

<style scoped>
.categories {
    border-radius: 5px;
    box-shadow:  var(--box-shadow-cards);
}
</style>