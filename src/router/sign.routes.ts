import {RouteRecordRaw} from 'vue-router';

const routes :RouteRecordRaw[] = [
    {
        path: '/sign/up',
        name: 'SignUpScreen',
        meta: {title: '注册'},
        component: () => import('../pages/sign/up/index.vue')
    },
    {
        path: '/sign/in',
        name: 'SignInScreen',
        meta: {title: '登录'},
        component: () => import('../pages/sign/in/index.vue')
    }
];

export default routes;
