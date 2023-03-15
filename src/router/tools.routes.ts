import {RouteRecordRaw} from 'vue-router';

const routes :RouteRecordRaw[] = [
    {
	    path: '/tools/color',
	    name: 'ToolsColorScreen',
	    meta: {title: '颜色工具', icon: 'fi-palette'},
	    component: () => import('../pages/tools/color/index.vue')
    },
    {
        path: '/tools/icons',
        name: 'ToolsIconsScreen',
        meta: {title: '字体图标', icon: 'fi-mood'},
        component: () => import('../pages/tools/icons/index.vue')
    },
    {
        path: '/tools/json',
        name: 'ToolsJsonScreen',
        meta: {title: 'JSON格式化', icon: 'fi-javascript'},
        component: () => import('../pages/tools/json/index.vue')
    }
];

export default routes;
