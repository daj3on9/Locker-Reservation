import { Cookies } from 'react-cookie';

// refresh 토큰 쿠키에 저장
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return Cookies.set('refresh_token', refreshToken, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(expireDate),
    });
};

// Refresh Token 값 가져오기
export const getCookieToken = () => {
    return Cookies.get('refresh_token');
};

// Cookie 삭제 -> 로그아웃
export const removeCookieToken = () => {
    return Cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
