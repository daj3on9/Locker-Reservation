import { userInstance } from './customAxios';
import { SET_USER } from '../store/User';
import { SET_TOKEN } from '../store/Auth';

// 회원가입
export const postUser = async (userInfo) => {
    const response = await userInstance.post('/signup', userInfo);
    if (response.status === 201) {
        window.location.href = '/login';
    }
    return response.data;
};

// 인증번호 요청
export const postNumber = async (phoneNumber) => {
    return userInstance.post('/certification', phoneNumber);
};

// 인증번호 확인
export const confirmNumber = async (certification) => {
    try {
        const response = await userInstance().post('/certification-check', certification);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인
export const postLogin = async (userInfo, dispatch) => {
    try {
        const response = await userInstance.post('/login', userInfo);
        if (response.status === 200) {
            // 학번, 이름, accessToken store에 저장
            const { studentName, studentId, accessToken } = response.data;
            dispatch(SET_USER({ studentName, studentId }));
            dispatch(SET_TOKEN(accessToken));
            window.location.href = '/';
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};
