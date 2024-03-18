import axios from "axios";

const BASE_URL = "http://13.209.118.236:8080";

// 기본 axios
const axiosAPI = (url, options) => {
    const instance = axios.create({ baseURL: url, ...options });
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

// 사물함 axios
const lockerAxiosAPI = (options) => {
    const instance = axios.create({
        baseURL: BASE_URL + "/api/locker",
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

export const baseInstance = axiosAPI(BASE_URL);
export const userInstance = userAxiosAPI();
export const lockerInstance = lockerAxiosAPI();
