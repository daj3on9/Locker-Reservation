import { userInstance } from "./customAxios";
import { SET_USER, DELETE_USER } from "../store/User";
import { SET_TOKEN, DELETE_TOKEN } from "../store/Auth";

// 회원가입
export const postUser = async (userInfo) => {
    try {
        const response = await userInstance.post("/signup", userInfo);
        if (response.status === 201) {
            window.location.href = "/login";
        }
        return response;
    } catch (error) {
        // 서버로부터의 응답이 있고, 상태 코드가 409인 경우
        if (error.response && error.response.status === 409) {
            alert("이미 존재하는 학번입니다.");
        } else {
            // 다른 에러
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
        return error;
    }
};

// 인증번호 요청
export const postNumber = async (phoneNumber) => {
    return userInstance.post("/certification", phoneNumber);
};

// 인증번호 확인
export const confirmNumber = async (certification) => {
    try {
        const response = await userInstance.post(
            "/certification-check",
            certification
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// 로그인
export const postLogin = async (userInfo, dispatch) => {
    try {
        const response = await userInstance.post("/login", userInfo);
        if (response.status === 200) {
            // 학번, 이름, accessToken store에 저장
            const { studentName, accessToken } = response.data.data;
            dispatch(SET_USER({ studentName }));
            dispatch(SET_TOKEN({ accessToken }));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그아웃
export const doLogout = (dispatch) => {
    dispatch(DELETE_TOKEN()); //accessToken store에서 제거
    dispatch(DELETE_USER()); // 사용자 이름 store에서 제거
};
