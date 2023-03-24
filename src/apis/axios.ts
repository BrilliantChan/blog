import axios from 'axios';
import cookie from 'js-cookie';

export type {AxiosPromise} from 'axios';

const baseURL = '/api';

const instance = axios.create({
    timeout: 10000,
    baseURL,
    withCredentials: true
});

instance.defaults.xsrfCookieName = 'csrftoken';
instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

instance.interceptors.request.use(
    (config) => {
        return {
            ...config
        };
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    async (response) => {
        const {code = 0} = response.data;

        if (code !== 0) {
            // code = 401 走未登录流程
	        if (code === 401) {
		        cookie.remove('h5-token');
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
