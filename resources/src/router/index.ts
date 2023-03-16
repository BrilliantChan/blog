import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import toolsRoutes from './tools.routes';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../layouts/main-layout/index.vue'),
	    children: [
		    {
                path: '/iframe',
			    meta: {title: '浏览器', icon: 'fi-iframe'},
			    name: 'IframeScreen',
			    component: () => import('../pages/iframe/index.vue')
		    },
		    {
                path: '/image',
			    meta: {title: '图片编辑', icon: 'fi-image'},
			    name: 'ImageScreen',
			    component: () => import('../pages/image/index.vue')
		    }
	    ]
    },
    {
        path: '/tools',
        component: () => import('../layouts/main-layout/index.vue'),
	    redirect: '/tools/color',
        children: [
            ...toolsRoutes
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
