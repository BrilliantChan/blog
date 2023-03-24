<template>
    <a-layout class="sign--layout">
        <a-layout-header class="sign--layout-header">
            <a class="sign--layout-navigate fi fi-arrow-left"
               @click="$router.go(-1)"/>

            <router-link class="sign--layout-navigate fi fi-home"
                         replace
                         :to="{name: 'DesktopScreen'}"/>

            <a-tooltip placement="bottomLeft">
                <template #title>
                    登录
                </template>

                <router-link class="sign--layout-navigate sign--layout-navigate-right fi fi-login"
                             replace
                             :to="{name: 'SignInScreen'}"/>
            </a-tooltip>

            <a-tooltip  placement="bottomLeft">
                <template #title>
                    注册
                </template>

                <router-link class="sign--layout-navigate sign--layout-navigate-right fi fi-register"
                             replace
                             :to="{name: 'SignUpScreen'}"/>
            </a-tooltip>
        </a-layout-header>

        <a-layout-content class="sign--layout-main">
            <router-view/>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';

const $router = useRouter();
</script>

<style lang="less" scoped>
.sign--layout {
    .sign--layout-header {
        height: @header-height;
        background-color: transparent;
        padding: 16px 32px;
        box-sizing: content-box;

        .sign--layout-navigate {
            display: inline-block;
            width: @header-height;
            height: @header-height;
            line-height: @header-height;
            font-size: calc(@header-height - 16px);
            text-align: center;
            color: #text-color[black];
            background-color: rgba(#color[white], .3);
            float: left;
            margin-right: 16px;
            border-radius: 50%;
            box-shadow: @box-shadow;
            transition: all .3s;

            &:hover {
                color: #text-color[white];
                background-color: rgba(#color[primary]);
                box-shadow: @box-shadow-black;
            }

            &-right {
                float: right;
                margin: 0 0 0 16px;
            }
        }
    }

    .sign--layout-main {
        width: 100%;
        height: calc(100vh - 32px - @header-height);
        max-width: 1280PX;
        margin: 0 auto;
    }
}
</style>
