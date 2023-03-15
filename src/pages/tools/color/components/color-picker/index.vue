<template>
    <a-card class="color-picker-container"
            title="取色器"
            bordered
            hoverable>
        <!-- 取色器 -->
        <color-picker v-model:pure-color="formState.color"
                      v-model:gradient-color="formState.gradient"
                      class="color-picker"
                      use-type="both"
                      is-widget
                      :format="formState.format"
                      :z-index="3"
                      :lang="formState.lang"/>

        <!-- 取色器配置 -->
        <a-form class="form-container">
            <a-form-item label="语言">
                <a-select v-model:value="formState.lang"
                          :options="colorPickerLanguages"/>
            </a-form-item>

            <a-form-item label="格式">
                <a-select v-model:value="formState.format"
                          :options="colorPickerFormat"/>
            </a-form-item>

            <a-form-item label="色值">
                <a-input v-model:value="formState.color"
                         placeholder="请输入色值"/>
            </a-form-item>

            <a-form-item label="渐变色">
                <a-input v-model:value="formState.gradient"
                         placeholder="当前渐变色"/>
            </a-form-item>

            <a-form-item>
                <a-space :size="16">
                    <div v-if="formState.color"
                         class="block"
                         :style="{backgroundColor: formState.color}"/>

                    <div v-if="formState.gradient"
                         class="block"
                         :style="{background: formState.gradient}"/>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script lang="ts" setup>
import {reactive} from 'vue';
import {ColorPicker} from 'vue3-colorpicker';

import {
    colorPickerFormat,
    colorPickerLanguages
} from '../../../../../config/index.config';

interface FormState {
    lang: string,
    format: string,
    color: string,
    gradient: string
}
// 取色器配置
const formState = reactive<FormState>({
    lang: 'ZH-cn',
    format: 'hex',
    color: '',
    gradient: ''
});
</script>

<style lang="less" scoped>
@import '~vue3-colorpicker/style.css';

.color-picker-container {
    :deep(.ant-card-body) {
        .flex(stretch);

        .form-container {
            flex: 1;
            margin-left: 8px;
        }
    }

    .block {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        box-shadow: 0 0 6px 0 rgba(#000, .3);
    }
}
</style>
