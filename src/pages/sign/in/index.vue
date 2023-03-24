<template>
    <section class="sign-in-container">
        <a-form class="sign-in-form">
            <h2 class="ht-2">
                登录/Sign in
            </h2>

            <a-form-item v-bind="validateInfos.account">
                <a-input v-model:value="formState.account"
                         placeholder="请输入账号"
                         size="large"
                         allow-clear/>
            </a-form-item>

            <a-form-item v-bind="validateInfos.password">
                <a-input-password v-model:value="formState.password"
                                  placeholder="请输入密码"
                                  size="large"
                                  allow-clear/>
            </a-form-item>

            <a-form-item>
                <a-button type="primary"
                          block
                          size="large"
                          shape="round"
                          :loading="submitState"
                          @click="onSubmit">
                    登录
                </a-button>
            </a-form-item>

            <a-space class="btn-group"
                     size="large">
                <a-button class="btn btn-github"
                          type="primary">
                    <template #icon>
                        <i class="icon fi fi-github"/>
                    </template>
                </a-button>

                <a-button class="btn btn-wechat"
                          type="primary">
                    <template #icon>
                        <i class="icon fi fi-wechat"/>
                    </template>
                </a-button>
            </a-space>
        </a-form>

        <router-link class="sign-up-form"
                     :to="{name: 'SignUpScreen'}">
            <i class="icon-sign-up fi fi-register"/>
        </router-link>
    </section>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {Form} from 'ant-design-vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

import validateConfig, {ValidateConfig} from '../../../config/validate.config';
import type {PostSignUp} from '../../../apis/member';

const $router = useRouter();
const $store = useStore();

// 表单数据
const formState = reactive<Omit<PostSignUp, 'password2'>>({
    account: '',
    password: ''
});
// 表单规则
const rules = reactive<ValidateConfig>({
    account: [...validateConfig.account],
    password: [...validateConfig.password]
});
// 提交按钮状态
const submitState = ref<boolean>(false);
// 表单实例
const {
    validateInfos,
    validate
} = Form.useForm(formState, rules);

// 提交表单注册
function onSubmit () {
    // 判断是否处于登录状态
    if (submitState.value) return;

    submitState.value = true;

    // 进行表单验证
    validate()
        .then(() => {
            $store.dispatch('memberStore/SignIn', formState)
                .then(() => {
                    setTimeout(() => {
                        $router.replace({name: 'DesktopScreen'});
                    }, 1500);
                })
                .finally(() => {
                    submitState.value = false;
                });
        })
        .catch(() => {
            submitState.value = false;
        });
}
</script>

<style lang="less" scoped>
.sign-in-container {
    position: relative;
    width: 400px;
    margin: 32px auto;

    .sign-in-form {
        position: relative;
        height: 400px;
        background-color: #color[white];
        padding: 32px;
        z-index: 2;
        border-radius: 16px;
        box-shadow: @box-shadow-black;
        box-sizing: content-box;

        .ht-2 {
            text-align: center;
            margin-bottom: 24px;
        }

        .btn-group {
            margin-bottom: 16px;
            .flex();

            .btn {
                width: 58px;
                height: 58px;
                background-color: #color[black];
                border-color: #color[black];
                .flex();

                .icon {
                    font-size: 50px;
                }

                &-wechat {
                    background-color: #color[wechat];
                    border-color: #color[wechat];
                }
            }
        }
    }

    .sign-up-form {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(#color[white], .7);
        z-index: 0;
        right: -40px;
        bottom: -20px;
        cursor: pointer;
        border-radius: 16px;
        content: '';
        box-shadow: @box-shadow-black;
        .flex(flex-start, flex-end);

        .icon-sign-up {
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: #text-size[xxxl];
            text-align: center;
            color: #text-color[black];
        }
    }
}
</style>
