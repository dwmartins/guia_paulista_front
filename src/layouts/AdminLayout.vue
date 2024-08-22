<template>
    <section id="adminLayout" class="d-flex m-0 p-0">
        <nav class="sidebar" :class="{ 'collapsed': menuClose }">
            <div class="logo px-2">
                <img :src="logoImage" :alt="showText('WEBSITE_LOGO')">
                <i class="fa-solid fa-xmark me-2 fs-5" @click="openMenu"></i>
            </div>
            <ul class="menu">
                <!-- Dashboard -->
                <li class="menu-item">
                    <i class="fa-solid fa-chart-line"></i>
                    <router-link to="/app" class="menu-link" active-class="active-link">Dashboard</router-link>
                </li>
                
                <!-- Contents with submenu -->
                <li class="menu-item d-flex flex-column align-items-start">
                    <div class="d-flex align-items-center w-100" @click="toggleCollapse('contents')">
                        <i class="fa-solid fa-list"></i>
                        <span class="menu-text cursor_pointer d-flex justify-content-between align-items-center w-100">
                            Conteúdos
                            <i class="fa-solid fa-chevron-down fs-7" :class="{ 'rotate': isCollapsed.contents }"></i>
                        </span>
                    </div>
                </li>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-show="!isCollapsed.contents" class="submenu">
                        <router-link to="/app/anuncios" active-class="active-link">Anuncios</router-link>
                        <router-link to="/app/anuncios" active-class="active-link">Eventos</router-link>
                        <router-link to="/app/anuncios" active-class="active-link">Blog</router-link>
                    </div>
                </transition>

                <!-- Configs with submenu -->
                <li class="menu-item d-flex flex-column align-items-start">
                    <div class="d-flex align-items-center w-100" @click="toggleCollapse('configs')">
                        <i class="fa-solid fa-gears"></i>
                        <span class="menu-text cursor_pointer d-flex justify-content-between align-items-center w-100">
                            Configurações
                            <i class="fa-solid fa-chevron-down fs-7" :class="{ 'rotate': isCollapsed.configs }"></i>
                        </span>
                    </div>
                </li>
                <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-show="!isCollapsed.configs" class="submenu">
                        <router-link to="/app/configuracoes/informacoes-basicas" active-class="active-link">informações básicas</router-link>
                        <router-link to="/app/configuracoes/configuracoes-gerais" active-class="active-link">Configurações gerais</router-link>
                        <router-link to="/app/configuracoes/linguagem" active-class="active-link">Linguagem</router-link>
                        <router-link to="/app/configuracoes/configuracoes-email" active-class="active-link">E-mail</router-link>
                    </div>
                </transition>
                
                <!-- Users  -->
                <li class="menu-item">
                    <i class="fa-regular fa-user"></i>
                    <router-link to="/app/usuarios/" class="menu-link" active-class="active-link">Usuários</router-link>
                </li>
            </ul>
        </nav>
        <div class="content flex-grow-1" :class="{ 'bg_content': menuClose }">
            <header class="px-0 mx-0 shadow-sm d-flex align-items-center">
                <button class="btn border-0 mx-2" @click="openMenu">
                    <i class="fa-solid fa-bars fs-5"></i>
                </button>
            </header>
            <main class="px-3">
                <router-view></router-view>
            </main>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import defaultLogo from '@/assets/img/default/defaultLogo.png';
import { siteInfoStore } from '@/store/siteInfoStore';
import { showText } from '@/translation';
import { onMounted  } from 'vue';
const logoImage = siteInfoStore.constants.logoImage ? `${this.$API_URL}/uploads/systemImages/${siteInfoStore.constants.logoImage}` : defaultLogo;

const menuClose = ref(false);

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
    background-color: #313A46;
    color: #a2afbe;
    transition: transform 0.3s ease, width 0.3s ease;
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
    color: #d0def0;
}

.menu-item > i, .menu-item > div > i {
    margin-right: 10px;
    width: 22px;
}

.menu-item a {
    color: #a2afbe;
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
}

.sidebar.collapsed+.content {
    margin-left: 50px;
}

header {
    height: 50px;
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
    gap: 18px;
}

.submenu:hover, .submenu a:hover{
    color: #AEBFD4;
}

.submenu a {
    color: #8391a2;
    text-decoration: none;
    margin-left: 46px;
    font-size: 15px;
}

.active-link {
    color: #AEBFD4;
}

.active-link, .active-link i {
    color: #AEBFD4;
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
</style>