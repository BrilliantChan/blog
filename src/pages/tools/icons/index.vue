<template>
    <a-row>
        <a-col v-for="(list, index) in iconFont.glyphs"
               :key="index"
               :span="4">
            <a-card class="list"
                    hoverable
                    @click="onClickCard(list.name)">
                <template #title>
                    <i :class="['icon', iconFont.font_family, `${iconFont.font_family}-${list.name}`]"/>
                </template>

                <p class="name">
                    {{ list.name }}
                </p>

                <p class="description">
                    \{{ list.unicode }}
                </p>
            </a-card>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import useClipboard from 'vue-clipboard3';
import iconFont from 'fonts/fonts/iconfont.json';
import {message as aMessage} from 'ant-design-vue';

const {toClipboard} = useClipboard();

// 点击卡片复制图片的样式名
async function onClickCard (name :string) {
    try {
        await toClipboard(`${iconFont.font_family}-${name}`);

        aMessage.success('复制成功');
    } catch (e) {
        aMessage.warning('复制失败:', e);
    }
}
</script>

<style lang="less" scoped>
.list {
    margin: 16px;

    :deep(.ant-card-body) {
        padding: 0;
    }

    .icon {
        display: block;
        font-size: 40px;
        text-align: center;
    }

    .name {
        height: #text-size[md];
        line-height: #text-size[md];
        text-align: center;
        margin: 0;
        padding: 8px 0;
        box-sizing: content-box;
    }

    .description {
        font-size: #text-size[sm];
        color: #text-color[secondary];
        text-align: center;
        margin-bottom: 8px;
    }
}
</style>
