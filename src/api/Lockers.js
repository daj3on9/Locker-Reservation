import { lockerInstance } from "./customAxios";

// 사물함 조회
export const getLocker = async (token, floor) => {
    try {
        const response = await lockerInstance.get(`/${floor}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("오류 발생 : ", error);
        throw error;
    }
};

// 사물함 예약
export const postReserve = async (token, reservation) => {
    try {
        const response = await lockerInstance.post(
            "/reservation",
            reservation,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("오류 발생 : ", error);
        throw error;
    }
};

// 사물함 예약 취소
export const deleteReserve = async (token) => {
    try {
        const response = await lockerInstance.delete("/reservation", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        // 서버로부터의 응답이 있고, 상태 코드가 409인 경우
        if (error.response && error.response.status === 401) {
            alert("다시 로그인 해주세요.");
        } else if (error.response && error.response.status === 400) {
            alert("취소할 사물함이 없습니다.");
        } else {
            alert("예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
        return error;
    }
};
