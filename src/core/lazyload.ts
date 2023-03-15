import {createApp} from 'vue';
import {upperFirst, camelCase} from 'lodash';
import 'web-utils/h5/lib-flexible/pc';

import App from '../App.vue';

const app = createApp(App);
const requireComponent = require.context('./../components/', true, /[A-Z|a-z]\w+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
    const filePathArr = fileName.split('/');
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(filePathArr[filePathArr.length - 2]
            .replace(/\.\w+$/, ''))
    );
    // 全局注册组件
    app.component(componentName, componentConfig.default || componentConfig);
});

export default app;
