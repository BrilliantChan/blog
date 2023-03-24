import cookies from 'js-cookie';
import router from './index';
import store from '../store';

// 导航守卫
router.beforeEach((to, form, next) => {
    const token = cookies.get('h5-token');
    const $isLogin = store.getters['memberStore/$isLogin'];
    // 已登录黑名单
    const loginBlackList :string[] = ['SignInScreen', 'SignUpScreen'];
    // 未登录黑名单
    const logoutBlackList :string[] = ['MemberEditScreen', 'MemberAssociateScreen'];

    // 已登录状态下，目标路由属于已登录黑名单，返回上一页
    if (loginBlackList.indexOf(to.name as string) > -1) {
        if (token || $isLogin) next(form.path);
    }
    // 未登录状态下，目标路由属于未登录黑名单，返回上一页
    if (logoutBlackList.indexOf(to.name as string) > -1) {
        if (!token && !$isLogin) next(form.path);
    }

    return next();
});
