import axios from "axios";

const BASE_URL = "http://54.180.106.229:8080";

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
            const token = "";

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
        baseURL: BASE_URL + "/api/user",
        headers: {},
        ...options,
    });

    instance.interceptors.response.use(
        (response) => {
            return response; //response 객체 반환
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export // 사물함 axios
const lockerAxiosAPI = (options) => {
    const instance = axios.create({
        baseURL: BASE_URL + "/state",
        headers: {},
        ...options,
    });
    return instance;
};

export const baseInstance = axiosAPI(BASE_URL);
export const authInstance = authAxiosAPI(BASE_URL);
export const userInstance = userAxiosAPI();
export const lockerInstance = lockerAxiosAPI();
