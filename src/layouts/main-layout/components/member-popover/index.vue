<template>
    <a-popover placement="bottom">
        <template #content>
            <template v-if="!isLogin">
                <p class="tip">
                    您还未登录
                </p>

                <a-button type="primary"
                          @click="$router.push({name: 'SignInScreen'})">
                    登录/注册
                </a-button>
            </template>

            <template v-else>
                <p class="tip">
                    {{ nickName }}
                </p>

                <a-button type="primary"
                          @click="$router.push({name: 'MemberEditScreen'})">
                    个人中心
                </a-button>
            </template>

        </template>

        <div class="main-header--layout-member">
            <i class="avatar fi fi-avatar"/>

            <span v-if="isLogin"
                  class="nick-name">
                {{ nickName }}
            </span>
        </div>
    </a-popover>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';

interface Props {
    nickName: string,
    isLogin: boolean
}

const $router = useRouter();
const props = withDefaults(defineProps<Props>(), {
    nickName: '',
    isLogin: false
});

console.log(props);
</script>

<style lang="less" scoped>
.main-header--layout-member {
    height: @header-height;
    float: right;
    cursor: pointer;
    .flex();

    .avatar {
        width: 38px;
        height: 38px;
        line-height: 38px;
        font-size: 38px;
        text-align: center;
        color: #color[white];
        cursor: pointer;
    }

    .nick-name {
        color: #text-color[white];
        margin-left: 6px;
    }
}

.tip {
    text-align: center;
    margin-bottom: 6px;
}
</style>
