import axios, {AxiosPromise} from '../axios';

// 注册参数
export interface PostSignUp {
	account: string,
	password: string,
	password2: string,
	email: string
}
// 后端返回的用户信息
export interface AxiosMemberInfo extends Omit<MemberInfo, 'gender' | 'nickName' | 'createTime'> {
	gender: 0 | 1 | 2,
	nick_name: string,
	create_time: string
}

/**
 * 用户注册
 * @param {PostSignUp} payload 请求参数
 * @return {AxiosPromise<void>} AxiosPromise
 */
const postSignUp = (payload :PostSignUp) :AxiosPromise<void> => axios({
    url: '/member/sign/up',
    method: 'POST',
    data: {...payload}
});

/**
 * 用户登录
 * @param {Omit<PostSignUp, 'password2'>} payload 请求参数
 * @return {AxiosPromise<{token: string}>} AxiosPromise
 */
const postSignIn = (payload :Omit<PostSignUp, 'password2'>) :AxiosPromise<{token: string}> => axios({
    url: '/member/sign/in',
    method: 'POST',
    data: {...payload}
});

/**
 * 获取用户信息
 * @return {AxiosPromise<AxiosMemberInfo>} AxiosPromise
 */
const getMemberInfo = () :AxiosPromise<AxiosMemberInfo> => axios({
    url: '/member/info',
    method: 'get'
});

export default {
    postSignUp,
    postSignIn,
    getMemberInfo
};
