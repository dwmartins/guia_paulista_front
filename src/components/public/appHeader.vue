<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mx-0">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <div class="d-flex align-items-center ">
                    <img class="logo-header" :src="logoImage" :alt="showText('WEBSITE_LOGO')">
                </div>
            </router-link>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navBar" aria-controls="navBar" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navBar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <!-- Logged -->
                    <div v-if="userStore.userLogged">
                        <li class="nav-item logged_small">
                            <i class="bi bi-person-fill me-1 "></i>
                            <span>{{ userStore.user.name }}</span>
                        </li>

                        <hr>

                        <li class="nav-item logged_small">
                            <router-link class="nav-link" @click="closeNavbar()">
                                {{ showText('PANEL_PAGE') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <router-link class="nav-link" @click="closeNavbar()">
                                {{ showText('PROFILE_PAGE') }}
                            </router-link>
                        </li>
                        <li class="nav-item logged_small">
                            <router-link class="nav-link cursor_pointer" @click="closeNavbar()">
                                {{ showText('LOGOUT_PAGE') }}
                            </router-link>
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
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('ADVERTISERS_PAGE') }}
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('JOBS_PAGE') }}
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('BLOG_PAGE') }}
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('CONTACT_PAGE') }}
                            </router-link>
                        </li>
                    <hr>
                        <li class="nav-item logged_small">
                            <router-link to="/" class="nav-link" @click="closeNavbar()">
                                {{ showText('ADVERTISE_PAGE') }}
                            </router-link>
                        </li>

                    <hr>
                    <!-- not logged in -->
                    <li v-if="!userStore.userLogged" class="nav-item logged_small">
                        <router-link :to="showText('PATH_LOGIN')" class="nav-link" @click="closeNavbar()">
                            {{ showText('LOGIN_PAGE') }}
                        </router-link>
                    </li>
                    <!-- not logged in -->

                </ul>
                <div v-if="userStore.userLogged" class="logged_large">
                    <router-link :to="showText('PATH_LOGIN')" class="nav-link" @click="closeNavbar()">
                        <el-button type="primary">{{ showText('LOGIN_PAGE') }}</el-button>
                    </router-link>


                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ userStore.user.name }}
                        </button>
                        <ul class="dropdown-menu">

                            <button v-if="userStore.user.role == 'mod'" class="dropdown-item mb-1"><i class="fa-solid fa-chart-line me-2"></i>Painel</button>

                            <button class="dropdown-item mb-1"><i class="fa-regular fa-user me-2"></i>Perfil</button>
                            <button class="dropdown-item cursor_pointer mb-1"><i class="fa-solid fa-right-from-bracket me-2"></i>Sair</button>
                        </ul>
                    </div>
                </div>
                <div v-if="!userStore.userLogged" class="flex-column logged_large">
                    <router-link to="/" class="btn btn-light border btn-sm me-2 fw-semibold text-dark opacity-75" @click="closeNavbar()">
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

<script>
import defaultLogo from '@/assets/img/default/defaultLogo.png';
import { showText } from '@/translation';
import { userStore } from '@/store/userStore';
import { siteInfoStore } from '@/store/siteInfoStore';

export default {
    name: 'AppHeader',
    data() {
        return {
            showText,
            siteInfoStore,
            userStore,
            logoImage: siteInfoStore.constants.logoImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.logoImage}` : defaultLogo
        }
    },
    methods: {
        closeNavbar() {
            const navBar = document.getElementById('navBar');

            if(navBar.classList.contains('show')) {
                navBar.classList.remove('show');
            }
        }
    }
}

</script>

<style scoped>
nav {
    box-shadow: 0 0 1rem rgba(0,0,0,.15)!important;
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
}
</style>