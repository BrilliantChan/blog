<template>
    <main class="member--layout-main">
        <section class="member--layout-left">
            <a class="navigate-back fi fi-arrow-left"
               @click="$router.back()"/>

            <a-avatar class="member--layout-avatar"
                      alt="头像"/>

            <i v-if="$memberInfo.gender.value === 'none'"
               class="member--layout-gender fi fi-agender"/>

            <i v-else-if="$memberInfo.gender.value === 'male'"
               class="member--layout-gender fi fi-male"/>

            <i v-else
               class="member--layout-gender fi fi-female"/>

            <p class="member--layout-nick-name">
                {{ $memberInfo.nickName }}
            </p>

            <time class="member--layout-create-time">
                注册时间: {{ $memberInfo.createTime }}
            </time>

            <div class="member--layout-menus">
                <router-link class="member--layout-menu"
                             exact
                             :to="{name: 'MemberEditScreen'}">
                    编辑信息
                </router-link>

                <router-link class="member--layout-menu"
                             exact
                             :to="{name: 'MemberAssociateScreen'}">
                    账号关联
                </router-link>
            </div>

            <a-button class="member--layout-sign-out"
                      type="primary"
                      danger>
                退出登录
            </a-button>
        </section>

        <section class="member--layout-right">
            <router-view/>
        </section>
    </main>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const $router = useRouter();
const $store = useStore();

// 当前用户信息
const $memberInfo = computed<MemberInfo>(() => {
    return $store.state.memberStore.memberInfo;
});
</script>

<style lang="less" scoped>
.member--layout-main {
    position: fixed;
    background-color: transparent;
    top: 30%;
    left: 50%;
    border-radius: 16px;
    transform: translate(-50%, -50%);
    box-shadow: @box-shadow-black;
    .flex(stretch);

    .member--layout-left {
        position: relative;
        width: 200px;

        .navigate-back {
            display: block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: #text-size[xxxl];
            text-align: center;
            color: #text-color[black];
            margin: 16px;
            border-radius: 50%;
            box-shadow: @box-shadow;
            transition: all .3s;

            &:hover {
                color: #text-color[white];
                background-color: #color[primary];
            }
        }

        .member--layout-gender {
            display: block;
            font-size: 26px;
            text-align: center;

            &.fi-male {
                color: #6ca0dc;
            }

            &.fi-female {
                color: #ffc0cb;
            }
        }

        &::before {
            position: absolute;
            height: 100%;
            top: 0;
            right: 0;
            border-right: 1px solid @border-gray;
            content: '';
        }
    }

    .member--layout-right {
        width: 600px;
    }

    .member--layout-avatar {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        box-shadow: @box-shadow;
    }

    .member--layout-nick-name {
        font-family: @black-bold;
        font-size: #text-size[lg];
        text-align: center;
        margin-bottom: 0;
    }

    .member--layout-create-time {
        display: block;
        height: #text-size[sm];
        line-height: #text-size[sm];
        font-size: #text-size[sm];
        text-align: center;
        color: #text-color[secondary];
    }

    .member--layout-menus {
        padding: 16px 0 8px;

        .member--layout-menu {
            display: block;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #text-color[black];
            margin: 0 16px 8px;
            border-radius: 99em;

            &:hover {
                background-color: rgba(#color[black], .2);
            }

            &.router-link-active {
                color: #text-color[white];
                background-color: #color[primary];
            }
        }
    }

    .member--layout-sign-out {
        display: block;
        margin: 0 auto 16px;
    }
}
</style>
