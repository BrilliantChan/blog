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
			    name: 'iframeScreen',
			    component: () => import('../pages/iframe/index.vue')
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
