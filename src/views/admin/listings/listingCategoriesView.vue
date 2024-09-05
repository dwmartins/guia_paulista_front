<template>
    <section id="listingCategoriesView" class="p-2 show">
        <div class="categories bg-white">
            <div class="px-3 p-2 d-flex justify-content-between bg-ice-white">
                <h5 class="custom_dark m-0">{{ showText('CATEGORY_TITLE') }}</h5>

                <button class="btn btn-sm btn-primary">
                    <i class="fa-solid fa-plus"></i>
                    {{ showText('ADD_NEW_CATEGORY') }}
                </button>
            </div>

            <div v-if="emptyCategories">
                <el-empty :description="showText('CATEGORY_NOT_FOUND')" :image-size="200" />
            </div>

            <div v-if="categories.length" class="contents p-3 show">
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <el-checkbox size="large" @change="selectAll($event)"/>
                                </th>
                                <th scope="col">Icon</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Status</th>
                                <th scope="col">Última Atualização</th>
                            </tr>
                        </thead>
                        <tbody v-for="category in paginatedCategories()" :key="category.id">
                            <th>
                                <el-checkbox size="large" v-model="category.selected" @change="setCategorySelected(category)"/>
                            </th>
                            <th>
                                <img :src="showIcon(category)" :alt="showText('ALT_CATEGORY')" class="categoryIcon">
                            </th>
                            <th>
                                {{ category.name }}
                            </th>
                            <th>
                                <div>
                                    <span v-if="category.status == 'Y'" class="active">Ativa<i class="fa-solid fa-check ms-1"></i></span>
                                    <span v-if="category.status == 'N'" class="inactive">Inativa<i class="fa-solid fa-check ms-1"></i></span>
                                </div>
                            </th>
                            <th>
                                {{ simpleDateTime(category.updatedAt) }}
                            </th>
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-end">
                    <el-pagination size="small" background layout="prev, pager, next"
                        :total="filteredCategories.length ? filteredCategories.length : categories.length"
                        :page-size="pagination.categoryPerPage" @current-change="handlePageChange" class="mt-4" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SEOManager from '@/helpers/SEOManager';
import { showText } from '@/translation';
import { onMounted, onUnmounted, ref } from 'vue';
import ListingCategoryService from '@/services/ListingCategoryService';
import defaultImg from '@/assets/img/default/defaultImg.png';
import { simpleDateTime } from '@/helpers/dateHelper.js';

const API_URL = process.env.VUE_APP_API_URL;

let categories = ref([]);
let filteredCategories = ref([]);
let emptyCategories = ref(false);
const categoriesSelected = ref([]);
const pagination = ref({
    currentPage: 1,
    categoryPerPage: 8
});

onMounted(() => {
    SEOManager.setTitle(showText('CATEGORIES_LISTING_PAGE'));
    getCategories();
});

onUnmounted(() => {
    SEOManager.setTitle();
});

const getCategories = async () => {
    try {
        const response = await ListingCategoryService.fetch();
        categories.value = response.data;
        filteredCategories.value = response.data;

        emptyCategories.value = !categories.value.length;

    } catch (error) {
        console.error('Error fetching categories', error);
    }
}

const handlePageChange = (page) => {
    pagination.value.currentPage = page;
}

const paginatedCategories = () => {
    const start = (pagination.value.currentPage - 1) * pagination.value.categoryPerPage;
    const end = start + pagination.value.categoryPerPage;
    return filteredCategories.value.slice(start, end);
}

const selectAll = (event) => {
    filteredCategories.value.forEach(category => {
        event ? category.selected = true : category.selected = false;
    });
}

const setCategorySelected = (categorySelected) => {
    if(categorySelected.selected) {
        categoriesSelected.value.push(categorySelected);
    } else {
        const index = categoriesSelected.value.findIndex(category => category.id === categorySelected.id);

        if(index !== -1) {
            categoriesSelected.value.splice(index, 1);
        }
    }
}

const showIcon = (category) => {
    return category.icon ? `${API_URL}uploads/categories/${category.icon}` : defaultImg;
}

</script>

<style scoped>
.categories {
    border-radius: 5px;
    box-shadow: var(--box-shadow-cards);
}

.categories>div {
    border-radius: 5px;
}

table {
    min-width: 650px;
}

table th {
    vertical-align: middle;
}

table thead th {
    color: #909399;
    font-size: 14px;
}

table tbody th {
    color: #727272;
    font-weight: 400;
}

table .categoryIcon {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
}

.active {
    color: #00894f;
    background-color: #d9f8eb;
    border-radius: 10px;
    padding: 2px 10px;
    font-size: 12px;
}

.inactive {
    color: #b82c46;
    background-color: #fbdbe1;
    border-radius: 10px;
    padding: 2px 10px;
    font-size: 12px;
}
</style>