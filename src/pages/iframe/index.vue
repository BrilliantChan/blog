<template>
    <a-input-group class="website-container"
                   size="large">
        <a-select v-model:value="ssl"
                  class="select">
            <a-select-option value="https://"/>
            <a-select-option value="http://"/>
        </a-select>
        <a-input v-model:value="domain"
                 class="input"
                 @press-enter="onEnter"/>
        <a-select v-model:value="suffix"
                  class="select"
                  show-search
                  :options="domainSuffix"/>
    </a-input-group>

    <iframe id="iframe"
            :src="website"/>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {domainSuffix} from '../../config/index.config';

// SSL协议
const ssl = ref<'https://' | 'http://'>('https://');
// 域名后缀
const suffix = ref<string>('.com');
// 网站域名
const domain = ref<string>('');
// 完整域名
const website = ref<string>('');

// 按下回车显示网页
function onEnter () {
    website.value = `${ssl.value}${domain.value}${suffix.value}`;
}
</script>

<style lang="less" scoped>
.website-container {
    padding: 16px 16px 0;
    .flex();

    .input {
        flex: 1;
    }
}

#iframe {
    flex: 1;
    border: 0;
    background-color: #color[white];
    margin: 8px 16px;
}

.select {
    min-width: 100px;
}
</style>
