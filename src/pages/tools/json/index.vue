<template>
    <a-row>
        <a-col :span="10">
            <a-textarea v-model:value="value"
                        class="textarea"
                        placeholder="请输入JSON字符串"
                        allow-clear/>
        </a-col>

        <a-col :span="10"
               :offset="1">
            <json-viewer class="json-viewer"
                         copyable
                         boxed
                         sort
                         :value="json"/>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {JsonViewer} from 'vue3-json-viewer';

const value = ref<string>('');

// 当前显示内容
const json = computed<string | Record<string, never>>(() => {
    if (!value.value) return '请输入JSON字符串';

    try {
        const json = JSON.parse(value.value);

        if (typeof json === 'object' && json) {
            return json;
        } else {
            return '当前格式不是JSON字符串';
        }
    } catch (e) {
        return `JSON解析失败: ${e}`;
    }
});
</script>

<style lang="less" scoped>
@import '~vue3-json-viewer/dist/index.css';

.textarea {
    min-height: 400px;
    margin: 16px
}

.json-viewer {
    margin: 16px;
}
</style>
