<template>
    <section id="listingCategoriesView" class="p-2 show">
        <div class="categories bg-white container">
            <div class="p-2 py-3 d-flex justify-content-between">
                <h5 class="custom_dark m-0">{{ showText('CATEGORY_TITLE') }}</h5>

                <button class="btn btn-sm btn-primary text-nowrap">
                    <i class="fa-solid fa-plus"></i>
                    {{ showText('ADD_NEW_CATEGORY') }}
                </button>
            </div>

            <hr class="text-secondary mt-0">

            <div v-if="searchingCategories" class="alert alert-info fadeIn p-2 mb-5 show" role="alert">
                <AppSearchSpinner :message="showText('SEARCHING_CATEGORIES')" width="big"/>
            </div>

            <div v-if="emptyCategories">
                <el-empty :description="showText('CATEGORY_EMPTY')" :image-size="200" />
            </div>

            <div v-if="categories.length" class="show container py-3">
                <div class="row mb-3">
                    <div class="col-12 col-sm-7 col-md-6 mb-3">
                        <el-input
                            v-model="filters.keywords"
                            placeholder="Buscar"
                            :prefix-icon="Search"
                            @input="filter()"
                        />
                    </div>
                    <div class="col-12 col-sm-5 col-md-2 mb-3">
                        <el-select v-model="filters.status" id="filter_status" placeholder="Status">
                            <el-option label="Ativo" value="Y" />
                            <el-option label="Inativo" value="N"  />
                        </el-select>
                    </div>
                    <div class="col-12 col-md-4 d-flex justify-content-end">
                        <el-button @click="filter()" type="primary"><i class="fa-solid fa-magnifying-glass me-1"></i>Filtrar</el-button>
                        <el-button @click="cleanFilter()"><i class="fa-solid fa-eraser me-1"></i>Limpar</el-button>
                    </div>
                </div>

                <div v-if="filterEmpty">
                    <el-empty :description="showText('CATEGORY_NOT_FOUND')" :image-size="200" />
                </div>

                <div v-if="filteredCategories.length" class="base_table">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <el-checkbox size="large" @change="selectAll($event)" />
                                </th>
                                <th scope="col">{{ showText('ICON') }}</th>
                                <th scope="col">{{ showText('NAME_LABEL') }}</th>
                                <th scope="col" class="text-center">{{ showText('STATUS') }}</th>
                                <th scope="col">{{ showText('LAST_UPDATE') }}</th>
                                <th scope="col" class="text-center">{{ showText('ACTIONS') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="category in paginatedCategories()" :key="category.id">
                                <td>
                                    <el-checkbox size="large" v-model="category.selected"
                                        @change="setCategorySelected(category)" />
                                </td>
                                <td>
                                    <img :src="showIcon(category)" :alt="showText('ALT_CATEGORY')" class="categoryIcon">
                                </td>
                                <td>
                                    {{ category.name }}
                                </td>
                                <td>
                                    <div class="text-center">
                                        <span v-if="category.status == 'Y'" class="active">
                                            {{ showText('CATEGORY_ACTIVE') }}
                                            <i class="fa-solid fa-check ms-1"></i>
                                        </span>
                                        <span v-if="category.status == 'N'" class="inactive">
                                            {{ showText('CATEGORY_INACTIVE') }}
                                            <i class="fa-regular fa-circle-xmark ms-1"></i>
                                        </span>
                                    </div>
                                </td>
                                <td class="fs-7">
                                    {{ simpleDateTime(category.updatedAt) }}
                                </td>
                                <td>
                                    <div class="text-center d-flex justify-content-center gap-2">
                                        <button class="btn">
                                            <i class="fa-solid fa-pen-to-square text-primary"></i>
                                        </button>
                                        <button class="btn">
                                            <i class="fa-solid fa-trash-can text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-end align-items-center gap-2 mt-3">
                    <p class="text-secondary fs-8 text-end m-0">{{ categories.length }} {{ showText('CATEGORY_TITLE') }}</p>
                    <el-pagination size="small" background layout="prev, pager, next"
                        :total="filteredCategories.length ? filteredCategories.length : categories.length"
                        :page-size="pagination.categoryPerPage" @current-change="handlePageChange"/>
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
import AppSearchSpinner from '@/components/admin/AppSearchSpinner.vue';
import { Search } from '@element-plus/icons-vue';

const API_URL = process.env.VUE_APP_API_URL;

let categories = ref([]);
let filteredCategories = ref([]);
let emptyCategories = ref(false);
const filterEmpty = ref(false);
const searchingCategories = ref(false);
const categoriesSelected = ref([]);
const pagination = ref({
    currentPage: 1,
    categoryPerPage: 10
});

const filters = ref({
    keywords: "",
    status: ""
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
        searchingCategories.value = true;

        const response = await ListingCategoryService.fetch();
        searchingCategories.value = false;
        categories.value = response.data;
        filteredCategories.value = response.data;

        emptyCategories.value = !categories.value.length;


    } catch (error) {
        searchingCategories.value = false;
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
    if (categorySelected.selected) {
        categoriesSelected.value.push(categorySelected);
    } else {
        const index = categoriesSelected.value.findIndex(category => category.id === categorySelected.id);

        if (index !== -1) {
            categoriesSelected.value.splice(index, 1);
        }
    }
}

const showIcon = (category) => {
    return category.icon ? `${API_URL}uploads/categories/${category.icon}` : defaultImg;
}

const filter = () => {
    filteredCategories.value = categories.value.filter(category => {
        const matchesInput = category.name.toLowerCase().includes(filters.value.keywords.toLowerCase());
        const matchesStatus = filters.value.status ? (category.status === filters.value.status) : true;

        return matchesStatus && matchesInput;
    });

    filterEmpty.value = !filteredCategories.value.length
}

const cleanFilter = () => {
    filters.value.keywords = "";
    filters.value.status = "";

    filteredCategories.value = categories.value;
    filterEmpty.value = false;
}

</script>

<style scoped>
.categories {
    min-width: 250px;
    min-height: 170px;
    border-radius: 5px;
    box-shadow: var(--box-shadow-cards);
}

.categories>div {
    border-radius: 5px;
}

.base_table {
    overflow-x: auto !important;
}

table {
    min-width: 650px;
}

table thead th {
    color: #909399;
    font-size: 14px;
}

table td, table th {
    vertical-align: middle;
}

table tbody td {
    color: #727272;
    font-weight: 400;
}

table .categoryIcon {
    width: 38px;
    height: 38px;
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

.search_by_keywords {
    position: relative;
}

.search_by_keywords i {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translate(-50%, -50%);
}
</style>