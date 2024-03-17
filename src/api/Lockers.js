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
