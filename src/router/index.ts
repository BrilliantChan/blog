import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

// 前端工具路由列表
import toolsRoutes from './tools.routes';
// 登录注册路由列表
import signRoutes from './sign.routes';
// 会员中心路由列表
import memberRoutes from './member.routes';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
	    redirect: '/desktop',
        component: () => import('../layouts/main-layout/index.vue'),
	    children: [
		    {
                path: '/desktop',
			    meta: {title: '控制台', icon: 'fi-home'},
			    name: 'DesktopScreen',
			    component: () => import('../pages/desktop/index.vue')
		    },
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
    },
    {
        path: '/sign',
        component: () => import('../layouts/sign-layout/index.vue'),
        redirect: '/sign/in',
        children: [
            ...signRoutes
        ]
    },
    {
        path: '/member',
        redirect: '/member/edit',
        component: () => import('../layouts/member-layout/index.vue'),
        children: [
            ...memberRoutes
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
