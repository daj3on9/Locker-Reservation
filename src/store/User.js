import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "authToken",
    initialState: {
        studentName: null,
    },
    reducers: {
        //  accessToken 정보 저장
        SET_USER: (state, action) => {
            state.studentName = action.payload.studentName;
        },
        //  accessToken 삭제
        DELETE_USER: (state) => {
            state.studentName = null;
        },
    },
});

export const { SET_USER, DELETE_USER } = userSlice.actions;

export default userSlice.reducer;
