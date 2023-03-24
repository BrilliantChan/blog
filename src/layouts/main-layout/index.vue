<template>
    <a-layout id="container">
        <a-layout-header id="header">
            <div class="logo"/>

            <member-popover :is-login="$isLogin"
                            :nick-name="$memberInfo.nickName || ''"/>
        </a-layout-header>
        <a-layout-sider id="aside"
                        theme="light">
            <a-menu id="aside-menus"
                    mode="inline"
                    :selected-keys="[$route.name]">
                <a-menu-item class="aside-menu"
                             key="DesktopScreen">
                    <template #icon>
                        <i class="aside-menu-icon fi fi-computer"/>
                    </template>

                    <router-link :to="{name: 'DesktopScreen'}">
                        控制台
                    </router-link>
                </a-menu-item>

                <a-sub-menu>
                    <template #icon>
                        <i class="aside-menu-icon fi fi-construction"/>
                    </template>

                    <template #title>
                        前端工具
                    </template>

                    <a-menu-item v-for="list in toolsRoutes"
                                 :key="list.name"
                                 class="aside-menu">
                        <template #icon>
                            <i :class="['aside-menu-icon', 'fi', list.meta.icon]"/>
                        </template>

                        <router-link :to="{name: list.name}">
                            {{ list.meta.title }}
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item class="aside-menu"
                             key="IframeScreen">
                    <template #icon>
                        <i class="aside-menu-icon fi fi-iframe"/>
                    </template>

                    <router-link :to="{name: 'IframeScreen'}">
                        内置浏览器
                    </router-link>
                </a-menu-item>

                <a-menu-item class="aside-menu"
                             key="ImageScreen">
                    <template #icon>
                        <i class="aside-menu-icon fi fi-image"/>
                    </template>

                    <router-link :to="{name: 'ImageScreen'}">
                        图片编辑
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout-content id="main">
            <router-view/>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';

import MemberPopover from './components/member-popover/index.vue';
import toolsRoutes from '../../router/tools.routes';

const $route = useRoute();
const $store = useStore();

// 是否处于登录状态
const $isLogin = computed<boolean>(() => {
    return $store.getters['memberStore/$isLogin'];
});
// 用户信息
const $memberInfo = computed<MemberInfo>(() => {
    return $store.state.memberStore.memberInfo;
});

console.log($store);
</script>

<style lang="less" scoped>
#container {
    #header {
        position: fixed;
        width: 100%;
        height: @header-height;
        z-index: 4;
        top: 0;
        left: 0;

        .logo {
            width: 120px;
            height: 31px;
            background-color: rgba(#fff, .3);
            float: left;
            margin-top: 10px;
        }
    }

    #aside {
        height: 100vh;
        .p_t_header;

        :deep(.aside-menu) {
            padding: 0 16px !important;
        }

        .aside-menu-icon {
            width: #text-size[xxxl];
            height: #text-size[xxxl];
            font-size: #text-size[xxxl];
            .flex();
        }
    }

    #main {
        height: 100vh;
        min-width: 1280PX;
        overflow-y: auto;
        .p_t_header;
        .flex(stretch, flex-start, column);
    }
}
</style>
