import cookies from 'js-cookie';
import {message} from 'ant-design-vue';
import type {GetterTree, ActionTree, MutationTree} from 'vuex';

import memberApis, {PostSignUp} from '../../apis/member';
import {genderMap} from '../../config/index.config';
import {GenderMap} from '../../config/types';

interface State {
	memberInfo: Partial<MemberInfo>,
	loginState: StateMap
}

const state = () :State => ({
    // 用户信息
    memberInfo: {},
    // 请求用户信息状态
    loginState: 'loading'
});

const getters :GetterTree<State, VuexState> = {
    $isLogin (state) :boolean {
        return state.loginState === 'done';
    }
};

const mutations :MutationTree<State> = {
    SET_MEMBER_INFO (state, memberInfo :MemberInfo) {
        state.memberInfo = memberInfo;
    },
    SET_LOGIN_STATE (state, loginState :StateMap) {
        state.loginState = loginState;
    }
};

const actions :ActionTree<State, VuexState> = {
    // 用户注册
    async SignUp (store, payload :PostSignUp) :Promise<void> {
        memberApis.postSignUp(payload)
            .then(() => {
                message.success('注册成功');

                return Promise.resolve();
            })
	        .catch((error) => {
                message.error(error.msg || '网络错误');

                return Promise.reject(error);
	        });
    },
    // 用户登录
    async SignIn ({dispatch}, payload :Omit<PostSignUp, 'password2'>) :Promise<void> {
        memberApis.postSignIn(payload)
            .then(({data}) => {
                message.success('登录成功');

                cookies.set('h5-token', data.token);
	            dispatch('QueryMemberInfo');

                return Promise.resolve();
            })
	        .catch((error) => {
                message.error(error.msg || '网络错误');

                return Promise.resolve(error);
	        });
    },
    // 获取用户信息
    QueryMemberInfo ({commit}) {
        memberApis.getMemberInfo()
            .then(({data}) => {
                const genderKey = GenderMap[data.gender];
                const memberInfo :MemberInfo = {
                    ...data,
	                nickName: data.nick_name,
	                gender: genderMap[genderKey],
	                createTime: data.create_time
                };

                commit('SET_MEMBER_INFO', memberInfo);
                commit('SET_LOGIN_STATE', 'done');
            })
	        .catch((error) => {
                // 判断接口返回是否为未登录状态
                if (error.code && error.code === 401) {
                    commit('SET_LOGIN_STATE', 'logout');
                } else {
                    commit('SET_LOGIN_STATE', 'error');
                }
	        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
