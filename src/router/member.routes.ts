import {RouteRecordRaw} from 'vue-router';

const routes :RouteRecordRaw[] = [
    {
        path: '/member/edit',
        name: 'MemberEditScreen',
        meta: {title: '编辑用户信息'},
        component: () => import('../pages/member/edit/index.vue')
    },
    {
        path: '/member/associate',
        name: 'MemberAssociateScreen',
        meta: {title: '账号关联'},
        component: () => import('../pages/member/associate/index.vue')
    }
];

export default routes;
