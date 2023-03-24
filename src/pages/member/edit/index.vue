<template>
    <a-form class="member-edit-container"/>
</template>

<script lang="ts" setup>
import {reactive} from 'vue';
import {GenderMap} from '../../../config/types';

interface FormState {
    nickName: string,
    gender: keyof typeof GenderMap
}

// 表单数据
const formState = reactive<FormState>({
    nickName: '',
    gender: 'none'
});
</script>

<style lang="less" scoped>
.member-edit-container {
    padding: 16px;
}
</style>
