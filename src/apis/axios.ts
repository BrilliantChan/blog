import axios from 'axios';
import cookie from 'js-cookie';
import {message as aMessage} from 'ant-design-vue';

const baseURL = '/';

const instance = axios.create({
    timeout: 10000,
    baseURL,
    withCredentials: true
});

instance.interceptors.request.use(
    (config) => {
        const {withCredentials, params} = config;

        if (withCredentials) {
            const token = cookie.get('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return {
            ...config,
            params: {lang: 'zh-cn', ...params}
        };
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    async (response) => {
        const {code = 1, message, msg} = response.data;

        if (code !== 1) {
            if (code === 10005) {
	            aMessage.error(msg || message || '系统错误');
            } else if (code === 10004) {
                cookie.remove('token');
            }

            return Promise.reject(response.data);
        }

        return response.data;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
);

export default instance;

export {
    baseURL
};
