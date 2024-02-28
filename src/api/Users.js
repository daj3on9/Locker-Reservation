import { userInstance } from './customAxios';

// 회원가입
export const postUser = (userInfo) => {
    return userInstance.post('/signup', userInfo).then((response) => {
        if (response.status === 201) {
            window.location.href = '/login';
        }
        return response.data;
    });
};

// 인증번호 요청
export const postNumber = async (phoneNumber) => {
    return userInstance.post('/certification', phoneNumber);
};

// 인증번호 확인
export const confirmNumber = async (certification) => {
    return userInstance.post('/certification-check', certification);
};
