<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mx-0 p-0">
        <div class="container">
            <router-link to="/" class="navbar-brand" @click="closeNavbar()">
                <div class="d-flex align-items-center logo_image">
                    <img :src="logoImage" :alt="showText('WEBSITE_LOGO')">
                </div>
            </router-link>

            <button @click="menuOnClick" class="btn border-0 navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navBar" aria-controls="navBar" aria-expanded="false"
                aria-label="Toggle navigation">
                <div id="menu-bar" :class="{ change: isMenuOpen }">
                    <div id="bar1" class="bar"></div>
                    <div id="bar2" class="bar"></div>
                    <div id="bar3" class="bar"></div>
                </div>
            </button>

            <div class="collapse navbar-collapse" id="navBar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <!-- Logged -->
                    <div v-if="userStore.userLogged">
                        <li class="nav-item logged_small">
                            <i class="bi bi-person-fill me-1 "></i>
                            <p class="m-0 text-secondary"><i class="fa-regular fa-user me-2"></i>{{ userStore.user.name }} {{ userStore.user.lastName }}</p>
                        </li>

                        <hr>

                        <li v-if="allowedRolesToApp.includes(user.role)" class="nav-item logged_small">
                            <router-link :to="showText('PATH_ADM_DASHBOARD')" class="nav-link" @click="closeNavbar()">
                                {{ showText('PANEL_PAGE') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <router-link :to="showText('PATH_PROFILE')" class="nav-link" @click="closeNavbar()">
                                {{ showText('PROFILE_PAGE') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <span class="nav-link cursor_pointer" @click="closeNavbar(), AuthService.logout(true)">{{ showText('LOGOUT_PAGE') }}</span>
                        </li>
                    </div>
                    <!-- Logged -->
                    <hr>
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('HOME_PAGE') }}
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="showText('PATH_ADVERTISES')" class="nav-link" @click="closeNavbar()">
                                {{ showText('ADVERTISERS_PAGE') }}
                            </router-link>
                        </li>

                        <!-- <li class="nav-item">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('JOBS_PAGE') }}
                            </router-link>
                        </li> -->

                        <li class="nav-item">
                            <router-link :to="showText('PATH_BLOG')" class="nav-link" @click="closeNavbar()">
                                {{ showText('BLOG_PAGE') }}
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="showText('PATH_CONTACT')" class="nav-link" @click="closeNavbar()">
                                {{ showText('CONTACT_PAGE') }}
                            </router-link>
                        </li>
                    <hr>
                        <li class="nav-item logged_small">
                            <router-link :to="showText('PATH_PLANS')" class="nav-link" @click="closeNavbar()">
                                {{ showText('ADVERTISE_PAGE') }}
                            </router-link>
                        </li>

                    <hr v-if="!userStore.userLogged">
                    <!-- not logged in -->
                    <li v-if="!userStore.userLogged" class="nav-item logged_small">
                        <router-link :to="showText('PATH_LOGIN')" class="nav-link" @click="closeNavbar()">
                            {{ showText('LOGIN_PAGE') }}
                        </router-link>
                    </li>
                    <!-- not logged in -->

                </ul>
                <div v-if="userStore.userLogged" class="logged_large">
                    <button class="btn btn-light border btn-sm me-2">
                        <router-link :to="showText('PATH_PLANS')" class="nav-link">
                            {{ showText('ADVERTISE_HERE') }}
                        </router-link>
                    </button>

                    <el-dropdown trigger="click">
                        <el-button type="primary">
                            {{ userStore.user.name }}<i class="fa-solid fa-chevron-down ms-2"></i>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-if="allowedRolesToApp.includes(user.role)" class="px-0">
                                    <router-link :to="showText('PATH_ADM_DASHBOARD')" class="nav-link px-3 w-100">
                                        <i class="fa-solid fa-chart-line me-2"></i>
                                        {{ showText('PANEL_PAGE') }}
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item class="px-0">
                                    <router-link :to="showText('PATH_PROFILE')" class="nav-link px-3 w-100">
                                        <i class="fa-regular fa-user me-2"></i>
                                        {{ showText('PROFILE_PAGE') }}
                                    </router-link>
                                </el-dropdown-item>
                                <el-dropdown-item @click="AuthService.logout(true)">
                                    <i class="fa-solid fa-right-from-bracket me-2"></i>
                                    {{ showText('LOGOUT_PAGE') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div v-if="!userStore.userLogged" class="flex-column logged_large">
                    <router-link :to="showText('PATH_PLANS')" class="btn btn-light border btn-sm me-2 fw-semibold text-dark opacity-75" @click="closeNavbar()">
                        {{ showText('ADVERTISE_PAGE') }}
                    </router-link>

                    <router-link :to="showText('PATH_LOGIN')" class="btn btn-primary btn-sm fw-bold rounded-1" @click="closeNavbar()">
                        {{ showText('LOGIN_PAGE') }}
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import defaultLogo from '@/assets/img/default/defaultLogo.png';
import { showText } from '@/translation';
import { userStore } from '@/store/userStore';
import { siteInfoStore } from '@/store/siteInfoStore';
import AuthService from '@/services/AuthService';

const allowedRolesToApp = ["support", "admin", "mod", "test"];
const user = computed(() => userStore.user);

const logoImage = siteInfoStore.constants.logoImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.logoImage}` : defaultLogo;
const isMenuOpen = ref(false);

const menuOnClick = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeNavbar = () => {
    const navBar = document.getElementById('navBar');
    
    if(navBar.classList.contains('show')) {
        navBar.classList.remove('show');
        menuOnClick();
    }
}
</script>

<style scoped>
.navbar-toggler:focus {
    box-shadow: none;
}

nav {
    box-shadow: 0 0 1rem rgba(0,0,0,.15)!important;
}

.logo_image {
    max-width: 240px;
    max-height: 240px;
}

.logo_image img{
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.logged_small {
    display: none;
}

@media screen and (max-width: 992px) {
    .logged_small {
        display: flex;
    }

    .logged_large {
        display: none;
    }

    .logo_image {
        max-width: 180px;
        max-height: 180px;
    }
}

#menu-bar {
    width: 25px;
    height: 20px;
    margin: 15px 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bar {
    height: 2px;
    width: 100%;
    background-color: #505050;
    display: block;
    border-radius: 5px;
    transition: 0.3s ease;
}

.change #bar1 {
    transform: translateY(9px) rotate(-45deg);
}

.change #bar2 {
    opacity: 0;
}

.change #bar3 {
    transform: translateY(-9px) rotate(45deg);
}
</style>