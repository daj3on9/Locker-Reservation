import { useSelector } from "react-redux";

// accessToken 반환
export function useAccessToken() {
    const accessToken = useSelector((state) => state.authToken.accessToken);
    return accessToken;
}

// authenticated 반환
export function useAuthenticated() {
    const authenticated = useSelector((state) => state.authToken.authenticated);
    return authenticated;
}

// expiredTime 반환
export function useExpiredTime() {
    const expiredTime = useSelector((state) => state.authToken.expiredTime);
    return expiredTime;
}

// userName 반환
export function useUserName() {
    const userName = useSelector((state) => state.userToken.studentName);
    return userName;
}
