<template>
    <section id="listingCategoriesView" class="p-2 show">
        <div class="categories bg-white container">
            <div class="p-2 py-3 d-flex justify-content-between">
                <h5 class="custom_dark m-0">{{ showText('CATEGORY_TITLE') }}</h5>

                <button @click="openModal('newCategory')" class="btn btn-sm btn-primary text-nowrap">
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

            <div v-if="filteredCategories.length" class="show container py-3">
                <div class="row mb-3">
                    <div class="col-12 col-sm-7 col-md-6 mb-3">
                        <el-input
                            v-model="filters.keywords"
                            :placeholder="showText('SEARCH')"
                            :prefix-icon="Search"
                            @input="filter()"
                        />
                    </div>
                    <div class="col-12 col-sm-5 col-md-2 mb-3">
                        <el-select v-model="filters.status" id="filter_status" placeholder="Status">
                            <el-option :label="showText('CATEGORY_ACTIVE')" value="Y" />
                            <el-option :label="showText('CATEGORY_INACTIVE')" value="N"  />
                        </el-select>
                    </div>
                    <div class="col-12 col-md-4 d-flex justify-content-end">
                        <el-button @click="filter()" type="primary"><i class="fa-solid fa-magnifying-glass me-1"></i>{{ showText('FILTER') }}</el-button>
                        <el-button @click="cleanFilter()"><i class="fa-solid fa-eraser me-1"></i>{{ showText('CLEAN') }}</el-button>
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
                                        <button @click="opemModalToDelete(category)" class="btn">
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

    <div class="modal fade" data-bs-backdrop="static" id="category" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content p-4 py-2">
                <div class="d-flex justify-content-between mb-3">
                    <h1 class="modal-title fs-5">{{ dialogs.category.label }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="buttonLoading.createOrUpdate"></button>
                </div>
                <form @submit.prevent="submitForm(dialogs.category.action)" class="formNewCategory">
                    <div class="d-flex justify-content-end align-items-center gap-2">
                        <template v-if="categoryToUpdate.status">
                            <span class="text-secondary">Ativada</span>
                        </template>
                        <template v-if="!categoryToUpdate.status">
                            <span class="text-secondary">Desativada</span>
                        </template>

                        <el-switch v-model="categoryToUpdate.status" />
                    </div>
                    <div class="mb-4">
                        <label for="name" class="form-label text-secondary">{{ showText('CATEGORY_NAME_LABEL') }}</label>
                        <input v-model="categoryToUpdate.name" @input="validNameEmpty($event)" ref="inputCategoryName" type="text" name="name" id="name" class="form-control custom_focus form-control-sm">
                    </div>

                    <el-collapse accordion>
                        <el-collapse-item title="Mais opções">

                            <div class="mb-3">
                                <p class="text-secondary fs-6 mb-1">{{ showText('ICON') }}</p>
                                <el-upload v-if="!hideUpload" drag :accept="imgExtensions" :on-change="handleFileChange" :auto-upload="false" :show-file-list="false">
                                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                                        <div class="el-upload__text">
                                            {{ showText('DROP_FILE_HERE') }} <em>{{ showText('CLICK_TO_UPLOAD') }}</em>
                                        </div>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            {{ showText('FORMAT_IMG_TO_UPLOAD_TO_CATEGORY') }}
                                        </div>
                                    </template>
                                </el-upload>

                                <div class="d-flex justify-content-center">
                                    <AppSearchSpinner v-if="loadingUploadIcon" width="big"/>

                                    <div v-if="previewIcon" class="previewIcon">
                                        <img :src="previewIcon" :alt="showText('ALT_CATEGORY')">
                                        <button @click="removeIcon()" type="button" class="btn btn-danger deleteIcon p-1 px-2"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label for="slugUrl" class="form-label text-secondary">{{ showText('SLUG_URL_LABEL') }}</label>
                                <input v-model="categoryToUpdate.slugUrl" type="text" name="slugUrl" id="slugUrl" class="form-control custom_focus form-control-sm">
                            </div>

                            <div class="mb-4">
                                <label for="keywords" class="form-label text-secondary">{{ showText('KEYWORDS_LABEL') }}</label>
                                <el-select
                                    v-model="categoryToUpdate.keywords"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    :reserve-keyword="false"
                                    :placeholder="showText('PRESS_ENTER_TO_ADD')"
                                    name="keywords"
                                    id="keywords"
                                >
                                </el-select>
                            </div>

                            <div>
                                <label for="metaDescription" class="form-label text-secondary">{{ showText('META_DESCRIPTION_LABEL') }}</label>
                                <el-input
                                    v-model="categoryToUpdate.metaDescription"
                                    maxlength="200"
                                    show-word-limit
                                    type="textarea" 
                                    :rows="4"
                                    name="metaDescription"
                                    id="metaDescription"
                                />
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                    <div class="my-4 d-flex justify-content-end gap-2">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-light" :disabled="buttonLoading.createOrUpdate">{{ showText('CANCEL') }}</button>
                        <btnPrimary 
                            :loading="buttonLoading.createOrUpdate"
                            :text="showText('SAVE')"
                            type="submit"
                            width="sm"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" data-bs-backdrop="static" id="deleteCategory" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content p-4 py-2">
                <div class="d-flex justify-content-between mb-3">
                    <h1 class="modal-title fs-5">{{ showText('DELETE_CATEGORY_TITLE') }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :disabled="buttonLoading.delete"></button>
                </div>

                <div class="d-flex justify-content-center">
                    <img class="img_attention" src="@/assets/img/attention.png" :alt="showText('ALT_ATTENTION')">
                </div>

                <p class="text-secondary text-center">{{ showText('WANT_TO_DELETE_CATEGORY') }} <span class="text-primary">{{ categoryToDelete.name }}</span>?</p>

                <div class="my-4 d-flex justify-content-end gap-2">
                    <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-light" :disabled="buttonLoading.delete">{{ showText('CANCEL') }}</button>
                    <btnDanger 
                        @click="deleteCategory()"
                        :loading="buttonLoading.delete"
                        :text="showText('DELETE')"
                        type="submit"
                        width="sm"
                    />
                </div>
            </div>
        </div>
    </div>
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
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { UploadFilled } from '@element-plus/icons-vue'
import FileValidator from '@/validators/FileValidator';
import { settingsStore } from '@/store/SettingsStore';
import { compressImage } from '@/helpers/imageHelper';
import { showAlert } from '@/helpers/showAlert';
import btnPrimary from '@/components/shared/buttons/btnPrimary.vue';
import btnDanger from '@/components/shared/buttons/btnDanger.vue';

const imgExtensions = "image/jpeg, image/jpg, image/png";
const previewIcon = ref("");

const API_URL = process.env.VUE_APP_API_URL;
let categories = ref([]);
let filteredCategories = ref([]);
let emptyCategories = ref(false);
const filterEmpty = ref(false);
const searchingCategories = ref(false);
const categoriesSelected = ref([]);
const loadingUploadIcon = ref(false);
const hideUpload = ref(false);
const categoryToDelete = ref({});
const pagination = ref({
    currentPage: 1,
    categoryPerPage: 10
});

const categoryToUpdate = ref({
    status: true,
    name: "",
    icon: null,
    slugUrl: "",
    keywords: [],
    metaDescription: ""
});

const dialogs = ref({
    delete: {
        active: false,
        multiples: false
    },
    category: {
        active: false,
        label: "",
        action: ""
    }
})

const filters = ref({
    keywords: "",
    status: ""
});

const buttonLoading = ref({
    createOrUpdate: false,
    delete: false
});

const inputCategoryName = ref(null);

let categoryModal = null;
let deleteCategoryModal = null;

onMounted(() => {
    SEOManager.setTitle(showText('CATEGORIES_LISTING_PAGE'));
    getCategories();

    categoryModal = new Modal(document.getElementById('category'));
    deleteCategoryModal = new Modal(document.getElementById('deleteCategory'));
});

onUnmounted(() => {
    SEOManager.setTitle();
});

const getCategories = async () => {
    try {
        filteredCategories.value = [];
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

const openModal = (action, category = null) => {
    hideUpload.value = false;
    inputCategoryName.value.classList.remove('field_invalid');

    switch (action) {
        case 'newCategory':
            previewIcon.value = "";
            dialogs.value.category.label = "Nova categoria";
            dialogs.value.category.action = "create";
            break;
        case 'updateCategory':
            dialogs.value.category.label = "Atualizar categoria";
            dialogs.value.category.action = "update";
            break;
        default:
            break;
    }

    if(category) {
        categoryToUpdate.value = {...category}
    }

    categoryModal.show();
}

const opemModalToDelete = (category) => {
    categoryToDelete.value = category;
    deleteCategoryModal.show();
}

const deleteCategory = async () => {
    try {
        buttonLoading.value.delete = true;
        const response = await ListingCategoryService.delete(categoryToDelete.value.id);

        showAlert('success', '', response.data.message);
        buttonLoading.value.delete = false;

        const index = categories.value.findIndex(item => item.id === categoryToDelete.value.id);
        if(index !== -1) {
            categories.value.splice(index, 1);
        }

        if(!categories.value.length) {
            emptyCategories.value = true;
        }

        deleteCategoryModal.hide();
    } catch (error) {
        console.error('Error deleting category', error);
        buttonLoading.value.delete = false;
    }
} 

const handleFileChange = async (file) => {
    try {
        if (!file || !file.raw) return;

        if(!FileValidator.img(file.raw, 1)) {
            return;
        }

        loadingUploadIcon.value = true;
        hideUpload.value = true;

        if(settingsStore.getSetting("compressImage") == "on") {
            categoryToUpdate.value.icon = await compressImage(file.raw);
        } else {
            categoryToUpdate.value.icon = file.raw;
        }

        const reader = new FileReader();

        reader.onload = () => {
            previewIcon.value = reader.result.toString();
            loadingUploadIcon.value = false;
        }

        reader.readAsDataURL(file.raw);
        
    } catch (error) {
        loadingUploadIcon.value = false;
        showAlert('error', '', showText('FATAL_ERROR'));
        console.error("Error loading image", error);
    }
}

const removeIcon = () => {
    previewIcon.value = "";
    categoryToUpdate.value.icon = "";
    hideUpload.value = false;
}

const submitForm = async (action) => {
    if(!categoryToUpdate.value.name) {
        inputCategoryName.value.classList.add('field_invalid');
        showAlert('error', '', showText('CATEGORY_NAME_REQUIRE'));
        return;
    }
    
    const data = {...categoryToUpdate.value};
    data.status = data.status ? "Y" : "N";

    try {
        buttonLoading.value.createOrUpdate = true;

        if(action == "create") {
            const response = await ListingCategoryService.create(data);
            showAlert('success', '', response.data.message);
        }

        buttonLoading.value.createOrUpdate = false;
        categoryModal.hide();
        cleanCategory();
        getCategories();
    } catch (error) {
        buttonLoading.value.createOrUpdate = false;
        console.error('Error creating category', error);
    }
}

const validNameEmpty = (event) => {
    if(!event.target.value) {
        event.target.classList.add('field_invalid');
    } else {
        event.target.classList.remove('field_invalid');
    }

    let value = event.target.value.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-').trim();

    categoryToUpdate.value.slugUrl = value;
}

const cleanCategory = () => {
    categoryToUpdate.value.status = true;
    categoryToUpdate.value.name = "";
    categoryToUpdate.value.icon = "";
    categoryToUpdate.value.keywords = "";
    categoryToUpdate.value.slugUrl = "";
    categoryToUpdate.value.metaDescription = "";
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

.dialog_category {
    max-width: 200px !important;
}

.el-upload-dragger {
    padding: 5px !important;
}

.previewIcon {
    width: 160px;
    height: 150px;
    position: relative;
    border-radius: 10px;
    box-shadow: 3px 3px 13px 0px #00000044;
}

.previewIcon button {
    position: absolute;
    top: 4px;
    right: 4px;
}

.previewIcon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.img_attention {
    width: 130px;
}
</style>