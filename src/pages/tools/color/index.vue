<template>
    <a-row class="tools-color-container">
        <a-col :span="12">
            <color-picker/>
        </a-col>

        <a-col :span="11"
               :offset="1"/>
    </a-row>
</template>

<script lang="ts" setup>
import ColorPicker from './components/color-picker/index.vue';
</script>

<style lang="less" scoped>
.tools-color-container {
    padding: 16px;
}
</style>
