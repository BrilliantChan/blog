<template>
    <router-view/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import {useStore} from 'vuex';

const $store = useStore();

onMounted(() => {
    $store.dispatch('memberStore/QueryMemberInfo');
});
</script>

<style lang="less">
@import '~ant-design-vue/dist/antd';
@import '~web-utils/h5/css/normalize.css';
@import '~fonts/css/index.css';
@import './assets/less/reset';
@import './assets/less/fonts';
</style>
