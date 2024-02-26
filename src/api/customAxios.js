import axios from 'axios';

// 회원 axios
export const userAxios = axios.create({
    baseURL: 'http://{URL}/api/user/',
});

// 응답 interceptors 추가
userAxios.interceptors.response.use(
    (response) => {
        // 응답이 200 또는 201인 경우에만 response 반환
        if (response.status === 200 || response.status === 201) {
            return response;
        } else {
            // 응답이 200 또는 201이 아닌 경우에는 에러
            throw new Error(`HTTP status code is not 200 or 201. Status: ${response.status}`);
        }
    },
    (error) => {
        // HTTP 응답 코드에 따라 에러 메시지 처리
        if (error.response && error.response.status === 409) {
            alert('이미 존재하는 학번입니다.');
        } else if (error.response && error.response.status === 400) {
            alert('인증 실패');
        } else {
            // 기타 에러인 경우
            alert('에러 발생');
        }
        return Promise.reject(error);
    }
);

// 사물함 axios
export const lockerAxios = axios.create({
    baseURL: 'http://{URL}/state',
});
