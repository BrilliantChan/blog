<template>
    <a-row class="container">
        <a-col :span="16">
            <vue-cropper class="cropper-container"
                         :output-size="1"
                         :img="current"/>
        </a-col>

        <a-col class="config-container"
               :span="8">
            <div class="upload-dragger">
                <a-upload-dragger v-model:file-list="fileList"
                                  list-type="picture-card"
                                  :custom-request="onUploadImage"
                                  @preview="onClickList">
                    <p class="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>

                    <p class="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </a-upload-dragger>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {VueCropper} from 'vue-cropper';
import type {UploadProps} from 'ant-design-vue';

// 图片列表
const fileList = ref<UploadProps['fileList']>([]);
// 当前选择的图片
const current = ref<string>('');
// 上传图片回调
const onUploadImage :UploadProps['customRequest'] = (payload) => {
    const reader = new FileReader();

    reader.readAsDataURL(payload.file as File);
    reader.onloadend = (e) => {
        if (!payload.onSuccess) return;

        if (e && e.target && e.target.result) {
            payload.onSuccess(e.target.result);
        }
    };
};

// 点击图片
function onClickList ({thumbUrl = ''}) {
    current.value = thumbUrl;
}
</script>

<style lang="less" scoped>
@import '~vue-cropper/dist/index.css';

.container {
    flex: 1;

    .cropper-container {
        height: 100%;
    }

    .config-container {
        background-color: #color[white];
        padding: 16px;
    }

    :deep(.ant-upload-list) {
        margin: 8px 0;
    }
}
</style>
