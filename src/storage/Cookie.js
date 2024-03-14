import { Cookies } from "react-cookie";

// Refresh Token 쿠키에 저장하기
// Access Token 및 학번, 이름은 store에 저장 -> store 폴더

// 쿠키에 저장
export const setCookieToken = (cookieName, token) => {
    return Cookies.set(cookieName, token, {
        sameSite: "strict",
        path: "/",
    });
};

// Token 값 가져오기
export const getCookieToken = (cookieName) => {
    return Cookies.get(cookieName);
};

// Cookie 삭제 -> 로그아웃
export const removeCookieToken = (cookieName) => {
    return Cookies.remove(cookieName, { sameSite: "strict", path: "/" });
};
