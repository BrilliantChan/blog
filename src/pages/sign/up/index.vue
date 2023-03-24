<template>
    <section class="sign-up-container">
        <a-form class="sign-up-form"
                label-align="left">
            <h2 class="ht-2">
                注册/Sign up
            </h2>

            <a-form-item v-bind="validateInfos.account">
                <a-input v-model:value="formState.account"
                         placeholder="请输入账号"
                         size="large"
                         allow-clear/>
            </a-form-item>

            <a-form-item v-bind="validateInfos.email">
                <a-input v-model:value="formState.email"
                         placeholder="请输入邮箱"
                         size="large"
                         allow-clear/>
            </a-form-item>

            <a-form-item v-bind="validateInfos.password">
                <a-input-password v-model:value="formState.password"
                                  placeholder="请输入密码"
                                  size="large"
                                  allow-clear/>
            </a-form-item>

            <a-form-item v-bind="validateInfos.password2">
                <a-input-password v-model:value="formState.password2"
                                  placeholder="请输入密码"
                                  size="large"
                                  allow-clear/>
            </a-form-item>

            <a-form-item>
                <a-button type="primary"
                          size="large"
                          shape="round"
                          block
                          :loading="submitState"
                          @click="onSubmit">
                    注册
                </a-button>
            </a-form-item>
        </a-form>

        <router-link class="sign-in-form"
                     :to="{name: 'SignInScreen'}">
            <i class="icon-sign-up fi fi-login"/>
        </router-link>
    </section>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {Form} from 'ant-design-vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

import validateConfig, {ValidateConfig, Validator} from '../../../config/validate.config';
import type {PostSignUp} from '../../../apis/member';

const $router = useRouter();
const $store = useStore();

// 校验确认密码是否与密码一致
const validatePass :Validator = async (_rule, value :string) => {
    if (value !== formState.password) {
        return Promise.reject(new Error('两次密码不一致'));
    }

    return Promise.resolve();
};
// 表单数据
const formState = reactive<PostSignUp>({
    account: '',
    password: '',
    password2: '',
    email: ''
});
// 表单规则
const rules = reactive<ValidateConfig>({
    account: [...validateConfig.account],
    password: [...validateConfig.password],
    password2: [
        ...validateConfig.password,
        {validator: validatePass, message: '两次密码不一致'}
    ],
    email: [...validateConfig.email]
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
    // 判断是否处于注册状态
    if (submitState.value) return;

    submitState.value = true;

    // 进行表单验证
    validate()
        .then(() => {
            $store.dispatch('memberStore/SignUp', formState)
                .then(() => {
                    setTimeout(() => {
                        $router.replace({name: 'SignInScreen'});
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
.sign-up-container {
    position: relative;
    width: 400px;
    margin: 32px auto;

    .sign-up-form {
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
    }

    .sign-in-form {
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
