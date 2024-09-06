<template>
    <section id="adminLayout" class="m-0 p-0 show">
        <nav class="sidebar" :class="{ 'collapsed': menuClose }">
            <div class="logo px-2">
                <img :src="logoImage" :alt="showText('WEBSITE_LOGO')">
                <i class="fa-solid fa-xmark me-2 fs-5" @click="openMenu"></i>
            </div>
            <ul class="menu">
                <!-- Dashboard -->
                <li class="menu-item">
                    <i class="fa-solid fa-chart-line" :class="{'active-link': isActive(showText('PATH_DASHBOARD'))}"></i>
                    <router-link :to="'/app/' + showText('PATH_DASHBOARD')" class="menu-link" active-class="active-link">{{ showText('DASHBOARD_PAGE') }}</router-link>
                </li>
                
                <!-- Contents with submenu -->
                <li class="menu-item d-flex flex-column align-items-start">
                    <div class="d-flex align-items-center w-100" @click="toggleCollapse('contents')">
                        <i class="fa-solid fa-list"></i>
                        <span class="menu-text cursor_pointer d-flex justify-content-between align-items-center w-100">
                            {{ showText('CONTENTS_PAGE') }}
                            <i class="fa-solid fa-chevron-down fs-7" :class="{ 'rotate': isCollapsed.contents }"></i>
                        </span>
                    </div>
                </li>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-show="!isCollapsed.contents" class="submenu">
                        <router-link :to="'/app/' + showText('PATH_ADM_LISTINGS')" active-class="active-link">{{ showText('ADVERTISEMENTS_PAGE') }}</router-link>
                        <router-link :to="'/app/' + showText('PATH_ADM_EVENTS')" active-class="active-link">{{ showText('EVENTS_PAGE') }}</router-link>
                        <router-link :to="'/app/' + showText('PATH_ADM_BLOG')" active-class="active-link">{{ showText('BLOG_PAGE') }}</router-link>
                    </div>
                </transition>

                <!-- Configs with submenu -->
                <li class="menu-item d-flex flex-column align-items-start">
                    <div class="d-flex align-items-center w-100" @click="toggleCollapse('configs')">
                        <i class="fa-solid fa-gears"></i>
                        <span class="menu-text cursor_pointer d-flex justify-content-between align-items-center w-100">
                            {{ showText('SETTINGS') }}
                            <i class="fa-solid fa-chevron-down fs-7" :class="{ 'rotate': isCollapsed.configs }"></i>
                        </span>
                    </div>
                </li>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-show="!isCollapsed.configs" class="submenu">
                        <router-link :to="'/app/' + showText('PATH_ADM_BASIC_INFORMATION')" active-class="active-link">{{ showText('BASIC_INFORMATION_PAGE') }}</router-link>
                        <router-link :to="'/app/' + showText('PATH_ADM_SETTINGS')" active-class="active-link">{{ showText('GENERAL_SETTINGS_PAGE') }}</router-link>
                        <router-link :to="'/app/' + showText('PATH_ADM_LANGUAGE')" active-class="active-link">{{ showText('LANGUAGE_PAGE') }}</router-link>
                        <router-link :to="'/app/' + showText('PATH_ADM_MAIL')" active-class="active-link">{{ showText('EMAIL_PAGE') }}</router-link>
                    </div>
                </transition>
                
                <!-- Users  -->
                <li class="menu-item">
                    <i class="fa-regular fa-user" :class="{'active-link': isActive(showText('PATH_ADM_USERS'))}"></i>
                    <router-link :to="'/app/' + showText('PATH_ADM_USERS')" class="menu-link" active-class="active-link">{{ showText('USERS_PAGE') }}</router-link>
                </li>
            </ul>
        </nav>
        <div class="content flex-grow-1" :class="{ 'bg_content': menuClose }">
            <header class="px-2 mx-0 shadow-sm d-flex justify-content-between align-items-center">
                <div class="item_center">
                    <button class="btn border-0 mx-2 item_center" @click="openMenu">
                        <i class="fa-solid fa-bars fs-4"></i>
                    </button>
                    <router-link to="/">
                        <button class="btn btn-sm btn-outline-primary text-nowrap">
                            Site
                            <i class="fa-solid fa-globe ms-1"></i>
                        </button>
                    </router-link>
                </div>
                <div class="px-2 item_center gap-3">
                    <div class="px-2">
                        <el-badge :value="22">
                            <i class="fa-regular fa-bell fs-5 text-secondary"></i>
                        </el-badge>
                    </div>
                    <div class="user_contents item_center gap-2">
                        <el-dropdown>
                            <span class="el-dropdown-link text-nowrap">
                                <img :src="userImg" :alt="showText('ALT_USER_IMG')">
                                <span class="firstName">{{ user.name }}</span>
                                <span class="lastName">&nbsp;{{ user.lastName }}</span>
                                <i class="fa-solid fa-chevron-down ms-2"></i>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item class="px-0">
                                        <router-link :to="showText('PATH_PROFILE')" class="nav-link px-3 w-100">
                                            <i class="fa-regular fa-user me-2"></i>
                                            {{ showText('PROFILE_PAGE') }}
                                        </router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item divided @click="AuthService.logout(true)">
                                        <i class="fa-solid fa-right-from-bracket me-2"></i>
                                        {{ showText('LOGOUT_PAGE') }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </header>
            <main class="p-2">
                <router-view></router-view>
            </main>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import defaultLogo from '@/assets/img/default/defaultLogo.png';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { onMounted  } from 'vue';
import { useRoute } from 'vue-router';
import { userStore } from '@/store/userStore';
import defaultUserImg from '@/assets/img/default/user.jpg'
import AuthService from '@/services/AuthService';

const API_URL = process.env.VUE_APP_API_URL;

const logoImage = siteInfoStore.constants.logoImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.logoImage}` : defaultLogo;
const user = computed(() => userStore.user);
const userImg = ref(userStore.user.photo ? `${API_URL}/uploads/users/${userStore.user.photo}` : defaultUserImg)

const route = useRoute();
const menuClose = ref(false);

const isActive = (path) => {
    return route.path === `/app/${path}`;
}

const isCollapsed = ref({
    contents: true,
    configs: true
});

onMounted(() => {
    if(window.innerWidth <= 768) {
        menuClose.value = true;
    }
});

const openMenu = () => {
    menuClose.value = !menuClose.value

    if(menuClose.value) {
        for (let i in isCollapsed.value) {
            isCollapsed.value[i] = true;
        }
    }
}

const toggleCollapse = (section) => {
    if(menuClose.value) {
        menuClose.value = false;
    }

    isCollapsed.value[section] = !isCollapsed.value[section];
}

const beforeEnter = (el) => {
    el.style.maxHeight = '0';
    el.style.opacity = '0';
    el.style.overflow = 'hidden';
}

const enter = (el) => {
    el.offsetHeight;
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
}

const leave = (el) =>  {
    el.style.transition = 'max-height 0.2s ease, opacity 0.2s ease';
    el.style.maxHeight = '0';
    el.style.opacity = '0';
}
</script>

<style scoped>
#adminLayout {
    height: 100vh;
}

.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    color: #7a7a7a;
    font-weight: 500;
    transition: transform 0.3s ease, width 0.3s ease;
    box-shadow: 4px 4px 10px rgba(87, 87, 87, 0.158);
}

.sidebar.collapsed {
    width: 50px;
}

.btn-toggle {
    background: none;
    border: none;
    color: #ffffffda;
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: -50px;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    padding: 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: 0.3s;
}

.menu-item:hover, .menu-item a:hover{
    color: var(--bs-primary);
    background-color: #ffffff;
}

.menu-item > i, .menu-item > div > i {
    margin-right: 10px;
    width: 22px;
}

.menu-item a {
    color: #7a7a7a;
    text-decoration: none;
}

.menu-text, .menu-link {
    transition: opacity 0.3s ease;
    white-space: nowrap;
}

.sidebar.collapsed .menu-text,
.sidebar.collapsed .menu-link {
    opacity: 0;
    width: 0;
    overflow: hidden;
}

.content {
    margin-left: 250px;
    transition: margin-left 0.3s ease;
    background-color: #f3f6f9;
}

.sidebar.collapsed+.content {
    margin-left: 50px;
}

header {
    height: 60px;
    background-color: #fff;
}

.logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img {
    width: 170px;
    object-fit: cover;
    overflow: hidden;
}

.sidebar.collapsed .logo img {
    display: none;
}

.logo i {
    color: #bdbebe;
    display: none;
}

@media (max-width: 768px) {
    .sidebar.collapsed {
        width: 0px;
    }

    .sidebar.collapsed .menu-item i {
        opacity: 0;
        width: 0;
        overflow: hidden;
    }

    .sidebar.collapsed+.content {
        margin-left: 0px;
    }

    .sidebar:not(.collapsed)+.content {
        background-color: #00000050;
    }

    .logo i {
        display: block;
    }

    .sidebar.collapsed .logo i {
        display: none;
    }
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.submenu:hover, .submenu a:hover{
    color: var(--bs-primary);
}

.submenu a {
    color: #8391a2;
    text-decoration: none;
    margin-left: 46px;
    font-size: 15px;
}

.active-link, .active-link i {
    color: var(--bs-primary) !important;
}

.sidebar.collapsed .submenu {
    opacity: 0;
    width: 0;
    overflow: hidden;
}

.rotate {
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
}

.user_contents img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}

@media (max-width: 398px) {
    .user_contents .lastName {
        display: none;
    } 
}

@media (max-width: 325px) {
    .user_contents .firstName, .user_contents .fa-chevron-down {
        display: none;
    } 
}

main {
    height: calc(100vh - 70px);
    overflow-y: scroll;
}
</style>