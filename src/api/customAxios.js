import axios from 'axios';

const BASE_URL = 'http://{URL}';

// 기본 axios
const axiosAPI = (url, options) => {
    const instance = axios.create({ baseURL: url, ...options });
    return instance;
};

// Auth axios
const authAxiosAPI = (url, options) => {
    const instance = axios.create({
        baseURL: url,
        headers: {},
        ...options,
    });

    instance.interceptors.request.use(
        (config) => {
            // const token = getItem('jwt_token');
            const token = '';

            config.headers = {
                authorization: token ? `bearer ${token}` : null,
            };
            return config;
        },
        (error) => Promise.reject(error.response)
    );

    return instance;
};

// 회원 axios
const userAxiosAPI = (options) => {
    const instance = axios.create({
        baseURL: BASE_URL + '/api/user',
        headers: {},
        ...options,
    });

    instance.interceptors.response.use(
        (response) => {
            if (response.status === 200) {
                return console.log('Message : ', response.data.responseMessage);
            }
            return response;
        },
        (error) => {
            console.error(error);
            return Promise.reject(error);
        }
    );

    return instance;
};

export // 사물함 axios
const lockerAxiosAPI = (options) => {
    const instance = axios.create({
        baseURL: BASE_URL + '/state',
        headers: {},
        ...options,
    });
    return instance;
};

export const baseInstance = axiosAPI(BASE_URL);
export const authInstance = authAxiosAPI(BASE_URL);
export const userInstance = userAxiosAPI();
export const lockerInstance = lockerAxiosAPI();
